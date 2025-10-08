# efw 多语言支持示例

## 概述

efw 框架提供了完整的国际化（i18n）支持，使应用程序能够轻松实现多语言功能。通过外部化的语言资源文件和简单的标签使用，可以快速构建支持多种语言的 Web 应用程序。

## 核心文件

1. **多语言界面页面**: `helloI18n.jsp`
2. **多语言消息处理**: `helloI18n_submit.js`
3. **英语语言资源文件**: `en.xml`
4. **日语语言资源文件**: `jp.xml`
5. **中文语言资源文件**: `cn.xml`

## 功能特性

### 1. 多语言资源管理

#### 资源文件结构
- **文件位置**: WEB-INF/lib/efw/i18n/ 目录下
- **命名规范**: 使用语言代码命名（如 en.xml, jp.xml, cn.xml）
- **文件格式**: 标准 Java 属性文件格式（XML版本）

#### 消息键命名规范
- 使用有意义的键名，描述消息用途
- 保持键名在所有语言文件中的一致性
- 使用驼峰命名法或下划线分隔

### 2. 前端多语言支持

#### JSP 页面中使用
```html
<!-- 消息显示 -->
<efw:msg key="messageKey"/>
```

#### JavaScript 中使用
```javascript
// 在客户端JavaScript中使用多语言消息
var message = "<efw:msg key="messageKey"/>";
```

### 3. 后端多语言支持

#### 服务器端消息返回
```javascript
// 在事件处理函数中返回多语言消息
helloI18n_submit.fire = function(params) {
    return new Result()
        .alert("{messageKey}") // 使用大括号语法引用消息键
        .runat("body")
        .withdata({
            "#someElement": "{anotherMessageKey}"
        });
}
```

### 4. 语言切换机制

#### URL 参数方式
```javascript
// 通过URL参数切换语言
window.location = "page.jsp?lang=en";
```

#### JSP获取语言设置
```html
<%
    // 从request获取语言设置
    String lang=request.getParameter("lang");
    if (lang==null||"".equals(lang))lang="en";
%>
<efw:Client lang="<%=lang%>"/>
```

## 配置说明

### 2. 文件结构
```
WEB-INF/
  └── efw/
      └── i18n/
          ├── en.xml          # 英语资源文件
          ├── jp.xml          # 日语资源文件
          └── cn.xml          # 中文资源文件
```

## 最佳实践

### 1. 消息键命名规范

使用统一的命名约定：

properties
按功能模块分组

[module].[component].[messageType]
例: login.form.usernameLabel, user.list.deleteButton

或按消息类型分组

[messageType].[context]
例: error.login.invalidCredentials, success.user.updated


### 2. 语言资源维护

#### 语言文件结构
xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <!-- 通用消息 -->
    <entry key="common.yes">是</entry>
    <entry key="common.no">否</entry>
    <entry key="common.ok">确定</entry>
    <entry key="common.cancel">取消</entry>
    
    <!-- 登录模块 -->
    <entry key="login.title">用户登录</entry>
    <entry key="login.username">用户名</entry>
    <entry key="login.password">密码</entry>
    
    <!-- 错误消息 -->
    <entry key="error.required">{0}是必填项</entry>
    <entry key="error.invalidFormat">{0}格式不正确</entry>
</properties>


## 总结

efw 框架的多语言支持提供了完整而灵活的国际化解决方案，具有以下特点：

### 核心优势
1. **简单易用**: 通过简单的标签和语法即可实现多语言支持
2. **前后端统一**: 支持前端页面和后端消息的统一多语言管理
3. **灵活配置**: 支持多种语言切换方式和参数化消息
4. **易于维护**: 外部化的资源文件便于翻译和维护

### 适用场景
- 多语言企业应用
- 国际化产品
- 多地区部署的系统
- 需要支持多种语言的公共服务

通过合理使用 efw 的多语言功能，可以轻松构建出支持全球用户的应用程序，提供更好的用户体验和更广的市场覆盖。