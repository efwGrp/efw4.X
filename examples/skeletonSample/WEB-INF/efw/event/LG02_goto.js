var LG02_goto={};
LG02_goto.name="メニュー 画面遷移";
LG02_goto.paramsFormat={"page":null};
LG02_goto.fire=function(params){
    return (new Result())
    .navigate(params["page"]);
};
