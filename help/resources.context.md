# Context XML

This example `context.xml` is compatible with Apache Tomcat 7 or later.  For non-Tomcat servers, ensure the resources are added according to your system's conventions.

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

## Database Resource

The default database resource must be named "jdbc/efw". It can be used by [`db.select`](db.select.md), [`db.change`](db.change.md), and [`db.master`](db.master.md) without the `jdbcResourceName` parameter.

If you need additional databases, add database resources with different names.  When using these additional resources, you *must* call the database functions with the `jdbcResourceName` parameter.

For example:

```javascript
db.select(groupId, sqlId, params)        // Using the default database resource "jdbc/efw"
db.select(groupId, sqlId, params, "jdbc/efw2")    // Using the additional database resource "jdbc/efw2"
```


## Mail Resource

### Name

If [`mail.send`](mail.send.md) is called in your program, the mail resource *must* be configured with the name "mail/efw".