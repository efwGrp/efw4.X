/**** efw4.X Copyright 2019 efwGrp ****/
package efw.file;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import efw.framework;

/**
 * アップロードとダウンロードファイルを管理するクラス。
 * @author Chang Kejun
 */
public final class FileManager {
	/**
	 * ファイルの格納パス。
	 * サーブレットから渡される。
	 */
    private static String storageFolder;
    /**
     * アップロード情報を格納するセッションキー
     */
    private static final String EFW_UPLOAD="EFW_UPLOAD";    
    /**
     * サーブレットから設定情報を受け取る。
     */
	public static void init(String storageFolder){
		FileManager.storageFolder=storageFolder;
	}
	/**
	 * ファイルの格納パスを取得する。
	 * @return　 ファイルの格納パス。
	 */
	public static String getStorageFolder(){
		return storageFolder;
	}
	/**
	 * 拡張子で指定相対パス内のファイル＆フォルダのリストを取得する
	 * @param path　ファイルの格納パスからの相対パス
	 * @param ext　拡張子
	 * @return　ファイルとサブフォルダのリスト
	 */
	public static File[] getListByExt(String path,String ext){
		File fl=get(path);
		ArrayList<File> temp=new ArrayList<File>();
		if(fl.exists()){//もしフォルダが存在する場合
			File[] files= fl.listFiles();
	 		for(int i=0;i<files.length;i++){
	 			if (files[i].getName().endsWith("."+ext)){
	 				temp.add(files[i]);
	 			}
	 		}
		}
 		File[] ret=new File[temp.size()];
 		for(int i=0;i<temp.size();i++){
 			ret[i]= temp.get(i);
 		}
		return ret;
	}
	public static File[] getListByExtByAbsolutePath(String absolutePath,String ext){
		File fl=new File(absolutePath);
		ArrayList<File> temp=new ArrayList<File>();
		if(fl.exists()){//もしフォルダが存在する場合
			File[] files= fl.listFiles();
	 		for(int i=0;i<files.length;i++){
	 			if (files[i].getName().endsWith("."+ext)){
	 				temp.add(files[i]);
	 			}
	 		}
		}
 		File[] ret=new File[temp.size()];
 		for(int i=0;i<temp.size();i++){
 			ret[i]= temp.get(i);
 		}
		return ret;
	}
	/**
	 * 指定相対パス内のファイル＆フォルダのリストを取得する
	 * @param path　ファイルの格納パスからの相対パス
	 * @return　ファイルとサブフォルダのリスト
	 */
	public static File[] getList(String path){
		File fl=get(path);
		return fl.listFiles();
	}
	public static File[] getListByAbsolutePath(String absolutePath){
		File fl=new File(absolutePath);
		return fl.listFiles();
	}
	public static File get(String path){
		if(path==null)path="";
		File fl=new File(storageFolder+"/"+path);
		return fl;
	}
	public static File getByAbsolutePath(String absolutePath){
		if(absolutePath==null)absolutePath="";
		File fl=new File(absolutePath);
		return fl;
	}
	
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
	 * @param filename 圧縮後のファイル名。
	 * @param paths 圧縮対象のファイル配列。
	 * @throws IOException ファイルアクセスエラー。
	 */
	public static void zip(String filename, String[] paths, String basePath) throws IOException{
		ZipOutputStream zos = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(get(filename))));
		try{
			_zip(zos,paths,basePath);
		}finally{
			zos.close();
		}
	}
	
	private static void _zip(ZipOutputStream zos,String[] paths, String basePath) throws IOException {
		for (String path : paths) {
			File fl=get(path);
			if(fl.isDirectory()){
				File[] f = getList(path);
				String[] paths2=new String[f.length];
			    for(int i=0;i<f.length;i++){
			    	paths2[i] = path +"/" + f[i].getName();
			    }
			    _zip(zos,paths2,basePath);
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
		            zos.putNextEntry(new ZipEntry(path));
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
////////////////////////////////////////////////////////////////
	/**
	 * ひとつのアップロードファイルを
	 * @param f
	 * @throws IOException
	 */
	public synchronized static void saveSingleUploadFile(File f) throws IOException{
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		HttpSession session=request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)session.getAttribute(EFW_UPLOAD);
		if (array==null){
			return;
		}else{
			if (array.size()>0){
				HashMap<String,String> item=array.get(0);
				String srcPath=(String)item.get("tempFileAbsolutePath");
				duplicateByAbsolutePath(srcPath,f.getAbsolutePath());
		        new File(srcPath).delete();
			}
		}
		session.removeAttribute(EFW_UPLOAD);
	}
	/***
	 *　アップロードされたファイルを全部相対パスで保存する。
	 * @param path　スドレジからの相対パス
	 * @throws IOException 
	 */
	public synchronized static void saveUploadFiles(File f) throws IOException{
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		HttpSession session=request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)session.getAttribute(EFW_UPLOAD);
		if (array==null){
			return;
		}else{
			for (int i=0;i<array.size();i++){
				HashMap<String,String> item=(HashMap<String,String>)array.get(i);
				String uploadPath=(String)item.get("uploadPath");
				String uploadFileName=(String)item.get("uploadFileName");
				String tempFileAbsolutePath=(String)item.get("tempFileAbsolutePath");
				System.out.println("uploadPath="+uploadPath+" uploadFileName="+uploadFileName+" tempFileAbsolutePath="+tempFileAbsolutePath);
				if (uploadPath==null){//単独アップロードファイル、フォルダなし
					if (uploadFileName.indexOf(":")>-1){//もしc:\のIE書き方なら、最後のファイル名のみを取る。
						uploadFileName=uploadFileName.substring(uploadFileName.lastIndexOf("\\")+1);
					}
					duplicateByAbsolutePath(tempFileAbsolutePath,f.getAbsolutePath()+"/"+uploadFileName);
				}else{
					duplicateByAbsolutePath(tempFileAbsolutePath,f.getAbsolutePath()+"/"+ uploadPath);
				}
				new File(tempFileAbsolutePath).delete();
			}
		}
		session.removeAttribute(EFW_UPLOAD);
	}
	/***
	 * アップロードされて一時保存中のファイルを削除する。
	 */
	public synchronized static void removeUploadFiles(){
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		HttpSession session=request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)session.getAttribute(EFW_UPLOAD);
		if (array==null){
			return;
		}else{
			for (int i=0;i<array.size();i++){
				HashMap<String,String> item=array.get(i);
				String srcPath=(String)item.get("tempFileAbsolutePath");
		        new File(srcPath).delete();
			}
		}
		session.removeAttribute(EFW_UPLOAD);
	}
	
	/***
	 * アッポロードファイル名と一時ファイルパスをセッションに格納する
	 * @param uploadFileName　アッポロードファイル名（クライアントパスと名称）
	 * @param tempFileAbsolutePath　一時ファイルパス（サーバ絶対パスと名称）
	 */
	public synchronized static void keepUploadFile(String uploadPath,String uploadFileName,String tempFileAbsolutePath){
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		HttpSession session=request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)session.getAttribute(EFW_UPLOAD);
		if (array==null){
			array=new ArrayList<HashMap<String,String>>();
			session.setAttribute(EFW_UPLOAD,array);
		}
		HashMap<String,String> map=new HashMap<String,String>();
		map.put("uploadPath", uploadPath);
		map.put("uploadFileName", uploadFileName);
		map.put("tempFileAbsolutePath", tempFileAbsolutePath);
		array.add(map);
	}
	/**
	 * ファイルのMimeTypeを取得する。
	 * フォルダはdirectory。確定できない場合、application/octet-stream
	 * @param absolutePath
	 * @return
	 */
	public static String getMimeType(String absolutePath){
		String mime;
		try {
			Path path=Paths.get(absolutePath);
			if (path.toFile().isDirectory()){
				mime="directory";
			}else{
				mime=Files.probeContentType(path);
				if (mime==null)mime="application/octet-stream";
			}
		} catch (IOException e) {
			mime="application/octet-stream";
		}
		return mime;
	}
	/**
	 * フォルダを作成する
	 * @param p
	 * @throws Exception 
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
	 * @param f
	 * @param encoding
	 * @return
	 * @throws IOException
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
	 * @param f
	 * @param newName
	 * @throws IOException
	 */
	public static void rename(File f,String newName) throws IOException{
		Path source = Paths.get(f.getAbsolutePath());
		Files.move(source, source.resolveSibling(newName));
	}
	/**
	 * ファイルまたはフォルダを移動する。
	 * @param orgFile
	 * @param newFile
	 * @throws IOException
	 */
	public static void move(File orgFile,File newFile) throws IOException{
		Path source = Paths.get(orgFile.getAbsolutePath());
		Path target = Paths.get(newFile.getAbsolutePath());
		Files.move(source, target);
	}
	/**
	 * からのファイルを作成する。
	 * @param path
	 * @throws IOException
	 */
	public static void makeFile(File f) throws IOException{
		if (!f.exists())f.createNewFile();
	}
	/**
	 * テキストを書き込む。
	 * @param f
	 * @param content
	 * @param encoding
	 * @throws IOException
	 */
	public static void writeAllLines(File f,String content,String encoding) throws IOException{
		Files.write(Paths.get(f.getAbsolutePath()), content.getBytes(encoding),StandardOpenOption.WRITE);
	}
	/**
	 * ファイルを複製する。
	 * @param srcf
	 * @param destf
	 * @throws IOException
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
	 * @return　ファイル名
	 * @throws IOException
	 */
	public static String getTempFileName() throws IOException{
		File fl=File.createTempFile("efw", "tmp");
		String fileName=fl.getName();
		fl.delete();
		return fileName;
	}
	
}
