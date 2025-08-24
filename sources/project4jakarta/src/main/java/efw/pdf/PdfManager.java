/**** efw4.X Copyright 2025 efwGrp ****/
package efw.pdf;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map.Entry;

//openpdfのクラスをimportしないように注意。
//PdfManagerがframeworkから呼び出されるから。
import efw.PdfFileIsNotLegalException;
import efw.framework;
import efw.file.FileManager;

/**
 * Pdfファイルを取り扱うクラス。
 */
public final class PdfManager {
	/**
	 * ダミーコンストラクタ
	 */
	public PdfManager(){super();}
	
	/**
	 * PDFオブジェクトを作成する。
	 * @param path テンプレートパス。
	 * @return PDFオブジェクト。
	 * @throws PdfFileIsNotLegalException Pdfファイルが正しくないエラー。
	 */
	public static Pdf open(String path) throws PdfFileIsNotLegalException {
		try {
	        Pdf pdf= new Pdf(FileManager.get(path));
	        framework.setPdf(pdf.getKey(),pdf);
	        return pdf;
		}catch(Exception e) {//ここでは詳細のExceptionをキャッチできない。そうしたらそれらのクラスをインポートする必要。
			throw new PdfFileIsNotLegalException(path,e.getMessage());
		}
	}
	/**
	 * 開いた一つのファイルを閉じる。
	 * @param key Pdfオブジェクトのキー。
	 */
	public static void close(String key) {
		try {
			Pdf pdf=framework.getPdf(key);
			framework.removePdf(key);
			pdf.close();
		}catch(Exception ex) {
			ex.printStackTrace();//エラーをなげない。
		}
	}
	/**
	 * 該当スレッドに、開いたPdfをすべて閉じる。
	 */
	public static void closeAll(){
		if(framework.getPdfs()==null) return;

		HashMap<String,Pdf> map=framework.getPdfs();
		for(Entry<String, Pdf> e : map.entrySet()) { 
			Pdf pdf=e.getValue();
			try{
				pdf.close();//2回閉じても大丈夫。
			}catch(Exception ex){
				ex.printStackTrace();//エラーをなげない。
			}
		}
		framework.removePdfs();
	}
	/**
	 * OpenPDFに利用するフォント名称の配列を取得する
	 * @param fontsFolder フォントファイルを格納する場所。
	 * @return PpenPDFに利用されるFamilyNameの配列
	 * @throws IOException IOエラー。
	 */
	public static String[] getFontNames(File fontsFolder) throws IOException {
	    File lst[]=fontsFolder.listFiles();
	    //openodfのデフォルトフォントを全部配列にいれる。
	    ArrayList<String> defaultFonts=new ArrayList<String>(Arrays.asList("TimesRoman","SansSerif","Dialog","Symbol","ZapfDingbats","DialogInput","Helvetica","Monospaced","Courier","Serif"));
	    ArrayList<String> myFonts=new ArrayList<String>();
	    for(int i=0;i<lst.length;i++) {
	    	if (lst[i].getName().toLowerCase().endsWith(".ttf")) {//||lst[i].getName().toLowerCase().endsWith(".otf")
		    	String name= org.openpdf.pdf.TrueTypeUtil.getFamilyNames(
		    			org.openpdf.text.pdf.BaseFont.createFont(lst[i].getAbsolutePath(),org.openpdf.text.pdf.BaseFont.IDENTITY_H,false)
		    		).toArray(new String[0])[0];
		    	myFonts.add(name);
	    	}else if (lst[i].getName().toLowerCase().endsWith(".ttc")) {
	    		String[] fnts = org.openpdf.text.pdf.BaseFont.enumerateTTCNames(lst[i].getAbsolutePath());
		    	for (int j=0;j<fnts.length;j++) {
			    	String name= org.openpdf.pdf.TrueTypeUtil.getFamilyNames(
			    			org.openpdf.text.pdf.BaseFont.createFont(lst[i].getAbsolutePath()+","+j,org.openpdf.text.pdf.BaseFont.IDENTITY_H,false)
			    		).toArray(new String[0])[0];
			    	myFonts.add(name);
		    	}
	    	}
	    }
	    myFonts.addAll(defaultFonts);
	    return myFonts.toArray(new String[0]);
	}
	/**
	 * WEB画面をpdfに変換する機能。
	 * @param html WEB画面。
	 * @param baseUrl ベースURL。
	 * @param pdfPath 変換先のPDFパス。
	 * @param fontsFolder 必要なフォントの保存場所。
	 * @throws IOException IOエラー。
	 */
	public static void html2pdf(String html,String baseUrl,String pdfPath,File fontsFolder) throws IOException {
		
		try (FileOutputStream outputStream = new FileOutputStream(FileManager.get(pdfPath))) {
			org.openpdf.pdf.ITextRenderer renderer = new org.openpdf.pdf.ITextRenderer();
		    File lst[]=fontsFolder.listFiles();
		    for(int i=0;i<lst.length;i++) {
		    	try {
				    renderer.getFontResolver().addFont(lst[i].getAbsolutePath(),org.openpdf.text.pdf.BaseFont.IDENTITY_H,false);
		    	}catch(Exception e) {
		    		//もしフォントフォルダに不要ファイルがある場合に備える
		    	}
		    }
		    
	        renderer.setDocumentFromString(html,baseUrl);
		    renderer.layout();
		    renderer.createPDF(outputStream);
		}
	}
}
