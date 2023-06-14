/**** efw4.X Copyright 2019 efwGrp ****/
package efw.event;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import efw.framework;

/**
 * リモートイベント実行を管理するクラス。
 * @author Chang Kejun
 *
 */
public final class RemoteEventManager {
	
	/**
	 * リモートイベント実行管理を初期化する。
	 * @throws NoSuchAlgorithmException 
	 * @throws KeyManagementException 
	 */
	public static void init() throws NoSuchAlgorithmException, KeyManagementException{
        // Create a trust manager that does not validate certificate chains
        TrustManager[] trustAllCerts = new TrustManager[] {
        	new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {return null;}
                public void checkClientTrusted(X509Certificate[] certs, String authType) throws CertificateException {}
                public void checkServerTrusted(X509Certificate[] certs, String authType) throws CertificateException {}
            }
        };
        // Install the all-trusting trust manager
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, trustAllCerts, new java.security.SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        // Create all-trusting host name verifier
        HostnameVerifier allHostsValid = new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };
        // Install the all-trusting host verifier
        HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
	}
	
	/**
	 * 指定URLにPost送信を行う。
	 * 
	 * @param url
	 *            送信先url、http://127.0.0.1:8080/efw、https可。
	 * @param efwEventJSON
	 *            {eventId:eventId,params:params}のように。
	 * @return リモートサーバからイベントの実行結果のJSON文字列を戻す
	 */
	public static String call(String url, String efwEventJSON) {
		OutputStreamWriter out = null;
		BufferedReader in = null;
		String result = "";
		try {
			URL realUrl = new URL(url);
			HttpURLConnection conn = (HttpURLConnection)realUrl.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", framework.CONTENT_TYPE);
			conn.setDoOutput(true);
			conn.setDoInput(true);
			out = new OutputStreamWriter(conn.getOutputStream(),framework.SYSTEM_CHAR_SET);
			out.write(efwEventJSON);
			out.flush();

			in = new BufferedReader(new InputStreamReader(conn.getInputStream(),framework.SYSTEM_CHAR_SET));
			String line;
			while ((line = in.readLine()) != null) {
				result += "\n" + line;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				if (out != null) out.close();
				if (in != null) in.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}
}
