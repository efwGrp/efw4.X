<H1>Context XML</H1>
This example of context xml is compatible in apache-tomcat7 or higher version.
Be sure to add the resources following your system rules if it is not tomcat.<br>

<pre>
[webApplication]/META-INF/context.xml
------------------------------------
&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;!DOCTYPE Context>
&lt;Context>
&lt;!-- Database -->
	&lt;Resource
		name				=	"jdbc/efw"
		auth				=	"Container"
		type				=	"javax.sql.DataSource"
		driverClassName	 =	"org.postgresql.Driver"
		url				 =	"jdbc:postgresql://localhost:5432/efw"
		username			=	"username"
		password			=	"password"
		maxActive		   =	"100"
		maxIdle		 	=	"20"
		maxWait		 	=	"10"
	/>
	&lt;Resource
		name				=	"jdbc/efw2"
		auth				=	"Container"
		type				=	"javax.sql.DataSource"
		driverClassName	 =	"org.postgresql.Driver"
		url				 =	"jdbc:postgresql://localhost:5432/efw2"
		username			=	"username"
		password			=	"password"
		maxActive		   =	"100"
		maxIdle			 =	"20"
		maxWait			 =	"10"
	/>
	.
	.
	.
&lt;!-- Mail -->
	&lt;Resource
        name       	    	 	=    "mail/efw" 
        auth       	    	 	=    "Container"
        type       	   	  	=    "javax.mail.Session"
        username   	    	 	=    ""
        password   	    		 =    ""
        mail.debug 	   	      =    "false"
        mail.user  	   	      =    ""
        mail.from  	   	      =    "admin@test.co.jp"
        mail.transport.protocol 	=	"smtp" 
        mail.smtp.host    		  =    "127.0.0.1"
        mail.smtp.auth    		  =    "false"
        mail.smtp.port    		  =    "25"
        mail.smtp.starttls.enable   =	"true"
        description        		 =    "E-Mail Resource"
    />
&lt;/Context>
</pre>
<h2>Database Resource</h2>

The default one must be named "jdbc/efw". It can be called by <a href="db.select.md">db.select</a> ,
 <a href="db.change.md">db.change</a> and <a href="db.master.md">db.master</a> without the jdbcResourceName param.
If you need some addition database, add the database resource with another name. In this way, you must call the db functions with the jdbcResourceName param.<br>
<br>
For example,<br>
<pre>
db.select(groupId, sqlId, params)		//using the default db resource "jdbc/efw"
db.select(groupId, sqlId, params, "jdbc/efw2")	//using the addition db resource "jdbc/efw2"
</pre>


<h2>Mail Resource</h2>

<h3>name</h3>
If <a href="mail.send.md">mail.send</a> is called in your program, the mail resource must be set up with the name "mail/efw".
