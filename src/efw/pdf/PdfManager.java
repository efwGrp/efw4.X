/**** efw4.X Copyright 2025 efwGrp ****/
package efw.pdf;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map.Entry;

import org.openpdf.pdf.ITextRenderer;

import com.lowagie.text.pdf.BaseFont;

import efw.PdfFileIsNotLegalException;
import efw.framework;
import efw.file.FileManager;

/**
 * Pdfファイルを取り扱うクラス。
 */
public class PdfManager {
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
	
	public static void Test() throws IOException {
		String html = "<html><head><style>body { font-family:IPAexGothic,sans-serif; }h1 { color: navy; }</style>"
		      +"</head><body><h1 style=\"position:absolute;top:100px;left:400px;\">あいうえお森盛</h1><p>あいうえお森盛。</p>"
		      +"<table border=\"1\"><tr><td>a</td><td>B</td><td style=\"color:red\">B</td></tr></table><input type=\"text\" name=\"text-input\" value=\"123\" /></body></html>";
		
		try (FileOutputStream outputStream = new FileOutputStream("C:\\EFW_ALL\\apache-tomcat-7.0.109\\webapps\\helloworld\\WEB-INF\\lib\\openpdf-html-hello.pdf")) {
		    ITextRenderer renderer = new ITextRenderer();
		    renderer.getFontResolver().addFont("C:\\EFW_ALL\\apache-tomcat-7.0.109\\webapps\\helloworld\\WEB-INF\\efw\\pdfbox\\ipaexg00401.ttf",
		    		BaseFont.IDENTITY_H,false);
		    renderer.setDocumentFromString(html);
		    renderer.layout();
		    renderer.createPDF(outputStream);
		}
		System.out.println("PDF created: flying-saucer-hello.pdf");
	}
	
}
