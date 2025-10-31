<%@ page language="java" contentType="application/javascript; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<%
String lang=request.getParameter("lang");
pageContext.setAttribute(efw.taglib.Client.EFW_I18N_LANG, lang, PageContext.REQUEST_SCOPE);
%>
/**** efw5.X Copyright 2025 efwGrp ****/
/**
 * The class to keep messages in client.
 * 
 * @author Chang Kejun
 */
if (typeof elFinder === 'function' && elFinder.prototype.i18) {
	elFinder.prototype.i18.<%=lang%> = {
		translator : "<efw:Msg key="ElFinder_translator" default="ElFinder"/>",
		language   : "<efw:Msg key="ElFinder_language" default="English"/>",
		direction  : "<efw:Msg key="ElFinder_direction" default="ltr"/>",
		dateFormat : "<efw:Msg key="ElFinder_dateFormat" default="M d, Y h:i A"/>", // Mar 13, 2012 05:27 PM
		fancyDateFormat : "<efw:Msg key="ElFinder_fancyDateFormat" default="$1 h:i A"/>", // will produce smth like: Today 12:25 PM
		messages   : {
			/********************************** errors **********************************/
			'error'                : "<efw:Msg key="ElFinder_error" default="Error"/>",
			'errUnknown'           : "<efw:Msg key="ElFinder_errUnknown" default="Unknown error."/>",
			'errUnknownCmd'        : "<efw:Msg key="ElFinder_errUnknownCmd" default="Unknown command."/>",
			'errJqui'              : "<efw:Msg key="ElFinder_errJqui" default="Invalid jQuery UI configuration. Selectable, draggable and droppable components must be included."/>",
			'errNode'              : "<efw:Msg key="ElFinder_errNode" default="elFinder requires DOM Element to be created."/>",
			'errURL'               : "<efw:Msg key="ElFinder_errURL" default="Invalid elFinder configuration! URL option is not set."/>",
			'errAccess'            : "<efw:Msg key="ElFinder_errAccess" default="Access denied."/>",
			'errConnect'           : "<efw:Msg key="ElFinder_errConnect" default="Unable to connect to backend."/>",
			'errAbort'             : "<efw:Msg key="ElFinder_errAbort" default="Connection aborted."/>",
			'errTimeout'           : "<efw:Msg key="ElFinder_errTimeout" default="Connection timeout."/>",
			'errNotFound'          : "<efw:Msg key="ElFinder_errNotFound" default="Backend not found."/>",
			'errResponse'          : "<efw:Msg key="ElFinder_errResponse" default="Invalid backend response."/>",
			'errConf'              : "<efw:Msg key="ElFinder_errConf" default="Invalid backend configuration."/>",
			'errJSON'              : "<efw:Msg key="ElFinder_errJSON" default="PHP JSON module not installed."/>",
			'errNoVolumes'         : "<efw:Msg key="ElFinder_errNoVolumes" default="Readable volumes not available."/>",
			'errCmdParams'         : "<efw:Msg key="ElFinder_errCmdParams" default="Invalid parameters for command \\\"$1\\\"."/>",
			'errDataNotJSON'       : "<efw:Msg key="ElFinder_errDataNotJSON" default="Data is not JSON."/>",
			'errDataEmpty'         : "<efw:Msg key="ElFinder_errDataEmpty" default="Data is empty."/>",
			'errCmdReq'            : "<efw:Msg key="ElFinder_errCmdReq" default="Backend request requires command name."/>",
			'errOpen'              : "<efw:Msg key="ElFinder_errOpen" default="Unable to open \\\"$1\\\"."/>",
			'errNotFolder'         : "<efw:Msg key="ElFinder_errNotFolder" default="Object is not a folder."/>",
			'errNotFile'           : "<efw:Msg key="ElFinder_errNotFile" default="Object is not a file."/>",
			'errRead'              : "<efw:Msg key="ElFinder_errRead" default="Unable to read \\\"$1\\\"."/>",
			'errWrite'             : "<efw:Msg key="ElFinder_errWrite" default="Unable to write into \\\"$1\\\"."/>",
			'errPerm'              : "<efw:Msg key="ElFinder_errPerm" default="Permission denied."/>",
			'errLocked'            : "<efw:Msg key="ElFinder_errLocked" default="\\\"$1\\\" is locked and can not be renamed, moved or removed."/>",
			'errExists'            : "<efw:Msg key="ElFinder_errExists" default="File named \\\"$1\\\" already exists."/>",
			'errInvName'           : "<efw:Msg key="ElFinder_errInvName" default="Invalid file name."/>",
			'errFolderNotFound'    : "<efw:Msg key="ElFinder_errFolderNotFound" default="Folder not found."/>",
			'errFileNotFound'      : "<efw:Msg key="ElFinder_errFileNotFound" default="File not found."/>",
			'errTrgFolderNotFound' : "<efw:Msg key="ElFinder_errTrgFolderNotFound" default="Target folder \\\"$1\\\" not found."/>",
			'errPopup'             : "<efw:Msg key="ElFinder_errPopup" default="Browser prevented opening popup window. To open file enable it in browser options."/>",
			'errMkdir'             : "<efw:Msg key="ElFinder_errMkdir" default="Unable to create folder \\\"$1\\\"."/>",
			'errMkfile'            : "<efw:Msg key="ElFinder_errMkfile" default="Unable to create file \\\"$1\\\"."/>",
			'errRename'            : "<efw:Msg key="ElFinder_errRename" default="Unable to rename \\\"$1\\\"."/>",
			'errCopyFrom'          : "<efw:Msg key="ElFinder_errCopyFrom" default="Copying files from volume \\\"$1\\\" not allowed."/>",
			'errCopyTo'            : "<efw:Msg key="ElFinder_errCopyTo" default="Copying files to volume \\\"$1\\\" not allowed."/>",
			'errMkOutLink'         : "<efw:Msg key="ElFinder_errMkOutLink" default="Unable to create a link to outside the volume root."/>", // from v2.1 added 03.10.2015
			'errUpload'            : "<efw:Msg key="ElFinder_errUpload" default="Upload error."/>",  // old name - errUploadCommon
			'errUploadFile'        : "<efw:Msg key="ElFinder_errUploadFile" default="Unable to upload \\\"$1\\\"."/>", // old name - errUpload
			'errUploadNoFiles'     : "<efw:Msg key="ElFinder_errUploadNoFiles" default="No files found for upload."/>",
			'errUploadTotalSize'   : "<efw:Msg key="ElFinder_errUploadTotalSize" default="Data exceeds the maximum allowed size."/>", // old name - errMaxSize
			'errUploadFileSize'    : "<efw:Msg key="ElFinder_errUploadFileSize" default="File exceeds maximum allowed size."/>", //  old name - errFileMaxSize
			'errUploadMime'        : "<efw:Msg key="ElFinder_errUploadMime" default="File type not allowed."/>",
			'errUploadTransfer'    : "<efw:Msg key="ElFinder_errUploadTransfer" default="\\\"$1\\\" transfer error."/>",
			'errUploadTemp'        : "<efw:Msg key="ElFinder_errUploadTemp" default="Unable to make temporary file for upload."/>", // from v2.1 added 26.09.2015
			'errNotReplace'        : "<efw:Msg key="ElFinder_errNotReplace" default="Object \\\"$1\\\" already exists at this location and can not be replaced by object with another type."/>", // new
			'errReplace'           : "<efw:Msg key="ElFinder_errReplace" default="Unable to replace \\\"$1\\\"."/>",
			'errSave'              : "<efw:Msg key="ElFinder_errSave" default="Unable to save \\\"$1\\\"."/>",
			'errCopy'              : "<efw:Msg key="ElFinder_errCopy" default="Unable to copy \\\"$1\\\"."/>",
			'errMove'              : "<efw:Msg key="ElFinder_errMove" default="Unable to move \\\"$1\\\"."/>",
			'errCopyInItself'      : "<efw:Msg key="ElFinder_errCopyInItself" default="Unable to copy \\\"$1\\\" into itself."/>",
			'errRm'                : "<efw:Msg key="ElFinder_errRm" default="Unable to remove \\\"$1\\\"."/>",
			'errRmSrc'             : "<efw:Msg key="ElFinder_errRmSrc" default="Unable remove source file(s)."/>",
			'errExtract'           : "<efw:Msg key="ElFinder_errExtract" default="Unable to extract files from \\\"$1\\\"."/>",
			'errArchive'           : "<efw:Msg key="ElFinder_errArchive" default="Unable to create archive."/>",
			'errArcType'           : "<efw:Msg key="ElFinder_errArcType" default="Unsupported archive type."/>",
			'errNoArchive'         : "<efw:Msg key="ElFinder_errNoArchive" default="File is not archive or has unsupported archive type."/>",
			'errCmdNoSupport'      : "<efw:Msg key="ElFinder_errCmdNoSupport" default="Backend does not support this command."/>",
			'errReplByChild'       : "<efw:Msg key="ElFinder_errReplByChild" default="The folder \\\"$1\\\" can\'t be replaced by an item it contains."/>",
			'errArcSymlinks'       : "<efw:Msg key="ElFinder_errArcSymlinks" default="For security reason denied to unpack archives contains symlinks or files with not allowed names."/>", // edited 24.06.2012
			'errArcMaxSize'        : "<efw:Msg key="ElFinder_errArcMaxSize" default="Archive files exceeds maximum allowed size."/>",
			'errResize'            : "<efw:Msg key="ElFinder_errResize" default="Unable to resize \\\"$1\\\"."/>",
			'errResizeDegree'      : "<efw:Msg key="ElFinder_errResizeDegree" default="Invalid rotate degree."/>",  // added 7.3.2013
			'errResizeRotate'      : "<efw:Msg key="ElFinder_errResizeRotate" default="Unable to rotate image."/>",  // added 7.3.2013
			'errResizeSize'        : "<efw:Msg key="ElFinder_errResizeSize" default="Invalid image size."/>",  // added 7.3.2013
			'errResizeNoChange'    : "<efw:Msg key="ElFinder_errResizeNoChange" default="Image size not changed."/>",  // added 7.3.2013
			'errUsupportType'      : "<efw:Msg key="ElFinder_errUsupportType" default="Unsupported file type."/>",
			'errNotUTF8Content'    : "<efw:Msg key="ElFinder_errNotUTF8Content" default="File \\\"$1\\\" is not in UTF-8 and cannot be edited."/>",  // added 9.11.2011
			'errNetMount'          : "<efw:Msg key="ElFinder_errNetMount" default="Unable to mount \\\"$1\\\"."/>", // added 17.04.2012
			'errNetMountNoDriver'  : "<efw:Msg key="ElFinder_errNetMountNoDriver" default="Unsupported protocol."/>",     // added 17.04.2012
			'errNetMountFailed'    : "<efw:Msg key="ElFinder_errNetMountFailed" default="Mount failed."/>",         // added 17.04.2012
			'errNetMountHostReq'   : "<efw:Msg key="ElFinder_errNetMountHostReq" default="Host required."/>", // added 18.04.2012
			'errSessionExpires'    : "<efw:Msg key="ElFinder_errSessionExpires" default="Your session has expired due to inactivity."/>",
			'errCreatingTempDir'   : "<efw:Msg key="ElFinder_errCreatingTempDir" default="Unable to create temporary directory: \\\"$1\\\""/>",
			'errFtpDownloadFile'   : "<efw:Msg key="ElFinder_errFtpDownloadFile" default="Unable to download file from FTP: \\\"$1\\\""/>",
			'errFtpUploadFile'     : "<efw:Msg key="ElFinder_errFtpUploadFile" default="Unable to upload file to FTP: \\\"$1\\\""/>",
			'errFtpMkdir'          : "<efw:Msg key="ElFinder_errFtpMkdir" default="Unable to create remote directory on FTP: \\\"$1\\\""/>",
			'errArchiveExec'       : "<efw:Msg key="ElFinder_errArchiveExec" default="Error while archiving files: \\\"$1\\\""/>",
			'errExtractExec'       : "<efw:Msg key="ElFinder_errExtractExec" default="Error while extracting files: \\\"$1\\\""/>",
			'errNetUnMount'        : "<efw:Msg key="ElFinder_errNetUnMount" default="Unable to unmount"/>", // from v2.1 added 30.04.2012
			'errConvUTF8'          : "<efw:Msg key="ElFinder_errConvUTF8" default="Not convertible to UTF-8"/>", // from v2.1 added 08.04.2014
			'errFolderUpload'      : "<efw:Msg key="ElFinder_errFolderUpload" default="Try the modern browser, If you\'d like to upload the folder."/>", // from v2.1 added 26.6.2015
			'errSearchTimeout'     : "<efw:Msg key="ElFinder_errSearchTimeout" default="Timed out while searching \\\"$1\\\". Search result is partial."/>", // from v2.1 added 12.1.2016
			'errReauthRequire'     : "<efw:Msg key="ElFinder_errReauthRequire" default="Re-authorization is required."/>", // from v2.1.10 added 24.3.2016
			'errMaxTargets'        : "<efw:Msg key="ElFinder_errMaxTargets" default="Max number of selectable items is $1."/>", // from v2.1.17 added 17.10.2016

			/******************************* commands names ********************************/
			'cmdarchive'   : "<efw:Msg key="ElFinder_cmdarchive" default="Create archive"/>",
			'cmdback'      : "<efw:Msg key="ElFinder_cmdback" default="Back"/>",
			'cmdcopy'      : "<efw:Msg key="ElFinder_cmdcopy" default="Copy"/>",
			'cmdcut'       : "<efw:Msg key="ElFinder_cmdcut" default="Cut"/>",
			'cmddownload'  : "<efw:Msg key="ElFinder_cmddownload" default="Download"/>",
			'cmdduplicate' : "<efw:Msg key="ElFinder_cmdduplicate" default="Duplicate"/>",
			'cmdedit'      : "<efw:Msg key="ElFinder_cmdedit" default="Edit file"/>",
			'cmdextract'   : "<efw:Msg key="ElFinder_cmdextract" default="Extract files from archive"/>",
			'cmdforward'   : "<efw:Msg key="ElFinder_cmdforward" default="Forward"/>",
			'cmdgetfile'   : "<efw:Msg key="ElFinder_cmdgetfile" default="Select files"/>",
			'cmdhelp'      : "<efw:Msg key="ElFinder_cmdhelp" default="About this software"/>",
			'cmdhome'      : "<efw:Msg key="ElFinder_cmdhome" default="Home"/>",
			'cmdinfo'      : "<efw:Msg key="ElFinder_cmdinfo" default="Get info"/>",
			'cmdmkdir'     : "<efw:Msg key="ElFinder_cmdmkdir" default="New folder"/>",
			'cmdmkdirin'   : "<efw:Msg key="ElFinder_cmdmkdirin" default="Into New Folder"/>", // from v2.1.7 added 19.2.2016
			'cmdmkfile'    : "<efw:Msg key="ElFinder_cmdmkfile" default="New text file"/>",
			'cmdopen'      : "<efw:Msg key="ElFinder_cmdopen" default="Open"/>",
			'cmdpaste'     : "<efw:Msg key="ElFinder_cmdpaste" default="Paste"/>",
			'cmdquicklook' : "<efw:Msg key="ElFinder_cmdquicklook" default="Preview"/>",
			'cmdreload'    : "<efw:Msg key="ElFinder_cmdreload" default="Reload"/>",
			'cmdrename'    : "<efw:Msg key="ElFinder_cmdrename" default="Rename"/>",
			'cmdrm'        : "<efw:Msg key="ElFinder_cmdrm" default="Delete"/>",
			'cmdsearch'    : "<efw:Msg key="ElFinder_cmdsearch" default="Find files"/>",
			'cmdup'        : "<efw:Msg key="ElFinder_cmdup" default="Go to parent directory"/>",
			'cmdupload'    : "<efw:Msg key="ElFinder_cmdupload" default="Upload files"/>",
			'cmdview'      : "<efw:Msg key="ElFinder_cmdview" default="View"/>",
			'cmdresize'    : "<efw:Msg key="ElFinder_cmdresize" default="Resize &amp; Rotate"/>",
			'cmdsort'      : "<efw:Msg key="ElFinder_cmdsort" default="Sort"/>",
			'cmdnetmount'  : "<efw:Msg key="ElFinder_cmdnetmount" default="Mount network volume"/>", // added 18.04.2012
			'cmdnetunmount': "<efw:Msg key="ElFinder_cmdnetunmount" default="Unmount"/>", // from v2.1 added 30.04.2012
			'cmdplaces'    : "<efw:Msg key="ElFinder_cmdplaces" default="To Places"/>", // added 28.12.2014
			'cmdchmod'     : "<efw:Msg key="ElFinder_cmdchmod" default="Change mode"/>", // from v2.1 added 20.6.2015
			'cmdopendir'   : "<efw:Msg key="ElFinder_cmdopendir" default="Open a folder"/>", // from v2.1 added 13.1.2016
			'cmdcolwidth'  : "<efw:Msg key="ElFinder_cmdcolwidth" default="Reset column width"/>", // from v2.1.13 added 12.06.2016
			'cmdfullscreen': "<efw:Msg key="ElFinder_cmdfullscreen" default="Full Screen"/>", // from v2.1.15 added 03.08.2016
			'cmdmove'      : "<efw:Msg key="ElFinder_cmdmove" default="Move"/>", // from v2.1.15 added 21.08.2016

			/*********************************** buttons ***********************************/
			'btnClose'  : "<efw:Msg key="ElFinder_btnClose" default="Close"/>",
			'btnSave'   : "<efw:Msg key="ElFinder_btnSave" default="Save"/>",
			'btnRm'     : "<efw:Msg key="ElFinder_btnRm" default="Remove"/>",
			'btnApply'  : "<efw:Msg key="ElFinder_btnApply" default="Apply"/>",
			'btnCancel' : "<efw:Msg key="ElFinder_btnCancel" default="Cancel"/>",
			'btnNo'     : "<efw:Msg key="ElFinder_btnNo" default="No"/>",
			'btnYes'    : "<efw:Msg key="ElFinder_btnYes" default="Yes"/>",
			'btnMount'  : "<efw:Msg key="ElFinder_btnMount" default="Mount"/>",  // added 18.04.2012
			'btnApprove': "<efw:Msg key="ElFinder_btnApprove" default="Goto $1 &amp; approve"/>", // from v2.1 added 26.04.2012
			'btnUnmount': "<efw:Msg key="ElFinder_btnUnmount" default="Unmount"/>", // from v2.1 added 30.04.2012
			'btnConv'   : "<efw:Msg key="ElFinder_btnConv" default="Convert"/>", // from v2.1 added 08.04.2014
			'btnCwd'    : "<efw:Msg key="ElFinder_btnCwd" default="Here"/>",      // from v2.1 added 22.5.2015
			'btnVolume' : "<efw:Msg key="ElFinder_btnVolume" default="Volume"/>",    // from v2.1 added 22.5.2015
			'btnAll'    : "<efw:Msg key="ElFinder_btnAll" default="All"/>",       // from v2.1 added 22.5.2015
			'btnMime'   : "<efw:Msg key="ElFinder_btnMime" default="MIME Type"/>", // from v2.1 added 22.5.2015
			'btnFileName': "<efw:Msg key="ElFinder_btnFileName" default="Filename"/>",  // from v2.1 added 22.5.2015
			'btnSaveClose': "<efw:Msg key="ElFinder_btnSaveClose" default="Save &amp; Close"/>", // from v2.1 added 12.6.2015
			'btnBackup' : "<efw:Msg key="ElFinder_btnBackup" default="Backup"/>", // fromv2.1 added 28.11.2015

			/******************************** notifications ********************************/
			'ntfopen'     : "<efw:Msg key="ElFinder_ntfopen" default="Open folder"/>",
			'ntffile'     : "<efw:Msg key="ElFinder_ntffile" default="Open file"/>",
			'ntfreload'   : "<efw:Msg key="ElFinder_ntfreload" default="Reload folder content"/>",
			'ntfmkdir'    : "<efw:Msg key="ElFinder_ntfmkdir" default="Creating directory"/>",
			'ntfmkfile'   : "<efw:Msg key="ElFinder_ntfmkfile" default="Creating files"/>",
			'ntfrm'       : "<efw:Msg key="ElFinder_ntfrm" default="Delete files"/>",
			'ntfcopy'     : "<efw:Msg key="ElFinder_ntfcopy" default="Copy files"/>",
			'ntfmove'     : "<efw:Msg key="ElFinder_ntfmove" default="Move files"/>",
			'ntfprepare'  : "<efw:Msg key="ElFinder_ntfprepare" default="Prepare to copy files"/>",
			'ntfrename'   : "<efw:Msg key="ElFinder_ntfrename" default="Rename files"/>",
			'ntfupload'   : "<efw:Msg key="ElFinder_ntfupload" default="Uploading files"/>",
			'ntfdownload' : "<efw:Msg key="ElFinder_ntfdownload" default="Downloading files"/>",
			'ntfsave'     : "<efw:Msg key="ElFinder_ntfsave" default="Save files"/>",
			'ntfarchive'  : "<efw:Msg key="ElFinder_ntfarchive" default="Creating archive"/>",
			'ntfextract'  : "<efw:Msg key="ElFinder_ntfextract" default="Extracting files from archive"/>",
			'ntfsearch'   : "<efw:Msg key="ElFinder_ntfsearch" default="Searching files"/>",
			'ntfresize'   : "<efw:Msg key="ElFinder_ntfresize" default="Resizing images"/>",
			'ntfsmth'     : "<efw:Msg key="ElFinder_ntfsmth" default="Doing something"/>",
			'ntfloadimg'  : "<efw:Msg key="ElFinder_ntfloadimg" default="Loading image"/>",
			'ntfnetmount' : "<efw:Msg key="ElFinder_ntfnetmount" default="Mounting network volume"/>", // added 18.04.2012
			'ntfnetunmount': "<efw:Msg key="ElFinder_ntfnetunmount" default="Unmounting network volume"/>", // from v2.1 added 30.04.2012
			'ntfdim'      : "<efw:Msg key="ElFinder_ntfdim" default="Acquiring image dimension"/>", // added 20.05.2013
			'ntfreaddir'  : "<efw:Msg key="ElFinder_ntfreaddir" default="Reading folder infomation"/>", // from v2.1 added 01.07.2013
			'ntfurl'      : "<efw:Msg key="ElFinder_ntfurl" default="Getting URL of link"/>", // from v2.1 added 11.03.2014
			'ntfchmod'    : "<efw:Msg key="ElFinder_ntfchmod" default="Changing file mode"/>", // from v2.1 added 20.6.2015
			'ntfpreupload': "<efw:Msg key="ElFinder_ntfpreupload" default="Verifying upload file name"/>", // from v2.1 added 31.11.2015
			'ntfzipdl'    : "<efw:Msg key="ElFinder_ntfzipdl" default="Creating a file for download"/>", // from v2.1.7 added 23.1.2016
			'ntfparents'  : "<efw:Msg key="ElFinder_ntfparents" default="Getting path infomation"/>", // from v2.1.17 added 2.11.2016
			'ntfchunkmerge': "<efw:Msg key="ElFinder_ntfchunkmerge" default="Processing the uploaded file"/>", // from v2.1.17 added 2.11.2016

			/************************************ dates **********************************/
			'dateUnknown' : "<efw:Msg key="ElFinder_dateUnknown" default="unknown"/>",
			'Today'       : "<efw:Msg key="ElFinder_Today" default="Today"/>",
			'Yesterday'   : "<efw:Msg key="ElFinder_Yesterday" default="Yesterday"/>",
			'msJan'       : "<efw:Msg key="ElFinder_msJan" default="Jan"/>",
			'msFeb'       : "<efw:Msg key="ElFinder_msFeb" default="Feb"/>",
			'msMar'       : "<efw:Msg key="ElFinder_msMar" default="Mar"/>",
			'msApr'       : "<efw:Msg key="ElFinder_msApr" default="Apr"/>",
			'msMay'       : "<efw:Msg key="ElFinder_msMay" default="May"/>",
			'msJun'       : "<efw:Msg key="ElFinder_msJun" default="Jun"/>",
			'msJul'       : "<efw:Msg key="ElFinder_msJul" default="Jul"/>",
			'msAug'       : "<efw:Msg key="ElFinder_msAug" default="Aug"/>",
			'msSep'       : "<efw:Msg key="ElFinder_msSep" default="Sep"/>",
			'msOct'       : "<efw:Msg key="ElFinder_msOct" default="Oct"/>",
			'msNov'       : "<efw:Msg key="ElFinder_msNov" default="Nov"/>",
			'msDec'       : "<efw:Msg key="ElFinder_msDec" default="Dec"/>",
			'January'     : "<efw:Msg key="ElFinder_January" default="January"/>",
			'February'    : "<efw:Msg key="ElFinder_February" default="February"/>",
			'March'       : "<efw:Msg key="ElFinder_March" default="March"/>",
			'April'       : "<efw:Msg key="ElFinder_April" default="April"/>",
			'May'         : "<efw:Msg key="ElFinder_May" default="May"/>",
			'June'        : "<efw:Msg key="ElFinder_June" default="June"/>",
			'July'        : "<efw:Msg key="ElFinder_July" default="July"/>",
			'August'      : "<efw:Msg key="ElFinder_August" default="August"/>",
			'September'   : "<efw:Msg key="ElFinder_September" default="September"/>",
			'October'     : "<efw:Msg key="ElFinder_October" default="October"/>",
			'November'    : "<efw:Msg key="ElFinder_November" default="November"/>",
			'December'    : "<efw:Msg key="ElFinder_December" default="December"/>",
			'Sunday'      : "<efw:Msg key="ElFinder_Sunday" default="Sunday"/>",
			'Monday'      : "<efw:Msg key="ElFinder_Monday" default="Monday"/>",
			'Tuesday'     : "<efw:Msg key="ElFinder_Tuesday" default="Tuesday"/>",
			'Wednesday'   : "<efw:Msg key="ElFinder_Wednesday" default="Wednesday"/>",
			'Thursday'    : "<efw:Msg key="ElFinder_Thursday" default="Thursday"/>",
			'Friday'      : "<efw:Msg key="ElFinder_Friday" default="Friday"/>",
			'Saturday'    : "<efw:Msg key="ElFinder_Saturday" default="Saturday"/>",
			'Sun'         : "<efw:Msg key="ElFinder_Sun" default="Sun"/>",
			'Mon'         : "<efw:Msg key="ElFinder_Mon" default="Mon"/>",
			'Tue'         : "<efw:Msg key="ElFinder_Tue" default="Tue"/>",
			'Wed'         : "<efw:Msg key="ElFinder_Wed" default="Wed"/>",
			'Thu'         : "<efw:Msg key="ElFinder_Thu" default="Thu"/>",
			'Fri'         : "<efw:Msg key="ElFinder_Fri" default="Fri"/>",
			'Sat'         : "<efw:Msg key="ElFinder_Sat" default="Sat"/>",

			/******************************** sort variants ********************************/
			'sortname'          : "<efw:Msg key="ElFinder_sortname" default="by name"/>",
			'sortkind'          : "<efw:Msg key="ElFinder_sortkind" default="by kind"/>",
			'sortsize'          : "<efw:Msg key="ElFinder_sortsize" default="by size"/>",
			'sortdate'          : "<efw:Msg key="ElFinder_sortdate" default="by date"/>",
			'sortFoldersFirst'  : "<efw:Msg key="ElFinder_sortFoldersFirst" default="Folders first"/>",
			'sortperm'          : "<efw:Msg key="ElFinder_sortperm" default="by permission"/>", // from v2.1.13 added 13.06.2016
			'sortmode'          : "<efw:Msg key="ElFinder_sortmode" default="by mode"/>",       // from v2.1.13 added 13.06.2016
			'sortowner'         : "<efw:Msg key="ElFinder_sortowner" default="by owner"/>",      // from v2.1.13 added 13.06.2016
			'sortgroup'         : "<efw:Msg key="ElFinder_sortgroup" default="by group"/>",      // from v2.1.13 added 13.06.2016
			'sortAlsoTreeview'  : "<efw:Msg key="ElFinder_sortAlsoTreeview" default="Also Treeview"/>",  // from v2.1.15 added 01.08.2016

			/********************************** new items **********************************/
			'untitled file.txt' : "<efw:Msg key="ElFinder_untitled file.txt" default="NewFile.txt"/>", // added 10.11.2015
			'untitled folder'   : "<efw:Msg key="ElFinder_untitled folder" default="NewFolder"/>",   // added 10.11.2015
			'Archive'           : "<efw:Msg key="ElFinder_Archive" default="NewArchive"/>",  // from v2.1 added 10.11.2015

			/********************************** messages **********************************/
			'confirmReq'      : "<efw:Msg key="ElFinder_confirmReq" default="Confirmation required"/>",
			'confirmRm'       : "<efw:Msg key="ElFinder_confirmRm" default="Are you sure you want to remove files?<br/>This cannot be undone!"/>",
			'confirmRepl'     : "<efw:Msg key="ElFinder_confirmRepl" default="Replace old file with new one?"/>",
			'confirmConvUTF8' : "<efw:Msg key="ElFinder_confirmConvUTF8" default="Not in UTF-8<br/>Convert to UTF-8?<br/>Contents become UTF-8 by saving after conversion."/>", // from v2.1 added 08.04.2014
			'confirmNonUTF8'  : "<efw:Msg key="ElFinder_confirmNonUTF8" default="Character encoding of this file couldn\'t be detected. It need to temporarily convert to UTF-8 for editting.<br/>Please select character encoding of this file."/>", // from v2.1.19 added 28.11.2016
			'confirmNotSave'  : "<efw:Msg key="ElFinder_confirmNotSave" default="It has been modified.<br/>Losing work if you do not save changes."/>", // from v2.1 added 15.7.2015
			'apllyAll'        : "<efw:Msg key="ElFinder_apllyAll" default="Apply to all"/>",
			'name'            : "<efw:Msg key="ElFinder_name" default="Name"/>",
			'size'            : "<efw:Msg key="ElFinder_size" default="Size"/>",
			'perms'           : "<efw:Msg key="ElFinder_perms" default="Permissions"/>",
			'modify'          : "<efw:Msg key="ElFinder_modify" default="Modified"/>",
			'kind'            : "<efw:Msg key="ElFinder_kind" default="Kind"/>",
			'read'            : "<efw:Msg key="ElFinder_read" default="read"/>",
			'write'           : "<efw:Msg key="ElFinder_write" default="write"/>",
			'noaccess'        : "<efw:Msg key="ElFinder_noaccess" default="no access"/>",
			'and'             : "<efw:Msg key="ElFinder_and" default="and"/>",
			'unknown'         : "<efw:Msg key="ElFinder_unknown" default="unknown"/>",
			'selectall'       : "<efw:Msg key="ElFinder_selectall" default="Select all files"/>",
			'selectfiles'     : "<efw:Msg key="ElFinder_selectfiles" default="Select file(s)"/>",
			'selectffile'     : "<efw:Msg key="ElFinder_selectffile" default="Select first file"/>",
			'selectlfile'     : "<efw:Msg key="ElFinder_selectlfile" default="Select last file"/>",
			'viewlist'        : "<efw:Msg key="ElFinder_viewlist" default="List view"/>",
			'viewicons'       : "<efw:Msg key="ElFinder_viewicons" default="Icons view"/>",
			'places'          : "<efw:Msg key="ElFinder_places" default="Places"/>",
			'calc'            : "<efw:Msg key="ElFinder_calc" default="Calculate"/>",
			'path'            : "<efw:Msg key="ElFinder_path" default="Path"/>",
			'aliasfor'        : "<efw:Msg key="ElFinder_aliasfor" default="Alias for"/>",
			'locked'          : "<efw:Msg key="ElFinder_locked" default="Locked"/>",
			'dim'             : "<efw:Msg key="ElFinder_dim" default="Dimensions"/>",
			'files'           : "<efw:Msg key="ElFinder_files" default="Files"/>",
			'folders'         : "<efw:Msg key="ElFinder_folders" default="Folders"/>",
			'items'           : "<efw:Msg key="ElFinder_items" default="Items"/>",
			'yes'             : "<efw:Msg key="ElFinder_yes" default="yes"/>",
			'no'              : "<efw:Msg key="ElFinder_no" default="no"/>",
			'link'            : "<efw:Msg key="ElFinder_link" default="Link"/>",
			'searcresult'     : "<efw:Msg key="ElFinder_searcresult" default="Search results"/>",
			'selected'        : "<efw:Msg key="ElFinder_selected" default="selected items"/>",
			'about'           : "<efw:Msg key="ElFinder_about" default="About"/>",
			'shortcuts'       : "<efw:Msg key="ElFinder_shortcuts" default="Shortcuts"/>",
			'help'            : "<efw:Msg key="ElFinder_help" default="Help"/>",
			'webfm'           : "<efw:Msg key="ElFinder_webfm" default="Web file manager"/>",
			'ver'             : "<efw:Msg key="ElFinder_ver" default="Version"/>",
			'protocolver'     : "<efw:Msg key="ElFinder_protocolver" default="protocol version"/>",
			'homepage'        : "<efw:Msg key="ElFinder_homepage" default="Project home"/>",
			'docs'            : "<efw:Msg key="ElFinder_docs" default="Documentation"/>",
			'github'          : "<efw:Msg key="ElFinder_github" default="Fork us on Github"/>",
			'twitter'         : "<efw:Msg key="ElFinder_twitter" default="Follow us on twitter"/>",
			'facebook'        : "<efw:Msg key="ElFinder_facebook" default="Join us on facebook"/>",
			'team'            : "<efw:Msg key="ElFinder_team" default="Team"/>",
			'chiefdev'        : "<efw:Msg key="ElFinder_chiefdev" default="chief developer"/>",
			'developer'       : "<efw:Msg key="ElFinder_developer" default="developer"/>",
			'contributor'     : "<efw:Msg key="ElFinder_contributor" default="contributor"/>",
			'maintainer'      : "<efw:Msg key="ElFinder_maintainer" default="maintainer"/>",
			'translator'      : "<efw:Msg key="ElFinder_translator" default="translator"/>",
			'icons'           : "<efw:Msg key="ElFinder_icons" default="Icons"/>",
			'dontforget'      : "<efw:Msg key="ElFinder_dontforget" default="and don\'t forget to take your towel"/>",
			'shortcutsof'     : "<efw:Msg key="ElFinder_shortcutsof" default="Shortcuts disabled"/>",
			'dropFiles'       : "<efw:Msg key="ElFinder_dropFiles" default="Drop files here"/>",
			'or'              : "<efw:Msg key="ElFinder_or" default="or"/>",
			'selectForUpload' : "<efw:Msg key="ElFinder_selectForUpload" default="Select files"/>",
			'moveFiles'       : "<efw:Msg key="ElFinder_moveFiles" default="Move files"/>",
			'copyFiles'       : "<efw:Msg key="ElFinder_copyFiles" default="Copy files"/>",
			'rmFromPlaces'    : "<efw:Msg key="ElFinder_rmFromPlaces" default="Remove from places"/>",
			'aspectRatio'     : "<efw:Msg key="ElFinder_aspectRatio" default="Aspect ratio"/>",
			'scale'           : "<efw:Msg key="ElFinder_scale" default="Scale"/>",
			'width'           : "<efw:Msg key="ElFinder_width" default="Width"/>",
			'height'          : "<efw:Msg key="ElFinder_height" default="Height"/>",
			'resize'          : "<efw:Msg key="ElFinder_resize" default="Resize"/>",
			'crop'            : "<efw:Msg key="ElFinder_crop" default="Crop"/>",
			'rotate'          : "<efw:Msg key="ElFinder_rotate" default="Rotate"/>",
			'rotate-cw'       : "<efw:Msg key="ElFinder_rotate-cw" default="Rotate 90 degrees CW"/>",
			'rotate-ccw'      : "<efw:Msg key="ElFinder_rotate-ccw" default="Rotate 90 degrees CCW"/>",
			'degree'          : "<efw:Msg key="ElFinder_degree" default="°"/>",
			'netMountDialogTitle' : "<efw:Msg key="ElFinder_netMountDialogTitle" default="Mount network volume"/>", // added 18.04.2012
			'protocol'            : "<efw:Msg key="ElFinder_protocol" default="Protocol"/>", // added 18.04.2012
			'host'                : "<efw:Msg key="ElFinder_host" default="Host"/>", // added 18.04.2012
			'port'                : "<efw:Msg key="ElFinder_port" default="Port"/>", // added 18.04.2012
			'user'                : "<efw:Msg key="ElFinder_user" default="User"/>", // added 18.04.2012
			'pass'                : "<efw:Msg key="ElFinder_pass" default="Password"/>", // added 18.04.2012
			'confirmUnmount'      : "<efw:Msg key="ElFinder_confirmUnmount" default="Are you unmount $1?"/>",  // from v2.1 added 30.04.2012
			'dropFilesBrowser': "<efw:Msg key="ElFinder_dropFilesBrowser" default="Drop or Paste files from browser"/>", // from v2.1 added 30.05.2012
			'dropPasteFiles'  : "<efw:Msg key="ElFinder_dropPasteFiles" default="Drop files, Paste URLs or images(clipboard) here"/>", // from v2.1 added 07.04.2014
			'encoding'        : "<efw:Msg key="ElFinder_encoding" default="Encoding"/>", // from v2.1 added 19.12.2014
			'locale'          : "<efw:Msg key="ElFinder_locale" default="Locale"/>",   // from v2.1 added 19.12.2014
			'searchTarget'    : "<efw:Msg key="ElFinder_searchTarget" default="Target: $1"/>",                // from v2.1 added 22.5.2015
			'searchMime'      : "<efw:Msg key="ElFinder_searchMime" default="Search by input MIME Type"/>", // from v2.1 added 22.5.2015
			'owner'           : "<efw:Msg key="ElFinder_owner" default="Owner"/>", // from v2.1 added 20.6.2015
			'group'           : "<efw:Msg key="ElFinder_group" default="Group"/>", // from v2.1 added 20.6.2015
			'other'           : "<efw:Msg key="ElFinder_other" default="Other"/>", // from v2.1 added 20.6.2015
			'execute'         : "<efw:Msg key="ElFinder_execute" default="Execute"/>", // from v2.1 added 20.6.2015
			'perm'            : "<efw:Msg key="ElFinder_perm" default="Permission"/>", // from v2.1 added 20.6.2015
			'mode'            : "<efw:Msg key="ElFinder_mode" default="Mode"/>", // from v2.1 added 20.6.2015
			'emptyFolder'     : "<efw:Msg key="ElFinder_emptyFolder" default="Folder is empty"/>", // from v2.1.6 added 30.12.2015
			'emptyFolderDrop' : "<efw:Msg key="ElFinder_emptyFolderDrop" default="Folder is empty\\A Drop to add items"/>", // from v2.1.6 added 30.12.2015
			'emptyFolderLTap' : "<efw:Msg key="ElFinder_emptyFolderLTap" default="Folder is empty\\A Long tap to add items"/>", // from v2.1.6 added 30.12.2015
			'quality'         : "<efw:Msg key="ElFinder_quality" default="Quality"/>", // from v2.1.6 added 5.1.2016
			'autoSync'        : "<efw:Msg key="ElFinder_autoSync" default="Auto sync"/>",  // from v2.1.6 added 10.1.2016
			'moveUp'          : "<efw:Msg key="ElFinder_moveUp" default="Move up"/>",  // from v2.1.6 added 18.1.2016
			'getLink'         : "<efw:Msg key="ElFinder_getLink" default="Get URL link"/>", // from v2.1.7 added 9.2.2016
			'selectedItems'   : "<efw:Msg key="ElFinder_selectedItems" default="Selected items ($1)"/>", // from v2.1.7 added 2.19.2016
			'folderId'        : "<efw:Msg key="ElFinder_folderId" default="Folder ID"/>", // from v2.1.10 added 3.25.2016
			'offlineAccess'   : "<efw:Msg key="ElFinder_offlineAccess" default="Allow offline access"/>", // from v2.1.10 added 3.25.2016
			'reAuth'          : "<efw:Msg key="ElFinder_reAuth" default="To re-authenticate"/>", // from v2.1.10 added 3.25.2016
			'nowLoading'      : "<efw:Msg key="ElFinder_nowLoading" default="Now loading..."/>", // from v2.1.12 added 4.26.2016
			'openMulti'       : "<efw:Msg key="ElFinder_openMulti" default="Open multiple files"/>", // from v2.1.12 added 5.14.2016
			'openMultiConfirm': "<efw:Msg key="ElFinder_openMultiConfirm" default="You are trying to open the $1 files. Are you sure you want to open in browser?"/>", // from v2.1.12 added 5.14.2016
			'emptySearch'     : "<efw:Msg key="ElFinder_emptySearch" default="Search results is empty in search target."/>", // from v2.1.12 added 5.16.2016
			'editingFile'     : "<efw:Msg key="ElFinder_editingFile" default="It is editing a file."/>", // from v2.1.13 added 6.3.2016
			'hasSelected'     : "<efw:Msg key="ElFinder_hasSelected" default="You have selected $1 items."/>", // from v2.1.13 added 6.3.2016
			'hasClipboard'    : "<efw:Msg key="ElFinder_hasClipboard" default="You have $1 items in the clipboard."/>", // from v2.1.13 added 6.3.2016
			'incSearchOnly'   : "<efw:Msg key="ElFinder_incSearchOnly" default="Incremental search is only from the current view."/>", // from v2.1.13 added 6.30.2016
			'reinstate'       : "<efw:Msg key="ElFinder_reinstate" default="Reinstate"/>", // from v2.1.15 added 3.8.2016
			'complete'        : "<efw:Msg key="ElFinder_complete" default="$1 complete"/>", // from v2.1.15 added 21.8.2016
			'contextmenu'     : "<efw:Msg key="ElFinder_contextmenu" default="Context menu"/>", // from v2.1.15 added 9.9.2016
			'pageTurning'     : "<efw:Msg key="ElFinder_pageTurning" default="Page turning"/>", // from v2.1.15 added 10.9.2016
			'volumeRoots'     : "<efw:Msg key="ElFinder_volumeRoots" default="Volume roots"/>", // from v2.1.16 added 16.9.2016
			'reset'           : "<efw:Msg key="ElFinder_reset" default="Reset"/>", // from v2.1.16 added 1.10.2016
			'bgcolor'         : "<efw:Msg key="ElFinder_bgcolor" default="Background color"/>", // from v2.1.16 added 1.10.2016
			'colorPicker'     : "<efw:Msg key="ElFinder_colorPicker" default="Color picker"/>", // from v2.1.16 added 1.10.2016
			'8pxgrid'         : "<efw:Msg key="ElFinder_8pxgrid" default="8px Grid"/>", // from v2.1.16 added 4.10.2016
			'enabled'         : "<efw:Msg key="ElFinder_enabled" default="Enabled"/>", // from v2.1.16 added 4.10.2016
			'disabled'        : "<efw:Msg key="ElFinder_disabled" default="Disabled"/>", // from v2.1.16 added 4.10.2016
			'emptyIncSearch'  : "<efw:Msg key="ElFinder_emptyIncSearch" default="Search results is empty in current view.\\APress [Enter] to expand search target."/>", // from v2.1.16 added 5.10.2016
			'textLabel'       : "<efw:Msg key="ElFinder_textLabel" default="Text label"/>", // from v2.1.17 added 13.10.2016
			'minsLeft'        : "<efw:Msg key="ElFinder_minsLeft" default="$1 mins left"/>", // from v2.1.17 added 13.11.2016
			'openAsEncoding'  : "<efw:Msg key="ElFinder_openAsEncoding" default="Reopen with selected encoding"/>", // from v2.1.19 added 2.12.2016
			'saveAsEncoding'  : "<efw:Msg key="ElFinder_saveAsEncoding" default="Save with the selected encoding"/>", // from v2.1.19 added 2.12.2016
			'selectFolder'    : "<efw:Msg key="ElFinder_selectFolder" default="Select folder"/>", // from v2.1.20 added 13.12.2016

			/********************************** mimetypes **********************************/
			'kindUnknown'     : "<efw:Msg key="ElFinder_kindUnknown" default="Unknown"/>",
			'kindRoot'        : "<efw:Msg key="ElFinder_kindRoot" default="Volume Root"/>", // from v2.1.16 added 16.10.2016
			'kindFolder'      : "<efw:Msg key="ElFinder_kindFolder" default="Folder"/>",
			'kindAlias'       : "<efw:Msg key="ElFinder_kindAlias" default="Alias"/>",
			'kindAliasBroken' : "<efw:Msg key="ElFinder_kindAliasBroken" default="Broken alias"/>",
			// applications
			'kindApp'         : "<efw:Msg key="ElFinder_kindApp" default="Application"/>",
			'kindPostscript'  : "<efw:Msg key="ElFinder_kindPostscript" default="Postscript document"/>",
			'kindMsOffice'    : "<efw:Msg key="ElFinder_kindMsOffice" default="Microsoft Office document"/>",
			'kindMsWord'      : "<efw:Msg key="ElFinder_kindMsWord" default="Microsoft Word document"/>",
			'kindMsExcel'     : "<efw:Msg key="ElFinder_kindMsExcel" default="Microsoft Excel document"/>",
			'kindMsPP'        : "<efw:Msg key="ElFinder_kindMsPP" default="Microsoft Powerpoint presentation"/>",
			'kindOO'          : "<efw:Msg key="ElFinder_kindOO" default="Open Office document"/>",
			'kindAppFlash'    : "<efw:Msg key="ElFinder_kindAppFlash" default="Flash application"/>",
			'kindPDF'         : "<efw:Msg key="ElFinder_kindPDF" default="Portable Document Format (PDF)"/>",
			'kindTorrent'     : "<efw:Msg key="ElFinder_kindTorrent" default="Bittorrent file"/>",
			'kind7z'          : "<efw:Msg key="ElFinder_kind7z" default="7z archive"/>",
			'kindTAR'         : "<efw:Msg key="ElFinder_kindTAR" default="TAR archive"/>",
			'kindGZIP'        : "<efw:Msg key="ElFinder_kindGZIP" default="GZIP archive"/>",
			'kindBZIP'        : "<efw:Msg key="ElFinder_kindBZIP" default="BZIP archive"/>",
			'kindXZ'          : "<efw:Msg key="ElFinder_kindXZ" default="XZ archive"/>",
			'kindZIP'         : "<efw:Msg key="ElFinder_kindZIP" default="ZIP archive"/>",
			'kindRAR'         : "<efw:Msg key="ElFinder_kindRAR" default="RAR archive"/>",
			'kindJAR'         : "<efw:Msg key="ElFinder_kindJAR" default="Java JAR file"/>",
			'kindTTF'         : "<efw:Msg key="ElFinder_kindTTF" default="True Type font"/>",
			'kindOTF'         : "<efw:Msg key="ElFinder_kindOTF" default="Open Type font"/>",
			'kindRPM'         : "<efw:Msg key="ElFinder_kindRPM" default="RPM package"/>",
			// texts
			'kindText'        : "<efw:Msg key="ElFinder_kindText" default="Text document"/>",
			'kindTextPlain'   : "<efw:Msg key="ElFinder_kindTextPlain" default="Plain text"/>",
			'kindPHP'         : "<efw:Msg key="ElFinder_kindPHP" default="PHP source"/>",
			'kindCSS'         : "<efw:Msg key="ElFinder_kindCSS" default="Cascading style sheet"/>",
			'kindHTML'        : "<efw:Msg key="ElFinder_kindHTML" default="HTML document"/>",
			'kindJS'          : "<efw:Msg key="ElFinder_kindJS" default="Javascript source"/>",
			'kindRTF'         : "<efw:Msg key="ElFinder_kindRTF" default="Rich Text Format"/>",
			'kindC'           : "<efw:Msg key="ElFinder_kindC" default="C source"/>",
			'kindCHeader'     : "<efw:Msg key="ElFinder_kindCHeader" default="C header source"/>",
			'kindCPP'         : "<efw:Msg key="ElFinder_kindCPP" default="C++ source"/>",
			'kindCPPHeader'   : "<efw:Msg key="ElFinder_kindCPPHeader" default="C++ header source"/>",
			'kindShell'       : "<efw:Msg key="ElFinder_kindShell" default="Unix shell script"/>",
			'kindPython'      : "<efw:Msg key="ElFinder_kindPython" default="Python source"/>",
			'kindJava'        : "<efw:Msg key="ElFinder_kindJava" default="Java source"/>",
			'kindRuby'        : "<efw:Msg key="ElFinder_kindRuby" default="Ruby source"/>",
			'kindPerl'        : "<efw:Msg key="ElFinder_kindPerl" default="Perl script"/>",
			'kindSQL'         : "<efw:Msg key="ElFinder_kindSQL" default="SQL source"/>",
			'kindXML'         : "<efw:Msg key="ElFinder_kindXML" default="XML document"/>",
			'kindAWK'         : "<efw:Msg key="ElFinder_kindAWK" default="AWK source"/>",
			'kindCSV'         : "<efw:Msg key="ElFinder_kindCSV" default="Comma separated values"/>",
			'kindDOCBOOK'     : "<efw:Msg key="ElFinder_kindDOCBOOK" default="Docbook XML document"/>",
			'kindMarkdown'    : "<efw:Msg key="ElFinder_kindMarkdown" default="Markdown text"/>", // added 20.7.2015
			// images
			'kindImage'       : "<efw:Msg key="ElFinder_kindImage" default="Image"/>",
			'kindBMP'         : "<efw:Msg key="ElFinder_kindBMP" default="BMP image"/>",
			'kindJPEG'        : "<efw:Msg key="ElFinder_kindJPEG" default="JPEG image"/>",
			'kindGIF'         : "<efw:Msg key="ElFinder_kindGIF" default="GIF Image"/>",
			'kindPNG'         : "<efw:Msg key="ElFinder_kindPNG" default="PNG Image"/>",
			'kindTIFF'        : "<efw:Msg key="ElFinder_kindTIFF" default="TIFF image"/>",
			'kindTGA'         : "<efw:Msg key="ElFinder_kindTGA" default="TGA image"/>",
			'kindPSD'         : "<efw:Msg key="ElFinder_kindPSD" default="Adobe Photoshop image"/>",
			'kindXBITMAP'     : "<efw:Msg key="ElFinder_kindXBITMAP" default="X bitmap image"/>",
			'kindPXM'         : "<efw:Msg key="ElFinder_kindPXM" default="Pixelmator image"/>",
			// media
			'kindAudio'       : "<efw:Msg key="ElFinder_kindAudio" default="Audio media"/>",
			'kindAudioMPEG'   : "<efw:Msg key="ElFinder_kindAudioMPEG" default="MPEG audio"/>",
			'kindAudioMPEG4'  : "<efw:Msg key="ElFinder_kindAudioMPEG4" default="MPEG-4 audio"/>",
			'kindAudioMIDI'   : "<efw:Msg key="ElFinder_kindAudioMIDI" default="MIDI audio"/>",
			'kindAudioOGG'    : "<efw:Msg key="ElFinder_kindAudioOGG" default="Ogg Vorbis audio"/>",
			'kindAudioWAV'    : "<efw:Msg key="ElFinder_kindAudioWAV" default="WAV audio"/>",
			'AudioPlaylist'   : "<efw:Msg key="ElFinder_AudioPlaylist" default="MP3 playlist"/>",
			'kindVideo'       : "<efw:Msg key="ElFinder_kindVideo" default="Video media"/>",
			'kindVideoDV'     : "<efw:Msg key="ElFinder_kindVideoDV" default="DV movie"/>",
			'kindVideoMPEG'   : "<efw:Msg key="ElFinder_kindVideoMPEG" default="MPEG movie"/>",
			'kindVideoMPEG4'  : "<efw:Msg key="ElFinder_kindVideoMPEG4" default="MPEG-4 movie"/>",
			'kindVideoAVI'    : "<efw:Msg key="ElFinder_kindVideoAVI" default="AVI movie"/>",
			'kindVideoMOV'    : "<efw:Msg key="ElFinder_kindVideoMOV" default="Quick Time movie"/>",
			'kindVideoWM'     : "<efw:Msg key="ElFinder_kindVideoWM" default="Windows Media movie"/>",
			'kindVideoFlash'  : "<efw:Msg key="ElFinder_kindVideoFlash" default="Flash movie"/>",
			'kindVideoMKV'    : "<efw:Msg key="ElFinder_kindVideoMKV" default="Matroska movie"/>",
			'kindVideoOGG'    : "<efw:Msg key="ElFinder_kindVideoOGG" default="Ogg movie"/>",
			/********************************** mimetypes **********************************/
			'downloadFileList': "<efw:Msg key="ElFinder_downloadFileList" default="Download file list"/>",
		}
	};
}
