提供された `downloadServlet.java` は、Efwフレームワークにおける**サーバー上のファイルをクライアントにダウンロードさせる**専用のサーブレットです。

このサーブレットは、単一ファイルのダウンロードだけでなく、複数のファイルをまとめてZIP圧縮し、パスワード保護まで行う多機能なダウンロード処理を提供します。処理の連携は `previewServlet` と同様に、サーバーサイドJavaScript (`efw.server.js`) とセッションを介して行われます。

-----

## 📦 `downloadServlet.java` の分析：ファイルダウンロード処理

### 1\. 役割とメカニズム

  * **役割**: クライアントのイベント処理で指定されたファイルパスとダウンロードオプション（ZIP化、保存名、削除フラグなど）をセッションから取得し、HTTPレスポンスヘッダーを適切に設定してファイルをクライアントに送信します。
  * **セッション連携**: `previewServlet` と同様に、ダウンロード対象の情報はURLパラメーターではなく、セッション属性（`EFW_DOWNLOAD_FILE` や `EFW_DOWNLOAD_ZIP` など）を介して渡されます。
  * **通知**: ダウンロード開始時に `efw_Downloaded=OK` というCookieを設定することで、クライアント側JavaScript (`efw.client.js` で使用されることが多い) は、非同期通信ではないダウンロード処理の完了を認識できます。

### 2\. 処理フロー (`doGet`)

#### A. ダウンロードオプションの取得とセッションクリア

1.  **セッションから取得**: ダウンロードに必要なすべてのオプション（ファイルパス、ZIPリスト、保存名、パスワード、ダウンロード後削除フラグなど）をセッションから取得します。
2.  **即時削除**: 取得後、セキュリティを確保するため、すべての関連セッション属性を直ちに削除します。

#### B. ZIP圧縮処理 (条件付き)

```java
if(attr_zip!=null&&!"".equals(attr_zip)){
    // ... 一時ZIPファイルを作成
    // ... FileManager.zip() を呼び出してZIPファイルを生成
    // ... attr_file を一時ZIPファイル名に設定
}
```

  * `EFW_DOWNLOAD_ZIP` 属性にファイルリストが含まれている場合、ダウンロード前にZIP圧縮を行います。
  * **一時ファイル作成**: `File.createTempFile("efw", "zip", ...)` を使って一時的なZIPファイルを生成します。
  * **圧縮実行**: `FileManager.zip` を呼び出し、ファイルリスト (`tmp_files`)、ベースパス (`attr_zipBasePath`)、および**パスワード** (`attr_password`) を使用して圧縮を実行します。

#### C. レスポンスヘッダーの設定

1.  **デフォルトファイル名設定**:
      * ZIPファイルの場合はデフォルトで `"attachment.zip"`。
      * 単一ファイルの場合は、ファイルパスからファイル名を取得し、ダウンロードファイル名（`attr_saveas`）を設定します。
2.  **MIMEタイプ**: **`response.setContentType("application/octet-stream")`** を設定します。これは、ファイルタイプに関わらずブラウザに**ダウンロードダイアログ**を開かせる最も一般的なMIMEタイプです（`previewServlet` の `text/html` と対照的）。
3.  **Content-Disposition**:
      * `Content-Disposition: attachment; filename="..."` ヘッダーを設定します。
      * ファイル名（`attr_saveas`）は、日本語などのマルチバイト文字に対応するため **`java.net.URLEncoder.encode`** でエンコードされます。
4.  **Cookie設定**: `efw_Downloaded=OK` というCookieを追加します。

#### D. ファイルの読み込みと送信

  * `FileInputStream` を使用して、ダウンロード対象ファイル（単一ファイルまたは生成された一時ZIPファイル）の内容を読み込みます。
  * `response.getOutputStream()` を介して、バイナリデータをクライアントにストリームで送信します。

#### E. ダウンロード後のクリーンアップ

ダウンロードが完了した後、オプションに応じてリソースを削除します。

  * **一時ZIPファイルの削除 (finallyブロック)**: 処理の成否に関わらず、生成された一時ZIPファイル (`tmp_zip`) は必ず削除されます。
  * **ソースファイルの削除 (deleteafterdownload)**:
      * セッションから取得した `attr_deleteafterdownload="true"` の場合、ダウンロードが完了した**ソースファイル自体**（ZIP前の元ファイルや単一ファイル）を `FileManager.remove` で削除します。

### 3\. `previewServlet` と `downloadServlet` の比較

| 項目 | previewServlet.java | downloadServlet.java |
| :--- | :--- | :--- |
| **URL** | `/previewServlet` | `/downloadServlet` |
| **目的** | ブラウザ内でのファイル内容の**インライン表示**。 | ファイルをクライアントのローカルへ**保存**させる。 |
| **MIMEタイプ** | ファイル固有のMIMEタイプを設定。 | `application/octet-stream` を設定（強制ダウンロード）。 |
| **セキュリティ** | ファイルサイズ制限（10MB）。 | パスワード付きZIP圧縮オプションを提供。 |
| **リソース管理**| 一時ファイル削除機能は特になし。 | **ダウンロード後のソースファイル削除** (`deleteafterdownload`) 機能と、一時ZIPファイルの確実な削除。 |

両サーブレットは、`efw.server.js` からセッションを介してファイルパスを受け取る共通のメカニズムを採用していますが、レスポンスヘッダーの設定とリソース管理のロジックが、それぞれの目的に応じて完全に異なっています。