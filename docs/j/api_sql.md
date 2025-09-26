# SQL XML

test.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE sqls>
<sqls>
    <sql id="sql1" paramPrefix=":" dynamicPrefix="@">
        /**
         * this is comment
         */
        // this is comment

        SELECT field1,field2,field3 FROM table1
        WHERE
        field1=:param1
        <if exists="param2"> and field2 &lt;:param2</if>
        <if notexists="param2"> and field2 &lt; 500</if>
        <if istrue="param3.substr(0,1)=='x'"> and field3 =:param3 </if>
        <if isfalse="param3.substr(0,1)=='x'"> and field3 = 'y' </if>

    </sql>
    <sql id="sql2">
        <include groupId="test" sqlId="sql1"/>
        order by field3, @param4
    </sql>
</sqls>
```


### SQL ID

すべての`<sql>`タグは`id`を持つ必要があります。`id`はSQL XMLファイル内で一意である必要があります。これは[`db.select`](db.select.md)または[`db.change`](db.change.md)によって呼び出されます。

### パラメータ

SQL内で`:param`のように書くだけでパラメータを定義できます。<br>
`<sql>`タグの`paramPrefix`属性はオプションです。SQL内で":"が必須文字である場合は、再定義できます。

### 動的SQL

`@dynamic`のように書くだけで、動的SQL部分を追加できます。<br>
`<sql>`タグの`dynamicPrefix`属性はオプションです。SQL内で"@"が必須文字である場合は、再定義できます。

### If

`exists`、`notexists`、`istrue`、および`isfalse`属性を設定することにより、パラメータが存在するかどうか、またはJavaScript式がtrueかどうかに基づいて、異なる操作を実行できます。`if`タグはネストできます。

### Include

`groupId`と`sqlId`属性を設定することにより、既存のSQLクエリをSQLに含めることができます。<BR>

### コメント

コメントはいくつかの方法で記述できます。

#### エンコード

"<"文字に注意してください。XML構文に準拠するため、"&amp;lt;"と記述する必要があります。
