/**** efw4.X Copyright 2026 efwGrp ****/
package efw;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
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

	@Override
	public void contextDestroyed(ServletContextEvent sce) {}
}
