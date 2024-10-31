/**** efw4.X Copyright 2024 efwGrp ****/
package efw.file;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import efw.framework;
import efw.i18n.I18nManager;

/**
 * ファイルをWEBサーバからクライアントへ送ってプレビューする。
 * @author Chang Kejun
 */
@WebServlet(name="previewServlet",urlPatterns={"/previewServlet"})
public class previewServlet extends HttpServlet {
    /**
     * レスポンスの文字セット定数、XMLHttpRequestのデフォルトに合わせ、「UTF-8」に固定。
     */
    private static final String EFW_PREVIEW_FILE="efw.preview.file";
    private static final String EFW_PREVIEW_ISABS="efw.preview.isAbs";
    /**
     * get方法でファイルを取得する
     * ダウンロード方法などの情報は、セッションから渡す。
	 * @param request HttpServletRequest オブジェクト。
	 * @param response ファイル内容を含む HttpServletResponse オブジェクト 。
	 * @throws ServletException IOException 
     */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String lang=request.getParameter("lang");//efw.client.jsから設定してくれる言語情報
    	HttpSession sn=request.getSession();
		String attr_file=(String)sn.getAttribute(EFW_PREVIEW_FILE);
		String attr_isAbs=(String)sn.getAttribute(EFW_PREVIEW_ISABS);
		sn.removeAttribute(EFW_PREVIEW_FILE);
		sn.removeAttribute(EFW_PREVIEW_ISABS);
		
		if(attr_file==null||"".equals(attr_file)){
			outputError(response,I18nManager.get(lang, "PreviewNoFileMessage", "No file was specified to preview."));
			return;
		}
		File fl="true".equals(attr_isAbs)?
				new File(attr_file)
				:new File(framework.getStorageFolder()+"/"+attr_file);
		if (!fl.exists()||!fl.isFile()) {
			outputError(response,I18nManager.get(lang, "PreviewFileNotExistsMessage", "The specified file does not exist."));
			return;
		}
		String mimeType=FileManager.getMimeTypeByFileName(fl.getName());
		if ("application/octet-stream".equals(mimeType)) {
			outputError(response,I18nManager.get(lang, "PreviewFileNotPreviewMessage", "The specified file cannot be previewed."));
			return;
		}
		if (fl.length()>10*1024*1024) {
			outputError(response,I18nManager.get(lang, "PreviewFileTooBigMessage", "The specified file is too big to preview."));
			return;
		}
		OutputStream os = null;
		try {
			response.setContentType(mimeType);
			os = response.getOutputStream();
			FileInputStream hFile="true".equals(attr_isAbs)?
					new FileInputStream(attr_file)
					:new FileInputStream(framework.getStorageFolder()+"/"+attr_file);
			BufferedInputStream bis = new BufferedInputStream(hFile);
			int len = 0;
			byte[] buffer = new byte[1024];
			while ((len = bis.read(buffer)) >= 0) os.write(buffer, 0, len);
			bis.close();

		} catch (IOException ex) {
			framework.runtimeWLog(ex);
			outputError(response,framework.getUsefulInfoFromException(ex));
			throw ex;
		} finally {
			if (os != null) {
				try {
					os.close();
				}catch (Exception e){
				} finally {
					os = null;
				}
			}
		}
	}
	private void outputError(HttpServletResponse response, String message) throws IOException {
		response.reset();
		response.setCharacterEncoding(framework.SYSTEM_CHAR_SET);//URLEncoder.encodeと関連
		response.setContentType("text/html;charset=UTF-8"); 
		response.getWriter().print("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"></head><body>");
		response.getWriter().print(message);
		response.getWriter().print("</body></html>");
	}
}
