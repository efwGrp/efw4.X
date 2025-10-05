<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<DIV  CLASS="PAGING" ID="<%= request.getAttribute("id") %>">
	<i class="bi bi-skip-start-fill" ONCLICK="<%= request.getAttribute("id") %>.gotoFirstPage()" title="最初へ"></i>
	<i class="bi bi-caret-left-fill" ONCLICK="<%= request.getAttribute("id") %>.gotoPrePage()" title="前ページ"></i>
	<LABEL class="currentPage">0</LABEL>/<LABEL class="allPages">0</LABEL> ( <LABEL class="totalNumber"></LABEL> )
	<i class="bi bi-caret-right-fill" ONCLICK="<%= request.getAttribute("id") %>.gotoNextPage()" title="次ページ"></i>
	<i class="bi bi-skip-end-fill" ONCLICK="<%= request.getAttribute("id") %>.gotoLastPage()" title="最後へ"></i>
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
                var headtableSelector="<%= request.getAttribute("table") %>";
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