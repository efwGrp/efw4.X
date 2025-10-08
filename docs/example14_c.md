efw REST API 服务示例

概述

efw 框架提供了完整的 REST API 开发支持，使开发者能够轻松创建和管理 RESTful Web 服务。本示例展示了如何使用 efw 构建一个完整的客户管理 REST API，包括 CRUD 操作、安全验证和跨域支持。

核心文件

1. REST API 客户端界面 (helloRestAPI.jsp)

2. REST API 客户端处理 (helloRestAPI_submit.js)

3. REST API 服务端实现 (customer.js)

4. 数据库SQL定义 (helloRestAPI.xml)

功能特性

1. RESTful API 设计

标准的HTTP方法支持

• POST: 创建新资源

• GET: 检索资源

• PUT: 更新资源

• DELETE: 删除资源

统一的资源定位


GET    /efwRestAPI/customer/{id}     # 获取指定客户
POST   /efwRestAPI/customer          # 创建新客户
PUT    /efwRestAPI/customer/{id}     # 更新指定客户
DELETE /efwRestAPI/customer/{id}     # 删除指定客户


2. 安全机制

Token验证

// 从HTTP头获取Token并进行验证
var token = Packages.efw.framework.getRequest().getHeader("token");
if ("1234567890" != token) {
    throw new Error("安全验证失败: 无效的Token");
}


输入验证

// 参数完整性检查
if (!params.id || !params.nm) {
    throw new Error("请求参数不完整: 需要id和nm参数");
}


3. 错误处理

框架会自动捕获数据库相关的错误且回滚事务处理。 没有特殊需求，不需要对数据库处理加try-catch处理。


HTTP状态码

• 200 OK: 请求成功

• 204 No Content: 操作成功，无返回内容

• 404 Not Found: 资源不存在

• 500 Internal Server Error: 服务器内部错误

4. 跨域支持 (CORS)

客户端跨域请求

$.ajax({
    url: "http://127.0.0.1:8080/helloworld/efwRestAPI/customer/123",
    xhrFields: { withCredentials: true },
    headers: { token: "1234567890" },
    type: "GET",
    dataType: "json",
    contentType: "application/json;charset=UTF-8"
});


服务器端CORS配置

需要在服务器端配置适当的CORS头信息以支持跨域请求。



最佳实践

1. API设计原则

资源命名

• 使用名词复数形式表示资源集合

• 保持URL简洁和一致

• 使用连字符(-)分隔单词

版本管理

/myapp_v1/efwRestAPI/customer
/myapp_v2/efwRestAPI/customer

总结

efw 框架的 REST API 功能提供了灵活的工具集，使开发者能够轻松构建符合 RESTful 原则的 Web 服务。通过标准化的 HTTP 方法支持、安全机制、错误处理和跨域支持，可以快速开发出高质量的 API 服务。

核心优势

1. 标准化设计: 遵循 RESTful 架构原则
2. 易于扩展: 可以方便的追加中间件和自定义验证

适用场景

• 企业级应用后端服务

• 移动应用 API 接口

• 微服务架构中的业务服务

• 第三方集成接口

通过合理使用 efw 的 REST API 功能，可以构建出高效、安全且易于维护的 Web 服务，满足各种业务场景的需求。