/**** efw4.X Copyright 2025 efwGrp ****/
package efw.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import efw.UploadRiskException;
import efw.efwException;
import efw.efwFilter;
import efw.framework;
import efw.properties.EfwAuthBean;
import efw.properties.PropertiesManager;
import efw.script.ScriptManager;

/**
 * ファイルをクライアントからWEBサーバへアップロードする。
 * @author Chang Kejun
 */
@WebServlet(name = "uploadServlet", urlPatterns = { "/uploadServlet" })
@MultipartConfig()
public final class uploadServlet extends HttpServlet {
	/**
	 * ダミーコンストラクタ
	 */
	public uploadServlet(){super();}
	
	/**
     * レスポンスの文字セット定数、XMLHttpRequestのデフォルトに合わせ、「UTF-8」に固定。
     */
	/**
	 * post方法でアップロードされたファイルを一時ファイルに保存する。
	 * @param request HttpServletRequest オブジェクト。
	 * @param response HttpServletResponse オブジェクト 。
	 * @throws efwException IOException 
	 */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	EfwAuthBean currentAuthBean=efwFilter.getCurrentAuthBean();
    	if(currentAuthBean.loginCheck){//ログインチェック設定の場合
			Object loginCheckValue=((HttpServletRequest) request).getSession().getAttribute(currentAuthBean.loginKey);
			if(loginCheckValue==null || loginCheckValue.equals("")){//ログインしていない場合
				throw new ServletException(new UploadRiskException("Login is required"));
			}else if(currentAuthBean.authCheck){//ログインした、権限チェック必要の場合
				boolean hasAuth=false;
				for (String key : currentAuthBean.authCasePatternsMap.keySet()) {
					String authCheckValue=(String)((HttpServletRequest) request).getSession().getAttribute(currentAuthBean.authKey);
					Pattern authPattern=currentAuthBean.authCasePatternsMap.get(key).get(PropertiesManager.EFW_AUTH_AUTHPATTERN);
					String uploadable=currentAuthBean.authCasesMap.get(key).get(PropertiesManager.EFW_AUTH_UPLOADABLE);
					if(authPattern.matcher(authCheckValue).find()
						&& "true".equals(uploadable)
					){
						hasAuth=true;
						break;
					}
				}
				if(!hasAuth){//権限を持っていない場合
					throw new ServletException(new UploadRiskException("Uploadable role is required"));
				}
			}
    	}
    	
		InputStream inputStream =null;
		FileOutputStream outputStream = null;
		try{
			ArrayList<String> paths=new ArrayList<String>();
			String cmd="";
			String target="";
			String isAbs="";
			String id="";
			String home="";
	        for (Part part : request.getParts()) {
	            for (String cd : part.getHeader("Content-Disposition").split(";")) {
	            	if (cd.trim().startsWith("name=\"cmd\"")) {
            			cmd=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"id\"")) {
	            		id=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"home\"")) {
	            		home=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"target\"")) {
	            		target=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"isAbs\"")) {
	            		isAbs=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"upload_path[]\"")) {//elfinderのフォルダアップロード対応
	            		String thePath=getParam(part);
	                	if (thePath.indexOf("..")>-1) {
	                		throw new ServletException(
	                				new UploadRiskException(thePath)
	                			);//error for risk
	                	}
	            		paths.add(thePath);
            			break;
            		}
	            }
	        }
			
	        for (Part part : request.getParts()) {
	            String uploadFileName=null;
	            for (String cd : part.getHeader("Content-Disposition").split(";")) {
	                if (cd.trim().startsWith("filename")) {
	                	uploadFileName = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
	                	if (uploadFileName.indexOf("..")>-1||uploadFileName.indexOf("\\")>-1||uploadFileName.indexOf("/")>-1) {
	                		throw new ServletException(
	                				new UploadRiskException(uploadFileName)
	                			);//error for risk
	                	}
	                    File fl=File.createTempFile("efw", null);//efw#####.tmpのファイル名
	                    //Change code for resin4.
	                    inputStream =part.getInputStream();
	                    outputStream = new FileOutputStream(fl.getAbsolutePath());
	                    byte[] buffer = new byte[1048576];//1MB
	                    int len;
	                    while ((len = inputStream.read(buffer)) != -1) {
	                    	outputStream.write(buffer, 0, len);
	                    }

	                    inputStream.close();
	                    inputStream=null;
	                    outputStream.close();
	                    outputStream=null;
	                    
	                    
	                    //part.write(fl.getAbsolutePath());//This line cant run at resin4 but ok to tomcat.
	                    String uploadPath =null;
	                    for(int i=0;i<paths.size();i++){
	                    	if (paths.get(i).indexOf(uploadFileName)>-1){
	                    		uploadPath=paths.get(i);
	                    		paths.remove(i);//各パスは１回しか利用しない。
	                    		break;
	                    	}
	                    }
	                    FileManager.keepUploadFile(uploadPath,uploadFileName,fl.getAbsolutePath());
	                    break;
	                }
	            }
	        }
	        if ("upload".equals(cmd)) {//elfinderのuploadの場合
	        	try {
	        		String req="{"
	        				+ "\"home\":\""+home.replaceAll("\"", "\\\"")+"\","
	        				+ "\"isAbs\":"+isAbs+","
	        				+ "\"readonly\":false,"//uploadの場合readonlyはfalse固定
	        				+ "\"id\":\""+id.replaceAll("\"", "\\\"")+"\","
	        				+ "\"cmd\":\""+cmd.replaceAll("\"", "\\\"")+"\","
	        				+ "\"target\":\""+target.replaceAll("\"", "\\\"")+"\"}";
	        		String ret=ScriptManager.callFunction("elfinder_upload",req);//関数を呼びだす
					if (!"".equals(ret)) {
						throw new UploadRiskException(ret);
					}
	    		}catch (Exception ex) {
	    			framework.runtimeSLog(ex);
	    			throw new ServletException(ex);
				}finally {//efwServletと同じ。
					framework.removeI18nProp();
					framework.removeThreadLogs();
					framework.removeRestStatus();
					framework.removeNumberFormats();
					framework.removeDateFormats();
				}
	        }
	        response.getWriter().print("[]");
		}finally{
			framework.removeRequest();
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
		}
    }
    
    private static String getParam(Part part) throws IOException {
    	InputStream inputStream =part.getInputStream();
		byte[] param = new byte[inputStream.available()];
		inputStream.read(param);
		inputStream.close();
		return new String(param,framework.SYSTEM_CHAR_SET);
    }
}
