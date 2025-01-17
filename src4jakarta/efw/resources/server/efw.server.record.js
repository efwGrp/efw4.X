"use strict";
/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to operate the array data.
 * 
 * @param {Array}
 *            array: optional<br>
 * 
 * @author Chang Kejun
 */
function Record(array) {
	if (this==null){throw new Packages.efw.NewKeywordWasForgottenException("Record");}
	if (array == null) {
		this.values = [];
		this.length = 0;
	} else {
		this.values = array;
		this.length = array.length;
	}
};

/**
 * The internal variable for keeping records length.
 */
Record.prototype.length = 0;
/**
 * The internal variable for keeping records.
 */
Record.prototype.values = null;
/**
 * Seek in records.<br>
 * The action is one of the options: [ eq | gt | lt | like | !eq | !gt | !lt |
 * !like ]
 * 
 * @param {String}
 *            field: required<br>
 * @param {String}
 *            action: required<br>
 * @param {String |
 *            Number | Date | Boolean} value: required<br>
 * @returns {Record}
 */
Record.prototype.seek = function(field, action, value) {
	if (field == "" || field == undefined || field == null)
		return new Record();
	if (action != "eq" && action != "gt" && action != "lt" && action != "like"
			&& action != "!eq" && action != "!gt" && action != "!lt"
			&& action != "!like")
		return new Record();

	var ret = [];
	var likeFirst = false;
	var likeLast = false;
	if (action == "like" || action == "!like") {
		value = "" + value;
		if (value.substring(0, 1) == "%")
			likeFirst = true;
		if (value.substring(value.length - 1, value.length) == "%")
			likeLast = true;
		if (likeFirst)
			value = value.substring(1);
		if (likeLast)
			value = value.substring(0, value.length - 1);
	}
	for (var i = 0; i < this.values.length; i++) {
		var rd = this.values[i];
		switch (action) {
		case "eq":
			if (rd[field] == value)
				ret.push(rd);
			break;
		case "gt":
			if (rd[field] > value)
				ret.push(rd);
			break;
		case "lt":
			if (rd[field] < value)
				ret.push(rd);
			break;
		case "like": {
			var data = ("" + rd[field]);
			var idx = data.indexOf(value);
			if (((!likeFirst && idx == 0) || (likeFirst && idx > -1))
					&& ((!likeLast && idx == data.length - value.length) || (likeLast && idx > -1)))
				ret.push(rd);
			break;
		}
		case "!eq":
			if (rd[field] != value)
				ret.push(rd);
			break;
		case "!gt":
			if (rd[field] <= value)
				ret.push(rd);
			break;
		case "!lt":
			if (rd[field] >= value)
				ret.push(rd);
			break;
		case "!like": {
			var data = ("" + rd[field]);
			var idx = data.indexOf(value);
			if (!(((!likeFirst && idx == 0) || (likeFirst && idx > -1)) && ((!likeLast && idx == data.length
					- value.length) || (likeLast && idx > -1))))
				ret.push(rd);
			break;
		}
		}
	}
	return new Record(ret);
};
/**
 * Sort records.<br>
 * The action is one of the options: [ asc | desc ]
 * 
 * @param {String}
 *            field: required<br>
 * @param {String}
 *            action: required<br>
 * @returns {Record}
 */
Record.prototype.sort = function(field, action) {
	if (field == "" || field == undefined || field == null)
		return new Record();
	if (action != "asc" && action != "desc" && action != "ASC"
			&& action != "DESC")
		return new Record();
	var ret = this.values.sort(function(a, b) {
		if (action == "desc" || action == "DESC") {
			if (a[field] < b[field])
				return 1;
			if (a[field] > b[field])
				return -1;
		} else {
			if (a[field] < b[field])
				return -1;
			if (a[field] > b[field])
				return 1;
		}
	});
	return new Record(ret);
};
/**
 * to make all keys uppercase
 * @returns {Record}
 */
