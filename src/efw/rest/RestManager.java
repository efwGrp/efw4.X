package efw.rest;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import efw.framework;

/**
 * Rest Serviceにアクセスクラス。
 * @author lndljack
 */
public final class RestManager {

    /**
     * Restサービスにアクセス。
     * @param strUrl アクセスURL
     * @param strMethod アクセス方法(POST/PUT/DELETE/GET)
     * @param params パラメータ
     * @param heads ヘッダ情報
     * @return Rest Serviceにアクセスの戻り値
     * @throws Exception
     */
    public static String visit(String strUrl, String strMethod, String params, Map<String, String> heads) throws Exception {
        HttpURLConnection httpConnection = null;
        BufferedReader responseBuffer = null;
        OutputStream outputStream = null;

        try {
            URL restServiceURL = new URL(strUrl);

            // Restサービスを接続する
            httpConnection = (HttpURLConnection) restServiceURL.openConnection();

            // アクセスタイプを設定する
            httpConnection.setRequestMethod(strMethod.toUpperCase());
            if ("POST".equalsIgnoreCase(strMethod) || "PUT".equalsIgnoreCase(strMethod)) {
	            // エンコード形式
	            httpConnection.setRequestProperty("Content-Type", framework.CONTENT_TYPE);
            }
            
            if (heads!=null) {
            	for (Map.Entry<String, String> entry : heads.entrySet()) {
                	httpConnection.setRequestProperty(entry.getKey(),entry.getValue());            	
            	}
            }

            if ("POST".equalsIgnoreCase(strMethod) || "PUT".equalsIgnoreCase(strMethod)) {
                httpConnection.setDoOutput(true);
                // パラメータを設定する
                outputStream = httpConnection.getOutputStream();
                outputStream.write(params.getBytes(framework.SYSTEM_CHAR_SET));
                outputStream.flush();
            }

            // Restサービスをアクセスする戻りコードを取得する
            int status = httpConnection.getResponseCode();
            // アクセスする戻りコードを設定する
            framework.setRestStatus(status);

            // レスポンス内容
            responseBuffer = new BufferedReader(new InputStreamReader(httpConnection.getInputStream(),framework.SYSTEM_CHAR_SET));
            String strLine;
            StringBuffer reserveVal = new StringBuffer();
            while ((strLine = responseBuffer.readLine()) != null) {
                if (strLine != null && !strLine.isEmpty()) {
                    reserveVal.append(strLine);
                }
            }
            return reserveVal.toString();
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
            if (responseBuffer != null) {
                responseBuffer.close();
            }
            if (httpConnection != null) {
                httpConnection.disconnect();
            }
        }
    }
    /**
     * RestのResponseコードを戻す
     * @return
     */
    public static Integer getStatus() {
    	return framework.getRestStatus();
    }
}
