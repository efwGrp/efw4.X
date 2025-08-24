var MST01_upload={};
MST01_upload.name="MST01ユーザ アップロード";
/**
 * パラメーターフォーマット
 */
MST01_upload.paramsFormat={};
/**
 * アップロードイベント実行関数
 */
MST01_upload.fire=function(params){
    // 社員アップロードダイアログの初期化
    return (new Result())
    .eval("$('.file').val('');")                                                                    // ファイル選択を空白にする
    .eval("MST01_uploaddialog.dialog('open')");                                                          // 社員アップロードダイアログをオープンする
};

