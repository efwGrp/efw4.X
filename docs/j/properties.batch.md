# プロパティファイル

`/WEB-INF/classes/batch.properties`ファイルは、バッチジョブのフレームワークを設定するために使用されます。

| グループ | キー | デフォルト値 | 説明 |
|---|---|---|---|
| スクリプトエンジン | `efw.script.engine` | `nashorn` | `nashorn` または `graaljs` を設定できます。 |
| ロギング | `efw.logging.level` | `WARNING` | EFWログ出力レベル：`ALL`、`FINEST`、`FINER`、`FINE`、`CONFIG`、`INFO`、`WARNING`、`SEVERE`、`OFF` |
| フォルダ | `efw.event.folder` | `/WEB-INF/efw/event` | Webアプリケーションイベントプログラムフォルダ（相対パスまたは絶対パス）。 |
|  | `efw.sql.folder` | `/WEB-INF/efw/sql` | Webアプリケーション外部SQLフォルダ（相対パスまたは絶対パス）。 |
|  | `efw.storage.folder` | `/WEB-INF/efw/storage` | WebアプリケーションI/Oフォルダ（相対パスまたは絶対パス）。 |
| 丸め方 | `efw.format.rounder` | `HALF_EVEN` | formatメソッドのデフォルトの丸め方：`UP`、`DOWN`、`CEILING`、`FLOOR`、`HALF_UP`、`HALF_DOWN`、`HALF_EVEN` |
| データベースリソース | `efw.jdbc.resource[.n]` |  | デフォルトのJDBCリソース名（`[.n]`で複数の定義が可能）。例：`jdbc/efw` |
|  | `efw.jdbc.resource.url[.n]` |  | JDBC URL。例：`jdbc:postgresql://127.0.0.1:5432/efwSample` |
|  | `efw.jdbc.resource.username[.n]` |  |  |
|  | `efw.jdbc.resource.password[.n]` |  |  |
| メールリソース | `efw.mail.username` |  |  |
|  | `efw.mail.password` |  |  |
|  | `mail.user` |  | JavaMailプロパティ（下記参照）。 |
|  | `mail.from` |  |  |
|  | `mail.transport.protocol` |  |  |
|  | `mail.smtp.host` |  |  |
|  | `mail.smtp.auth` |  |  |
|  | `mail.smtp.port` |  |  |
|  | *JavaMailプロパティリンク* |  | [smtp api](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html)<br>[pop3 api](https://javaee.github.io/javamail/docs/api/com/sun/mail/pop3/package-summary.html)<br>[imap api](https://javaee.github.io/javamail/docs/api/com/sun/mail/imap/package-summary.html) |
| BRMS | `efw.brms.import` | `false` | InnoRulesをインポートしますか？ |
|  | `efw.brms.version` | `7` | InnoRulesのバージョン。 |
|  | `innorules.home` | `""` | InnoRulesホームフォルダ。 |
|  | `innorules.system` | `""` | InnoRulesシステムID。 |
|  | `innorules.rule-application-config` | `""` | InnoRulesアプリケーションID。 |