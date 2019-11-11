<H1>Files List</H1>

<pre>
tomcat
├─lib
│  └─javax.mail-1.6.2.jar									//Java Mail jar.
└─webapps
        myWebApp											//The application folder. 
        ├─myPage.jsp
        ├─...
        ├─META-INF
        │  └─<a href="../release%20with%20sample/web%20application/META-INF/context.xml">context.xml</a>
        └─WEB-INF
            ├─classes
            │  └─<a href="properties_web.md">efw.properties</a>
            ├─efw
            │  ├─event										//Efw event folder
            │  │  ├─<a href="api_event.md">myEvent.js</a>
            │  │  └─...
            │  ├─mail										//Outside mail folder
            │  │  ├─<a href="api_mail.md">mails.xml</a>
            │  │  └─...
            │  ├─sql										//Outside sql folder
            │  │  ├─<a href="api_sql.md">mySqlGroup.xml</a>
            │  │  └─...
            │  ├─i18n										//Multi language folder
            │  │  ├─<a href="api_i18n.md">myLanguage.xml</a>
            │  │  └─...
            │  └─storage									//Storage folder
            │      └─...
            └─lib											//Lib folder
                ├─efw-4.#.###.jar
                ├─juniversalchardet-1.0.3.jar
                ├─jdbc.XXXXXX.jar
                └─poi_4.1.1_allinone.jar
</pre>
<h3>Java Mail JAR</h3>
You must put javax.mail.###.jar in the tomcat lib folder. Or the web app initialization will be wrong.

<h3>Application Folder</h3>
You can put jsp files here. It is not recommended to create sub jsp folder. If you do it, please remember to put a base tag in you jsp head, or the &lt;efw:Client> will be wrong.
<pre>
&lt;base href="/myWebApp/">
</pre>

<h3>Efw Event Folder</h3>
You should add your event files here.

<h3>Outside SQL Folder</h3>
You should add your sql defines here.

<h3>Outside Mail Folder</h3>
You should add your mail defines here.

<h3>Multi Language Folder</h3>
You should add your language resource here.

<h3>Context File</h3>
The context file contains the db resource define and the mail resource define.

<h3>Properties File</h3>
The properties file contains the setting to the web application.

<h3>Storage Folder</h3>
All files your application needs should be placed here. In your event programs, file and folder operating is relatived to the storage folder.

<h3>Lib Folder</h3>
All jars are here. You can put or replace the jars.