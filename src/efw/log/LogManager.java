/**** efw4.X Copyright 2019 efwGrp ****/
package efw.log;

import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.StreamHandler;

import efw.properties.PropertiesManager;

/**
 * ログの作成を管理するクラス。
 * @author Chang Kejun
 *
 */
public final class LogManager {
	/**
	 * ログを作成するオブジェクト。
	 */
	private static Logger logger;
	public static Logger getLogger() {
		return LogManager.logger;
	}
	/**
	 * フレームワークのログ出力を初期化する。
	 * @throws IOException　ログファイルを作成できないエラー。
	 */
	public static void init(){
		String logLevel="WARNING";
		logLevel = PropertiesManager.getProperty(PropertiesManager.EFW_LOG_OUPUT_LEVEL,logLevel);

		Level level = null;
		if ("ALL".equals(logLevel)) {
			level = Level.ALL;
		} else if ("CONFIG".equals(logLevel)) {
			level = Level.CONFIG;
		} else if ("FINE".equals(logLevel)) {
			level = Level.FINE;
		} else if ("FINER".equals(logLevel)) {
			level = Level.FINER;
		} else if ("FINEST".equals(logLevel)) {
			level = Level.FINEST;
		} else if ("INFO".equals(logLevel)) {
			level = Level.INFO;
		} else if ("OFF".equals(logLevel)) {
			level = Level.OFF;
		} else if ("SEVERE".equals(logLevel)) {
			level = Level.SEVERE;
		} else if ("WARNING".equals(logLevel)) {
			level = Level.WARNING;
		}
		logger = Logger.getLogger(LogManager.class.getName());
		logger.setLevel(level);
		//これを追加すればバッチのログはコンソール画面に表示する。
		logger.addHandler(new StreamHandler() {
			{
				setOutputStream(System.out);
				setLevel(Level.ALL);
			}
		});
	}
}
