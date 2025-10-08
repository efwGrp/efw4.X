/**** efw4.X Copyright 2025 efwGrp ****/
package efw.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import efw.UploadRiskException;
import efw.efwException;
import efw.framework;

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
	        	String sessionHome=(String)request.getSession().getAttribute("EFW_ELFINDER_HOME_"+id);
	    		String sessionIsAbs=(String)request.getSession().getAttribute("EFW_ELFINDER_ISABS_"+id);
	    		String sessionReadOnly=(String)request.getSession().getAttribute("EFW_ELFINDER_READONLY_"+id);
	        	String cwdFolder=new String(
	        			Base64.getUrlDecoder().decode(target.substring("EFW_".length()).getBytes())
	        		);
	        	//もしセッション情報がない場合.equalsでエラーが発生する
	        	if (sessionReadOnly.equals("false")//読取り専用ではない
	        		&& sessionIsAbs.equals(isAbs)//セッション情報と一致する
	        		&& sessionHome.equals(home)//セッション情報と一致する
	        		&& cwdFolder.indexOf(home)==0//目標フォルダにhomeがある
	        		&& cwdFolder.indexOf("..")==-1){//目標フォルダに..がない
		        	File fl=("true".equals(isAbs))?
		        			FileManager.getByAbsolutePath(cwdFolder):FileManager.get(cwdFolder);
		        	FileManager.saveUploadFiles(fl);//アップロードファイルを正しい場所に移す。
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
