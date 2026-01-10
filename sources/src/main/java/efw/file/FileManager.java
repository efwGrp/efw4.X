/**** efw4.X Copyright 2025 efwGrp ****/
package efw.file;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import efw.framework;
import efw.properties.PropertiesManager;
import efw.util.JavaxJakartaUtil;

/**
 * アップロードとダウンロードファイルを管理するクラス。
 * @author Chang Kejun
 */
public final class FileManager {
	/**
	 * ダミーコンストラクタ
	 */
	public FileManager(){super();}
	/**
	 * Mimetypesのプロパティファイル名。
	 */
	private static final String EFW_MIMETYPES_FILE_NAME = "mimetypes.properties";
    /**
     * アップロード情報を格納するセッションキー
     */
    private static final String EFW_UPLOAD="EFW_UPLOAD";
    /**
     * ZIP取り扱い時の文字コードの初期値
     */
    private static final String ZIP_CHARSET="UTF-8";
	/**
	 * 相対パスフォルダ内のファイル＆フォルダのリストを取得する。
	 * @param path 相対パスのフォルダ。
	 * @return ファイルとサブフォルダのリスト。
	 * @throws IOException パス存在しないエラー。
	 */
	public static File[] getList(String path) throws IOException{
		File fl=get(path);
		File[] ret= fl.listFiles();
		if (ret==null) throw new IOException("The path does not exist.");
		return ret;
	}
	/**
	 * 絶対パスフォルダ内のファイル＆フォルダのリストを取得する。
	 * @param absolutePath 絶対パスフォルダ。
	 * @return ファイルとサブフォルダのリスト。
	 * @throws IOException パス存在しないエラー。
	 */
	public static File[] getListByAbsolutePath(String absolutePath) throws IOException{
		File fl=new File(absolutePath);
		File[] ret= fl.listFiles();
		if (ret==null) throw new IOException("The path does not exist.");
		return ret;
	}
	/**
	 * 相対パスのファイルあるいはフォルダを取得する。
	 * @param path 相対パス。
	 * @return ファイルオブジェクト。
	 */
	public static File get(String path){
		if(path==null)path="";
		File fl=new File(framework.getStorageFolder()+"/"+path);
		return fl;
	}
	/**
	 * 絶対パスのファイルあるいはフォルダを取得する。
	 * @param absolutePath 絶対パス。
	 * @return ファイルオブジェクト。
	 */
	public static File getByAbsolutePath(String absolutePath){
		if(absolutePath==null)absolutePath="";
		File fl=new File(absolutePath);
		return fl;
	}
	/**
	 * フォルダサイズを取得する。
	 * @param dir フォルダ。
	 * @return サイズ。
	 */
	public static long getFolderSize(File dir) {
	    long size = 0;
	    for (File file : dir.listFiles()) {
	        if (file.isFile()) {
	            size += file.length();
	        }
	        else
	            size += getFolderSize(file);
	    }
	    return size;
	}
	/**
	 * ファイルあるいはフォルダを削除する。
	 * フォルダの場合再帰的に削除する。
	 * @param f ファイルあるいはフォルダ。
	 * @throws IOException 通信エラー。
	 */
	public static void remove(File f) throws IOException{
        if(!f.exists()) return;	//ファイルまたはディレクトリが存在しない場合は何もしない
        else if(f.isFile()) {//ファイルの場合は削除する
        	if (!f.delete()){
            	throw new IOException("FileManager remove false.");
        	}
        }
        else if(f.isDirectory()){//ディレクトリの場合は、すべてのファイルを削除する
            File[] files = f.listFiles();//対象ディレクトリ内のファイルおよびディレクトリの一覧を取得
            for(int i=0; i<files.length; i++) FileManager.remove( files[i] );//ファイルおよびディレクトリをすべて削除  自身をコールし、再帰的に削除する
            if(!f.delete()){//自ディレクトリを削除する
            	throw new IOException("FileManager remove false.");
            }
        }
    }
    
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
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void zip(String toZipPath,  boolean toZipPathIsAbs, String[] fromFilePaths, String basePath, boolean basePathIsAbs, String password) throws IOException{
		//filename is the zip file name, so it is in storage.
		if (password!=null && !"".equals(password)) {
			try{
				Class.forName("net.lingala.zip4j.ZipFile");//もしjar存在しない場合エラーさせるため
				Class zip4jUtils = Class.forName("efw.util.Zip4jUtils");
				Method method = zip4jUtils.getDeclaredMethod("zip", 
					String.class,//toZipPath
					boolean.class,//toZipPathIsAbs
					String[].class,//fromFilePaths
					String.class,//basePath
					boolean.class,//basePathIsAbs
					String.class//password
				);
				method.invoke(null,toZipPath,toZipPathIsAbs,fromFilePaths,basePath,basePathIsAbs,password);
				return;
			}catch(Exception ex){
				framework.runtimeWLog(ex);
			}
		}
		//パスワードなしまたはzip4j失敗の場合、JDKの仕組みでzipする
		ZipOutputStream zos = new ZipOutputStream(new BufferedOutputStream(
				new FileOutputStream(toZipPathIsAbs?getByAbsolutePath(toZipPath):get(toZipPath))
			),Charset.forName(
				PropertiesManager.getProperty(
					PropertiesManager.EFW_ZIP_CHARSET,ZIP_CHARSET
				)
			));
			try{
				_zip(zos,fromFilePaths,basePath,basePathIsAbs);
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
	private static void _zip(ZipOutputStream zos,String[] paths, String basePath, boolean isAbs) throws IOException {
		for (String path : paths) {
			File fl=isAbs?getByAbsolutePath(path):get(path);
			if(fl.isDirectory()){
				File[] f = isAbs?getListByAbsolutePath(path):getList(path);
				String[] paths2=new String[f.length];
				for(int i=0;i<f.length;i++){
					paths2[i] = path +"/" + f[i].getName();
				}
				_zip(zos,paths2,basePath,isAbs);
			}else{
				byte[] buf = new byte[1024];
				InputStream is = new BufferedInputStream(new FileInputStream(fl));
				try{
					//ベースフォルダからzipのrootを作成する。
					if (path.indexOf(basePath)==0){
						path=path.substring(basePath.length());
						if (path.indexOf("/")==0){
							path=path.substring(1);
						}
					}
					ZipEntry zipEntry=new ZipEntry(path);
					zipEntry.setLastModifiedTime(Files.getLastModifiedTime(Paths.get(fl.getAbsolutePath())));
					zos.putNextEntry(zipEntry);
					int len = 0;
					while ((len = is.read(buf)) != -1) {
						zos.write(buf, 0, len);
					}
					zos.closeEntry();
				}finally{
					is.close();
				}
			}
		}	
	}
	
	/**
	 * ZIPを解凍する
	 * @param fromZipPath 解凍するZIPファイルのパス。
	 * @param fromZipPathIsAbs 解凍するZIPファイルのパスは絶対パスか相対パスかのフラグ。
	 * @param basePath 解凍先のパス。
	 * @param basePathIsAbs 解凍先のパスは絶対パスか相対パスかのフラグ。
	 * @throws IOException ファイルアクセスエラー。
	 */
	public static void unZip(String fromZipPath, boolean fromZipPathIsAbs, String basePath, boolean basePathIsAbs) throws IOException {
		ZipInputStream zis = new ZipInputStream(new FileInputStream(
			fromZipPathIsAbs?getByAbsolutePath(fromZipPath):get(fromZipPath)
		),Charset.forName(
			PropertiesManager.getProperty(
				PropertiesManager.EFW_ZIP_CHARSET,ZIP_CHARSET
			)
		));
		try{
			_unZip(zis,basePath,basePathIsAbs);
		}finally{
			zis.close();
		}
	}
	/**
	 * ZIPを解凍する内部関数
	 * @param zis
	 * @param basePath
	 * @param isAbs
	 * @throws IOException
	 */
	private static void _unZip(ZipInputStream zis,String basePath,boolean isAbs) throws IOException {
		//streamから一つ処理すべきものを取る
		ZipEntry zipEntry = zis.getNextEntry();
		//処理すべきものがなければ終わり
		if (zipEntry==null) return;
		
		File newFile = new File(isAbs?getByAbsolutePath(basePath):get(basePath), zipEntry.getName());
		//フォルダの場合
		if (zipEntry.isDirectory()) {
			if (!newFile.isDirectory() && !newFile.mkdirs()) {
				throw new IOException("Failed to create directory " + newFile);
			}
		//ファイルの場合
		} else {
			// fix for Windows-created archives
			File parent = newFile.getParentFile();
			if (!parent.isDirectory() && !parent.mkdirs()) {
				throw new IOException("Failed to create directory " + parent);
			}
			// write file content
			FileOutputStream fos = new FileOutputStream(newFile);
			int len;
			byte[] buffer = new byte[1024];
			while ((len = zis.read(buffer)) > 0) {
				fos.write(buffer, 0, len);
			}
			fos.close();
		}
		
		_unZip(zis,basePath,isAbs);
	}
////////////////////////////////////////////////////////////////
	/**
	 * ひとつのアップロードファイルを保存する。
	 * @param f 保存先。
	 * @throws IOException 通信エラー。
	 */
	public synchronized static void saveSingleUploadFile(File f) throws IOException{
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)JavaxJakartaUtil.getSession().getAttribute(EFW_UPLOAD);
		if (array==null){
			return;
		}else{
			makeDir(f.getParentFile());//コピー先のフォルダを確保する
			if (array.size()>0){
				HashMap<String,String> item=array.get(0);
				String srcPath=(String)item.get("tempFileAbsolutePath");
				if (f.exists())f.delete();
				move(new File(srcPath),f);
			}
		}
		JavaxJakartaUtil.getSession().removeAttribute(EFW_UPLOAD);
	}
	/**
	 *アップロードされたファイルを全部相対パスで保存する。
	 * @param f スドレジからの相対パス。
	 * @throws IOException 通信エラー。
	 */
	public synchronized static void saveUploadFiles(File f) throws IOException{
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)JavaxJakartaUtil.getSession().getAttribute(EFW_UPLOAD);
		if (array==null){
			return;
		}else{
			makeDir(f);//コピー先のフォルダを確保する
			for (int i=0;i<array.size();i++){
				HashMap<String,String> item=(HashMap<String,String>)array.get(i);
				String uploadPath=(String)item.get("uploadPath");
				String uploadFileName=(String)item.get("uploadFileName");
				String tempFileAbsolutePath=(String)item.get("tempFileAbsolutePath");
				if (uploadPath==null){//単独アップロードファイル、フォルダなし
					if (uploadFileName.indexOf(":")>-1){//もしc:\のIE書き方なら、最後のファイル名のみを取る。
						uploadFileName=uploadFileName.substring(uploadFileName.lastIndexOf("\\")+1);
					}
					File ff=new File(f.getAbsolutePath()+"/"+uploadFileName);
					if (ff.exists())ff.delete();
					move(new File(tempFileAbsolutePath),ff);
				}else{
					File ff=new File(f.getAbsolutePath()+"/"+uploadPath);
					if (ff.exists())ff.delete();
					move(new File(tempFileAbsolutePath),ff);
				}
			}
		}
		JavaxJakartaUtil.getSession().removeAttribute(EFW_UPLOAD);
	}
	/**
	 * アップロードされて一時保存中のファイルを削除する。
	 */
	public synchronized static void removeUploadFiles(){
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)JavaxJakartaUtil.getSession().getAttribute(EFW_UPLOAD);
		if (array==null){
			return;
		}else{
			for (int i=0;i<array.size();i++){
				HashMap<String,String> item=array.get(i);
				String srcPath=(String)item.get("tempFileAbsolutePath");
		        new File(srcPath).delete();
			}
		}
		JavaxJakartaUtil.getSession().removeAttribute(EFW_UPLOAD);
	}
	
	/**
	 * アッポロードファイル名と一時ファイルパスをセッションに格納する。
	 * @param uploadPath アップロードパス。（クライアントパス）。
	 * @param uploadFileName アッポロードファイル名（クライアントファイル名称）。
	 * @param tempFileAbsolutePath 一時ファイルパス（サーバ絶対パスと名称）。
	 */
	public synchronized static void keepUploadFile(String uploadPath,String uploadFileName,String tempFileAbsolutePath){
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)JavaxJakartaUtil.getSession().getAttribute(EFW_UPLOAD);
		if (array==null){
			array=new ArrayList<HashMap<String,String>>();
			JavaxJakartaUtil.getSession().setAttribute(EFW_UPLOAD,array);
		}
		HashMap<String,String> map=new HashMap<String,String>();
		map.put("uploadPath", uploadPath);
		map.put("uploadFileName", uploadFileName);
		map.put("tempFileAbsolutePath", tempFileAbsolutePath);
		array.add(map);
	}
	/**
	 * 拡張子とMimeTypeの設定情報
	 * 
	 */
	//https://github.com/apache/tika/blob/main/tika-core/src/main/resources/org/apache/tika/mime/tika-mimetypes.xml
	private static final Properties mimeTypes = new Properties();
	static {
    	try(InputStream inptstrm=FileManager.class
			.getResourceAsStream(FileManager.EFW_MIMETYPES_FILE_NAME)){
				mimeTypes.load(inptstrm);
		} catch (IOException e) {
			e.printStackTrace();
		}
	};
    /**
     * メディアタイプを取得する。
     * @param fl ファイルハンドル。
     * @return メディアタイプ。
     */
	public static String getMimeType(File fl){
		if (fl.isDirectory()){
			return "directory";
		}
		String name = fl.getName();
		String extension = name.substring(name.lastIndexOf(".")+1);//.toLowerCase()は不要です。大文字小文字区別する拡張子がある
		String mime=mimeTypes.getProperty(extension, "unknown");
		if (mime!=null && !"".equals(mime)) {
			return mime;
		}else {
			return "unknown";
		}
	}
	/**
	 * フォルダを作成する
	 * @param p フォルダ。
	 * @throws IOException 通信エラー。
	 */
	public static void makeDir(File p) throws IOException{
		if (!p.exists()){
			if (!p.mkdirs()){
				throw new IOException("FileManager makeDir false.");
			}
		}
	}
	/**
	 * テキストファイルを読み取る。文字コードは自動判断する。
	 * @param f ファイルオブジェクト。
	 * @param encoding エンコード。
	 * @return ファイル内容。
	 * @throws IOException 通信エラー。
	 */
	public static String readAllLines(File f,String encoding) throws IOException{
        if(encoding!=null){
            return new String(Files.readAllBytes(Paths.get(f.getAbsolutePath())), Charset.forName(encoding));
        }else{
        	return new String(Files.readAllBytes(Paths.get(f.getAbsolutePath())));
        }
	}
	/**
	 * ファイルまたはフォルダ名を変更する。
	 * @param f 元ファイル。
	 * @param newName 新名称。
	 * @throws IOException 通信エラー。
	 */
	public static void rename(File f,String newName) throws IOException{
		Path source = Paths.get(f.getAbsolutePath());
		Files.move(source, source.resolveSibling(newName));
	}
	/**
	 * ファイルまたはフォルダを移動する。
	 * @param orgFile 元場所。
	 * @param newFile 新場所。
	 * @throws IOException 通信エラー。
	 */
	public static void move(File orgFile,File newFile) throws IOException{
		Path source = Paths.get(orgFile.getAbsolutePath());
		Path target = Paths.get(newFile.getAbsolutePath());
		Files.move(source, target);
	}
	/**
	 * 空のファイルを作成する。
	 * @param f ファイルオブジェクト。
	 * @throws IOException 通信エラー。
	 */
	public static void makeFile(File f) throws IOException{
		if (!f.exists())f.createNewFile();
	}
	/**
	 * テキストを書き込む。
	 * @param f 書込み先。
	 * @param content 内容。
	 * @param encoding エンコード。
	 * @throws IOException 通信エラー。
	 */
	public static void writeAllLines(File f,String content,String encoding) throws IOException{
		Files.write(Paths.get(f.getAbsolutePath()), content.getBytes(encoding));
	}
	/**
	 * ファイルを複製する。
	 * @param srcf コピー元。
	 * @param destf コピー先。
	 * @throws IOException 通信エラー。
	 */
	public static void duplicate(File srcf,File destf) throws IOException{
		duplicateByAbsolutePath(srcf.getAbsolutePath(),destf.getAbsolutePath());
	}
	private static void duplicateByAbsolutePath(String absSrcPath,String absDestPath) throws IOException{
		File fileSrc=new File(absSrcPath);
		File fileDest=new File(absDestPath);
		boolean doCopy=false;
		if (fileSrc.isFile()){
			doCopy=true;
			if(fileDest.exists())remove(fileDest);
		}else if (!fileDest.exists()){
			doCopy=true;
		}
		if (absDestPath.lastIndexOf("/")>-1){//フォルダがある場合、フォルダの存在を確保する
			new File(absDestPath.substring(0, absDestPath.lastIndexOf("/"))).mkdirs();
		}
		if (doCopy){
			Files.copy(Paths.get(absSrcPath),Paths.get(absDestPath),StandardCopyOption.REPLACE_EXISTING,StandardCopyOption.COPY_ATTRIBUTES);
		}
		if (fileSrc.isDirectory()){
			File lst[]=fileSrc.listFiles();
			for(int i=0;i<lst.length;i++){
				String subSrcPath=absSrcPath+"/"+lst[i].getName();
				String subDestPath=absDestPath+"/"+lst[i].getName();
				duplicateByAbsolutePath(subSrcPath,subDestPath);
			}
		}
	}
	/**
	 * 一時ファイル名を取る
	 * @return ファイル名
	 * @throws IOException 一時ファイル名作成エラー。
	 */
	public static String getTempFileName() throws IOException{
		File fl=File.createTempFile("efw", "tmp");
		String fileName=fl.getName();
		fl.delete();
		return fileName;
	}
	
	/**
	 * テキストファイルを読み取る。文字コードは自動判断する。
	 * @param f ファイルオブジェクト。
	 * @return ファイル内容。
	 * @throws IOException 通信エラー。
	 */
	public static byte[] readAllBytes(File f) throws IOException{
    	return Files.readAllBytes(Paths.get(f.getAbsolutePath()));
	}
	
	/**
	 * テキストファイルを読み取る。文字コードは自動判断する。
	 * @param f ファイルオブジェクト。
	 * @param content ファイル内容。
	 * @throws IOException 通信エラー。
	 */
	public static void writeAllBytes(File f, byte[] content) throws IOException{
    	Files.write(Paths.get(f.getAbsolutePath()),content);
	}
}
