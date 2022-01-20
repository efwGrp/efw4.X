/**** efw3.X Copyright 2022 efwGrp ****/
/**
 * The class is for include google charts.
 */
function EfwClientChartJS(chartId,dataId,type,version,setOptions){
	this.chartId=chartId;
	this.dataId=dataId;
	this.type=type;
	this.version=version;
	this.setOptions=setOptions;
}
/**
 * The id to operate the chart.
 */
EfwClientChartJS.prototype.chartId=null;
/**
 * The id of the data table. 
 */
EfwClientChartJS.prototype.dataId=null;
/**
 * The type of the chart.
 */
EfwClientChartJS.prototype.type=null;
/**
 * The version of the chart.
 */
EfwClientChartJS.prototype.version=null;
/**
 * The data.
 */
EfwClientChartJS.prototype.data=[];
/**
 * The opetions.
 */
EfwClientChartJS.prototype.options={};
/**
 * The function to draw the chart.
 */
EfwClientChartJS.prototype.draw=function(){
	//the default colors is same to google chart
	var defaultColors=[
		"#3366cc","#dc3912","#ff9900","#109618","#990099",
		"#0099c6","#dd4477","#66aa00","#b82e2e","#316395",
		"#994499","#22aa99","#aaaa11","#6633cc","#e67300",
		"#8b0707","#651067","#329262","#5574a6","#3b3eac",
		"#16d620","#b91383","#f4359e","#9c5935","#a9c413",
		"#2a778d","#668d1c","#bea413","#0c5912","#743411"
	];
	var types={
		"area"			:{"chart":"line",			"fill":"start",	"stacked":false,"multiData":true,"axis":"v"},
		"bar"			:{"chart":"bar",			"fill":false,	"stacked":false,"multiData":true,"axis":"h"},
		"column"		:{"chart":"bar",			"fill":false,	"stacked":false,"multiData":true,"axis":"v"},
		"donut"			:{"chart":"doughnut",		"fill":false,	"stacked":false,"multiData":false,"axis":"r"},
		"line"			:{"chart":"line",			"fill":false,	"stacked":false,"multiData":true,"axis":"v"},
		"pie"			:{"chart":"pie",			"fill":false,	"stacked":false,"multiData":false,"axis":"r"},
		"scatter"		:{"chart":"line",			"fill":false,	"stacked":false,"multiData":true,"axis":"v"},
		"stackedarea"	:{"chart":"line",			"fill":"-1",	"stacked":true,"multiData":true,"axis":"v"},
		"stackedbar"	:{"chart":"bar",			"fill":false,	"stacked":true,"multiData":true,"axis":"h"},
		"stackedcolumn"	:{"chart":"bar",			"fill":false,	"stacked":true,"multiData":true,"axis":"v"},
		"radar"			:{"chart":"radar",			"fill":false,	"stacked":false,"multiData":true,"axis":"r"},
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
	//get data by row
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
		responsive:true,
		maintainAspectRatio:false,
		tooltips:{//カーソル当たる時のツールチップに表示する内容のフォーマット
			callbacks:{}
		},
		elements:{line:{tension:0.000001}},//折れ線
		plugins:{
			legend:{
				display:function(){
					if(legender=="none")return false;
					if(legender=="left"||legender=="top"||legender=="bottom"||legender=="right")return true;
					return false;
				}(),
				position:legender
			},
			title:{
				display:$("#"+this.dataId+" caption").html()?true:false,
				text:$("#"+this.dataId+" caption").html()
			},
			tooltip:{callbacks:{}},
		},
		scales:{},
		scale:{},
	};
	if (types[this.type].axis=="h"){
		this.options.indexAxis='y';
		this.options.scales.x={ticks:{}};
		this.options.scales.y={ticks:{}};
	}else if (types[this.type].axis=="v"){
		this.options.indexAxis='x';
		this.options.scales.x={ticks:{}};
		this.options.scales.y={ticks:{}};
	}else if(types[this.type].axis=="r"){
		this.options.scale={ticks:{}};
	}
	
	if(types[this.type].stacked){
		if(types[this.type].axis=="v"){
			this.options.scales.x.stacked=true;
			this.options.scales.y.stacked=true;
		}else if(types[this.type].axis=="h"){
			this.options.scales.y.stacked=true;
			this.options.scales.x.stacked=true;
		}
	}
	if(d[0][0]){
		if(types[this.type].axis=="v"){
			this.options.scales.x.title={display:true,text:d[0][0]};
		}else if(types[this.type].axis=="h"){
			this.options.scales.y.title={display:true,text:d[0][0]};
		}
	}
	if(ticks!=""&&ticks!=null){
		var aryTicks=JSON.parse("["+ticks+"]");
		if(types[this.type].axis=="v"){
			this.options.scales.y.ticks.min=aryTicks[0];
			this.options.scales.y.ticks.max=aryTicks[aryTicks.length-1];
			this.options.scales.y.ticks.stepSize=aryTicks[1]-aryTicks[0];
		}else if(types[this.type].axis=="h"){
			this.options.scales.x.ticks.min=aryTicks[0];
			this.options.scales.x.ticks.max=aryTicks[aryTicks.length-1];
			this.options.scales.x.ticks.stepSize=aryTicks[1]-aryTicks[0];
		}else if(types[this.type].axis=="r"){
			this.options.scale.ticks.min=aryTicks[0];
			this.options.scale.ticks.max=aryTicks[aryTicks.length-1];
			this.options.scale.ticks.stepSize=aryTicks[1]-aryTicks[0];
		}
	}
	if(formatter){
		if(types[this.type].axis=="v"){
			this.options.scales.y.ticks.callback=function(value, index, values) {
				return EfwClientFormat.prototype.formatNumber(value,formatter);
			}
			this.options.plugins.tooltip.callbacks.label=function(context){
				return context.dataset.label+": "+EfwClientFormat.prototype.formatNumber(context.parsed.y,formatter);
			}
		}else if(types[this.type].axis=="h"){
			this.options.scales.x.ticks.callback=function(value, index, values) {
				return EfwClientFormat.prototype.formatNumber(value,formatter);
			}
			this.options.plugins.tooltip.callbacks.label=function(context){
				return context.dataset.label+": "+EfwClientFormat.prototype.formatNumber(context.parsed.x,formatter);
			}
		}else if(types[this.type].axis=="r"){
			this.options.scale.ticks.callback=function(value, index, values) {
				return EfwClientFormat.prototype.formatNumber(value,formatter);
			}
			this.options.plugins.tooltip.callbacks.label=function(context){
				return context.label+": "+EfwClientFormat.prototype.formatNumber(context.parsed,formatter);
			}
		}
	}
	if(types[this.type].chart=="doughnut"){
		this.options.cutout=40;
	}
	//do setOptions event
	if(this.setOptions!=null){
		try{this.setOptions(this.options);}catch(e){};
	}
	///////////////////////////////////////////////////////////////////////////
	this.data={labels:[],datasets:[]};
	//set labels to data
	for(var i=1;i<d.length;i++){
		this.data.labels.push(d[i][0]);//rowlabel
	}
	//set datasets to data
	if(types[this.type].multiData){
		for(var col=1;col<d[0].length;col++){
			var coldata={label:d[0][col],data:[]};
			for(var row=1;row<d.length;row++){
				coldata.data.push(d[row][col]);
			}
			coldata.fill=types[this.type].fill;
			if(col==1&&coldata.fill=="-1"){coldata.fill="start";}
			
			var c=colColors[col-1];
			if(c==null)c=defaultColors[col-1];
			if(c==null)c="#c0c0c0";
			$("#"+this.chartId).css("color",c);
			var rgbColor=$("#"+this.chartId).css("color");
			coldata.borderColor=rgbColor;
			coldata.pointBackgroundColor=rgbColor;
			if (types[this.type].fill){
				coldata.backgroundColor=Chart.helpers.color(rgbColor).alpha(0.2).rgbString();
			}else{
				coldata.backgroundColor=rgbColor;
			}
			if(this.type=="scatter"){
				coldata.borderColor=Chart.helpers.color(rgbColor).alpha(0).rgbString();
			}
			this.data.datasets.push(coldata);
		}
	}else{//pie doughnut
		var coldata={data:[],backgroundColor:[]};
		for(var row=1;row<d.length;row++){
			coldata.data.push(d[row][1]);
			var c=rowColors[row-1];
			if(c==null)c=defaultColors[row-1];
			if(c==null)c="#c0c0c0";
			$("#"+this.chartId).css("color",c);
			var rgbColor=$("#"+this.chartId).css("color");
			coldata.backgroundColor.push(rgbColor);
			
		}
		coldata.fill=types[this.type].fill;
		this.data.datasets.push(coldata);
	}
	//draw it//////////////////////////////////////////////////////////////////
	$("#"+this.chartId).html("<canvas></canvas>");
	new Chart($("#"+this.chartId+" canvas")[0].getContext('2d'), {
		type:types[this.type].chart,
		data:this.data,
		options:this.options
	});
};
/**
 * The function to reset the chart type.
 */
EfwClientChartJS.prototype.setType=function(type){
	this.type=type;
	this.draw();
};
/**
 * The function to reset the chart width.
 * @param width
 */
EfwClientChartJS.prototype.setWidth=function(width){
	$("#iframe_"+this.chartId).css("width",width);
	this.draw();
};
/**
 * The function to reset the chart height.
 * @param height
 */
EfwClientChartJS.prototype.setHeight=function(height){
	$("#iframe_"+this.chartId).css("height",height);
	this.draw();
};
