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
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import efw.framework;
import efw.properties.PropertiesManager;

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
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		HttpSession session=request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)session.getAttribute(EFW_UPLOAD);
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
		session.removeAttribute(EFW_UPLOAD);
	}
	/**
	 *アップロードされたファイルを全部相対パスで保存する。
	 * @param f スドレジからの相対パス。
	 * @throws IOException 通信エラー。
	 */
	public synchronized static void saveUploadFiles(File f) throws IOException{
		HttpServletRequest request=(HttpServletRequest)framework.getRequest();
		HttpSession session=request.getSession();
		@SuppressWarnings("unchecked")
		ArrayList<HashMap<String,String>> array= (ArrayList<HashMap<String,String>>)session.getAttribute(EFW_UPLOAD);
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
		session.removeAttribute(EFW_UPLOAD);
	}
	/**
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
	
	/**
	 * アッポロードファイル名と一時ファイルパスをセッションに格納する。
	 * @param uploadPath アップロードパス。（クライアントパス）。
	 * @param uploadFileName アッポロードファイル名（クライアントファイル名称）。
	 * @param tempFileAbsolutePath 一時ファイルパス（サーバ絶対パスと名称）。
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
	//https://docs.w3cub.com/http/basics_of_http/mime_types/complete_list_of_mime_types.html
	//https://www.freeformatter.com/mime-types-list.html
	private static final Map<String, String> mimeTypes=new HashMap<String, String>() {
		{
			put("123", "application/vnd.lotus-1-2-3");
			put("3dml", "text/vnd.in3d.3dml");
			put("3g2", "video/3gpp2");
			put("3gp", "video/3gpp");
			put("7z", "application/x-7z-compressed");
			put("aab", "application/x-authorware-bin");
			put("aac", "audio/x-aac");
			put("aam", "application/x-authorware-map");
			put("aas", "application/x-authorware-seg");
			put("abw", "application/x-abiword");
			put("ac", "application/pkix-attr-cert");
			put("acc", "application/vnd.americandynamics.acc");
			put("ace", "application/x-ace-compressed");
			put("acu", "application/vnd.acucobol");
			put("adp", "audio/adpcm");
			put("aep", "application/vnd.audiograph");
			put("afp", "application/vnd.ibm.modcap");
			put("ahead", "application/vnd.ahead.space");
			put("ai", "application/postscript");
			put("aif", "audio/x-aiff");
			put("air", "application/vnd.adobe.air-application-installer-package+zip");
			put("ait", "application/vnd.dvb.ait");
			put("ami", "application/vnd.amiga.ami");
			put("apk", "application/vnd.android.package-archive");
			put("application", "application/x-ms-application");
			put("apr", "application/vnd.lotus-approach");
			put("arc", "application/x-freearc");
			put("asf", "video/x-ms-asf");
			put("aso", "application/vnd.accpac.simply.aso");
			put("atc", "application/vnd.acucorp");
			put("atom, xml", "application/atom+xml");
			put("atomcat", "application/atomcat+xml");
			put("atomsvc", "application/atomsvc+xml");
			put("atx", "application/vnd.antix.game-component");
			put("au", "audio/basic");
			put("avi", "video/x-msvideo");
			put("avif", "image/avif");
			put("aw", "application/applixware");
			put("azf", "application/vnd.airzip.filesecure.azf");
			put("azs", "application/vnd.airzip.filesecure.azs");
			put("azw", "application/vnd.amazon.ebook");
			put("bcpio", "application/x-bcpio");
			put("bdf", "application/x-font-bdf");
			put("bdm", "application/vnd.syncml.dm+wbxml");
			put("bed", "application/vnd.realvnc.bed");
			put("bh2", "application/vnd.fujitsu.oasysprs");
			put("bin", "application/octet-stream");
			put("bmi", "application/vnd.bmi");
			put("bmp", "image/bmp");
			put("box", "application/vnd.previewsystems.box");
			put("btif", "image/prs.btif");
			put("bz", "application/x-bzip");
			put("bz2", "application/x-bzip2");
			put("c", "text/x-c");
			put("c11amc", "application/vnd.cluetrust.cartomobile-config");
			put("c11amz", "application/vnd.cluetrust.cartomobile-config-pkg");
			put("c4g", "application/vnd.clonk.c4group");
			put("cab", "application/vnd.ms-cab-compressed");
			put("car", "application/vnd.curl.car");
			put("cat", "application/vnd.ms-pki.seccat");
			put("ccxml", "application/ccxml+xml,");
			put("cda", "application/x-cdf");
			put("cdbcmsg", "application/vnd.contact.cmsg");
			put("cdkey", "application/vnd.mediastation.cdkey");
			put("cdmia", "application/cdmi-capability");
			put("cdmic", "application/cdmi-container");
			put("cdmid", "application/cdmi-domain");
			put("cdmio", "application/cdmi-object");
			put("cdmiq", "application/cdmi-queue");
			put("cdx", "chemical/x-cdx");
			put("cdxml", "application/vnd.chemdraw+xml");
			put("cdy", "application/vnd.cinderella");
			put("cer", "application/pkix-cert");
			put("cgm", "image/cgm");
			put("chat", "application/x-chat");
			put("chm", "application/vnd.ms-htmlhelp");
			put("chrt", "application/vnd.kde.kchart");
			put("cif", "chemical/x-cif");
			put("cii", "application/vnd.anser-web-certificate-issue-initiation");
			put("cil", "application/vnd.ms-artgalry");
			put("cla", "application/vnd.claymore");
			put("class", "application/java-vm");
			put("clkk", "application/vnd.crick.clicker.keyboard");
			put("clkp", "application/vnd.crick.clicker.palette");
			put("clkt", "application/vnd.crick.clicker.template");
			put("clkw", "application/vnd.crick.clicker.wordbank");
			put("clkx", "application/vnd.crick.clicker");
			put("clp", "application/x-msclip");
			put("cmc", "application/vnd.cosmocaller");
			put("cmdf", "chemical/x-cmdf");
			put("cml", "chemical/x-cml");
			put("cmp", "application/vnd.yellowriver-custom-menu");
			put("cmx", "image/x-cmx");
			put("cod", "application/vnd.rim.cod");
			put("cpio", "application/x-cpio");
			put("cpt", "application/mac-compactpro");
			put("crd", "application/x-mscardfile");
			put("crl", "application/pkix-crl");
			put("cryptonote", "application/vnd.rig.cryptonote");
			put("csh", "application/x-csh");
			put("csml", "chemical/x-csml");
			put("csp", "application/vnd.commonspace");
			put("css", "text/css");
			put("csv", "text/csv");
			put("cu", "application/cu-seeme");
			put("curl", "text/vnd.curl");
			put("cww", "application/prs.cww");
			put("dae", "model/vnd.collada+xml");
			put("daf", "application/vnd.mobius.daf");
			put("davmount", "application/davmount+xml");
			put("dcurl", "text/vnd.curl.dcurl");
			put("dd2", "application/vnd.oma.dd2+xml");
			put("ddd", "application/vnd.fujixerox.ddd");
			put("deb", "application/x-debian-package");
			put("der", "application/x-x509-ca-cert");
			put("dfac", "application/vnd.dreamfactory");
			put("dir", "application/x-director");
			put("dis", "application/vnd.mobius.dis");
			put("djvu", "image/vnd.djvu");
			put("dmg", "application/x-apple-diskimage");
			put("dna", "application/vnd.dna");
			put("doc", "application/msword");
			put("docm", "application/vnd.ms-word.document.macroenabled.12");
			put("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
			put("dotm", "application/vnd.ms-word.template.macroenabled.12");
			put("dotx", "application/vnd.openxmlformats-officedocument.wordprocessingml.template");
			put("dp", "application/vnd.osgi.dp");
			put("dpg", "application/vnd.dpgraph");
			put("dra", "audio/vnd.dra");
			put("dsc", "text/prs.lines.tag");
			put("dssc", "application/dssc+der");
			put("dtb", "application/x-dtbook+xml");
			put("dtd", "application/xml-dtd");
			put("dts", "audio/vnd.dts");
			put("dtshd", "audio/vnd.dts.hd");
			put("dvi", "application/x-dvi");
			put("dwf", "model/vnd.dwf");
			put("dwg", "image/vnd.dwg");
			put("dxf", "image/vnd.dxf");
			put("dxp", "application/vnd.spotfire.dxp");
			put("ecelp4800", "audio/vnd.nuera.ecelp4800");
			put("ecelp7470", "audio/vnd.nuera.ecelp7470");
			put("ecelp9600", "audio/vnd.nuera.ecelp9600");
			put("edm", "application/vnd.novadigm.edm");
			put("edx", "application/vnd.novadigm.edx");
			put("efif", "application/vnd.picsel");
			put("ei6", "application/vnd.pg.osasli");
			put("eml", "message/rfc822");
			put("emma", "application/emma+xml");
			put("eol", "audio/vnd.digital-winds");
			put("eot", "application/vnd.ms-fontobject");
			put("epub", "application/epub+zip");
			put("es", "application/ecmascript");
			put("es3", "application/vnd.eszigno3+xml");
			put("esf", "application/vnd.epson.esf");
			put("etx", "text/x-setext");
			put("exe", "application/x-msdownload");
			put("exi", "application/exi");
			put("ext", "application/vnd.novadigm.ext");
			put("ez", "application/andrew-inset");
			put("ez2", "application/vnd.ezpix-album");
			put("ez3", "application/vnd.ezpix-package");
			put("f", "text/x-fortran");
			put("f4v", "video/x-f4v");
			put("fbs", "image/vnd.fastbidsheet");
			put("fcs", "application/vnd.isac.fcs");
			put("fdf", "application/vnd.fdf");
			put("fe_launch", "application/vnd.denovo.fcselayout-link");
			put("fg5", "application/vnd.fujitsu.oasysgp");
			put("fh", "image/x-freehand");
			put("fig", "application/x-xfig");
			put("fli", "video/x-fli");
			put("flo", "application/vnd.micrografx.flo");
			put("flv", "video/x-flv");
			put("flw", "application/vnd.kde.kivio");
			put("flx", "text/vnd.fmi.flexstor");
			put("fly", "text/vnd.fly");
			put("fm", "application/vnd.framemaker");
			put("fnc", "application/vnd.frogans.fnc");
			put("fpx", "image/vnd.fpx");
			put("fsc", "application/vnd.fsc.weblaunch");
			put("fst", "image/vnd.fst");
			put("ftc", "application/vnd.fluxtime.clip");
			put("fti", "application/vnd.anser-web-funds-transfer-initiation");
			put("fvt", "video/vnd.fvt");
			put("fxp", "application/vnd.adobe.fxp");
			put("fzs", "application/vnd.fuzzysheet");
			put("g2w", "application/vnd.geoplan");
			put("g3", "image/g3fax");
			put("g3w", "application/vnd.geospace");
			put("gac", "application/vnd.groove-account");
			put("gdl", "model/vnd.gdl");
			put("geo", "application/vnd.dynageo");
			put("gex", "application/vnd.geometry-explorer");
			put("ggb", "application/vnd.geogebra.file");
			put("ggt", "application/vnd.geogebra.tool");
			put("ghf", "application/vnd.groove-help");
			put("gif", "image/gif");
			put("gim", "application/vnd.groove-identity-message");
			put("gmx", "application/vnd.gmx");
			put("gnumeric", "application/x-gnumeric");
			put("gph", "application/vnd.flographit");
			put("gpx", "application/gpx+xml");
			put("gqf", "application/vnd.grafeq");
			put("gram", "application/srgs");
			put("grv", "application/vnd.groove-injector");
			put("grxml", "application/srgs+xml");
			put("gsf", "application/x-font-ghostscript");
			put("gtar", "application/x-gtar");
			put("gtm", "application/vnd.groove-tool-message");
			put("gtw", "model/vnd.gtw");
			put("gv", "text/vnd.graphviz");
			put("gxt", "application/vnd.geonext");
			put("gz", "application/gzip");
			put("h261", "video/h261");
			put("h263", "video/h263");
			put("h264", "video/h264");
			put("hal", "application/vnd.hal+xml");
			put("hbci", "application/vnd.hbci");
			put("hdf", "application/x-hdf");
			put("hlp", "application/winhlp");
			put("hpgl", "application/vnd.hp-hpgl");
			put("hpid", "application/vnd.hp-hpid");
			put("hps", "application/vnd.hp-hps");
			put("hqx", "application/mac-binhex40");
			put("htke", "application/vnd.kenameaapp");
			put("html", "text/html");
			put("hvd", "application/vnd.yamaha.hv-dic");
			put("hvp", "application/vnd.yamaha.hv-voice");
			put("hvs", "application/vnd.yamaha.hv-script");
			put("i2g", "application/vnd.intergeo");
			put("icc", "application/vnd.iccprofile");
			put("ice", "x-conference/x-cooltalk");
			put("ico", "image/x-icon");
			put("ics", "text/calendar");
			put("ief", "image/ief");
			put("ifm", "application/vnd.shana.informed.formdata");
			put("igl", "application/vnd.igloader");
			put("igm", "application/vnd.insors.igm");
			put("igs", "model/iges");
			put("igx", "application/vnd.micrografx.igx");
			put("iif", "application/vnd.shana.informed.interchange");
			put("imp", "application/vnd.accpac.simply.imp");
			put("ims", "application/vnd.ms-ims");
			put("ipfix", "application/ipfix");
			put("ipk", "application/vnd.shana.informed.package");
			put("irm", "application/vnd.ibm.rights-management");
			put("irp", "application/vnd.irepository.package+xml");
			put("itp", "application/vnd.shana.informed.formtemplate");
			put("ivp", "application/vnd.immervision-ivp");
			put("ivu", "application/vnd.immervision-ivu");
			put("jad", "text/vnd.sun.j2me.app-descriptor");
			put("jam", "application/vnd.jam");
			put("jar", "application/java-archive");
			put("java", "text/x-java-source,java");
			put("jisp", "application/vnd.jisp");
			put("jlt", "application/vnd.hp-jlyt");
			put("jnlp", "application/x-java-jnlp-file");
			put("joda", "application/vnd.joost.joda-archive");
			put("jpeg", "image/jpeg");
			put("jpg", "image/jpeg");
			put("jpgv", "video/jpeg");
			put("jpm", "video/jpm");
			put("js", "application/javascript");
			put("json", "application/json");
			put("jsonld", "application/ld+json");
			put("karbon", "application/vnd.kde.karbon");
			put("kfo", "application/vnd.kde.kformula");
			put("kia", "application/vnd.kidspiration");
			put("kml", "application/vnd.google-earth.kml+xml");
			put("kmz", "application/vnd.google-earth.kmz");
			put("kne", "application/vnd.kinar");
			put("kon", "application/vnd.kde.kontour");
			put("kpr", "application/vnd.kde.kpresenter");
			put("ksp", "application/vnd.kde.kspread");
			put("ktx", "image/ktx");
			put("ktz", "application/vnd.kahootz");
			put("kwd", "application/vnd.kde.kword");
			put("lasxml", "application/vnd.las.las+xml");
			put("latex", "application/x-latex");
			put("lbd", "application/vnd.llamagraphics.life-balance.desktop");
			put("lbe", "application/vnd.llamagraphics.life-balance.exchange+xml");
			put("les", "application/vnd.hhe.lesson-player");
			put("link66", "application/vnd.route66.link66+xml");
			put("lrm", "application/vnd.ms-lrm");
			put("ltf", "application/vnd.frogans.ltf");
			put("lvp", "audio/vnd.lucent.voice");
			put("lwp", "application/vnd.lotus-wordpro");
			put("m21", "application/mp21");
			put("m3u", "audio/x-mpegurl");
			put("m3u8", "application/vnd.apple.mpegurl");
			put("m4v", "video/x-m4v");
			put("ma", "application/mathematica");
			put("mads", "application/mads+xml");
			put("mag", "application/vnd.ecowin.chart");
			put("mathml", "application/mathml+xml");
			put("mbk", "application/vnd.mobius.mbk");
			put("mbox", "application/mbox");
			put("mc1", "application/vnd.medcalcdata");
			put("mcd", "application/vnd.mcd");
			put("mcurl", "text/vnd.curl.mcurl");
			put("mdb", "application/x-msaccess");
			put("mdi", "image/vnd.ms-modi");
			put("meta4", "application/metalink4+xml");
			put("mets", "application/mets+xml");
			put("mfm", "application/vnd.mfmp");
			put("mgp", "application/vnd.osgeo.mapguide.package");
			put("mgz", "application/vnd.proteus.magazine");
			put("mid", "audio/midi");
			put("midi", "audio/midi");
			put("mif", "application/vnd.mif");
			put("mj2", "video/mj2");
			put("mjs", "text/javascript");
			put("mlp", "application/vnd.dolby.mlp");
			put("mmd", "application/vnd.chipnuts.karaoke-mmd");
			put("mmf", "application/vnd.smaf");
			put("mmr", "image/vnd.fujixerox.edmics-mmr");
			put("mny", "application/x-msmoney");
			put("mods", "application/mods+xml");
			put("movie", "video/x-sgi-movie");
			put("mp4", "video/mp4");
			put("mp4a", "audio/mp4");
			put("mpc", "application/vnd.mophun.certificate");
			put("mpeg", "video/mpeg");
			put("mpga", "audio/mpeg");
			put("mpkg", "application/vnd.apple.installer+xml");
			put("mpm", "application/vnd.blueice.multipass");
			put("mpn", "application/vnd.mophun.application");
			put("mpp", "application/vnd.ms-project");
			put("mpy", "application/vnd.ibm.minipay");
			put("mqy", "application/vnd.mobius.mqy");
			put("mrc", "application/marc");
			put("mrcx", "application/marcxml+xml");
			put("mscml", "application/mediaservercontrol+xml");
			put("mseq", "application/vnd.mseq");
			put("msf", "application/vnd.epson.msf");
			put("msh", "model/mesh");
			put("msl", "application/vnd.mobius.msl");
			put("msty", "application/vnd.muvee.style");
			put("mts", "model/vnd.mts");
			put("mus", "application/vnd.musician");
			put("musicxml", "application/vnd.recordare.musicxml+xml");
			put("mvb", "application/x-msmediaview");
			put("mwf", "application/vnd.mfer");
			put("mxf", "application/mxf");
			put("mxl", "application/vnd.recordare.musicxml");
			put("mxml", "application/xv+xml");
			put("mxs", "application/vnd.triscape.mxs");
			put("mxu", "video/vnd.mpegurl");
			put("n3", "text/n3");
			put("nbp", "application/vnd.wolfram.player");
			put("nc", "application/x-netcdf");
			put("ncx", "application/x-dtbncx+xml");
			put("n-gage", "application/vnd.nokia.n-gage.symbian.install");
			put("ngdat", "application/vnd.nokia.n-gage.data");
			put("nlu", "application/vnd.neurolanguage.nlu");
			put("nml", "application/vnd.enliven");
			put("nnd", "application/vnd.noblenet-directory");
			put("nns", "application/vnd.noblenet-sealer");
			put("nnw", "application/vnd.noblenet-web");
			put("npx", "image/vnd.net-fpx");
			put("nsf", "application/vnd.lotus-notes");
			put("oa2", "application/vnd.fujitsu.oasys2");
			put("oa3", "application/vnd.fujitsu.oasys3");
			put("oas", "application/vnd.fujitsu.oasys");
			put("obd", "application/x-msbinder");
			put("oda", "application/oda");
			put("odb", "application/vnd.oasis.opendocument.database");
			put("odc", "application/vnd.oasis.opendocument.chart");
			put("odf", "application/vnd.oasis.opendocument.formula");
			put("odft", "application/vnd.oasis.opendocument.formula-template");
			put("odg", "application/vnd.oasis.opendocument.graphics");
			put("odi", "application/vnd.oasis.opendocument.image");
			put("odm", "application/vnd.oasis.opendocument.text-master");
			put("odp", "application/vnd.oasis.opendocument.presentation");
			put("ods", "application/vnd.oasis.opendocument.spreadsheet");
			put("odt", "application/vnd.oasis.opendocument.text");
			put("oga", "audio/ogg");
			put("ogv", "video/ogg");
			put("ogx", "application/ogg");
			put("onetoc", "application/onenote");
			put("opf", "application/oebps-package+xml");
			put("opus", "audio/opus");
			put("org", "application/vnd.lotus-organizer");
			put("osf", "application/vnd.yamaha.openscoreformat");
			put("osfpvg", "application/vnd.yamaha.openscoreformat.osfpvg+xml");
			put("otc", "application/vnd.oasis.opendocument.chart-template");
			put("otf", "application/x-font-otf");
			put("otg", "application/vnd.oasis.opendocument.graphics-template");
			put("oth", "application/vnd.oasis.opendocument.text-web");
			put("oti", "application/vnd.oasis.opendocument.image-template");
			put("otp", "application/vnd.oasis.opendocument.presentation-template");
			put("ots", "application/vnd.oasis.opendocument.spreadsheet-template");
			put("ott", "application/vnd.oasis.opendocument.text-template");
			put("oxt", "application/vnd.openofficeorg.extension");
			put("p", "text/x-pascal");
			put("p10", "application/pkcs10");
			put("p12", "application/x-pkcs12");
			put("p7b", "application/x-pkcs7-certificates");
			put("p7m", "application/pkcs7-mime");
			put("p7r", "application/x-pkcs7-certreqresp");
			put("p7s", "application/pkcs7-signature");
			put("p8", "application/pkcs8");
			put("par", "text/plain-bas");
			put("paw", "application/vnd.pawaafile");
			put("pbd", "application/vnd.powerbuilder6");
			put("pbm", "image/x-portable-bitmap");
			put("pcf", "application/x-font-pcf");
			put("pcl", "application/vnd.hp-pcl");
			put("pclxl", "application/vnd.hp-pclxl");
			put("pcurl", "application/vnd.curl.pcurl");
			put("pcx", "image/x-pcx");
			put("pdb", "application/vnd.palm");
			put("pdf", "application/pdf");
			put("pfa", "application/x-font-type1");
			put("pfr", "application/font-tdpfr");
			put("pgm", "image/x-portable-graymap");
			put("pgn", "application/x-chess-pgn");
			put("pgp", "application/pgp-encrypted");
			put("pic", "image/x-pict");
			put("pjpeg", "image/pjpeg");
			put("pki", "application/pkixcmp");
			put("pkipath", "application/pkix-pkipath");
			put("plb", "application/vnd.3gpp.pic-bw-large");
			put("plc", "application/vnd.mobius.plc");
			put("plf", "application/vnd.pocketlearn");
			put("pls", "application/pls+xml");
			put("pml", "application/vnd.ctc-posml");
			put("png", "image/png");
			put("pnm", "image/x-portable-anymap");
			put("portpkg", "application/vnd.macports.portpkg");
			put("potm", "application/vnd.ms-powerpoint.template.macroenabled.12");
			put("potx", "application/vnd.openxmlformats-officedocument.presentationml.template");
			put("ppam", "application/vnd.ms-powerpoint.addin.macroenabled.12");
			put("ppd", "application/vnd.cups-ppd");
			put("ppm", "image/x-portable-pixmap");
			put("ppsm", "application/vnd.ms-powerpoint.slideshow.macroenabled.12");
			put("ppsx", "application/vnd.openxmlformats-officedocument.presentationml.slideshow");
			put("ppt", "application/vnd.ms-powerpoint");
			put("pptm", "application/vnd.ms-powerpoint.presentation.macroenabled.12");
			put("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
			put("prc", "application/x-mobipocket-ebook");
			put("pre", "application/vnd.lotus-freelance");
			put("prf", "application/pics-rules");
			put("psb", "application/vnd.3gpp.pic-bw-small");
			put("psd", "image/vnd.adobe.photoshop");
			put("psf", "application/x-font-linux-psf");
			put("pskcxml", "application/pskc+xml");
			put("ptid", "application/vnd.pvi.ptid1");
			put("pub", "application/x-mspublisher");
			put("pvb", "application/vnd.3gpp.pic-bw-var");
			put("pwn", "application/vnd.3m.post-it-notes");
			put("pya", "audio/vnd.ms-playready.media.pya");
			put("pyv", "video/vnd.ms-playready.media.pyv");
			put("qam", "application/vnd.epson.quickanime");
			put("qbo", "application/vnd.intu.qbo");
			put("qfx", "application/vnd.intu.qfx");
			put("qps", "application/vnd.publishare-delta-tree");
			put("qt", "video/quicktime");
			put("qxd", "application/vnd.quark.quarkxpress");
			put("ram", "audio/x-pn-realaudio");
			put("rar", "application/x-rar-compressed");
			put("ras", "image/x-cmu-raster");
			put("rcprofile", "application/vnd.ipunplugged.rcprofile");
			put("rdf", "application/rdf+xml");
			put("rdz", "application/vnd.data-vision.rdz");
			put("rep", "application/vnd.businessobjects");
			put("res", "application/x-dtbresource+xml");
			put("rgb", "image/x-rgb");
			put("rif", "application/reginfo+xml");
			put("rip", "audio/vnd.rip");
			put("rl", "application/resource-lists+xml");
			put("rlc", "image/vnd.fujixerox.edmics-rlc");
			put("rld", "application/resource-lists-diff+xml");
			put("rm", "application/vnd.rn-realmedia");
			put("rmp", "audio/x-pn-realaudio-plugin");
			put("rms", "application/vnd.jcp.javame.midlet-rms");
			put("rnc", "application/relax-ng-compact-syntax");
			put("rp9", "application/vnd.cloanto.rp9");
			put("rpss", "application/vnd.nokia.radio-presets");
			put("rpst", "application/vnd.nokia.radio-preset");
			put("rq", "application/sparql-query");
			put("rs", "application/rls-services+xml");
			put("rsd", "application/rsd+xml");
			put("rss, xml", "application/rss+xml");
			put("rtf", "application/rtf");
			put("rtx", "text/richtext");
			put("s", "text/x-asm");
			put("saf", "application/vnd.yamaha.smaf-audio");
			put("sbml", "application/sbml+xml");
			put("sc", "application/vnd.ibm.secure-container");
			put("scd", "application/x-msschedule");
			put("scm", "application/vnd.lotus-screencam");
			put("scq", "application/scvp-cv-request");
			put("scs", "application/scvp-cv-response");
			put("scurl", "text/vnd.curl.scurl");
			put("sda", "application/vnd.stardivision.draw");
			put("sdc", "application/vnd.stardivision.calc");
			put("sdd", "application/vnd.stardivision.impress");
			put("sdkm", "application/vnd.solent.sdkm+xml");
			put("sdp", "application/sdp");
			put("sdw", "application/vnd.stardivision.writer");
			put("see", "application/vnd.seemail");
			put("seed", "application/vnd.fdsn.seed");
			put("sema", "application/vnd.sema");
			put("semd", "application/vnd.semd");
			put("semf", "application/vnd.semf");
			put("ser", "application/java-serialized-object");
			put("setpay", "application/set-payment-initiation");
			put("setreg", "application/set-registration-initiation");
			put("sfd-hdstx", "application/vnd.hydrostatix.sof-data");
			put("sfs", "application/vnd.spotfire.sfs");
			put("sgl", "application/vnd.stardivision.writer-global");
			put("sgml", "text/sgml");
			put("sh", "application/x-sh");
			put("shar", "application/x-shar");
			put("shf", "application/shf+xml");
			put("sis", "application/vnd.symbian.install");
			put("sit", "application/x-stuffit");
			put("sitx", "application/x-stuffitx");
			put("skp", "application/vnd.koan");
			put("sldm", "application/vnd.ms-powerpoint.slide.macroenabled.12");
			put("sldx", "application/vnd.openxmlformats-officedocument.presentationml.slide");
			put("slt", "application/vnd.epson.salt");
			put("sm", "application/vnd.stepmania.stepchart");
			put("smf", "application/vnd.stardivision.math");
			put("smi", "application/smil+xml");
			put("snf", "application/x-font-snf");
			put("spf", "application/vnd.yamaha.smaf-phrase");
			put("spl", "application/x-futuresplash");
			put("spot", "text/vnd.in3d.spot");
			put("spp", "application/scvp-vp-response");
			put("spq", "application/scvp-vp-request");
			put("src", "application/x-wais-source");
			put("sru", "application/sru+xml");
			put("srx", "application/sparql-results+xml");
			put("sse", "application/vnd.kodak-descriptor");
			put("ssf", "application/vnd.epson.ssf");
			put("ssml", "application/ssml+xml");
			put("st", "application/vnd.sailingtracker.track");
			put("stc", "application/vnd.sun.xml.calc.template");
			put("std", "application/vnd.sun.xml.draw.template");
			put("stf", "application/vnd.wt.stf");
			put("sti", "application/vnd.sun.xml.impress.template");
			put("stk", "application/hyperstudio");
			put("stl", "application/vnd.ms-pki.stl");
			put("str", "application/vnd.pg.format");
			put("stw", "application/vnd.sun.xml.writer.template");
			put("sub", "image/vnd.dvb.subtitle");
			put("sus", "application/vnd.sus-calendar");
			put("sv4cpio", "application/x-sv4cpio");
			put("sv4crc", "application/x-sv4crc");
			put("svc", "application/vnd.dvb.service");
			put("svd", "application/vnd.svd");
			put("svg", "image/svg+xml");
			put("swf", "application/x-shockwave-flash");
			put("swi", "application/vnd.aristanetworks.swi");
			put("sxc", "application/vnd.sun.xml.calc");
			put("sxd", "application/vnd.sun.xml.draw");
			put("sxg", "application/vnd.sun.xml.writer.global");
			put("sxi", "application/vnd.sun.xml.impress");
			put("sxm", "application/vnd.sun.xml.math");
			put("sxw", "application/vnd.sun.xml.writer");
			put("t", "text/troff");
			put("tao", "application/vnd.tao.intent-module-archive");
			put("tar", "application/x-tar");
			put("tcap", "application/vnd.3gpp2.tcap");
			put("tcl", "application/x-tcl");
			put("teacher", "application/vnd.smart.teacher");
			put("tei", "application/tei+xml");
			put("tex", "application/x-tex");
			put("texinfo", "application/x-texinfo");
			put("tfi", "application/thraud+xml");
			put("tfm", "application/x-tex-tfm");
			put("thmx", "application/vnd.ms-officetheme");
			put("tiff", "image/tiff");
			put("tmo", "application/vnd.tmobile-livetv");
			put("torrent", "application/x-bittorrent");
			put("tpl", "application/vnd.groove-tool-template");
			put("tpt", "application/vnd.trid.tpt");
			put("tra", "application/vnd.trueapp");
			put("trm", "application/x-msterminal");
			put("ts", "video/mp2t");
			put("tsd", "application/timestamped-data");
			put("tsv", "text/tab-separated-values");
			put("ttf", "application/x-font-ttf");
			put("ttl", "text/turtle");
			put("twd", "application/vnd.simtech-mindmapper");
			put("txd", "application/vnd.genomatix.tuxedo");
			put("txf", "application/vnd.mobius.txf");
			put("txt", "text/plain");
			put("ufd", "application/vnd.ufdl");
			put("umj", "application/vnd.umajin");
			put("unityweb", "application/vnd.unity");
			put("uoml", "application/vnd.uoml+xml");
			put("uri", "text/uri-list");
			put("ustar", "application/x-ustar");
			put("utz", "application/vnd.uiq.theme");
			put("uu", "text/x-uuencode");
			put("uva", "audio/vnd.dece.audio");
			put("uvh", "video/vnd.dece.hd");
			put("uvi", "image/vnd.dece.graphic");
			put("uvm", "video/vnd.dece.mobile");
			put("uvp", "video/vnd.dece.pd");
			put("uvs", "video/vnd.dece.sd");
			put("uvu", "video/vnd.uvvu.mp4");
			put("uvv", "video/vnd.dece.video");
			put("vcd", "application/x-cdlink");
			put("vcf", "text/x-vcard");
			put("vcg", "application/vnd.groove-vcard");
			put("vcs", "text/x-vcalendar");
			put("vcx", "application/vnd.vcx");
			put("vis", "application/vnd.visionary");
			put("viv", "video/vnd.vivo");
			put("vsd", "application/vnd.visio");
			put("vsdx", "application/vnd.visio2013");
			put("vsf", "application/vnd.vsf");
			put("vtu", "model/vnd.vtu");
			put("vxml", "application/voicexml+xml");
			put("wad", "application/x-doom");
			put("wav", "audio/x-wav");
			put("wax", "audio/x-ms-wax");
			put("wbmp", "image/vnd.wap.wbmp");
			put("wbs", "application/vnd.criticaltools.wbs+xml");
			put("wbxml", "application/vnd.wap.wbxml");
			put("weba", "audio/webm");
			put("webm", "video/webm");
			put("webp", "image/webp");
			put("wg", "application/vnd.pmi.widget");
			put("wgt", "application/widget");
			put("wm", "video/x-ms-wm");
			put("wma", "audio/x-ms-wma");
			put("wmd", "application/x-ms-wmd");
			put("wmf", "application/x-msmetafile");
			put("wml", "text/vnd.wap.wml");
			put("wmlc", "application/vnd.wap.wmlc");
			put("wmls", "text/vnd.wap.wmlscript");
			put("wmlsc", "application/vnd.wap.wmlscriptc");
			put("wmv", "video/x-ms-wmv");
			put("wmx", "video/x-ms-wmx");
			put("wmz", "application/x-ms-wmz");
			put("woff", "application/x-font-woff");
			put("wpd", "application/vnd.wordperfect");
			put("wpl", "application/vnd.ms-wpl");
			put("wps", "application/vnd.ms-works");
			put("wqd", "application/vnd.wqd");
			put("wri", "application/x-mswrite");
			put("wrl", "model/vrml");
			put("wsdl", "application/wsdl+xml");
			put("wspolicy", "application/wspolicy+xml");
			put("wtb", "application/vnd.webturbo");
			put("wvx", "video/x-ms-wvx");
			put("x3d", "application/vnd.hzn-3d-crossword");
			put("xap", "application/x-silverlight-app");
			put("xar", "application/vnd.xara");
			put("xbap", "application/x-ms-xbap");
			put("xbd", "application/vnd.fujixerox.docuworks.binder");
			put("xbm", "image/x-xbitmap");
			put("xdf", "application/xcap-diff+xml");
			put("xdm", "application/vnd.syncml.dm+xml");
			put("xdp", "application/vnd.adobe.xdp+xml");
			put("xdssc", "application/dssc+xml");
			put("xdw", "application/vnd.fujixerox.docuworks");
			put("xenc", "application/xenc+xml");
			put("xer", "application/patch-ops-error+xml");
			put("xfdf", "application/vnd.adobe.xfdf");
			put("xfdl", "application/vnd.xfdl");
			put("xhtml", "application/xhtml+xml");
			put("xif", "image/vnd.xiff");
			put("xlam", "application/vnd.ms-excel.addin.macroenabled.12");
			put("xls", "application/vnd.ms-excel");
			put("xlsb", "application/vnd.ms-excel.sheet.binary.macroenabled.12");
			put("xlsm", "application/vnd.ms-excel.sheet.macroenabled.12");
			put("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			put("xltm", "application/vnd.ms-excel.template.macroenabled.12");
			put("xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.template");
			put("xml", "application/xml");
			put("xo", "application/vnd.olpc-sugar");
			put("xop", "application/xop+xml");
			put("xpi", "application/x-xpinstall");
			put("xpm", "image/x-xpixmap");
			put("xpr", "application/vnd.is-xpr");
			put("xps", "application/vnd.ms-xpsdocument");
			put("xpw", "application/vnd.intercon.formnet");
			put("xslt", "application/xslt+xml");
			put("xsm", "application/vnd.syncml+xml");
			put("xspf", "application/xspf+xml");
			put("xul", "application/vnd.mozilla.xul+xml");
			put("xwd", "image/x-xwindowdump");
			put("xyz", "chemical/x-xyz");
			put("yaml", "text/yaml");
			put("yang", "application/yang");
			put("yin", "application/yin+xml");
			put("zaz", "application/vnd.zzazz.deck+xml");
			put("zip", "application/zip");
			put("zir", "application/vnd.zul");
			put("zmm", "application/vnd.handheld-entertainment+xml");
		}
	};
    /**
     * メディアタイプを取得する。
     * @param fileName ファイル名。
     * @return メディアタイプ。
     */
	public static String getMimeTypeByFileName(String fileName){
		File fl=new File(fileName);
		String name = fl.getName();
		String extension = name.substring(name.lastIndexOf(".")+1).toLowerCase();
		String mime=mimeTypes.get(extension);
		if (mime!=null) {
			return mime;
		}else {
			return "unknown";
		}
	}
    /**
     * メディアタイプを取得する。
     * @param absolutePath ファイル絶対パス。
     * @return メディアタイプ。
     */
	public static String getMimeType(String absolutePath){
		File fl=new File(absolutePath);
		if (fl.isDirectory()){
			return "directory";
		}
		String name = fl.getName();
		String extension = name.substring(name.lastIndexOf(".")+1).toLowerCase();
		String mime=mimeTypes.get(extension);
		if (mime!=null) {
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
