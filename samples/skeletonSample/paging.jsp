<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<DIV ID="<%= request.getAttribute("id") %>" STYLE="MARGIN-TOP:-24PX;TEXT-ALIGN:RIGHT">
	<img src="img/btn_first_page.png" ONCLICK="<%= request.getAttribute("id") %>.gotoFirstPage()" class="BTN_ICON_S" title="最初へ">
	<img src="img/btn_previous_page.png" ONCLICK="<%= request.getAttribute("id") %>.gotoPrePage()" class="BTN_ICON_S" title="新規">
	<SPAN CLASS="currentPage">0</SPAN>/<SPAN CLASS="allPages">0</SPAN> ( <SPAN CLASS="totalNumber"></SPAN> )
	<img src="img/btn_next_page.png" ONCLICK="<%= request.getAttribute("id") %>.gotoNextPage()" class="BTN_ICON_S" title="新規">
	<img src="img/btn_last_page.png" ONCLICK="<%= request.getAttribute("id") %>.gotoLastPage()" class="BTN_ICON_S" title="新規">
	

    <INPUT type="hidden" class="orderBy" value="<%= request.getAttribute("orderby") %>">
    <SCRIPT>
        <%= request.getAttribute("id") %>={
            // 検索データのイベントID
            eventId:"<%= request.getAttribute("eventId") %>",
            gotoFirstPage:function(){
                $("#<%= request.getAttribute("id") %> .currentPage")
                .html(Number.parse(1,"0"));
                Efw(<%= request.getAttribute("id") %>.eventId);
            },
            gotoLastPage:function(){
                $("#<%= request.getAttribute("id") %> .currentPage")
                .html(Number.parse($("#<%= request.getAttribute("id") %> .allPages").html(),"0"));
                Efw(<%= request.getAttribute("id") %>.eventId);
            },
            gotoPrePage:function(){
                $("#<%= request.getAttribute("id") %> .currentPage")
                .html(Number.parse($("#<%= request.getAttribute("id") %> .currentPage").html(),"0")-1);
                Efw(<%= request.getAttribute("id") %>.eventId);
            },
            gotoNextPage:function(){
                $("#<%= request.getAttribute("id") %> .currentPage")
                .html(Number.parse($("#<%= request.getAttribute("id") %> .currentPage").html(),"0")+1);
                Efw(<%= request.getAttribute("id") %>.eventId);
            },
            init:function(){
                var headtableSelector="<%= request.getAttribute("head") %>";
                if (headtableSelector!="null"){
                    var orderBySelector="#<%= request.getAttribute("id") %> .orderBy";
                    var selected=$(headtableSelector+" TH.SELECTED");
                    var v=selected.attr("data-sort");
                    if(selected.is(".DESC")){
                        v+=" desc";
                    }else{
                        v+=" asc";
                    }
                    $(orderBySelector).val(v);
                    $(headtableSelector+" TH.SORT").click(function(){
                        var isAsc=$(this).hasClass("ASC")?true:false;
                        $(this).parents("TABLE").find("TH").removeClass("SELECTED").removeClass("ASC").removeClass("DESC");
                        if(isAsc){// change asc to desc
                            $(this).addClass("SELECTED").addClass("DESC");
                            var v=$(this).attr("data-sort");
                            $(orderBySelector).val(v+" desc");
                        }else{// change desc to asc 
                            $(this).addClass("SELECTED").addClass("ASC");
                            var v=$(this).attr("data-sort");
                            $(orderBySelector).val(v+" asc");
                        }
                        Efw(<%= request.getAttribute("id") %>.eventId);
                    });
                };
            }
        };
        <%= request.getAttribute("id") %>.init();
    </SCRIPT>
</DIV>