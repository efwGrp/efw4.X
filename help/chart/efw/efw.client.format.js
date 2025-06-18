/**** efw4.X Copyright 2019 efwGrp ****/
/**
 * The class to format Date or Number in client.
 * 
 * @author Chang Kejun<br>
 * 
 */
function EfwClientFormat() {
};
/**
 * The function to format Number to String.
 * 
 * @param {Number}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @param {String}
 *            rounder : optional, the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {String}
 */
EfwClientFormat.prototype.formatNumber = function(value, formatter, rounder) {
	var ft = this._initNumberFormat(formatter);// get formatter object
	var isPercentage = ft.suffix && ft.suffix.charAt(0) === "%";
	var num = Number(value);
	if (isPercentage)
		num *= 100;// if percentage, number will be multiplied by 100.
	if (isNaN(num))
		return "";// if it is not number return ""
	// round the number string
	var numberStr = ""
			+ EfwClientFormat.prototype._roundNumber(num, ft.maxFrac, rounder);
	if (isNaN(numberStr))
		return "";// if it is not number return ""

	var negative = false;// the var will be used in the next
	if (numberStr.charAt(0) == "-") {// if the number string begins with -
		// ,negative is true
		negative = true;
		numberStr = numberStr.substring(1);
	} else if (numberStr.charAt(0) == "+")
		numberStr = numberStr.substring(1);// if the number string begins with
	// +,negative is false

	var point = numberStr.indexOf(".");// position of point character
	var intStr = "";// the integer part
	var fracStr = "";// the fraction part
	if (point != -1) {// if the point exists, the first point will be used
		intStr = numberStr.substring(0, point);
		fracStr = numberStr.substring(point + 1);
	} else
		intStr = numberStr;// or the number string is all for integer part

	if (fracStr.length > ft.maxFrac) { // round
		// case 6143
		var num = new Number("0." + fracStr);
		num = (ft.maxFrac == 0) ? Math.round(num) : num.toFixed(ft.maxFrac);
		// toFixed method has bugs on IE (0.7 --> 0)
		fracStr = num.toString(10).substr(2);
		var c = (num >= 1) ? 1 : 0; // carry
		var x, i = intStr.length - 1;
		while (c) { // increment intStr
			if (i == -1) {
				intStr = '1' + intStr;
				break;
			} else {
				x = intStr.charAt(i);
				if (x == 9) {
					x = '0';
					c = 1;
				} else {
					x = (++x) + '';
					c = 0;
				}
				intStr = intStr.substring(0, i) + x
						+ intStr.substring(i + 1, intStr.length);
				i--;
			}
		}
	}
	for (var i = fracStr.length; i < ft.minFrac; i++)
		// if minFrac=4 then 1.12 --> 1.1200
		fracStr = fracStr + '0';
	while (fracStr.length > ft.minFrac
			&& fracStr.charAt(fracStr.length - 1) == '0')
		// if minFrac=2 then 1.1200 --> 1.12)
		fracStr = fracStr.substring(0, fracStr.length - 1);
	for (var i = intStr.length; i < ft.minInt; i++)
		// if minInt=4 then 034 --> 0034
		intStr = '0' + intStr;
	while (intStr.length > ft.minInt && intStr.charAt(0) == '0')
		// if minInt=4 then 00034 --> 0034)
		intStr = intStr.substring(1);

	var j = 0;
	for (var i = intStr.length; i > 0; i--) { // add commas
		if (j != 0 && j % ft.comma == 0) {
			intStr = intStr.substring(0, i) + ',' + intStr.substring(i);
			j = 0;
		}
		j++;
	}

	var formattedValue;
	if (fracStr.length > 0)
		formattedValue = ft.prefix + intStr + '.' + fracStr + ft.suffix;
	else
		formattedValue = ft.prefix + intStr + ft.suffix;
	if (negative)
		formattedValue = '-' + formattedValue;
	return formattedValue;
};
/**
 * The function to parse String to Number.
 * 
 * @param {Number}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {null | Number}
 */
