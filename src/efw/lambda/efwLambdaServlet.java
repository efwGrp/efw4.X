/**
 * 
 */
package efw.lambda;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.google.gson.GsonBuilder;
import com.google.gson.internal.LinkedTreeMap;

import efw.framework;
import efw.script.ScriptManager;

/**
 * @author kejun.chang
 *
 */
public class efwLambdaServlet implements RequestStreamHandler{
	
	private static final String WEBHOME="WEBHOME";
	private static final String PROPERTIES="PROPERTIES";
	
	public efwLambdaServlet() throws Exception {
		String webHome=System.getenv(WEBHOME);
		String properties =System.getenv(PROPERTIES);
		framework.initLambda(webHome,properties);
	}
	
	//CORS対応
	public static String doCORS(String origin, String result){
		String ret="{\"statusCode\":201,";
		if (framework.getInitSuccessFlag()){
			ret+= "\"headers\":{"
			+ "\"Access-Control-Allow-Headers\":\"Accept,Accept-Encoding,Accept-Language,Connection,Content-Length,Content-Type,Host,Origin,Referer,User-Agent\",";
			if("*".equals(framework.getCors())){
				ret+="\"Access-Control-Allow-Origin\":\""+origin+"\",";
			}else if("null".equals(framework.getCors())||"".equals(framework.getCors())||null==framework.getCors()){
				
			}else {
				String[] corsAry=framework.getCors().split(",");
				for(int i=0;i<corsAry.length;i++){
					if (corsAry[i].equals(origin)){
						ret+="\"Access-Control-Allow-Origin\":\""+origin+"\",";
						break;
					}
				}
			}
			ret+="\"Access-Control-Allow-Methods\":\"POST,OPTIONS\"},";
		}
		ret+= "\"body\":\""+result.replaceAll("[\\\\]", "\\\\\\\\").replaceAll("[']","\\\\'").replaceAll("[\"]","\\\\\"")+"\"}";
		return ret;
	}
	
	@SuppressWarnings("rawtypes")
	@Override
	public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
		//to receive request info from inputstream.
		StringBuilder reqJson=new StringBuilder();
		try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, framework.getSystemCharSet()))){
			String str = br.readLine();
			while(str != null){
				reqJson.append(str);
				str = br.readLine();
			}
		}
		LinkedTreeMap input=new GsonBuilder().setPrettyPrinting().create().fromJson(reqJson.toString(),LinkedTreeMap.class);
		String reqBody =(String)input.get("body");
		String origin=(String)((LinkedTreeMap)input.get("headers")).get("origin");
		String method=(String)((LinkedTreeMap)((LinkedTreeMap)input.get("requestContext")).get("http")).get("method");
		//the other error string
		String otherError="{\"values\":[],\"actions\":{\"error\":{\"clientMessageId\":\"OtherErrorException\"}"+
				(framework.getSystemErrorUrl().equals("")?"":",\"navigate\":{\"url\":\""+framework.getSystemErrorUrl()+"\"}")
				+"}";
		PrintWriter wr = new PrintWriter(new BufferedWriter(new OutputStreamWriter(outputStream, framework.getSystemCharSet())));

		//if init is failed, return the info instead of throw exception
		if (!framework.getInitSuccessFlag()){
			framework.runtimeSLog("initSuccessFlag = false");
			wr.print(efwLambdaServlet.doCORS(origin,otherError));
			wr.close();
			return;
		}
		//when option method,return cors info
		if (!"POST".equals(method)) {
			wr.print(efwLambdaServlet.doCORS(origin,""));
			wr.close();
			return;
		}
		//call script 
		framework.setThreadLogs(new ArrayList<String>());
		try {
			wr.print(efwLambdaServlet.doCORS(origin,ScriptManager.doLambdaPost(reqBody)));
			wr.close();
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
			wr.print(efwLambdaServlet.doCORS(origin,otherError));//efw内部エラー。
			wr.close();
		}finally{
			framework.removeRequest();
			framework.removeResponse();
			framework.removeI18nProp();
			framework.removeThreadLogs();
			framework.removeRestStatus();
			framework.removeNumberFormats();
			framework.removeDateFormats();
		}
		
	}
}

