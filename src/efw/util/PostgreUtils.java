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

public final class PostgreUtils {
	public static void copyIn(
			String url, 
			String username, 
			String password,
			String copySQL,
			String fileFullPathName,
			String charsetName
			) throws SQLException, IOException{
		Connection con=DriverManager.getConnection(url, username, password);
		PGConnection pgcon=(PGConnection)con;
		InputStreamReader reader=new InputStreamReader(new FileInputStream(new File(fileFullPathName)), charsetName);
		try{
			pgcon.getCopyAPI().copyIn(copySQL, reader);
		}finally{
			con.close();
			reader.close();
		}
	}
	public static void copyOut(
			String url, 
			String username, 
			String password,
			String copySQL,
			String fileFullPathName,
			String charsetName
		) throws SQLException, IOException {
		Connection con=DriverManager.getConnection(url, username, password);
		PGConnection pgcon=(PGConnection)con;
		OutputStreamWriter writer=new OutputStreamWriter(new FileOutputStream(new File(fileFullPathName)),charsetName);
		try{
			pgcon.getCopyAPI().copyOut(copySQL, writer);
		}finally{
			con.close();
			writer.close();
		}
	}
}
