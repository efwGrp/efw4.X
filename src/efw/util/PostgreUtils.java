package efw.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.postgresql.PGConnection;
/**
 * Postgreユティリティ
 * @author kejun.chang
 *
 */
public final class PostgreUtils {
	/**
	 * CSVを取り込む。
	 * @param url PostgreサーバURL。
	 * @param username ユーザ名。
	 * @param password パスワード。
	 * @param copySQL コピーSQL。
	 * @param fileFullPathName CSVファイルフルパス。
	 * @param charsetName 文字セット。
	 * @throws SQLException SQLエラー。
	 * @throws IOException 通信エラー。
	 */
	public static void copyIn(
			String url, 
			String username, 
			String password,
			String copySQL,
			String fileFullPathName,
			String charsetName
			) throws IOException, SQLException{
		try(Connection con=DriverManager.getConnection(url, username, password)){
			PGConnection pgcon=(PGConnection)con;
			try(InputStreamReader reader=new InputStreamReader(new FileInputStream(new File(fileFullPathName)), charsetName)){
				pgcon.getCopyAPI().copyIn(copySQL, reader);
			}
		}
	}
	/**
	 * CSVを取り出す。
	 * @param url PostgreサーバURL。
	 * @param username ユーザ名。
	 * @param password パスワード。
	 * @param copySQL コピーSQL。
	 * @param fileFullPathName CSVファイルフルパス。
	 * @param charsetName 文字セット。
	 * @throws SQLException SQLエラー。
	 * @throws IOException 通信エラー。
	 */
	public static void copyOut(
			String url, 
			String username, 
			String password,
			String copySQL,
			String fileFullPathName,
			String charsetName
		) throws IOException, SQLException {
		try(Connection con=DriverManager.getConnection(url, username, password)){
			PGConnection pgcon=(PGConnection)con;
			try(OutputStreamWriter writer=new OutputStreamWriter(new FileOutputStream(new File(fileFullPathName)),charsetName)){
				pgcon.getCopyAPI().copyOut(copySQL, writer);
			}
		}
	}
}
