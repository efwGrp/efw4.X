#!/bin/sh
JDK=/usr/java/jdk-21.0.4-amd64/bin
TOMCAT=/usr/tomcat9
export WEBHOME=$TOMCAT/webapps/helloworld
export PROPERTIES=$WEBHOME/WEB-INF/classes/batch.properties
export CLASSPATH=$WEBHOME/WEB-INF/classes:$WEBHOME/WEB-INF/lib/*:$TOMCAT/lib/*

sysDate=$(date "+%Y/%m/%d")
$JDK/java efw.efwBatch "{\"eventId\":\"helloBatch\",\"params\":{\"sysDate\":\"$sysDate\"}}" >> $TOMCAT/logs/helloBatch.log 2>&1
