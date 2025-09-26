# SQL XML

test.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE sqls>
<sqls>
    <sql id="sql1" paramPrefix=":" dynamicPrefix="@">
/**
    this is comment
**/
//  this is comment

SELECT field1,field2,field3 FROM table1
WHERE
field1= :param1
<if exists="param2"> and field2 &lt; :param2</if>
<if notexists="param2"> and field2 &lt; 500</if>
<if istrue="param3.substr(0,1)=='x'"> and field3 = :param3 </if>
<if isfalse="param3.substr(0,1)=='x'"> and field3 = 'y' </if>

    </sql>
    <sql id="sql2">
        <include groupId="test" sqlId="sql1"/>
        order by field3, @param4
    </sql>
</sqls>
```


### SQL ID

每个 `<sql>` 标签都应该有一个 `id`。`id` 在 SQL XML 文件中必须是唯一的。它将由 [db.select](db.select.md) 或 [db.change](db.change.md) 调用。

### 参数

您只需编写 `:param` 即可在 SQL 中定义参数。<br>
`<sql>` 标签的 `paramPrefix` 属性是可选的。如果 ":" 是 SQL 中的必需字符，您可以重新定义它。

### 动态 SQL

您只需编写 `@dynamic` 即可添加动态 SQL 部分。<br>
`<sql>` 标签的 `dynamicPrefix` 属性是可选的。如果 "@" 是 SQL 中的必需字符，您可以重新定义它。

### If 条件判断

您可以通过设置 `exists`、`notexists`、`istrue` 和 `isfalse` 属性，来判断参数是否存在或 JavaScript 公式是否为真，从而执行不同的操作。`<if>` 标签可以嵌套。

### Include 包含

您可以通过设置 `groupId` 和 `sqlId` 属性，将现有的 SQL 查询包含到您的 SQL 中。<BR>

### 注释

您可以通过几种方式编写注释。

#### 编码

请注意“<”字符。您必须将其写为“&amp;lt;”才能符合 XML 语法。