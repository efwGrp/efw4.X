package efw.taglib;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import efw.efwCorsFilter;
import efw.efwDoNotAsSubException;
import efw.efwSubPartCallingTimeoutException;
import efw.framework;

@WebServlet(name="partServlet",urlPatterns={"/partServlet"})
public final class partServlet extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		try {
			//asSub実行のみ呼び出し可
			if (efwCorsFilter.getAsMain()) {
				throw new efwDoNotAsSubException();
			}
			//セッション情報を受取る
			//セッション改ざんを防ぐため
			Map<String, String[]> map=request.getParameterMap();
			HttpSession session=request.getSession();
			String efwPartCallingTime="0";
			for(Entry<String, String[]> entry : map.entrySet()) {
				String key=entry.getKey();
				String value=entry.getValue()[0];
				key=Util.decode(key);
				value=Util.decode(value);
				if (Part.EFW_PART_CALLING_TIME.equals(key)) {
					efwPartCallingTime=value;
				}else {
					session.setAttribute(key, value);
				}
			}
			long calling=new Long(efwPartCallingTime);
			long current=new Date().getTime();
			long d=Math.abs(calling-current);
			if (d>Part.EFW_PART_CALLING_TIMEOUT) {//30秒超える場合エラー
				throw new efwSubPartCallingTimeoutException();
			}
		} catch (Exception ex) {
			framework.runtimeSLog(ex);
			ex.printStackTrace();
			throw new IOException(ex.getMessage());
		}
	}	
}

