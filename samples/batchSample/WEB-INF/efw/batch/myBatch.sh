#!/bin/sh
jdk=/usr/java/jdk1.8.0_211-amd64/bin
export WEBHOME=/usr/tomcat9/webapps/batchSample
export PROPERTIES=$WEBHOME/WEB-INF/classes/batch.properties

LIB=$WEBHOME/WEB-INF/lib
TOMCATLIB=/usr/tomcat9/lib
export CLASSPATH=$WEBHOME/WEB-INF/classes:$LIB/efw-4.0.000.jar:$LIB/postgresql-42.2.6.jar:$TOMCATLIB/javax.mail-1.6.2.jar

sysDate=$(date "+%Y/%m/%d")
$jdk/java efw.efwBatch "{\"eventId\":\"myBatchEvent\",\"params\":{\"sysDate\":\"$sysDate\"}}" >> /usr/tomcat9/logs/myBatch.log 2>&1
