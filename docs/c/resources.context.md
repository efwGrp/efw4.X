# Context XML

此示例 `context.xml` 与 Apache Tomcat 7 或更高版本兼容。对于非 Tomcat 服务器，请确保根据您的系统约定添加资源。

`/META-INF/context.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Context>
<Context>
    <Resource
        name="jdbc/efw"
        auth="Container"
        type="javax.sql.DataSource"
        driverClassName="org.postgresql.Driver"
        url="jdbc:postgresql://localhost:5432/efw"
        username="username"
        password="password"
        maxActive="100"
        maxIdle="20"
        maxWait="10"
    />
    <Resource
        name="jdbc/efw2"
        auth="Container"
        type="javax.sql.DataSource"
        driverClassName="org.postgresql.Driver"
        url="jdbc:postgresql://localhost:5432/efw2"
        username="username"
        password="password"
        maxActive="100"
        maxIdle="20"
        maxWait="10"
    />
    <Resource
        name="mail/efw"
        auth="Container"
        type="javax.mail.Session"
        username=""
        password=""
        mail.debug="false"
        mail.user=""
        mail.from="admin@test.co.jp"
        mail.transport.protocol="smtp"
        mail.smtp.host="127.0.0.1"
        mail.smtp.auth="false"
        mail.smtp.port="25"
        mail.smtp.starttls.enable="true"
        description="E-Mail Resource"
    />
</Context>
```

## 数据库资源

默认数据库资源必须命名为“jdbc/efw”。它可以被 [`db.select`](db.select.md)、[`db.change`](db.change.md) 和 [`db.master`](db.master.md) 使用，而无需 `jdbcResourceName` 参数。

如果需要其他数据库，请添加具有不同名称的数据库资源。使用这些其他资源时，您*必须*使用 `jdbcResourceName` 参数调用数据库函数。

例如：

```javascript
db.select(groupId, sqlId, params)        // 使用默认数据库资源“jdbc/efw”
db.select(groupId, sqlId, params, "jdbc/efw2")    // 使用附加数据库资源“jdbc/efw2”
```


## 邮件资源

### 名称

如果在您的程序中调用了 [`mail.send`](mail.send.md)，则必须将邮件资源配置为名称“mail/efw”。