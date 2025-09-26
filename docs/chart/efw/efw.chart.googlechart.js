/**** efw3.X Copyright 2019 efwGrp ****/
/**
 * The class is for include google charts.
 */
function EfwClientChartGL(chartId,dataId,type,version,setOptions){
	this.chartId=chartId;
	this.dataId=dataId;
	this.type=type;
	this.version=version;
	this.setOptions=setOptions;
}
/**
 * The id to operate the chart.
 */
EfwClientChartGL.prototype.chartId=null;
/**
 * The id of the data table. 
 */
EfwClientChartGL.prototype.dataId=null;
/**
 * The type of the chart.
 */
EfwClientChartGL.prototype.type=null;
/**
 * The version of the chart.
 */
EfwClientChartGL.prototype.version=null;
/**
 * The data.
 */
EfwClientChartGL.prototype.data=[];
/**
 * The opetions.
 */
EfwClientChartGL.prototype.options={};
/**
 * The function to draw the chart.
 */
EfwClientChartGL.prototype.draw=function(){
	var types={
		"area"			:{"chart":"AreaChart",		"stacked":false,"multiData":true,"axis":"v"},
		"bar"			:{"chart":"BarChart",		"stacked":false,"multiData":true,"axis":"h"},
		"column"		:{"chart":"ColumnChart",	"stacked":false,"multiData":true,"axis":"v"},
		"donut"			:{"chart":"PieChart",		"stacked":false,"multiData":false,"axis":""},
		"line"			:{"chart":"LineChart",		"stacked":false,"multiData":true,"axis":"v"},
		"pie"			:{"chart":"PieChart",		"stacked":false,"multiData":false,"axis":""},
		"scatter"		:{"chart":"ScatterChart",	"stacked":false,"multiData":true,"axis":"v"},
		"stackedarea"	:{"chart":"AreaChart",		"stacked":true,"multiData":true,"axis":"v"},
		"stackedbar"	:{"chart":"BarChart",		"stacked":true,"multiData":true,"axis":"h"},
		"stackedcolumn"	:{"chart":"ColumnChart",	"stacked":true,"multiData":true,"axis":"v"}
	};
	///////////////////////////////////////////////////////////////////////////
	//get data and options from table
	var d=[];
	var isFirstTr=true;
	var formatter=$("#"+this.dataId).attr("data-format");
	var legender=$("#"+this.dataId).attr("data-legend");
	var ticks=$("#"+this.dataId).attr("data-ticks");
	var colColors=[];
	var rowColors=[];
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
					colColors.push($(this).attr("data-color"));
				}
			}else if(isFirstTd){
				if ($(this).attr("data-color")!=null){
					rowColors.push($(this).attr("data-color"));
				}
			}

			isFirstTd=false;
		});
		isFirstTr=false;
		d[d.length]=row;
	});

	///////////////////////////////////////////////////////////////////////////
	//set the default options
	this.options={
		legend:{position:legender},
		title:$("#"+this.dataId+" caption").html(),
		hAxis:{},
		vAxis:{},
	};
	if(types[this.type].axis=="v"){
		this.options.hAxis.title=d[0][0];
	}else if(types[this.type].axis=="h"){
		this.options.vAxis.title=d[0][0];
	}
	if (ticks!=""&&ticks!=null){
		if(types[this.type].axis=="v"){
			this.options.vAxis.ticks=JSON.parse("["+ticks+"]");
		}else if(types[this.type].axis=="h"){
			this.options.hAxis.ticks=JSON.parse("["+ticks+"]");
		}
	}
	//change options by type
	if(this.type=="donut") this.options.pieHole=0.4;
	if(types[this.type].stacked)this.options.isStacked=true;
	if(formatter!=""&&formatter!=null){
		if(types[this.type].axis=="v"){
			this.options.vAxis.format=formatter;
		}if(types[this.type].axis=="h"){
			this.options.hAxis.format=formatter;
		}
	}
	if(types[this.type].multiData==true && colColors.length>0)this.options.colors=colColors;
	if(types[this.type].multiData==false && rowColors.length>0)this.options.colors=rowColors;
	//do setOptions event
	if (this.setOptions!=null){
		try{this.setOptions(this.options);}catch(e){};
	}
	///////////////////////////////////////////////////////////////////////////
	this.data=d;
	//draw it//////////////////////////////////////////////////////////////////
	var self=this;
	google.charts.load(this.version, {packages: ["corechart"]});
	google.charts.setOnLoadCallback(
	    function() {
	    	//change data by format
	    	var gdata=google.visualization.arrayToDataTable(self.data);
	    	if(formatter!=""&&formatter!=null){
	    		var ftr = new google.visualization.NumberFormat({
	    			pattern: formatter
	    		});
	    		if(self.data.length>0){//format data by col
	    			for(var i=1;i<self.data[0].length;i++){
	    				ftr.format(gdata, i);
	    			}
	    		}
	    	}
	    	var chart = new google.visualization[types[self.type].chart](document.getElementById(self.chartId));
			$("#"+self.chartId).html("");
			chart.draw(gdata, self.options);
	    }
	);	
};
/**
 * The function to reset the chart type.
 */
EfwClientChartGL.prototype.setType=function(type){
	this.type=type;
	this.draw();
};
/**
 * The function to reset the chart width.
 * @param width
 */
EfwClientChartGL.prototype.setWidth=function(width){
	$("#iframe_"+this.chartId).css("width",width);
	this.draw();
};
/**
 * The function to reset the chart height.
 * @param height
 */
EfwClientChartGL.prototype.setHeight=function(height){
	$("#iframe_"+this.chartId).css("height",height);
	this.draw();
};
