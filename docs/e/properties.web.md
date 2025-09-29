# Properties File

The `/WEB-INF/classes/efw.properties` file is used to configure the framework. If all settings are left at their defaults, this file is not required.

| Group | Key | Default Value | Description |
|---|---|---|---|
| Run Mode | `efw.isdebug` | `false` | If `true`, program changes are loaded into memory in real time. |
| Logging | `efw.logging.level` | `WARNING` | EFW log output level: `ALL`, `FINEST`, `FINER`, `FINE`, `CONFIG`, `INFO`, `WARNING`, `SEVERE`, `OFF` |
| Database Resource | `efw.jdbc.resource` | `jdbc/efw` | Default JDBC resource name (defined in `/META-INF/context.xml`). For non-Tomcat servers, define via JNDI (e.g., `java:xxx/yyy/zzz` or `[java:comp/env/]jdbc/efw`). |
| Mail | `efw.mail.resource` | `mail/efw` | Default mail resource name (defined in `/META-INF/context.xml`). For non-Tomcat servers, define via JNDI (e.g., `java:xxx/yyy/zzz` or `[java:comp/env/]mail/efw`). |
| Folder | `efw.event.folder` | `/WEB-INF/efw/event` | Web application event program folder (relative or absolute path). |
|  | `efw.sql.folder` | `/WEB-INF/efw/sql` | Web application external SQL folder (relative or absolute path). |
|  | `efw.mail.folder` | `/WEB-INF/efw/mail` | Web application mail template folder (relative or absolute path). |
|  | `efw.i18n.folder` | `/WEB-INF/efw/i18n` | Multi-language properties folder (relative or absolute path). |
|  | `efw.storage.folder` | `/WEB-INF/efw/storage` | Web application I/O folder (relative or absolute path). |
| Rounder | `efw.format.rounder` | `HALF_EVEN` | Default rounder for format method: `UP`, `DOWN`, `CEILING`, `FLOOR`, `HALF_UP`, `HALF_DOWN`, `HALF_EVEN` |
| Zip | `efw.zip.charset` | `UTF-8` | Charset for archiving and extraction. |
| CORS | `efw.cors` | `*` | Cross-domain communication settings: `*` (allow all), `null` (reject all), or specific permissions (e.g., `http://0.0.0.0:8080,http://9.9.9.9`). |
| Login Check (web event) | `efw.login.check` | `false` | Enable/disable login check. |
|  | `efw.login.key` | `USER_ID` | Session key for login check. |
|  | `efw.login.url` | `login.jsp` | Login page URL (shown if access without login). |
|  | `efw.outoflogin.url.pattern` |  | Regular expression for pages exempt from login check. |
|  | `efw.outoflogin.eventid.pattern` |  | Regular expression for events exempt from login check. |
| Auth Check (web event) | `efw.auth.check` | `false` | Enable/disable authority check. |
|  | `efw.auth.key` | `USER_AUTH` | Session key for authority check. |
|  | `efw.system.error.url` | `error.jsp` | System error page URL. |
|  | `efw.auth.cases` |  | Authority cases (comma-separated) defining authority/page sets. |
|  | `####.auth.pattern` |  | Regular expression for authority in a set. |
|  | `####.url.pattern` |  | Regular expression for page in a set. |
| Forbidden Chars | `efw.forbidden.characters` |  | Characters forbidden in event JS parameters. |
|  | `efw.forbidden.replacement` |  | Replacement characters for forbidden characters (blank for removal). |
| BRMS | `efw.brms.version` | `7` | The version of InnoRules. |