Record.prototype.makeAllKeysUpperCase = function(){
	var array = [];
	for (var i = 0; i< this.values.length; i++) {
		var rsdata = this.values[i];
		var item = {};
		for (var key in rsdata){
			item[key.toUpperCase()]=rsdata[key];
		}
		array.push(item);
	}
	return new Record(array);
}
/**
 * to make all keys lowercase
 * @returns {Record}
 */
Record.prototype.makeAllKeysLowerCase = function(){
	var array = [];
	for (var i = 0; i< this.values.length; i++) {
		var rsdata = this.values[i];
		var item = {};
		for (var key in rsdata){
			item[key.toLowerCase()]=rsdata[key];
		}
		array.push(item);
	}
	return new Record(array);
}
/**
 * The function to change the record format.
 * 
 * @param mapping:
 *            required<br>
 *            {fieldnew1:fieldold1,fieldnew2:fieldold2,...}<br>
 * @returns {Record}
 */
Record.prototype.map = function(mapping) {
	if (mapping == null)
		return new Record();

	var array = [];
	for (var i = 0; i < this.values.length; i++) {
		var rsdata = this.values[i];

		var itemfix = null;
		var item = {};
		for ( var key in mapping) {
			var mp = mapping[key];
			if (typeof mp == "string") {
				var vl = rsdata[mp];
				item[key] = vl;
			} else if (typeof mp == "function") {
				var vl = mp(rsdata, itemfix);
				item[key] = vl;
			} else if (typeof mp == "object" && mp instanceof Array) {
				var vl = rsdata[mp[0]];
				var ft = mp[1];
				if (vl != null && ft != null) {
					if (ft.indexOf("{")==0&&ft.indexOf("}")==ft.length-1){
						vl = EfwServerFormat.prototype.formatEnum(vl, ft);
					}else if (vl.toFixed) {// if vl is number #,##0.00
						var round = "" + mp[2];
						vl = EfwServerFormat.prototype.formatNumber(vl, ft, round);
					} else if (vl.getTime) {// if vl is date yyyyMMdd
						vl = EfwServerFormat.prototype.formatDate(vl, ft);
					}
					// if vl is not date or number or boolean, it should not have format
				}
				item[key] = vl;
			}
		}
		array.push(item);
	}
	return new Record(array);
};
/**
 * The function to get the first data item from records.
 * 
 * @returns {Object}
 */
Record.prototype.getSingle = function() {
	if (this.values.length == 0)return {};
	return JSON.clone(this.values[0]);
};
/**
 * The function to get the array data from records.
 * 
 * @returns {Array}
 */
Record.prototype.getArray = function() {
	return JSON.clone(this.values);
};
/**
 * The function to get a field value from the first data of records.
 * 
 * @param {String}
 *            field: required<br>
 * @returns {String | Number | Date | Boolean}
 */
Record.prototype.getValue = function(field) {
	if (this.values.length == 0)return null;
	return this.values[0][field];
};
/**
 * The function to group the record by param fields.
 * @param {String}
 * 			fields: required<br>
 */
Record.prototype.group = function(/*field1,field2,field3...*/) {
	if(arguments.length==0) return null;
	var root={};
	//to create the tree
	for (var i=0; i<this.values.length; i++){
		var item=JSON.clone(this.values[i]);
		var current=root;
		for (var j=0; j<arguments.length; j++){
			var key=arguments[j];
			if(current[item[key]]==null){
				if(j==arguments.length-1){
					current[item[key]]=[];
				}else{
					current[item[key]]={};
				}
			}
			current=current[item[key]];
			delete item[key];
		}
		current.push(item);
	}
	return root;
};
/**
 * The function to show the debug info about the record.
 * @param {String}
 * 			label: optional<br>
 * @returns {Record}
 */
Record.prototype.debug = function(label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Record class.");
	java.lang.System.out.println("records:"+JSON.stringify(this.values));
	return this;
};
