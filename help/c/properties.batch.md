# 属性文件

`/WEB-INF/classes/batch.properties` 文件用于配置批处理作业的框架。

| 组 | 键 | 默认值 | 描述 |
|---|---|---|---|
| 日志记录 | `efw.logging.level` | `WARNING` | EFW 日志输出级别：`ALL`、`FINEST`、`FINER`、`FINE`、`CONFIG`、`INFO`、`WARNING`、`SEVERE`、`OFF` |
| 文件夹 | `efw.event.folder` | `/WEB-INF/efw/event` | Web 应用程序事件程序文件夹（相对或绝对路径）。 |
|  | `efw.sql.folder` | `/WEB-INF/efw/sql` | Web 应用程序外部 SQL 文件夹（相对或绝对路径）。 |
|  | `efw.storage.folder` | `/WEB-INF/efw/storage` | Web 应用程序 I/O 文件夹（相对或绝对路径）。 |
| 舍入器 | `efw.format.rounder` | `HALF_EVEN` | 格式化方法的默认舍入器：`UP`、`DOWN`、`CEILING`、`FLOOR`、`HALF_UP`、`HALF_DOWN`、`HALF_EVEN` |
| 数据库资源 | `efw.jdbc.resource[.n]` |  | 默认 JDBC 资源名称（允许使用 `[.n]` 进行多个定义）。示例：`jdbc/efw` |
|  | `efw.jdbc.resource.url[.n]` |  | JDBC URL。示例：`jdbc:postgresql://127.0.0.1:5432/efwSample` |
|  | `efw.jdbc.resource.username[.n]` |  |  |
|  | `efw.jdbc.resource.password[.n]` |  |  |
| 邮件资源 | `efw.mail.username` |  |  |
|  | `efw.mail.password` |  |  |
|  | `mail.user` |  | JavaMail 属性（见下文）。 |
|  | `mail.from` |  |  |
|  | `mail.transport.protocol` |  |  |
|  | `mail.smtp.host` |  |  |
|  | `mail.smtp.auth` |  |  |
|  | `mail.smtp.port` |  |  |
|  | *JavaMail 属性链接* |  | [smtp api](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html)<br>[pop3 api](https://javaee.github.io/javamail/docs/api/com/sun/mail/pop3/package-summary.html)<br>[imap api](https://javaee.github.io/javamail/docs/api/com/sun/mail/imap/package-summary.html) |
| BRMS | `efw.brms.import` | `false` | 导入 InnoRules？ |
|  | `innorules.home` | `""` | InnoRules 主文件夹。 |
|  | `innorules.system` | `""` | InnoRules 系统 ID。 |
|  | `innorules.rule-application-config` | `""` | InnoRules 应用程序 ID。 |