# efw Database Operation Example

## Overview

The efw framework provides a complete database operation solution that supports connection pool management, external SQL definition, and data transformation processing. This example demonstrates how to use efw for various database operations, including basic CRUD operations such as table creation, data insertion, update, and deletion.

## Core Files

1. **Main Page**: `helloDB.jsp`
2. **Default Connection Pool Operations**: `helloDB_submit.js`
3. **Alternate Connection Pool Operations**: `helloDB_submit2.js`
4. **SQL Definition File**: `helloDB.xml`

## Features

### 1. Database Connection Pool Management

efw supports configuring multiple database connection pools managed through JNDI resources:
```xml
<!-- context.xml Configuration Example -->
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

### 2. External SQL Definition

SQL statements are stored in external XML files and support the following features:

- **Parameterized Queries**: Using `:paramName` syntax
- **Dynamic Parameters**: Using `@dynamicParam` syntax
- **SQL Includes**: Reusing SQL fragments with `<include>` tags
- **Custom Prefixes**: Supporting custom parameter and dynamic parameter prefixes
- **Comment Support**: Supporting multiple comment formats

### 3. Data Operation API

#### Query Data
```javascript
// Basic query
var record = db.select("groupId", "sqlId", {param1: "value1"});

// Using specified connection pool
var record = db.select("groupId", "sqlId", {param1: "value1"}, "jdbc/connectionPool");
```

#### Modify Data
```javascript
// Execute update operation
var affectedRows = db.change("groupId", "sqlId", {param1: "value1"});

// Using specified connection pool
var affectedRows = db.change("groupId", "sqlId", {param1: "value1"}, "jdbc/connectionPool");
```

### 4. Data Mapping and Transformation

efw provides powerful data mapping capabilities:
```javascript
// Basic mapping
var mappedData = db.select(...)
    .map({
        newField: "originalField",
        formattedDate: ["dateField", "yyyy/MM/dd"]
    });

// Custom transformation functions
var mappedData = db.select(...)
    .map({
        calculatedField: function(data) {
            return data.field1 + " - " + data.field2;
        }
    });

// Get single record
var singleRecord = mappedData.getSingle();

// Get all records
var allRecords = mappedData.getAll();
```

## Configuration Instructions

### 1. Database Connection Configuration

Configure database connection pools in META-INF/context.xml:
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

### 2. Database Driver Dependencies

Add corresponding JDBC drivers according to the database used

## Usage Examples

### 1. Basic Operation Flow
```javascript
// 1. Create table
db.change("helloDB", "createTbl", {});

// 2. Insert data
db.change("helloDB", "insertRow", {
    id: "001",
    name: "Test User",
    birthday: new Date(),
    years: 25
});

// 3. Query data
var users = db.select("helloDB", "selectAll", {})
    .map({
        userId: "id",
        userName: "name",
        birthDate: ["birthday", "yyyy-MM-dd"],
        age: "years"
    })
    .getAll();

// 4. Update data
db.change("helloDB", "updateName", {
    id: "001",
    name: "Updated Name",
    tbl: "tbl_hello"
});

// 5. Delete data
db.change("helloDB", "deleteRow", {id: "001"});

// 6. Drop table
db.change("helloDB", "dropTbl", {tbl: "tbl_hello"});
```

### 2. Multiple Connection Pool Usage
```javascript
// Use default connection pool
db.select("groupId", "sqlId", params);

// Use specified connection pool
db.select("groupId", "sqlId", params, "jdbc/anotherPool");
```

### 3. Complex Data Transformation
```javascript
var processedData = db.select("helloDB", "complexQuery", {})
    .map({
        // Field renaming
        newId: "id",
        
        // Date formatting
        formattedDate: ["birthday", "yyyy”NMMŒŽdd“ú"],
        
        // Custom calculated field
        ageGroup: function(data) {
            if (data.years < 20) return "Teenager";
            else if (data.years < 40) return "Youth";
            else return "Middle-aged and above";
        },
        
        // Combined field
        fullInfo: function(data) {
            return data.name + " (" + data.years + " years old)";
        }
    })
    .getAll();
```

## Best Practices

### 1. SQL Management
- Store SQL statements in external XML files
- Use meaningful SQL ID names
- Reuse common fragments using `<include>` tags

### 2. Connection Pool Optimization
- Adjust connection pool size according to application load
- Use different connection pools for different business functions
- Monitor connection pool usage

### 3. Data Transformation
- Handle data formatting at the mapping layer
- Use custom functions for complex transformation logic
- Keep transformation logic concise and maintainable

### 4. Error Handling
The framework automatically captures database-related errors and rolls back transaction processing.
No special requirements mean no need to add try-catch handling for database processing.

## Summary

The efw framework's database module provides powerful and flexible data operation capabilities. Through external SQL definitions, connection pool management, and data transformation functions, it greatly simplifies the writing and maintenance of database operation code. Whether for simple CRUD operations or complex data processing, suitable solutions can be found.

### Core Advantages
1. **Separation of Concerns**: Separation of SQL and code improves maintainability
2. **Flexible Configuration**: Supports multiple connection pools and parameterized queries
3. **Powerful Transformation**: Provides rich data mapping and transformation functions
4. **Performance Optimization**: Supports connection pool management and batch operations

### Application Scenarios
- Traditional CRUD applications
- Data reporting and statistical analysis
- Data migration and transformation tasks
- Multi-database environment applications

By properly using efw's database functionality, efficient, reliable, and easily maintainable data access layers can be built.