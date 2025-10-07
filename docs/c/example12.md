# efw 邮件发送功能示例

## 概述

efw 框架提供了简单易用的邮件发送功能，支持通过 Gmail SMTP 服务器发送邮件。该功能支持模板化邮件内容、附件发送、多收件人设置等高级特性，同时保持了使用的简洁性。

## 核心文件

1. **邮件发送页面**: `helloMail.jsp`
2. **邮件发送处理**: `helloMail_submit.js`
3. **邮件模板配置**: `mails.xml`

## 功能特性

### 1. 灵活的邮件配置

#### 收件人设置
- **主收件人**: 通过 to 参数指定
- **抄送**: 通过 cc 参数指定
- **密送**: 通过 bcc 参数指定
- **阅读回执**: 通过 mdn 参数指定

#### 邮件内容
- **动态主题**: 支持参数化主题
- **模板正文**: 支持带参数的邮件正文模板
- **HTML 支持**: 支持 HTML 格式邮件内容

### 2. 附件支持

```javascript
// 单个附件
attachment: "path/to/file.pdf"

// 多个附件（分号分隔）
attachment: "file1.pdf;file2.xlsx;image.jpg"

// 支持基于storage的相对路径
attachment: "document.pdf"
```

### 3. 模板化设计

邮件内容与代码分离，支持多种预定义模板：
```javascript
// 使用欢迎模板
mail.send("mails", "welcomeMail", {
    email: "user@example.com",
    name: "张三",
    username: "zhangsan",
    regTime: new Date().toLocaleString()
});

// 使用通知模板
mail.send("mails", "notificationMail", {
    to: "admin@example.com",
    cc: "manager@example.com",
    title: "系统警报",
    message: "检测到异常登录行为",
    time: new Date().toLocaleString(),
    systemId: "SECURITY-001"
});
```

## 配置说明

### 1. SMTP 服务器配置

在 META-INF/context.xml 中配置邮件会话资源：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Context>
<Context>
    <!-- Gmail SMTP 配置 -->
    <Resource name="mail/efw"
              auth="Container"
              type="javax.mail.Session"
              username="your.email@gmail.com"
              password="your-app-password"
              mail.debug="false"
              mail.user="your.email@gmail.com"
              mail.from="your.email@gmail.com"
              mail.transport.protocol="smtp"
              mail.smtp.host="smtp.gmail.com"
              mail.smtp.auth="true"
              mail.smtp.port="587"
              mail.smtp.starttls.enable="true"
              description="Gmail SMTP Resource"/>
    
    <!-- 企业SMTP服务器配置示例 -->
    <Resource name="mail/corporate"
              auth="Container"
              type="javax.mail.Session"
              username="user@company.com"
              password="password"
              mail.debug="false"
              mail.from="noreply@company.com"
              mail.transport.protocol="smtp"
              mail.smtp.host="smtp.company.com"
              mail.smtp.auth="true"
              mail.smtp.port="25"
              description="Corporate SMTP Resource"/>
</Context>
```

## 使用示例

### 1. 基本邮件发送

```javascript
// 发送简单文本邮件
mail.send("mails", "freeMail", {
    to: "recipient@example.com",
    from: "sender@example.com",
    subject: "测试邮件",
    body: "这是一封测试邮件内容。"
});
```

### 2. 带附件邮件

```javascript
// 发送带附件的邮件
mail.send("mails", "freeMail", {
    to: "recipient@example.com",
    subject: "重要文档",
    body: "请查收附件中的重要文档。",
    attachment: "documents/contract.pdf;reports/monthly.xlsx"
});
```

### 3. 使用模板邮件

```javascript
// 使用预定义模板发送邮件
mail.send("mails", "welcomeMail", {
    email: "new.user@example.com",
    name: "李四",
    username: "lisi",
    regTime: new Date().toLocaleDateString()
});
```

### 4. 批量邮件发送

```javascript
// 批量发送邮件给多个收件人
var recipients = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
];

recipients.forEach(function(email) {
    mail.send("mails", "notificationMail", {
        to: email,
        title: "系统更新通知",
        message: "系统将于今晚进行维护更新，请提前保存工作。",
        time: "2023-12-01 02:00 - 04:00",
        systemId: "SYS-UPDATE-20231201"
    });
});
```

## 最佳实践

### 1. 安全性建议
- 使用应用专用密码而非账户密码
- 敏感信息不通过邮件发送
- 定期更新SMTP凭证
- 使用加密连接（STARTTLS/SSL）

### 2. 性能优化
- 使用连接池复用SMTP连接
- 批量处理邮件发送任务
- 异步发送非紧急邮件
- 合理设置超时时间

### 3. 模板管理
- 将常用邮件模板化
- 支持多语言邮件模板

## 总结

efw 框架的邮件发送功能提供了强大而灵活的工具集，使开发者能够轻松集成邮件功能到应用程序中。通过模板化设计、附件支持和丰富的配置选项，可以满足各种邮件发送需求。

### 核心优势
1. **简单易用**: 简洁的API设计，快速上手
2. **灵活配置**: 支持多种SMTP服务器和认证方式
3. **功能丰富**: 支持附件、模板、HTML邮件等高级功能

### 适用场景
- 用户注册欢迎邮件
- 密码重置邮件
- 系统通知和警报
- 营销和促销邮件
- 报告和文档发送
- 事务性邮件通知

通过合理使用 efw 的邮件功能，可以构建出高效、可靠的邮件发送系统，满足各种业务场景的需求。