好的，这是您再次要求的中文翻译（Markdown格式），**所有的图片标签都已完整保留**。

# 【efw介绍】Efw的安全相关说明

## 1、文件流出（文件泄露）

文件流出是指 **Web 服务器**内的文件被互联网上的攻击者不断读取的安全问题。这是 Web 应用程序漏洞中**最基本**的一类。缺乏文件流出对策的 Web 网站属于安全级别最低的网站，在这种情况下，采取其他安全漏洞对策也几乎没有效果。

文件流出类别的问题包括：将数据的存储位置用于 **Web 公开区域**、本应仅提供服务器内特定文件的程序却泄露了**所有文件**、以及 Web 应用程序的**源代码**以某种形式被读取等。
(摘自: thinkit.co.jp/Web应用程序的漏洞)

### 1-1、efw文件夹的存放位置

![image.png](../img/security/p1.png)

在 **efw 框架**的默认设置下，**应用程序程序**和**各种资源**（不包括 jsp、css 等）存储在 **Web 非公开区域**的 **WEB-INF** 文件夹中。如果通过 URL 直接访问，将返回 **404 错误**。

  * **event**：存放事件 js 文件的文件夹。
  * **i18n**：存放多语言消息定义的文件夹。
  * **mail**：存放邮件模板的文件夹。
  * **sql**：存放外置 SQL 的文件夹。
  * **storage**：存放应用程序操作的文件的文件夹。

#### 注意点

但是，**Efw 的文件处理 API** 可以操作服务器上的**任意文件**。此外，也可以使用 **Java 的 API**，因此，为防止文件流出，仍需**应用程序程序**的注意。

例如，如果直接将屏幕输入值/选择值用作服务器端操作的**文件名称**，则存在被篡改而操作到本应操作文件的**父文件夹**的风险。

### 1-2、文件管理工具 elfinder 的改造

![image.png](../img/security/p2.png)

**elfinder** 是著名的 Web 文件管理工具。在原始的 elfinder 中，**主路径**、**只读标志**可以在客户端 **JavaScript** 中修改。在 efw 的 elfinder 标签中，设置 **protected** 属性为 **true** 时，将禁止修改主路径和只读标志。

### 1-3、下载的机制

![image.png](../img/security/p3.png)

下载必须从**一个事件发起**开始。在事件执行和下载开始之间，**下载对象**保存在 **Session** 中。这样，仅凭客户端 JavaScript 篡改**无法**执行下载。

  * 在事件 js 中，使用 **attach 函数**设置要下载的文件名或路径名。
  * 框架服务器端将其记录到 **Session** 中。
  * 框架客户端调用 **downloadServlet**。
  * downloadServlet 输出下载对象，同时**清除 Session**。
  * 此外，框架还具备在下载后**删除**目标文件的功能。如果使用此功能，可以使下载文件泄漏的风险降为**零**。

## 2、通过参数造成的信息流出

这是指在页面切换时传递的参数，导致读取到**他人个人信息**等问题的漏洞类别。虽然命名为“信息流出”，但像在购物网站中参数被修改而以不当低价购买等**篡改类**问题也包含在此类别中。

Web 页面之间传递参数的方法主要有三种：**查询字符串 (Query String)**、**隐藏字段 (Hidden Field)** 和 **HTTP Cookie**。这些都存在导致信息流出和篡改的危险。
(摘自: thinkit.co.jp/Web应用程序的漏洞)

Efw 的服务器发送利用 **Ajax 的 POST 方式**，因此不会涉及上述简单的篡改风险。但是，**请求对象的阅览权限确认**、**请求参数的业务完整性检查**等，需要由应用程序的**个别逻辑**来应对。

框架自动化了参数发送和画面切换相关的**参数类型检查**、**画面/事件的登录检查**、\*\***角色检查**。这些是画面功能单位的控制，但**不能替代**请求对象的阅览权限确认和请求参数的业务完整性检查。对于面向互联网的系统，需要特别注意。

### 2-1、事件参数检查的机制

```js
var myEvent={};
myEvent.paramsFormat={
	“#txt_date”:”format:yyyy/MM/dd;required;display-name:数字项目”,
	“#txt_number”:”format:###,##0;min:0;max:1,000;display-name:文字项目”,
	“#txt_string”:”maxlength:100;display-name:文字项目”,
};
```

通过**参数定义**检查从客户端获取的事件参数是否为**预期类型**，以防止客户端篡改导致的服务器故障。

### 2-2、登录检查的机制

```properties
#########login check##########################################
#The flag to check login
efw.login.check = true

#The session key of login
efw.login.key = USER_ID

#login url
efw.login.url = login.jsp

#url pattern out of login check 
efw.outoflogin.url.pattern = [/](LG01|LG02|LG03|error).jsp

#eventid pattern out of login check
efw.outoflogin.eventid.pattern = LG01|LG02|LG03|head_logout
```