EfwClientFormat.prototype.parseNumber = function(value, formatter) {
	value += ""; // change value to string if it is a number
	if (!value)
		return null; // if value is blank return null
	var ft = this._initNumberFormat(formatter);// get formatter object
	// get the prefix position it should be 0
	var pIndex = value.indexOf(ft.prefix);
	// if the suffix is blank, the suffix position will the the last position or
	// get the position
	var sIndex = (ft.suffix == "") ? value.length : value.indexOf(ft.suffix,
			ft.prefix.length + 1);
	// if percentage,number will be cut by 100.
	var isPercentage = ft.suffix && ft.suffix.charAt(0) === "%";
	// if the prefix position and the suffix position is corrected, get the
	// digital string
	if (pIndex == 0 && sIndex > 0) {
		value = value.substr(0, sIndex);// cut the suffix
		value = value.substr(ft.prefix.length);// cut the prefix
		value = value.replace(/,/g, "");// remove the [,]
		if (isNaN(value))
			return null;// if it is not number, return null;
		value = 0 + new Number(value);
		if (isPercentage) {
			value = value / 100;
			value = EfwClientFormat.prototype._roundNumber(value,
					ft.maxFrac + 2);
		}
		return value;
	} else {
		return null;// or it means something is wrong, return null
	}
};
/**
 * The internal function to round a number.
 * 
 * @param {Number}
 *            num: required<br>
 * @param {Number}
 *            precision: optional, the length after dot.<br>
 * @param {String}
 *            mode: optional,the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {null | Number}
 */
EfwClientFormat.prototype._roundNumber = function(num, precision, mode) {
	if (precision === null || precision === undefined)
		precision = 0;
	if (mode != "UP" && mode != "DOWN" && mode != "CEILING" && mode != "FLOOR"
			&& mode != "HALF_UP" && mode != "HALF_DOWN" && mode != "HALF_EVEN")
		mode = "HALF_EVEN";

	var multi = "1";
	for (var i = 0; i < precision; i++) {
		multi += "0";
	}
	multi = new Number(multi);
	num *= multi;

	var numberStr = "" + num;
	if (isNaN(numberStr))
		return null;
	var negative = false;// the var will be used in the next

	// remove sign if the string it begin with - or +
	if (numberStr.charAt(0) == "-") {// if the number string begins with -
		// ,negative is true
		negative = true;
		numberStr = numberStr.substring(1);
	} else if (numberStr.charAt(0) == "+") // if the number string begins with
		// +,negative is false
		numberStr = numberStr.substring(1);

	var point = numberStr.indexOf(".");// position of point character
	var intStr = "";// the integer part
	var fracStr = "";// the fraction part
	if (point != -1) {// if the point exists, the first point will be used
		intStr = numberStr.substring(0, point);
		fracStr = numberStr.substring(point + 1);
	} else
		intStr = numberStr;// or the number string is all for integer part

	switch (mode) {
	case "CEILING":
	case "FLOOR":
	case "UP":
		var foundNonZeroDigit = false;
		for (var i = 0, _length = fracStr.length; i < _length; i++) {
			if (fracStr[i] !== '0') {
				foundNonZeroDigit = true;
				break;
			}
		}
		if (foundNonZeroDigit) {
			if (mode === "UP" || negative !== (mode === "CEILING")) {
				intStr = "" + (1 + new Number(intStr));
			}
		}
		break;
	case "HALF_EVEN":
	case "HALF_DOWN":
	case "HALF_UP":
		var shouldRoundUp = false;
		var firstFracPartDigit = parseInt(fracStr[0], 10);

		if (firstFracPartDigit > 5) {
			shouldRoundUp = true;
		} else if (firstFracPartDigit === 5) {
			if (mode === "HALF_UP")
				shouldRoundUp = true;

			if (!shouldRoundUp) {
				for (var i = 1, _length2 = fracStr.length; i < _length2; i++) {
					if (fracStr[i] !== '0') {
						shouldRoundUp = true;
						break;
					}
				}
			}

			if (!shouldRoundUp && mode === "HALF_EVEN") {
				var lastIntPartDigit = parseInt(intPart[intPart.length - 1], 10);
				shouldRoundUp = lastIntPartDigit % 2 !== 0;
			}
		}

		if (shouldRoundUp)
			intStr = "" + (1 + new Number(intStr));
		break;
	}
	numberStr = "" + intStr / multi;
	if (negative)
		numberStr = "-" + numberStr;
	return 0 + new Number(numberStr);
};
/**
 * The internal function to init number formatter.
 * 
 * @param {String}
 *            formatter: required<br>
 * @returns {Object}
 */
