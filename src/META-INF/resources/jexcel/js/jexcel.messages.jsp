<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<%
String lang=request.getParameter("lang");
pageContext.setAttribute(efw.taglib.Client.EFW_I18N_LANG, lang);
%>
/**** efw4.X Copyright 2020 efwGrp ****/
/**
 * The class to keep messages in client.
 * 
 * @author Chang Kejun
 */
var jexcel_messages={
	noRecordsFound			: "<efw:Msg key="JExcel_noRecordsFound" default="No records found"/>",
	showingPage				: "<efw:Msg key="JExcel_showingPage" default="Showing page {0} of {1} entries"/>",
	show					: "<efw:Msg key="JExcel_show" default="Show "/>",
	search					: "<efw:Msg key="JExcel_search" default="Search"/>",
	entries					: "<efw:Msg key="JExcel_entries" default=" entries"/>",
	columnName				: "<efw:Msg key="JExcel_columnName" default="Column name"/>",
	insertANewColumnBefore	: "<efw:Msg key="JExcel_insertANewColumnBefore" default="Insert a new column before"/>",
	insertANewColumnAfter	: "<efw:Msg key="JExcel_insertANewColumnAfter" default="Insert a new column after"/>",
	deleteSelectedColumns	: "<efw:Msg key="JExcel_deleteSelectedColumns" default="Delete selected columns"/>",
	renameThisColumn		: "<efw:Msg key="JExcel_renameThisColumn" default="Rename this column"/>",
	orderAscending			: "<efw:Msg key="JExcel_orderAscending" default="Order ascending"/>",
	orderDescending			: "<efw:Msg key="JExcel_orderDescending" default="Order descending"/>",
	insertANewRowBefore		: "<efw:Msg key="JExcel_insertANewRowBefore" default="Insert a new row before"/>",
	insertANewRowAfter		: "<efw:Msg key="JExcel_insertANewRowAfter" default="Insert a new row after"/>",
	deleteSelectedRows		: "<efw:Msg key="JExcel_deleteSelectedRows" default="Delete selected rows"/>",
	editComments			: "<efw:Msg key="JExcel_editComments" default="Edit comments"/>",
	addComments				: "<efw:Msg key="JExcel_addComments" default="Add comments"/>",
	comments				: "<efw:Msg key="JExcel_comments" default="Comments"/>",
	clearComments			: "<efw:Msg key="JExcel_clearComments" default="Clear comments"/>",
	copy					: "<efw:Msg key="JExcel_copy" default="Copy..."/>",
	paste					: "<efw:Msg key="JExcel_paste" default="Paste..."/>",
	saveAs					: "<efw:Msg key="JExcel_saveAs" default="Save as..."/>",
	about					: "<efw:Msg key="JExcel_about" default="About"/>",
	areYouSureToDeleteTheSelectedRows						: "<efw:Msg key="JExcel_areYouSureToDeleteTheSelectedRows" default="Are you sure to delete the selected rows?"/>",
	areYouSureToDeleteTheSelectedColumns					: "<efw:Msg key="JExcel_areYouSureToDeleteTheSelectedColumns" default="Are you sure to delete the selected columns?"/>",
	thisActionWillDestroyAnyExistingMergedCellsAreYouSure	: "<efw:Msg key="JExcel_thisActionWillDestroyAnyExistingMergedCellsAreYouSure" default="This action will destroy any existing merged cells. Are you sure?"/>",
	thisActionWillClearYourSearchResultsAreYouSure			: "<efw:Msg key="JExcel_thisActionWillClearYourSearchResultsAreYouSure" default="This action will clear your search results. Are you sure?"/>",
	thereIsAConflictWithAnotherMergedCell					: "<efw:Msg key="JExcel_thereIsAConflictWithAnotherMergedCell" default="There is a conflict with another merged cell"/>",
	invalidMergeProperties	: "<efw:Msg key="JExcel_invalidMergeProperties" default="Invalid merged properties"/>",
	cellAlreadyMerged		: "<efw:Msg key="JExcel_cellAlreadyMerged" default="Cell already merged"/>",
	noCellsSelected			: "<efw:Msg key="JExcel_noCellsSelected" default="No cells selected"/>",
};