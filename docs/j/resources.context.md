# Context XML

この例の`context.xml`は、Apache Tomcat 7以降と互換性があります。Tomcat以外のサーバーでは、システム規約に従ってリソースが追加されていることを確認してください。

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

## データベースリソース

デフォルトのデータベースリソースは、"jdbc/efw"という名前である必要があります。これは、`jdbcResourceName`パラメータなしで、[`db.select`](db.select.md)、[`db.change`](db.change.md)、および[`db.master`](db.master.md)で使用できます。

追加のデータベースが必要な場合は、異なる名前のデータベースリソースを追加してください。これらの追加リソースを使用する場合は、*必ず*`jdbcResourceName`パラメータを指定してデータベース関数を呼び出す必要があります。

例：

```javascript
db.select(groupId, sqlId, params)        // デフォルトのデータベースリソース "jdbc/efw" を使用
db.select(groupId, sqlId, params, "jdbc/efw2")    // 追加のデータベースリソース "jdbc/efw2" を使用
```


## メールリソース

### 名前

プログラム内で[`mail.send`](mail.send.md)が呼び出される場合、メールリソースは*必ず*"mail/efw"という名前で構成する必要があります。