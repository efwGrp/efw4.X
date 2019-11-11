/**** efw3.X Copyright 2017 efwGrp ****/
/**
 * The class is for include google charts.
 */
function EfwClientChart(chartId,dataId,type,version,setOptions){
	this.chartId=chartId;
	this.dataId=dataId;
	this.type=type;
	this.version=version;
	this.setOptions=setOptions;
}
/**
 * The id to operate the chart.
 */
EfwClientChart.prototype.chartId=null;
/**
 * The id of the data table. 
 */
EfwClientChart.prototype.dataId=null;
/**
 * The type of the chart.
 */
EfwClientChart.prototype.type=null;
/**
 * The version of the chart.
 */
EfwClientChart.prototype.version=null;
/**
 * The data.
 */
EfwClientChart.prototype.data=[];
/**
 * The opetions.
 */
EfwClientChart.prototype.options={};
/**
 * The function to draw the chart.
 */
EfwClientChart.prototype.draw=function(){
	var d=[];
	var isFirstTr=true;
	var formatter=$("#"+this.dataId).attr("data-format");
	var legender=$("#"+this.dataId).attr("data-legend");
	var ticks=$("#"+this.dataId).attr("data-ticks");
	var colors=[];
	$("#"+this.dataId+" tr").each(function(){
		var row=[];
		var isFirstTd=true;
		$("td,th",this).each(function(){
			var value=$(this).html();
			if (isFirstTd||isFirstTr){//the first row is col title, and every first col is item identity.
				row[row.length]=value;
			}else{
				var num=Number.parse(value,formatter);
				if (isNaN(num)){
					row[row.length]=value;
				}else{
					row[row.length]=0+num;
				}
			}
			if (isFirstTr&&!isFirstTd){//get color from the col title cell.
				if ($(this).attr("data-color")!=null){
					colors.push($(this).attr("data-color"));
				}
			}else if(isFirstTd){
				if ($(this).attr("data-color")!=null){
					colors.push($(this).attr("data-color"));
				}
			}

			isFirstTd=false;
		});
		isFirstTr=false;
		d[d.length]=row;
	});

	this.data=d;

	this.options={
		legend:{position:legender},
		title:$("#"+this.dataId+" caption").html(),
		hAxis:{title: $("td,th",$("#"+this.dataId)).eq(0).html()},
		vAxis:{},
	};
	if (colors.length>0){
		this.options.colors=colors;
	}
	if (formatter!=""&&formatter!=null){
		if (this.type=="bar"||this.type=="stackedbar"){
			this.options.hAxis.format=formatter;
		}else{
			this.options.vAxis.format=formatter;
		}
	}
	if (ticks!=""&&ticks!=null){
		if (this.type=="bar"||this.type=="stackedbar"){
			this.options.hAxis.ticks=JSON.parse("["+ticks+"]");
		}else{
			this.options.vAxis.ticks=JSON.parse("["+ticks+"]");
		}
	}
	if (this.setOptions!=null){
		try{this.setOptions(this.options);}catch(e){};
	}
	
	window.frames["iframe_"+this.chartId].location="chart/"+this.type+".html?version="+this.version;
    var _chart=this;
    window.setTimeout(function(){_chart._draw();}, 100);
};
EfwClientChart.prototype._draw=function(){
    var win = window.frames["iframe_"+this.chartId];
    var doc = win.document;
    if (	doc!=null
    		&&doc.readyState=="complete"
    		&&win.drawChart!=null 
    		&&win.googleChartIsLoaded==true) {
    	win.drawChart(this.data,this.options);
    	return;
    }
    var _chart=this;
    window.setTimeout(function(){_chart._draw();}, 100);
};
/**
 * The function to reset the chart type.
 */
EfwClientChart.prototype.setType=function(type){
	this.type=type;
	this.draw();
};
/**
 * The function to reset the chart width.
 * @param width
 */
EfwClientChart.prototype.setWidth=function(width){
	$("#iframe_"+this.chartId).css("width",width);
	this.draw();
};
/**
 * The function to reset the chart height.
 * @param height
 */
EfwClientChart.prototype.setHeight=function(height){
	$("#iframe_"+this.chartId).css("height",height);
	this.draw();
};