通过**属性文件设置**自动进行**登录检查**，针对登录后才能阅览的画面和能操作的事件，防止未登录用户直接在 URL 栏输入地址导致的信息流出。

### 2-3、角色检查的机制

```properties
#########auth check##########################################
#The flag to check auth
efw.auth.check = true
・・・
#All cases of auth checking
efw.auth.cases = admin,user

#Define cases one by one
admin.auth.pattern = ^admin.*$
admin.url.pattern = [/]*.jsp
admin.eventid.pattern = .*

user.auth.pattern = ^((?!admin).)*$
user.url.pattern = [/](LG.*|LOG|CRM.*).jsp
user.eventid.pattern = (LG.*|LOG|CRM.*)
```

通过**属性文件设置**自动进行**角色检查**，针对仅管理员能阅览的画面和能操作的事件，防止普通用户直接在 URL 栏输入管理员专用画面地址导致的信息流出。

## 3、注入攻击的对应策

**注入（Injection）** 是指将某些东西注入内部。**注入攻击**是指巧妙地将侵害安全性的命令混入程序正常接收的输入数据中，并在计算机内部使其发挥作用的攻击手法。

注入攻击中最具代表性的是 **SQL 注入攻击**，它干扰数据库，导致信息泄漏和信息篡改。此外，还包括干扰 Shell 的 **OS 命令注入**、扰乱 XML 检索条件的 **XPath 注入**、以及干扰目录检索条件的 **LDAP 注入**等攻击手法。
(摘自: thinkit.co.jp/Web应用程序的漏洞)

Efw 针对注入攻击采取了以下对策：

  * 作为 **Ajax 方式**的框架，对服务器发送 JSON 中可能插入 **JavaScript** 的情况进行了设想和应对。
  * 对\*\*“处理结果自动显示”\*\*中特殊符号可能导致画面混乱的情况进行了设想和应对。
  * 对 **SQL 执行**中特殊符号可能导致 SQL 执行失败或意外动作的情况进行了设想和应对。

### 3-1、防止 JSON 通信的 JavaScript 注入

![image.png](../img/security/p4.png)

从客户端发送的字符串不直接作为 **JavaScript 对象**使用，而是通过 **JSON.parse** 进行转换，从而防止 JSON 通信中的 **JavaScript 注入**。

### 3-2、防止处理结果自动显示的 HTML 注入

![image.png](../img/security/p5.png)

在将返回值绘制到画面时，利用 **jQuery** 功能防止 **HTML 注入**。
此外，在使用以下功能时，请注意**参数的值**不应直接来源于画面：

  * `Result.append()` 中不进行处理结果编码的 **`{{}}`** 用法。
  * `Result.eval()`

### 3-3、防止预编译语句 (Prepared Statement) 的 SQL 注入

![image.png](../img/security/p6.png)

Efw 将**外置 SQL 的参数**转换为**预编译语句方式的参数**，从而防止 **SQL 注入**。

如果需要代入 SQL 的**表名**、**字段名**等部件，请参阅**动态参数的 API**。在这种情况下，请注意使用的值**不应直接来源于画面**。

## 4、访问日志中敏感信息的加密

为了提高访问日志的易用性，部分提交信息作为 **URL 参数**保存。该 URL 参数被记录在访问日志中。

例如，以下画面的登录按钮处理会向服务器发送**用户 ID** 和**密码**。

![image.png](../img/security/p7.png)

登录处理的访问日志中，密码会以如下**明文**形式显示：

```js
var LG01_submit={};
LG01_submit.name="LG01 登录 认证处理";
LG01_submit.paramsFormat={
	"#txt_uid":"required:true;display-name:用户ID;",//账号
	"#txt_pwd":"required:true;display-name:密码;",//密码
};
LG01_submit.fire=function(params){
```

127.0.0.1 - - [15/Aug/2025:09:58:30 +0900] "POST /skeletonSample/efwServlet?eventId=LG01\_submit\&lang=jp\&params=%7B%22%23txt\_uid%22%3A%22admin%22%2C%22%23txt\_pwd%22%3A%22<font color=red>11111</font>%22 HTTP/1.1" 200 413

如果希望在访问日志中**加密敏感信息**，可以在事件 js 文件中为敏感信息字段设置 **`secure` 属性**来应对。

```js
var LG01_submit={};
LG01_submit.name="LG01 登录 认证处理";
LG01_submit.paramsFormat={
	"#txt_uid":"required:true;display-name:用户ID;",//账号
	"#txt_pwd":"required:true;display-name:密码;secure:true;",//密码
};
LG01_submit.fire=function(params){
```

127.0.0.1 - - [15/Aug/2025:10:56:02 +0900] "POST /skeletonSample/efwServlet?eventId=LG01\_submit\&lang=jp\&params=%7B%22%23txt\_uid%22%3A%22admin%22%2C%22%23txt\_pwd%22%3A%22<font color=red>MTExMTE%3D</font>%22 HTTP/1.1" 200 83
