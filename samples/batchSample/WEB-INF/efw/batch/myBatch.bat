@echo off
set jdk=C:\EFW_ALL\jdk1.8.0_171\bin
set WEBHOME=C:\EFW_ALL\apache-tomcat-9.0.24\webapps\batchSample
set PROPERTIES=%WEBHOME%\WEB-INF\classes\batch.properties

set LIB=%WEBHOME%\WEB-INF\lib
set TOMCATLIB=C:\EFW_ALL\apache-tomcat-9.0.24\lib
set CLASSPATH=%WEBHOME%\WEB-INF\classes;%LIB%\efw-4.0.000.jar;%LIB%\postgresql-42.2.6.jar;%TOMCATLIB%\javax.mail-1.6.2.jar

set sysDate=%date%
%jdk%\java efw.efwBatch "{\"eventId\":\"myBatchEvent\",\"params\":{\"sysDate\":\"%sysDate%\"}}" >> C:\EFW_ALL\apache-tomcat-9.0.24\logs\myBatch.log  2>&1
pause