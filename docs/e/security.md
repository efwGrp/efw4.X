# [about efw] Efw Security Related Explanation

## 1. What is file leakage?
This is a category of security problems in which files on a web server are rapidly read by attackers on the Internet. This is the most basic web application vulnerability. Websites without file leakage protection are among the least secure sites. In such cases, other security vulnerability countermeasures have little effect.

Problems in the file leakage category include those that use a public web area as a data storage location, programs that are supposed to provide only a limited number of files on the server but instead leak all files, and web application sources. The code may be read in some way.
(From : thinkit.co.jp/Webアプリケーションの脆弱性)

### 1-1. Location of efw folder

![image.png](../img/security/p1.png)

With the default settings of the efw framework, application programs and various resources (excluding jsp, css, etc.) are stored in the WEB-INF folder in the private web area. If you access it directly from the URL, you will get a 404 error.
- event: Folder that stores event js files.
- i18n: Folder that stores multilingual message definitions.
- mail: Folder that stores email templates.
- sql: Folder to store outgoing SQL.
- storage: Folder that stores files operated by the app.

#### Important Point
However, Efw's file processing API can operate on any file on the server. In addition, since Java API can also be used, care must be taken in application programs to prevent file leakage.

For example, if input values/selected values from the screen are used directly as the name of a file to be manipulated on the server side, there is a risk that the parent folder of the file to be manipulated on the server side may be manipulated due to tampering.

### 1-2. Modification of file management tool elfinder

![image.png](../img/security/p2.png)

elfinder is a famous web file management tool. In the original elfinder, the home path, read-only flag can be changed in client javascript. Add a protected attribute to the efw elfinder tag, and if it is true, the home path and read-only flag cannot be changed.

### 1-3. Download mechanism

![image.png](../img/security/p3.png)

Download always starts from issuing one event. The download target is stored in the session between the event execution and download start. As a result, downloads cannot be executed simply by modifying the client's JavaScript.

- Set the file name or path name to be downloaded using the attach function in the event js.
- The framework server side records them in the session.
- Framework client side calls downloadServlet.
- downloadServlet outputs the download target and clears the session.
- Furthermore, the server side has the ability to delete the target file after it has been downloaded. This feature, if available, reduces the risk of download file leakage to zero.

## 2. What is information leakage from parameters?
This is a category of vulnerabilities that can cause issues such as the personal information of another person being read out based on the parameters passed when switching from one page to the next. Although we call it "information leakage," this category also includes tampering problems, such as tampering with parameters on shopping sites and resulting in purchases being made at unreasonably low prices.

There are three main ways to pass parameters between web pages. These are query strings, hidden fields, and HTTP cookies. All of these are dangerous entities that can lead to information leakage and falsification.
(From : thinkit.co.jp/Webアプリケーションの脆弱性)

Efw server transmission uses Ajax POST method. It does not fall under the risk of easy falsification mentioned above. However, checking whether the request target can be viewed or not, checking the business consistency of request parameters, etc. must be handled by the individual logic of the application.

The framework automates parameter type checks, screen/event login checks, and role checks related to parameter sending and screen switching. Although these are controls for each screen function, they are not a substitute for checking whether the request target can be viewed or checking the business consistency of request parameters. Be careful when using an Internet-oriented system.

### 2-1. Mechanism of event parameter check
```js
var myEvent={};
myEvent.paramsFormat={
	“#txt_date”:”format:yyyy/MM/dd;required;display-name:数字項目”,
	“#txt_number”:”format:###,##0;min:0;max:1,000;display-name:文字項目”,
	“#txt_string”:”maxlength:100;display-name:文字項目”,
};
```
There is a mechanism to check whether the event parameters obtained from the client are of the expected type or not in the parameter definition, which prevents server failures due to client tampering.
### 2-2. Login check mechanism
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
There is a mechanism to automatically check login by setting the property file for screens that can be viewed and events that can be operated after logging in. This prevents information leakage by directly entering the address in the URL field without logging in. .
### 2-3. Role check mechanism
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
There is a mechanism to automatically check the role of screens that can only be viewed by administrators and events that can be operated using property file settings, which prevents information leaks caused by general users directly entering administrator-only screen addresses in the URL field.
## 3. Countermeasures against injection attacks
Injection is a word that means to inject something inside. An injection attack is an attack technique in which commands that violate security are skillfully mixed into the input data that a program normally receives, and the commands are made to function inside the computer.

