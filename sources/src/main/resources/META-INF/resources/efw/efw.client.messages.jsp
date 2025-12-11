<%@ page language="java" contentType="application/javascript; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<%
String lang=request.getParameter("lang");
pageContext.setAttribute(efw.taglib.Client.EFW_I18N_LANG, lang, PageContext.REQUEST_SCOPE);
%>
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * The class to keep messages in client.
 * 
 * @author Chang Kejun
 */
var EfwClientMessages = function() {
};
EfwClientMessages.prototype = {
	OtherErrorException : "<efw:Msg key="OtherErrorException" default="An unexpected error has occurred."/>",
	CommunicationErrorException : "<efw:msg key="CommunicationErrorException" default="A communication error has occurred. Do you want to retry?"/>",
	EventIsBusyException :"<efw:Msg key="EventIsBusyException" default="The function is crowded. Please wait."/>",
	RuntimeErrorException : "<efw:Msg key="RuntimeErrorException" default="A runtime error has occurred.\n\neventId={eventId}\nmessage={message}"/>",
	ParamsFormatErrorException : "<efw:Msg key="ParamsFormatErrorException" default="The event parameter definition is incorrect.\n\neventId={eventId}"/>",
	ResultValuesErrorException : "<efw:Msg key="ResultValuesErrorException" default="The data for display is not correct.\n\neventId={eventId}"/>",
	ResultActionsErrorException : "<efw:Msg key="ResultActionsErrorException" default="The data for action is not correct.\n\neventId={eventId}"/>",
	AlertDialogTitle : "<efw:Msg key="AlertDialogTitle" default="Message"/>",
	AlertDialogOK : "<efw:Msg key="AlertDialogOK" default="OK"/>",
	WaitDialogTitle : "<efw:Msg key="WaitDialogTitle" default="Busy"/>",
	PreviewDialogTitle: "<efw:Msg key="PreviewDialogTitle" default="Preview"/>",
	ProgressDialogTitle:"<efw:Msg key="ProgressDialogTitle" default="Progress"/>",
};
