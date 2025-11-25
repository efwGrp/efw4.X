# 💻 クライアント JavaScript ライブラリ：efw (ESCCO-Framework)

提供されたソースコードは、**efw (ESCCO-Framework)** と呼ばれるフレームワークの**クライアントサイドJavaScriptライブラリ**（`efw.js`および`efw.client.js`）を構成しています。

このフレームワークの主な目的は、**クライアント（ブラウザ）とサーバー間のイベント駆動型の通信**と、それに伴う**UI操作の自動化**を提供することです。

## 🧪 主要な構造と機能

-----

### 1\. `Efw` コンストラクタ（`efw.js`）

  * **基本的な利用法:** `Efw("eventId")` の形式で、特定の**イベント**をサーバーに発行するために使用されます。
  * **多重定義（オーバーロード）:** `Efw` は引数の数と型に応じて複数の引数パターンをサポートしています。
      * `eventId` (必須): 実行したいサーバーイベントのID。
      * `manualParams`: イベントに手動で渡すパラメーター（オブジェクト）。
      * `server`: 通信先のサーバーURL（文字列）。
      * `wsMode`: WebSocketモードを使用するかどうか（ブール値）。
  * **イベントパラメーターの構成:** 渡された引数から `eventParams` オブジェクトを構築します。
    ```javascript
    // 例: eventIdとwsModeだけを渡す
    Efw("myEvent", true); // manualParamsがbooleanと解釈され、wsMode=trueになる
    // 例: eventIdとmanualParamsを渡す
    Efw("myEvent", { key: "value" });
    ```
  * **イベントの実行:** 最終的に `(new EfwClient()).fire(eventParams)` を実行し、`EfwClient` インスタンスを通じてイベント処理を開始します。

### 2\. グローバルインスタンスとプロパティ（`efw.js`）

  * **`efw` インスタンス:** `var efw = new Efw();` として生成される、フレームワークの基本機能にアクセスするためのグローバルインスタンスです。
  * **プロトタイププロパティ:**
      * `efw.baseurl`: ベースURL（デフォルトは `.`）。
      * `efw.lang`: 言語設定（デフォルトは `"en"`）。
      * `efw.dialog`: ダイアログ制御用の `EfwDialog` インスタンス。
      * `efw.messages`: メッセージ制御用の `EfwClientMessages` インスタンス。
      * `efw.isDownloading`: ダウンロード中フラグ。

### 3\. システム初期化（`efw.js`）

  * **DOM Readyでの処理:** `$(function() { ... });` 内で、DOMの準備が完了した後に以下の処理を行います（jQueryを使用）。
      * **入力動作の制御:** `keydown`, 特定の入力要素に対する `focus` や `blur` イベントに、`efwClientInputBehavior` のメソッドをバインドし、入力操作の挙動をカスタマイズしています（例：ショートカットキー、フォーマット処理）。
      * **ローディング表示:** `ajaxStart` で `#efw_loading` を表示し、`ajaxStop` で非表示にする設定を行い、Ajax通信中の**ローディングアニメーション**を提供します。
      * **ダイアログとメッセージの初期化:** `efw.dialog` と `efw.messages` を初期化します。

## 📡 `EfwClient` の通信フロー（`efw.client.js`）

-----

`EfwClient.prototype.fire` メソッドは、サーバーイベントを実行するための主要なロジックを含んでいます。

### 1\. イベント実行の流れ

イベント実行は、基本的に以下の**二段階のAjax通信**（またはWebSocket通信）で構成されます。

| ステップ | メソッド | 目的 |
| :--- | :--- | :--- |
| **クリア** | N/A | エラー表示 (`.efw_input_error`) をクリア。 |
| **URL構築** | N/A | `efwServlet`, `uploadServlet`, `downloadServlet`, `previewServlet`, `efwWebSocket` のURLを構築。 |
| **フェーズ1** | `_callFirstAjax` | サーバーにイベントIDを送り、クライアントが**収集すべきパラメーターのフォーマット** (`paramsFormat`) を取得する。 |
| **パラメーター収集** | `_pickupParams` | サーバーから取得した `paramsFormat` に基づいて、HTML要素（`$(key)`）や `manualParams` からデータを自動収集する。 |
| **ファイルアップロード** | `_callUploadAjax` | ファイル入力 (`<input type="file">`) が含まれる場合、`FormData` を使って**ファイルをアップロード**する。 |
| **フェーズ2** | `_callSecondAjax` / `_callSecondAjaxInWsMode` | 収集した**パラメーター全体**をサーバーに送り、**イベントの実行結果** (`values`, `actions`) を取得する。 |
| **結果反映** | `_showValues` | サーバーから返された `values` に基づいて、**HTML要素の値を自動更新**する。 |
| **アクション実行** | `_showActions` | サーバーから返された `actions` に基づいて、**クライアントサイドの操作**（エラー表示、要素の表示/非表示、ナビゲーション、ダウンロードなど）を実行する。 |

### 2\. パラメーターの収集 (`_pickupParams`)

  * **目的:** `paramsFormat` に定義されたセレクター (`key`) を使って、DOM要素から値を自動的に取得し、`data` オブジェクトに格納します。
  * **データ型の処理:**
      * `format` が `null` や文字列の場合: HTML要素の値 (`.val()`, `.text()`, `src`, `html()`) を取得します。
      * `format` に `secure:true` が含まれる場合: 値を `btoa(encodeURIComponent(vl))` で**エンコード（簡易暗号化）** して送信します。
      * `format` が配列 (`[]`) やオブジェクト (`{}`) の場合: 再帰的に `_pickupParams` を呼び出し、構造化されたデータを取得します（テーブルや複合オブジェクトの取得に対応）。
  * **ファイルアップロードの特殊処理:** `<input type="file">` の場合、ファイル自体は `_pickupParams_uploadformdata` (`FormData`) に追加され、パラメーターとしてはファイル名一覧を `|` 区切りで格納します。

### 3\. アクションの処理 (`_showActions`)

サーバーは `actions` オブジェクトを返すことで、クライアントに特定の動作を指示できます。

  * **エラー処理:** `actions.error` がある場合、`efw.messages` からメッセージを取得し、`efw.dialog.alert` で表示します。
  * **UI操作:** `actions.show`, `actions.hide`, `actions.enable`, `actions.disable`, `actions.highlight` に指定されたセレクターに対応する要素の状態を変更します。
  * **特殊アクション:**
      * `actions.preview`: プレビューダイアログを表示。
      * `actions.progress`: プログレスダイアログを表示。
      * `actions.download`: `window.location = downloadUrl` でダウンロードを開始し、ダウンロード完了を示すクッキー (`efw_Downloaded`) を待ってから次の処理に進みます。
  * **最終動作:** `actions.confirm` または `actions.alert` でダイアログを表示した後、`actions.eval`（JavaScriptコードの実行）や `actions.focus`、`actions.navigate`（画面遷移）を実行します。

## 💡 まとめ

提供されたソースコードは、**「クライアント-サーバー間の双方向通信」と「UIのデータバインディング/操作」を抽象化・自動化**するための、堅牢なクライアントフレームワークとして設計されています。開発者は、冗長なAjaxコールバック処理やDOM操作を記述することなく、`Efw("eventId")` を呼び出すだけで、サーバーイベントの実行、パラメーターの自動収集、結果の自動表示、UIアクションの実行を行うことができます。