The most typical type of injection attack is the SQL injection attack, which interferes with the database and causes information leakage or information falsification. Other known attack methods include OS command injection that interferes with the shell, XPath injection that interferes with XML search conditions, and LDAP injection that interferes with directory search conditions.
(From : thinkit.co.jp/Webアプリケーションの脆弱性)


Efw assumes and responds to injection attacks as follows.
- This is an Ajax-based framework that assumes and supports JavaScript insertion into server-sent JSON.
- We have taken into consideration that the screen may be distorted due to special symbols in "Automatic display of processing results".
- We handle SQL execution failures and unexpected behavior due to special symbols.

### 3-1. Preventing JavaScript injection in JSON communication

![image.png](../img/security/p4.png)

The string sent from the client is not used directly as a JavaScript object, but is converted using JSON.parse, which prevents JavaScript injection in JSON communication.

### 3-2. HTML injection prevention for automatic display of processing results

![image.png](../img/security/p5.png)

When drawing the return value to the screen, use jQuery functionality to prevent HTML injection.
Also, when using the following functions, be careful that the parameter values are not directly from the screen.
- Result.append(), to use "{{}}" for without html encoding
- Result.eval()

#### SQL injection prevention for prepared statements

![image.png](../img/security/p6.png)

Efw converts out-of-the-box SQL parameters into prepared statement style parameters to prevent SQL injection.

If you want to substitute parts such as SQL table names and item names, please see the dynamic parameter API. In this case, be careful that the values you use do not come directly from the screen.

はい、承知いたしました。以下の文書を英語に翻訳します。

## 4. Encryption of Confidential Information Stored in Access Logs

To improve the usability of access logs, some posted information is stored as URL parameters. These URL parameters are recorded in the access log.

For example, the processing of the login button on the screen below sends the User ID and Password to the server.

![image.png](../img/security/p7.png)

The access log for the login process shows the password in plain text as follows:

```js
var LG01_submit={};
LG01_submit.name="LG01 Login Authentication Process";
LG01_submit.paramsFormat={
	"#txt_uid":"required:true;display-name:User ID;",//Account
	"#txt_pwd":"required:true;display-name:Password;",//Password
};
LG01_submit.fire=function(params){
```

127.0.0.1 - - [15/Aug/2025:09:58:30 +0900] "POST /skeletonSample/efwServlet?eventId=LG01_submit&lang=jp&params=%7B%22%23txt_uid%22%3A%22admin%22%2C%22%23txt_pwd%22%3A%22<font color=red>11111</font>%22 HTTP/1.1" 200 413

If you want to encrypt confidential information in the access log, you can achieve this by setting the `secure` attribute for the confidential information field in the event JS file.

```js
var LG01_submit={};
LG01_submit.name="LG01 Login Authentication Process";
LG01_submit.paramsFormat={
	"#txt_uid":"required:true;display-name:User ID;",//Account
	"#txt_pwd":"required:true;display-name:Password;secure:true;",//Password
};
LG01_submit.fire=function(params){
```
127.0.0.1 - - [15/Aug/2025:10:56:02 +0900] "POST /skeletonSample/efwServlet?eventId=LG01_submit&lang=jp&params=%7B%22%23txt_uid%22%3A%22admin%22%2C%22%23txt_pwd%22%3A%22<font color=red>MTExMTE%3D</font>%22 HTTP/1.1" 200 83

