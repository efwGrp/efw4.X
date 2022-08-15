/**** efw4.X Copyright 2019 efwGrp ****/
package efw.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

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
 * ファイルをクライアントからWEBサーバへアップロードする
 * @author Chang Kejun
 */
@WebServlet(name = "uploadServlet", urlPatterns = { "/uploadServlet" })
@MultipartConfig()
public final class uploadServlet extends HttpServlet {
    /**
     * レスポンスの文字セット定数、XMLHttpRequestのデフォルトに合わせ、「UTF-8」に固定。
     */
    private static final String RESPONSE_CHAR_SET="UTF-8";
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
            for (Part partPath : request.getParts()) {//elfinderのフォルダアップロード対応
            	for (String cdPath : partPath.getHeader("Content-Disposition").split(";")) {
            		if (cdPath.trim().startsWith("name=\"upload_path[]\"")) {
            			inputStream =partPath.getInputStream();
            			byte[] bPath = new byte[inputStream.available()];
            			inputStream.read(bPath);
            			inputStream.close();
            			paths.add(new String(bPath,RESPONSE_CHAR_SET));
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
	                    byte[] b = new byte[inputStream.available()];
	                    inputStream.read(b);
	                    inputStream.close();
	                    inputStream=null;
	                    outputStream = new FileOutputStream(fl.getAbsolutePath());
	                    outputStream.write(b);
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
}
