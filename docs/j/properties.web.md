# プロパティファイル

`/WEB-INF/classes/efw.properties`ファイルは、フレームワークを設定するために使用されます。すべての設定をデフォルトのままにする場合、このファイルは不要です。

| グループ | キー | デフォルト値 | 説明 |
|---|---|---|---|
| 実行モード | `efw.isdebug` | `false` | `true`の場合、プログラムの変更はリアルタイムでメモリにロードされます。 |
| ロギング | `efw.logging.level` | `WARNING` | EFWログ出力レベル：`ALL`、`FINEST`、`FINER`、`FINE`、`CONFIG`、`INFO`、`WARNING`、`SEVERE`、`OFF` |
| データベースリソース | `efw.jdbc.resource` | `jdbc/efw` | デフォルトのJDBCリソース名（`/META-INF/context.xml`で定義）。Tomcat以外のサーバーでは、JNDI（例：`java:xxx/yyy/zzz`または`[java:comp/env/]jdbc/efw`）を介して定義します。 |
| メール | `efw.mail.resource` | `mail/efw` | デフォルトのメールリソース名（`/META-INF/context.xml`で定義）。Tomcat以外のサーバーでは、JNDI（例：`java:xxx/yyy/zzz`または`[java:comp/env/]mail/efw`）を介して定義します。 |
| フォルダ | `efw.event.folder` | `/WEB-INF/efw/event` | Webアプリケーションイベントプログラムフォルダ（相対パスまたは絶対パス）。 |
|  | `efw.sql.folder` | `/WEB-INF/efw/sql` | Webアプリケーション外部SQLフォルダ（相対パスまたは絶対パス）。 |
|  | `efw.mail.folder` | `/WEB-INF/efw/mail` | Webアプリケーションメールテンプレートフォルダ（相対パスまたは絶対パス）。 |
|  | `efw.i18n.folder` | `/WEB-INF/efw/i18n` | 多言語プロパティフォルダ（相対パスまたは絶対パス）。 |
|  | `efw.storage.folder` | `/WEB-INF/efw/storage` | WebアプリケーションI/Oフォルダ（相対パスまたは絶対パス）。 |
| 丸め方 | `efw.format.rounder` | `HALF_EVEN` | formatメソッドのデフォルトの丸め方：`UP`、`DOWN`、`CEILING`、`FLOOR`、`HALF_UP`、`HALF_DOWN`、`HALF_EVEN` |
| Zip | `efw.zip.charset` | `UTF-8` | アーカイブと抽出の文字セット。 |
| CORS | `efw.cors` | `*` | クロスドメイン通信設定：`*`（すべて許可）、`null`（すべて拒否）、または特定の許可（例：`http://0.0.0.0:8080,http://9.9.9.9`）。 |
| ログインチェック（Webイベント） | `efw.login.check` | `false` | ログインチェックの有効/無効。 |
|  | `efw.login.key` | `USER_ID` | ログインチェックのセッションキー。 |
|  | `efw.login.url` | `login.jsp` | ログインページURL（未ログインでアクセスした場合に表示）。 |
|  | `efw.outoflogin.url.pattern` |  | ログインチェックから除外されるページの正規表現。 |
|  | `efw.outoflogin.eventid.pattern` |  | ログインチェックから除外されるイベントの正規表現。 |
| 認証チェック（Webイベント） | `efw.auth.check` | `false` | 認証チェックの有効/無効。 |
|  | `efw.auth.key` | `USER_AUTH` | 認証チェックのセッションキー。 |
|  | `efw.system.error.url` | `error.jsp` | システムエラーページURL。 |
|  | `efw.auth.cases` |  | 認証/ページセットを定義する認証ケース（カンマ区切り）。 |
|  | `####.auth.pattern` |  | セット内の認証の正規表現。 |
|  | `####.url.pattern` |  | セット内のページの正規表現。 |
| 禁止文字 | `efw.forbidden.characters` |  | イベントJSパラメータで禁止されている文字。 |
|  | `efw.forbidden.replacement` |  | 禁止文字の置換文字（削除する場合は空白）。 |
| BRMS | `efw.brms.version` | `7` | InnoRulesのバージョン。 |
