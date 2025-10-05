@echo on
set JDK=C:\EFW_ALL\jdk-21.0.4\bin
set TOMCAT=C:\EFW_ALL\apache-tomcat-7.0.109
set WEBHOME=%TOMCAT%\webapps\helloworld
set PROPERTIES=%WEBHOME%\WEB-INF\classes\batch.properties
set CLASSPATH=%WEBHOME%\WEB-INF\classes;%WEBHOME%\WEB-INF\lib\*;%TOMCAT%\lib\javax.mail-1.6.2.jar;%TOMCAT%\lib\javax.activation-1.2.0.jar;
set sysDate=%date%
%JDK%\java efw.efwBatch "{\"eventId\":\"helloBatch\",\"params\":{\"sysDate\":\"%sysDate%\"}}" 
rem >> %TOMCAT%\logs\helloBatch.log  2>&1
pause