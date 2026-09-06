/**** efw4.X Copyright 2026 efwGrp ****/
package efw;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
/**
 * efwServletContextListenerはWEB向けフレーワーク初期化用のクラス。
 * @author Chang Kejun
 */
@WebListener
public class efwServletContextListener implements ServletContextListener {
	/**
	 * 初期化
	 * @param sce イベント。
	 */
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		ServletContext context=sce.getServletContext();
		try {
			framework.initWeb(context.getRealPath("/"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
