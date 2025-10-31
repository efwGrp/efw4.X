/**** efw4.X Copyright 2025 efwGrp ****/
package efw.barcode;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * バーコードを作成するサーブレット。
 * @author Chang Kejun
 *
 */
@WebServlet(name="drawServlet",urlPatterns={"/drawServlet"})
public final class drawServlet extends HttpServlet {
	/**
	 * ダミーコンストラクタ
	 */
	public drawServlet(){super();}

	/**
	 * URLから必要な情報を取得しバーコード画像を出力する。
	 * typeはバーコード種類
	 * msgは含みたい情報、漢字情報の場合、UTF8 URLエンコードを推薦。
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			String type=request.getParameter("type");
			String msg=request.getParameter("msg");
			response.setContentType("image/x-png");
			BarCodeManager.encode(type, msg, response.getOutputStream());
		}catch(Exception ex){
			response.reset();
			((HttpServletResponse)response).sendRedirect("./efw/images/abort.png");//エラーを投げない。
		};
	}
}
