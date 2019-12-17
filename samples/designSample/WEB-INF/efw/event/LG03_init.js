var LG03_init={};
LG03_init.name="LG03 初期化";
/**
 * パラメーターフォーマット
 */
LG03_init.paramsFormat={
};
/**
 * 認証処理関数
 */
LG03_init.fire=function(params){
    //session値取得
    var initFlag = session.get("INITFLAG");
    //パスワードは修正していたかどうか判断する。 
    if(initFlag == '1'){
        return (new Result())
        .runat("#LG03")
        .withdata({
            "#LG03top" : "初回ログインのため、初期パスワードを変更してください。",
            "#LG03down" : "旧パスワード（初期パスワード）、新パスワードを入力してください。",
            "#txt_uid":cookie.get("txt_uid")                                                           // cookieからアカウントを取得
        });
    }else{
        return (new Result())
        .runat("#LG03")
        .withdata({
            "#LG03top" : "パスワードを変更してください。",
            "#LG03down" : "ユーザＩＤ、旧パスワード、新パスワードを入力してください。",
            "#txt_uid":cookie.get("txt_uid")                                                           // cookieからアカウントを取得
        });
    }
}