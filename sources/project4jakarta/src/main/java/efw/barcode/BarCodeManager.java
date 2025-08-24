/**** efw4.X Copyright 2025 efwGrp ****/
package efw.barcode;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.OutputStream;

import javax.imageio.ImageIO;

import org.krysalis.barcode4j.impl.AbstractBarcodeBean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.QRCodeWriter;

import efw.framework;
/**
 * バーコード作成と識別のクラス。
 * @author Chang Kejun
 *
 */
public final class BarCodeManager {
	/**
	 * ダミーコンストラクタ
	 */
	public BarCodeManager(){super();}
	/**
	 * バーコード作成関数。
	 * @param type バーコードのタイプ。詳細はプログラムから読んでください。
	 * @param msg バーコードに含む内容。種類によって桁数と文字種類が制限がある。詳細はWEBで調べてください。
	 * @param out 作成されたバーコードの出力箇所。
	 * @throws Exception バーコード作成エラー。
	 */
	protected static void encode(String type,String msg,OutputStream out) throws Exception{
		AbstractBarcodeBean bean=null;
		if("qrcode".equals(type)){
			QRCodeWriter writer = new QRCodeWriter();
			BitMatrix bitMatrix = writer.encode(msg, BarcodeFormat.QR_CODE, 1024, 1024);
		    MatrixToImageWriter.writeToStream(bitMatrix, "png", out);
		}else{
			if ("codabar".equals(type)){
				bean=new org.krysalis.barcode4j.impl.codabar.CodabarBean();
			}else if("code39".equals(type)){
				bean=new org.krysalis.barcode4j.impl.code39.Code39Bean();
			}else if("code128".equals(type)){
				bean=new org.krysalis.barcode4j.impl.code128.Code128Bean();
			}else if("ean128".equals(type)){
				bean=new org.krysalis.barcode4j.impl.code128.EAN128Bean();
			}else if("2of5".equals(type)){//interleaved2of5
				bean=new org.krysalis.barcode4j.impl.int2of5.Interleaved2Of5Bean();
			}else if("itf14".equals(type)){
				bean=new org.krysalis.barcode4j.impl.int2of5.ITF14Bean();
			}else if("ean13".equals(type)){
				bean=new org.krysalis.barcode4j.impl.upcean.EAN13Bean();
			}else if("ean8".equals(type)){
				bean=new org.krysalis.barcode4j.impl.upcean.EAN8Bean();
			}else if("upca".equals(type)){
				bean=new org.krysalis.barcode4j.impl.upcean.UPCABean();
			}else if("upce".equals(type)){
				bean=new org.krysalis.barcode4j.impl.upcean.UPCEBean();
			}else if("postnet".equals(type)){
				bean=new org.krysalis.barcode4j.impl.postnet.POSTNETBean();
			}else if("rmcbc".equals(type)){//royal-mail-cbc
				bean=new org.krysalis.barcode4j.impl.fourstate.RoyalMailCBCBean();
			}else if("usps4cb".equals(type)){
				bean=new org.krysalis.barcode4j.impl.fourstate.USPSIntelligentMailBean();
			}else if("pdf417".equals(type)){
				bean=new org.krysalis.barcode4j.impl.pdf417.PDF417Bean();
			}else if("datamatrix".equals(type)){
				bean=new org.krysalis.barcode4j.impl.datamatrix.DataMatrixBean();
			}else{
				throw new Exception();
			}
			BitmapCanvasProvider canvas = 
					new BitmapCanvasProvider(out, "image/x-png", 600, BufferedImage.TYPE_BYTE_BINARY, false, 0);
			bean.generateBarcode(canvas, msg);
		    canvas.finish();
		}
	}
	
	/**
	 * 画像から文字を取得する
	 * @param imagePath 相対パス。
	 * @return 識別した文字列。識別できない場合、null。
	 */
	public static String decode(String imagePath){
		try{
			File file=new File(framework.getStorageFolder()+"/"+imagePath);
	        String value=(new MultiFormatReader())
	        		.decode(
	        			new BinaryBitmap(
	        				new HybridBinarizer(
	        					new BufferedImageLuminanceSource(
        							getScaledImage(
        								ImageIO.read(file)
        							)
	        					)
	        				)
	        			)
	        		)
	        		.getText();
	        return value;
		}catch(Exception ex){
			return null;//エラーを投げない。
		}
	}
	/**
	 * 画像を滑らかに小さくする。モニターからのQRコードの場合必要。
	 * @param sourceBufferedImage
	 * @return
	 */
	private static BufferedImage getScaledImage(BufferedImage sourceBufferedImage){
        // スケールは以下から選択
        // Image.SCALE_AREA_AVERAGING 遅いがなめらか
        // Image.SCALE_DEFAULT 普通 速度はFASTと変わらない
        // Image.SCALE_FAST 早くて汚い
        // Image.SCALE_REPLICATE わからん そこそこ汚い
        // Image.SCALE_SMOOTH 遅くてなめらか
        Image targetImage = sourceBufferedImage.getScaledInstance(sourceBufferedImage.getWidth()/8, -1, Image.SCALE_SMOOTH);
        // Image -> BufferedImageの変換
        BufferedImage targetBufferedImage = new BufferedImage(targetImage.getWidth(null), targetImage.getHeight(null),
                BufferedImage.TYPE_INT_RGB);
        Graphics2D g = targetBufferedImage.createGraphics();
        g.drawImage(targetImage, 0, 0, null);
        return targetBufferedImage;
	}

}
