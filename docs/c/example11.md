# efw 数据库操作示例

## 概述

efw 框架提供了一套完整的数据库操作解决方案，支持连接池管理、外部 SQL 定义和数据转换处理。本示例展示了如何使用 efw 进行各种数据库操作，包括表创建、数据插入、更新、删除等基本 CRUD 操作。

## 核心文件

1. **主页面**: `helloDB.jsp`
2. **默认连接池操作**: `helloDB_submit.js`
3. **备用连接池操作**: `helloDB_submit2.js`
4. **SQL 定义文件**: `helloDB.xml`

## 功能特性

### 1. 数据库连接池管理

efw 支持配置多个数据库连接池，通过 JNDI 资源进行管理：
```xml
<!-- context.xml 配置示例 -->
<Resource name="jdbc/efw" 
          auth="Container"
          type="javax.sql.DataSource"
          driverClassName="org.postgresql.Driver"
          url="jdbc:postgresql://localhost:5432/helloworld"
          username="postgres"
          password="postgres"
          maxTotal="10"
          maxIdle="10"
          maxWaitMillis="10000"/>
```

### 2. 外部 SQL 定义

SQL 语句存储在外部 XML 文件中，支持以下特性：

- **参数化查询**: 使用 `:paramName` 语法
- **动态参数**: 使用 `@dynamicParam` 语法
- **SQL 包含**: 使用 `<include>` 标签重用 SQL 片段
- **自定义前缀**: 支持自定义参数和动态参数前缀
- **注释支持**: 支持多种注释格式

### 3. 数据操作 API

#### 查询数据
```javascript
// 基本查询
var record = db.select("groupId", "sqlId", {param1: "value1"});

// 使用指定连接池
var record = db.select("groupId", "sqlId", {param1: "value1"}, "jdbc/connectionPool");
```

#### 修改数据
```javascript
// 执行更新操作
var affectedRows = db.change("groupId", "sqlId", {param1: "value1"});

// 使用指定连接池
var affectedRows = db.change("groupId", "sqlId", {param1: "value1"}, "jdbc/connectionPool");
```

### 4. 数据映射和转换

efw 提供强大的数据映射功能：
```javascript
// 基本映射
var mappedData = db.select(...)
    .map({
        newField: "originalField",
        formattedDate: ["dateField", "yyyy/MM/dd"]
    });

// 自定义转换函数
var mappedData = db.select(...)
    .map({
        calculatedField: function(data) {
            return data.field1 + " - " + data.field2;
        }
    });

// 获取单条记录
var singleRecord = mappedData.getSingle();

// 获取所有记录
var allRecords = mappedData.getAll();

```

## 配置说明

### 1. 数据库连接配置

在 META-INF/context.xml 中配置数据库连接池：
```xml
<Context>
    <Resource name="jdbc/efw"
              auth="Container"
              type="javax.sql.DataSource"
              driverClassName="org.postgresql.Driver"
              url="jdbc:postgresql://localhost:5432/database"
              username="username"
              password="password"
              maxTotal="20"
              maxIdle="10"
              maxWaitMillis="10000"/>
</Context>
```

### 2. 数据库驱动依赖

根据使用的数据库添加相应的 JDBC 驱动

## 使用示例

### 1. 基本操作流程
```javascript
// 1. 创建表
db.change("helloDB", "createTbl", {});

// 2. 插入数据
db.change("helloDB", "insertRow", {
    id: "001",
    name: "Test User",
    birthday: new Date(),
    years: 25
});

// 3. 查询数据
var users = db.select("helloDB", "selectAll", {})
    .map({
        userId: "id",
        userName: "name",
        birthDate: ["birthday", "yyyy-MM-dd"],
        age: "years"
    })
    .getAll();

// 4. 更新数据
db.change("helloDB", "updateName", {
    id: "001",
    name: "Updated Name",
    tbl: "tbl_hello"
});

// 5. 删除数据
db.change("helloDB", "deleteRow", {id: "001"});

// 6. 删除表
db.change("helloDB", "dropTbl", {tbl: "tbl_hello"});
```


### 2. 多连接池使用
```javascript
// 使用默认连接池
db.select("groupId", "sqlId", params);

// 使用指定连接池
db.select("groupId", "sqlId", params, "jdbc/anotherPool");
```

### 3. 复杂数据转换
```javascript
var processedData = db.select("helloDB", "complexQuery", {})
    .map({
        // 字段重命名
        newId: "id",
        
        // 日期格式化
        formattedDate: ["birthday", "yyyy年MM月dd日"],
        
        // 自定义计算字段
        ageGroup: function(data) {
            if (data.years < 20) return "青少年";
            else if (data.years < 40) return "青年";
            else return "中年及以上";
        },
        
        // 组合字段
        fullInfo: function(data) {
            return data.name + " (" + data.years + "岁)";
        }
    })
    .getAll();
```

## 最佳实践

### 1. SQL 管理
- 将 SQL 语句保存在外部 XML 文件中
- 使用有意义的 SQL ID 命名
- 利用 `<include>` 标签重用公共片段

### 2. 连接池优化
- 根据应用负载调整连接池大小
- 为不同业务使用不同的连接池
- 监控连接池使用情况

### 3. 数据转换
- 在映射层处理数据格式化
- 使用自定义函数处理复杂转换逻辑
- 保持转换逻辑的简洁和可维护性

### 4. 错误处理
框架会自动捕获数据库相关的错误且回滚事务处理。
没有特殊需求，不需要对数据库处理加try-catch处理。

## 总结

efw 框架的数据库模块提供了强大而灵活的数据操作能力，通过外部 SQL 定义、连接池管理和数据转换功能，大大简化了数据库操作代码的编写和维护。无论是简单的 CRUD 操作还是复杂的数据处理，都能找到合适的解决方案。

### 核心优势
1. **分离关注点**: SQL 与代码分离，提高可维护性
2. **灵活配置**: 支持多连接池和参数化查询
3. **强大转换**: 提供丰富的数据映射和转换功能
4. **性能优化**: 连接池管理和批量操作支持

### 适用场景
- 传统 CRUD 应用程序
- 数据报表和统计分析
- 数据迁移和转换任务
- 多数据库环境应用

通过合理使用 efw 的数据库功能，可以构建出高效、可靠且易于维护的数据访问层。