EfwClientFormat.prototype._initNumberFormat = function(formatter) {
	var ret = {
		prefix : "", // the string before the first digital char in formatter
		suffix : "", // the string after the last digital char in formatter
		comma : 0, // the char number of [,] splitter in digital string
		minInt : 1, // the min length of integer part 0. - 2
		minFrac : 0, // the min length of fraction part .0## - 1
		maxFrac : 0
	}; // the max length of fraction part .0## - 3

	for (var i = 0; i < formatter.length; i++) {
		if (formatter.charAt(i) == '#' || formatter.charAt(i) == '0') {
			ret.prefix = formatter.substring(0, i);// get the prefix
			formatter = formatter.substring(i);// the string without prefix
			break;
		}
	}
	ret.suffix = formatter.replace(/[#]|[0]|[,]|[.]/g, "");// get the suffix
	var numberStr = formatter.replace(/[^0#,.]/g, "");// the number string
	// without prefix and
	// suffix
	var intStr = "";// integer part
	var fracStr = "";// fraction part
	var point = numberStr.indexOf(".");
	if (point != -1) {// if the point exists, the first point will be used
		intStr = numberStr.substring(0, point);// get the integer part
		fracStr = numberStr.substring(point + 1);// get the fraction part
	} else {// or the number string is all for integer part
		intStr = numberStr;
	}
	var commaPos = intStr.lastIndexOf(",");
	if (commaPos != -1) {// the last [,] position will decide the comma
		ret.comma = intStr.length - 1 - commaPos;
	}

	intStr = intStr.replace(/[,]/g, "");// remove [,] in integer part
	fracStr = fracStr.replace(/[,]|[.]+/g, "");// remove [,] [.] in fraction
	// part

	ret.maxFrac = fracStr.length;// the length of fraction part formatter is
	// the max length of fraction part
	var tmp = intStr.replace(/[^0]/g, "");// the zero string in integer part
	if (tmp.length > ret.minInt)// if the length of zero string is bigger than 1
		ret.minInt = tmp.length;// the min length of integer is the length of
	// zero string
	tmp = fracStr.replace(/[^0]/g, "");// the zero string in fraction part
	ret.minFrac = tmp.length;// the min length of fraction is the length of
	// zero string

	return ret;
};
/**
 * The function to format Date to String.
 * 
 * @param {Date}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
EfwClientFormat.prototype.formatDate = function(value, formatter) {
	if (value == null)
		return "";// it value is not null, return ""
	if (!value.getTime)
		return "";// if value is not date, return ""
	var ft = this._initDateFormat(formatter);// get formatter object

	var ret = [];
	for (var i = 0; i < ft.length; i++) {
		var pattern = ft[i];
		var formatter = this._dateFormatter[pattern.charAt(0)];
		if (formatter) {
			ret[i] = formatter.apply(this, [ value, pattern ]);
		} else {
			ret[i] = pattern;
		}
	}
	return "" + ret.join("");
};
/**
 * The function to parse String to Date.
 * 
 * @param {Date}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {null | Date}
 */
EfwClientFormat.prototype.parseDate = function(value, formatter) {
	value += ""; // change value to string if it is not string
	if (!value)
		return null; // if value is blank return null
	var ft = this._initDateFormat(formatter);// get formatter object
	var ret = {
		year : 1970,
		month : 1,
		day : 1,
		hour : 0,
		min : 0,
		sec : 0,
		msec : 0
	};

	for (var i = 0; i < ft.length; i++) {
		if (value == "")
			return null; // parse error!!
		var pattern = ft[i];
		var parser = this._dateParser[pattern.charAt(0)];
		if (parser) {
			value = parser.apply(this, [ value, pattern, ret ]);
		} else {
			if (value.indexOf(pattern) != 0) {
				value = null;
			} else {
				value = value.substring(pattern.length);
			}
		}
		if (value === null)
			return null; // parse error!!
	}
	if (value != "")
		return null; // parse error!!
	return new Date(ret.year, ret.month - 1, ret.day, ret.hour, ret.min,
			ret.sec, ret.msec);
},
/**
 * The internal function to format date to number string.
 * @param {Date}
 *            value: required<br>
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
EfwClientFormat.prototype._formatDateToNumber = function(value, formatter) {
	if (value == null)
		return "";// it value is not null, return ""
	if (!value.getTime)
		return "";// if value is not date, return ""
	var ft = this._initDateFormat(formatter);// get formatter object

	var ret = [];
	for (var i = 0; i < ft.length; i++) {
		var pattern = ft[i];
		var formatter = null;
		if (pattern.charAt(0) != "'") {
			formatter = this._dateFormatter[pattern.charAt(0)];
		}
		if (formatter) {
			ret[i] = formatter.apply(this, [ value, pattern ]);
		} else {
			ret[i] = "";
		}
	}
	return "" + ret.join("");
};
/**
 * The internal function to parse date from number.
 * @param {String}
 *            value: required<br>
 * @param {Object}
 *            formatter: required<br>
 * @returns {Date}
 */
EfwClientFormat.prototype._parseDateFromNumber = function(value, formatter) {
	value += ""; // change value to string if it is not string
	if (!value)
		return null; // if value is blank return null
	var ft = this._initDateFormat(formatter);// get formatter object
	var ret = {
		year : 1970,
		month : 1,
		day : 1,
		hour : 0,
		min : 0,
		sec : 0,
		msec : 0
	};

	for (var i = 0; i < ft.length; i++) {
		var pattern = ft[i];
		var parser = null;
		if (pattern.charAt(0) == "y" || pattern.charAt(0) == "M"
				|| pattern.charAt(0) == "d" || pattern.charAt(0) == "H"
				|| pattern.charAt(0) == "m" || pattern.charAt(0) == "s"
				|| pattern.charAt(0) == "S") {
			parser = this._dateParser[pattern.charAt(0)];
		}
		if (parser) {
			value = parser.apply(this, [ value, pattern, ret ]);
			if (value === null)
				return null; // parse error!!
		}
	}
	if (value != "")
		return null; // parse error!!
	var retdate = new Date(ret.year, ret.month - 1, ret.day, ret.hour, ret.min,
			ret.sec, ret.msec);
	if (retdate.toString() == "Invalid Date") {
		return null;
	} else {
		return retdate;
	}
};
/**
 * The internal function to make zero length.
 * @param {String}
 *            str: required<br>
 * @param {Number}
 *            length: required<br>
 * @returns {String}
 */
EfwClientFormat.prototype._zeroPadding = function(str, length) {
	if (str.length >= length)
		return str;
	return new Array(length - str.length + 1).join("0") + str;
};
/**
 * The internal object as date formatter.
 */
EfwClientFormat.prototype._dateFormatter = {
	"y" : function(date, pattern) {// Year
		var year = String(date.getFullYear());
		if (pattern.length <= 2) {
			year = year.substring(2, 4);
		} else {
			year = this._zeroPadding(year, pattern.length);
		}
		return year;
	},
	"M" : function(date, pattern) {// Month in year
		return this._zeroPadding(String(date.getMonth() + 1), pattern.length);
	},
	"d" : function(date, pattern) {// Day in month
		return this._zeroPadding(String(date.getDate()), pattern.length);
	},
	"H" : function(date, pattern) {// Hour in day (0-23)
		return this._zeroPadding(String(date.getHours()), pattern.length);
	},
	"m" : function(date, pattern) {// Minute in hour
		return this._zeroPadding(String(date.getMinutes()), pattern.length);
	},
	"s" : function(date, pattern) {// Second in minute
		return this._zeroPadding(String(date.getSeconds()), pattern.length);
	},
	"S" : function(date, pattern) {// Millisecond
		return this
				._zeroPadding(String(date.getMilliseconds()), pattern.length);
	},
	"'" : function(date, pattern) {// escape
		if (pattern == "''") {
			return "'";
		} else {
			return pattern.replace(/'/g, '');
		}
	}
};
/**
 * The internal function to judge whether a string is number or not.
 * @param {String}
 *            str: required<br>
 * @returns {Boolean}
 */
EfwClientFormat.prototype._isPureNumber = function(str) {
	return /^[0-9]*$/.test(str);
};
/**
 * The internal object as date parser.
 */
EfwClientFormat.prototype._dateParser = {
	"y" : function(text, pattern, result) {// Year
		var year;
		if (pattern.length <= 2) {
			year = text.substring(0, 2);
			year = year < 70 ? '20' + year : '19' + year;
			text = text.substring(2);
		} else {
			var length = (pattern.length == 3) ? 4 : pattern.length;
			year = text.substring(0, length);
			text = text.substring(length);
		}
		if (!this._isPureNumber(year))
			return null; // error
		result.year = parseInt(year, 10);
		return text;
	},
	"M" : function(text, pattern, result) {// Month in year
		var month;
		if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/1[0-2]/) != null) {
			month = text.substring(0, 2);
			text = text.substring(2);
		} else {
			month = text.substring(0, pattern.length);
			text = text.substring(pattern.length);
		}
		if (!this._isPureNumber(month))
			return null; // error
		result.month = parseInt(month, 10);
		return text;
	},
	"d" : function(text, pattern, result) {// Day in month
		var day;
		if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/1[0-9]|2[0-9]|3[0-1]/) != null) {
			day = text.substring(0, 2);
			text = text.substring(2);
		} else {
			day = text.substring(0, pattern.length);
			text = text.substring(pattern.length);
		}
		if (!this._isPureNumber(day))
			return null; // error
		result.day = parseInt(day, 10);
		return text;
	},
	"H" : function(text, pattern, result) {// Hour in day (0-23)
		var hour;
		if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/1[0-9]|2[0-3]/) != null) {
			hour = text.substring(0, 2);
			text = text.substring(2);
		} else {
			hour = text.substring(0, pattern.length);
			text = text.substring(pattern.length);
		}
		if (!this._isPureNumber(hour))
			return null; // error
		result.hour = parseInt(hour, 10);
		return text;
	},
	"m" : function(text, pattern, result) {// Minute in hour
		var min;
		if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/[1-5][0-9]/) != null) {
			min = text.substring(0, 2);
			text = text.substring(2);
		} else {
			min = text.substring(0, pattern.length);
			text = text.substring(pattern.length);
		}
		if (!this._isPureNumber(min))
			return null; // error
		result.min = parseInt(min, 10);
		return text;
	},
	"s" : function(text, pattern, result) {// Second in minute
		var sec;
		if (pattern.length == 1 && text.length > 1
				&& text.substring(0, 2).match(/[1-5][0-9]/) != null) {
			sec = text.substring(0, 2);
			text = text.substring(2);
		} else {
			sec = text.substring(0, pattern.length);
			text = text.substring(pattern.length);
		}
		if (!this._isPureNumber(sec))
			return null; // error
		result.sec = parseInt(sec, 10);
		return text;
	},
	"S" : function(text, pattern, result) {// Millimsecond
		var msec;
		if (pattern.length == 1 || pattern.length == 2) {
			if (text.length > 2
					&& text.substring(0, 3).match(/[1-9][0-9][0-9]/) != null) {
				msec = text.substring(0, 3);
				text = text.substring(3);
			} else if (text.length > 1
					&& text.substring(0, 2).match(/[1-9][0-9]/) != null) {
				msec = text.substring(0, 2);
				text = text.substring(2);
			} else {
				msec = text.substring(0, pattern.length);
				text = text.substring(pattern.length);
			}
		} else {
			msec = text.substring(0, pattern.length);
			text = text.substring(pattern.length);
		}
		if (!this._isPureNumber(msec))
			return null; // error
		result.msec = parseInt(msec, 10);
		return text;
	},
	"'" : function(text, pattern, result) {// escape
		if (pattern == "''") {
			pattern = "'";
		} else {
			pattern = pattern.replace(/'/g, '');
		}
		if (text.indexOf(pattern) != 0) {
			return null; // error
		} else {
			return text.substring(pattern.length);
		}
	}
};
/**
 * The internal function to init date formatter.
 * 
 * @param {String}
 *            formatter: required<br>
 * @returns {Array}
 */
