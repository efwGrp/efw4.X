/**** efw4.X Copyright 2025 efwGrp ****/
package efw.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;

import efw.file.FileManager;
import efw.properties.PropertiesManager;
import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.model.ZipParameters;
import net.lingala.zip4j.model.enums.EncryptionMethod;

/**
 * パスワード付けzipファイル作成用クラス。
 */
public final class Zip4jUtils {
	/**
	 * ダミーコンストラクタ
	 */
	public Zip4jUtils(){super();}
	
	private static final String ZIP_CHARSET="UTF-8";

    /**
	 * ファイルを圧縮する。
	 * @param toZipPath 圧縮後のファイルパス。
	 * @param toZipPathIsAbs 圧縮後のファイルパスは絶対パスか相対パスかのフラグ。
	 * @param fromFilePaths 圧縮対象のファイル配列。
	 * @param basePath 圧縮ファイルのベースパス。
	 * @param basePathIsAbs 圧縮対象と圧縮ファイルのベースパスか相対パスかのフラグ。
	 * @param password パスワード。
	 * @throws IOException ファイルアクセスエラー。
	 */
	public static void zip(String toZipPath,  boolean toZipPathIsAbs, String[] fromFilePaths, String basePath, boolean basePathIsAbs, String password) throws IOException{
		ZipParameters params = new ZipParameters();
		File flBase=basePathIsAbs?FileManager.getByAbsolutePath(basePath):FileManager.get(basePath);
		params.setDefaultFolderPath(flBase.getAbsolutePath());
		ZipFile zos = new ZipFile(toZipPathIsAbs?FileManager.getByAbsolutePath(toZipPath):FileManager.get(toZipPath));
		zos.setCharset(Charset.forName(
					PropertiesManager.getProperty(
						PropertiesManager.EFW_ZIP_CHARSET,ZIP_CHARSET
					)
				));
		if(password!=null && !"".equals(password)) {
			params.setEncryptFiles(true);
			params.setEncryptionMethod(EncryptionMethod.ZIP_STANDARD);
			char[] pass = password.toCharArray();
			zos.setPassword(pass);
		}
		try{
			_zip(zos,fromFilePaths,basePath,basePathIsAbs,params);
		}finally{
			zos.close();
		}
	}
	/**
	 * ファイルを圧縮する内部関数
	 * @param zos
	 * @param paths
	 * @param basePath
	 * @param isAbs
	 * @throws IOException
	 */
	private static void _zip(ZipFile zos,String[] paths, String basePath, boolean isAbs,ZipParameters params) throws IOException {
		for (String path : paths) {
			File fl=isAbs?FileManager.getByAbsolutePath(path):FileManager.get(path);
			if(fl.isDirectory()){
				File[] f = isAbs?FileManager.getListByAbsolutePath(path):FileManager.getList(path);
				String[] paths2=new String[f.length];
				for(int i=0;i<f.length;i++){
					paths2[i] = path +"/" + f[i].getName();
				}
				_zip(zos,paths2,basePath,isAbs,params);
			}else{
				zos.addFile(fl, params);
			}

		}	
	}
}
