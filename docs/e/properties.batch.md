# Properties File

The `/WEB-INF/classes/batch.properties` file is used to configure the framework for batch jobs.

| Group | Key | Default Value | Description |
|---|---|---|---|
| Script Engine | `efw.script.engine` | `nashorn` | `nashorn` or `graaljs` can be set. |
| Logging | `efw.logging.level` | `WARNING` | EFW log output level: `ALL`, `FINEST`, `FINER`, `FINE`, `CONFIG`, `INFO`, `WARNING`, `SEVERE`, `OFF` |
| Folder | `efw.event.folder` | `/WEB-INF/efw/event` | Web application event program folder (relative or absolute path). |
|  | `efw.sql.folder` | `/WEB-INF/efw/sql` | Web application external SQL folder (relative or absolute path). |
|  | `efw.storage.folder` | `/WEB-INF/efw/storage` | Web application I/O folder (relative or absolute path). |
| Rounder | `efw.format.rounder` | `HALF_EVEN` | Default rounder for format method: `UP`, `DOWN`, `CEILING`, `FLOOR`, `HALF_UP`, `HALF_DOWN`, `HALF_EVEN` |
| Database Resource | `efw.jdbc.resource[.n]` |  | Default JDBC resource name (multiple definitions allowed with `[.n]`). Example: `jdbc/efw` |
|  | `efw.jdbc.resource.url[.n]` |  | JDBC URL. Example: `jdbc:postgresql://127.0.0.1:5432/efwSample` |
|  | `efw.jdbc.resource.username[.n]` |  |  |
|  | `efw.jdbc.resource.password[.n]` |  |  |
| Mail Resource | `efw.mail.username` |  |  |
|  | `efw.mail.password` |  |  |
|  | `mail.user` |  | JavaMail properties (see below). |
|  | `mail.from` |  |  |
|  | `mail.transport.protocol` |  |  |
|  | `mail.smtp.host` |  |  |
|  | `mail.smtp.auth` |  |  |
|  | `mail.smtp.port` |  |  |
|  | *JavaMail Properties Links* |  | [smtp api](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html)<br>[pop3 api](https://javaee.github.io/javamail/docs/api/com/sun/mail/pop3/package-summary.html)<br>[imap api](https://javaee.github.io/javamail/docs/api/com/sun/mail/imap/package-summary.html) |
| BRMS | `efw.brms.import` | `false` | Import InnoRules? |
|  | `efw.brms.version` | `7` | The version of InnoRules. |
|  | `innorules.home` | `""` | InnoRules home folder. |
|  | `innorules.system` | `""` | InnoRules system ID. |
|  | `innorules.rule-application-config` | `""` | InnoRules application ID. |