EfwClientFormat.prototype._initDateFormat = function(formatter) {
	var ret = [];

	for (var i = 0; i < formatter.length; i++) {
		var ch = formatter.charAt(i);
		if (ret.length == 0) {
			ret[0] = ch;
		} else {
			var index = ret.length - 1;
			if (ret[index].charAt(0) == "'") {
				if (ret[index].length == 1
						|| ret[index].charAt(ret[index].length - 1) != "'") {
					ret[index] += ch;
				} else {
					ret[index + 1] = ch;
				}
			} else if (ret[index].charAt(0) == ch) {
				ret[index] += ch;
			} else {
				ret[index + 1] = ch;
			}
		}
	}
	return ret;
};


///////////////////////////////////////////////////////////////////////////////
/**
 * The function to format the Number self to String. 
 * @param {String}
 *            formatter: required<br>
 * @param {String}
 *            rounder : optional, the default is HALF_EVEN<br>
 *            {UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN}<br>
 * @returns {String}
 */
Number.prototype.format=function(formatter, rounder){
	return EfwClientFormat.prototype.formatNumber(this,formatter, rounder);
};
/**
 * The function to parse the value to Number.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Number}
 */
Number.parse=function(value,formatter){
	if(formatter==null){
		return new Number(value);
	}else{
		return EfwClientFormat.prototype.parseNumber(value, formatter); 
	}
};
/**
 * The function to format the Date self to String. 
 * @param {String}
 *            formatter: required<br>
 * @returns {String}
 */
Date.prototype.format=function(formatter){
	return EfwClientFormat.prototype.formatDate(this,formatter);
};
/**
 * The function to parse the value to Date.
 * @param {String} value: required<br>
 * @param {String} formatter: required<br>
 * @returns {Date}
 */
Date.parse=function(value,formatter){
	if(formatter==null){
		return (new Date(value)).getTime();
	}else{
		return EfwClientFormat.prototype.parseDate(value, formatter); 
	}
};
/**
 * The function to get years to now. 
  * @param {Date} current: optional<br>
 * @returns {Number}
 */
Date.prototype.getYears=function(current){
	if (current==null)current=new Date();
	var diff=Number.parse(current.format("yyyyMMdd"),"0")-Number.parse(this.format("yyyyMMdd"),"0");
	return Math.floor(diff/10000);
};
