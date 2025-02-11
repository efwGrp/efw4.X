# 属性文件

`/WEB-INF/classes/efw.properties` 文件用于配置框架。如果所有设置都保留其默认值，则不需要此文件。

| 组 | 键 | 默认值 | 描述 |
|---|---|---|---|
| 运行模式 | `efw.isdebug` | `false` | 如果为 `true`，则程序更改会实时加载到内存中。 |
| 日志记录 | `efw.logging.level` | `WARNING` | EFW 日志输出级别：`ALL`、`FINEST`、`FINER`、`FINE`、`CONFIG`、`INFO`、`WARNING`、`SEVERE`、`OFF` |
| 数据库资源 | `efw.jdbc.resource` | `jdbc/efw` | 默认 JDBC 资源名称（在 `/META-INF/context.xml` 中定义）。对于非 Tomcat 服务器，通过 JNDI 定义（例如，`java:xxx/yyy/zzz` 或 `[java:comp/env/]jdbc/efw`）。 |
| 邮件 | `efw.mail.resource` | `mail/efw` | 默认邮件资源名称（在 `/META-INF/context.xml` 中定义）。对于非 Tomcat 服务器，通过 JNDI 定义（例如，`java:xxx/yyy/zzz` 或 `[java:comp/env/]mail/efw`）。 |
| 文件夹 | `efw.event.folder` | `/WEB-INF/efw/event` | Web 应用程序事件程序文件夹（相对或绝对路径）。 |
|  | `efw.sql.folder` | `/WEB-INF/efw/sql` | Web 应用程序外部 SQL 文件夹（相对或绝对路径）。 |
|  | `efw.mail.folder` | `/WEB-INF/efw/mail` | Web 应用程序邮件模板文件夹（相对或绝对路径）。 |
|  | `efw.i18n.folder` | `/WEB-INF/efw/i18n` | 多语言属性文件夹（相对或绝对路径）。 |
|  | `efw.storage.folder` | `/WEB-INF/efw/storage` | Web 应用程序 I/O 文件夹（相对或绝对路径）。 |
| 舍入器 | `efw.format.rounder` | `HALF_EVEN` | 格式化方法的默认舍入器：`UP`、`DOWN`、`CEILING`、`FLOOR`、`HALF_UP`、`HALF_DOWN`、`HALF_EVEN` |
| Zip | `efw.zip.charset` | `UTF-8` | 归档和提取的字符集。 |
| CORS | `efw.cors` | `*` | 跨域通信设置：`*`（允许所有）、`null`（拒绝所有）或特定权限（例如，`http://0.0.0.0:8080,http://9.9.9.9`）。 |
| 登录检查（Web 事件） | `efw.login.check` | `false` | 启用/禁用登录检查。 |
|  | `efw.login.key` | `USER_ID` | 登录检查的会话密钥。 |
|  | `efw.login.url` | `login.jsp` | 登录页面 URL（如果未登录访问则显示）。 |
|  | `efw.outoflogin.url.pattern` |  | 豁免登录检查的页面的正则表达式。 |
|  | `efw.outoflogin.eventid.pattern` |  | 豁免登录检查的事件的正则表达式。 |
| 身份验证检查（Web 事件） | `efw.auth.check` | `false` | 启用/禁用权限检查。 |
|  | `efw.auth.key` | `USER_AUTH` | 权限检查的会话密钥。 |
|  | `efw.system.error.url` | `error.jsp` | 系统错误页面 URL。 |
|  | `efw.auth.cases` |  | 定义权限/页面集的权限案例（逗号分隔）。 |
|  | `####.auth.pattern` |  | 集合中权限的正则表达式。 |
|  | `####.url.pattern` |  | 集合中页面的正则表达式。 |
| 禁止字符 | `efw.forbidden.characters` |  | 事件 JS 参数中禁止的字符。 |
|  | `efw.forbidden.replacement` |  | 禁止字符的替换字符（空白表示删除）。 |