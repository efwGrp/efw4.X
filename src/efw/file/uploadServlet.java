/**** efw4.X Copyright 2019 efwGrp ****/
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
	        for (Part part : request.getParts()) {
	            for (String cd : part.getHeader("Content-Disposition").split(";")) {
	            	if (cd.trim().startsWith("name=\"cmd\"")) {
            			cmd=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"target\"")) {
	            		target=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"isAbs\"")) {
	            		isAbs=getParam(part);
            			break;
	            	}else if (cd.trim().startsWith("name=\"upload_path[]\"")) {//elfinderのフォルダアップロード対応
	            		paths.add(getParam(part));
            			break;
            		}
	            }
	        }
			
	        for (Part part : request.getParts()) {
	            String uploadFileName=null;
	            for (String cd : part.getHeader("Content-Disposition").split(";")) {
	                if (cd.trim().startsWith("filename")) {
	                	uploadFileName = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
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
	        	String cwdFolder=new String(
	        			Base64.getUrlDecoder().decode(target.substring("EFW_".length()).getBytes())
	        		);
	        	File fl=("true".equals(isAbs))?
	        			FileManager.getByAbsolutePath(cwdFolder):FileManager.get(cwdFolder);
	        	FileManager.saveUploadFiles(fl);//アップロードファイルを正しい場所に移す。
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
