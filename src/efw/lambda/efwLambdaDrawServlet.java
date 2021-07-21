/**** efw4.X Copyright 2019 efwGrp ****/
package efw.lambda;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import com.google.gson.GsonBuilder;
import com.google.gson.internal.LinkedTreeMap;

import efw.framework;
import efw.barcode.BarCodeManager;
/**
 * バーコードを作成するサーブレット。
 * @author Chang Kejun
 *
 */
public class efwLambdaDrawServlet implements RequestStreamHandler{
	/**
	 * URLから必要な情報を取得しバーコード画像を出力する。
	 * typeはバーコード種類
	 * msgは含みたい情報、漢字情報の場合、UTF8 URLエンコードを推薦。
	 */
	@SuppressWarnings("rawtypes")
	@Override
	public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
		PrintWriter wr = new PrintWriter(new BufferedWriter(new OutputStreamWriter(outputStream, framework.getSystemCharSet())));
		String ret;//出力変数
		try{
			BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, framework.getSystemCharSet()));
			StringBuilder reqJson=new StringBuilder();
			String str = br.readLine();
			while(str != null){
				reqJson.append(str);
				str = br.readLine();
			}
			br.close();
			LinkedTreeMap input=new GsonBuilder().setPrettyPrinting().create().fromJson(reqJson.toString(),LinkedTreeMap.class);
			LinkedTreeMap queryStringParameters=(LinkedTreeMap) input.get("queryStringParameters");
			String type=(String)queryStringParameters.get("type");
			String msg=(String)queryStringParameters.get("msg");
			
			try(ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream()) {
				BarCodeManager.encode(type, msg, byteArrayOutputStream);
				ret="{\"statusCode\":200,"
						+"\"headers\":{\"Content-Type\":\"image/png\"},"
						+"\"body\":\""+java.util.Base64.getEncoder().encodeToString(byteArrayOutputStream.toByteArray())+"\","
						+"\"isBase64Encoded\":true}";
			}
			System.out.println(ret);
			wr.print(ret);
		} catch (Exception ex) {
			ex.printStackTrace();
			try(InputStream resourceInputStream=framework.class
					.getResourceAsStream("/META-INF/resources/efw/images/abort.png");
					ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream()) {
				byte[] buffer = new byte[1024];
				while(true) {
					int len = resourceInputStream.read(buffer);
					if(len < 0) {
						break;
					}
					byteArrayOutputStream.write(buffer, 0, len);
				}
				ret="{\"statusCode\":200,"
						+"\"headers\":{\"Content-Type\":\"image/png\"},"
						+"\"body\":\""+java.util.Base64.getEncoder().encodeToString(byteArrayOutputStream.toByteArray())+"\","
						+"\"isBase64Encoded\":true}";
			}
			wr.print(ret);
		}finally {
			wr.close();
		}
	}
}
