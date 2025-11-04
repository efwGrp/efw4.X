"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * efw framework server library
 * @author Chang Kejun
 */
///////////////////////////////////////////////////////////////////////////////
//The classes of the framework
///////////////////////////////////////////////////////////////////////////////
/**
 * Load all classes
 */
load("classpath:efw/resources/nashorn/nashorn-ext-for-es6.min.js");

load("classpath:efw/resources/modules/efw.js.ext.js");
load("classpath:efw/resources/modules/efw.server.js");
load("classpath:efw/resources/modules/efw.js");

//closeTimer4doDestroyはefw.nashorn.ext.jsに定義している
//その実行はefw.jsです。
load("classpath:efw/resources/nashorn/efw.nashorn.ext.js");
load("classpath:efw/resources/nashorn/efw.server.threads.js");

load("classpath:efw/resources/modules/efw.server.brms.js");
load("classpath:efw/resources/modules/efw.server.cmd.js");
load("classpath:efw/resources/modules/efw.server.context.js");
load("classpath:efw/resources/modules/efw.server.cookie.js");
load("classpath:efw/resources/modules/efw.server.db.js");
load("classpath:efw/resources/modules/efw.server.event.js");
load("classpath:efw/resources/modules/efw.server.file.js");
load("classpath:efw/resources/modules/efw.server.format.js");
load("classpath:efw/resources/modules/efw.server.mail.js");
load("classpath:efw/resources/modules/efw.server.messages.js");
load("classpath:efw/resources/modules/efw.server.properties.js");
load("classpath:efw/resources/modules/efw.server.request.js");
load("classpath:efw/resources/modules/efw.server.rest.js");
load("classpath:efw/resources/modules/efw.server.session.js");

load("classpath:efw/resources/classes/efw.server.batch.js");
load("classpath:efw/resources/classes/efw.server.binary.js");
load("classpath:efw/resources/classes/efw.server.csv.js");
load("classpath:efw/resources/classes/efw.server.excel.js");
load("classpath:efw/resources/classes/efw.server.pdf.js");
load("classpath:efw/resources/classes/efw.server.record.js");
load("classpath:efw/resources/classes/efw.server.result.js");
load("classpath:efw/resources/classes/efw.server.txt.js");

load("classpath:efw/resources/elfinder/elfinder_achive.js");
load("classpath:efw/resources/elfinder/elfinder_checkRisk.js");
load("classpath:efw/resources/elfinder/elfinder_cmds.js");
load("classpath:efw/resources/elfinder/elfinder_download.js");
load("classpath:efw/resources/elfinder/elfinder_downloadFileList.js");
load("classpath:efw/resources/elfinder/elfinder_duplicate.js");
load("classpath:efw/resources/elfinder/elfinder_extract.js");
load("classpath:efw/resources/elfinder/elfinder_file.js");
load("classpath:efw/resources/elfinder/elfinder_ls.js");
load("classpath:efw/resources/elfinder/elfinder_mkdir.js");
load("classpath:efw/resources/elfinder/elfinder_mkfile.js");
load("classpath:efw/resources/elfinder/elfinder_open.js");
load("classpath:efw/resources/elfinder/elfinder_parents.js");
load("classpath:efw/resources/elfinder/elfinder_paste.js");
load("classpath:efw/resources/elfinder/elfinder_preview.js");
load("classpath:efw/resources/elfinder/elfinder_put.js");
load("classpath:efw/resources/elfinder/elfinder_rename.js");
load("classpath:efw/resources/elfinder/elfinder_rm.js");
load("classpath:efw/resources/elfinder/elfinder_size.js");
load("classpath:efw/resources/elfinder/elfinder_tree.js");
load("classpath:efw/resources/elfinder/elfinder_upload.js");
