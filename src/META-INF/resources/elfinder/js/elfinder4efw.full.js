/*!
 * elFinder - file manager for web
 * Version 2.1.20 (2017-01-11)
 * http://elfinder.org
 * 
 * Copyright 2009-2017, Studio 42
 * Licensed under a 3-clauses BSD license
 */

/*
 * Efw does not support commands:
 * search,resize,places,quicklook,netmount,netunmount,help,extract,chmod,archive,edit
 * Efw Changed download upload send and so on.
 */

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery','jquery-ui'], factory);
	} else if (typeof exports !== 'undefined') {
		// CommonJS
		var $, ui;
		try {
			$ = require('jquery');
			ui = require('jquery-ui');
		} catch (e) {}
		module.exports = factory($, ui);
	} else {
		// Browser globals (Note: root is window)
		factory(root.jQuery, root.jQuery.ui, true);
	}
}(this, function($, _ui, toGlobal) {
toGlobal = toGlobal || false;


/*
 * File: /js/elFinder.js
 */

/**
 * @class elFinder - file manager for web
 *
 * @author Dmitry (dio) Levashov
 **/
var elFinder = function(node, opts) {
	//this.time('load');
	
	var self = this,
		
		/**
		 * Node on which elfinder creating
		 *
		 * @type jQuery
		 **/
		node = $(node),
		
		/**
		 * Store node contents.
		 *
		 * @see this.destroy
		 * @type jQuery
		 **/
		prevContent = $('<div></div>').append(node.contents()),
		
		/**
		 * Store node inline styles
		 *
		 * @see this.destroy
		 * @type String
		 **/
		prevStyle = node.attr('style'),
		
		/**
		 * Instance ID. Required to get/set cookie
		 *
		 * @type String
		 **/
		id = node.attr('id') || '',
		
		/**
		 * Events namespace
		 *
		 * @type String
		 **/
		namespace = 'elfinder-' + (id ? id : Math.random().toString().substr(2, 7)),
		
		/**
		 * Mousedown event
		 *
		 * @type String
		 **/
		mousedown = 'mousedown.'+namespace,
		
		/**
		 * Keydown event
		 *
		 * @type String
		 **/
		keydown = 'keydown.'+namespace,
		
		/**
		 * Keypress event
		 *
		 * @type String
		 **/
		keypress = 'keypress.'+namespace,
		
		/**
		 * Is shortcuts/commands enabled
		 *
		 * @type Boolean
		 **/
		enabled = true,
		
		/**
		 * Store enabled value before ajax requiest
		 *
		 * @type Boolean
		 **/
		prevEnabled = true,
		
		/**
		 * List of build-in events which mapped into methods with same names
		 *
		 * @type Array
		 **/
		events = ['enable', 'disable', 'load', 'open', 'reload', 'select',  'add', 'remove', 'change', 'dblclick', 'getfile', 'lockfiles', 'unlockfiles', 'selectfiles', 'unselectfiles', 'dragstart', 'dragstop', 'search', 'searchend', 'viewchange'],
		
		/**
		 * Rules to validate data from backend
		 *
		 * @type Object
		 **/
		rules = {},
		
		/**
		 * Current working directory hash
		 *
		 * @type String
		 **/
		cwd = '',
		
		/**
		 * Current working directory options
		 *
		 * @type Object
		 **/
		cwdOptions = {
			path          : '',
			url           : '',
			tmbUrl        : '',
			disabled      : [],
			separator     : '/',
			archives      : [],
			extract       : [],
			copyOverwrite : true,
			uploadOverwrite : true,
			uploadMaxSize : 0,
			jpgQuality    : 100,
			tmbCrop       : false,
			tmb           : false // old API
		},
		
		/**
		 * Files/dirs cache
		 *
		 * @type Object
		 **/
		files = {},
		
		/**
		 * Selected files hashes
		 *
		 * @type Array
		 **/
		selected = [],
		
		/**
		 * Events listeners
		 *
		 * @type Object
		 **/
		listeners = {},
		
		/**
		 * Shortcuts
		 *
		 * @type Object
		 **/
		shortcuts = {},
		
		/**
		 * Buffer for copied files
		 *
		 * @type Array
		 **/
		clipboard = [],
		
		/**
		 * Copied/cuted files hashes
		 * Prevent from remove its from cache.
		 * Required for dispaly correct files names in error messages
		 *
		 * @type Array
		 **/
		remember = [],
		
		/**
		 * Queue for 'open' requests
		 *
		 * @type Array
		 **/
		queue = [],
		
		/**
		 * Queue for only cwd requests e.g. `tmb`
		 *
		 * @type Array
		 **/
		cwdQueue = [],
		
		/**
		 * Commands prototype
		 *
		 * @type Object
		 **/
		base = new self.command(self),
		
		/**
		 * elFinder node width
		 *
		 * @type String
		 * @default "auto"
		 **/
		width  = 'auto',
		
		/**
		 * elFinder node height
		 *
		 * @type Number
		 * @default 400
		 **/
		height = 400,
		
		/**
		 * elfinder path for sound played on remove
		 * @type String
		 * @default ./sounds/
		 **/
		soundPath = './sounds/',
				
		beeper = $(document.createElement('audio')).hide().appendTo('body')[0],
			
		syncInterval,
		autoSyncStop = 0,
		
		uiCmdMapPrev = '',
		
		open = function(data) {
			// NOTES: Do not touch data object
		
			var volumeid, contextmenu, emptyDirs = {}, stayDirs = {},
				rmClass, hashes, calc, gc, collapsed, prevcwd;
			
			if (self.api >= 2.1) {
				self.commandMap = (data.options.uiCmdMap && Object.keys(data.options.uiCmdMap).length)? data.options.uiCmdMap : {};
				
				// support volume driver option `uiCmdMap`
				if (uiCmdMapPrev !== JSON.stringify(self.commandMap)) {
					uiCmdMapPrev = JSON.stringify(self.commandMap);
					if (Object.keys(self.commandMap).length) {
						// for contextmenu
						contextmenu = self.getUI('contextmenu');
						if (!contextmenu.data('cmdMaps')) {
							contextmenu.data('cmdMaps', {});
						}
						volumeid = data.cwd? data.cwd.volumeid : null;
						if (volumeid && !contextmenu.data('cmdMaps')[volumeid]) {
							contextmenu.data('cmdMaps')[volumeid] = self.commandMap;
						}
					}
				}
			} else {
				self.options.sync = 0;
			}
			
			if (data.init) {
				// init - reset cache
				files = {};
			} else {
				// remove only files from prev cwd
				// and collapsed directory (included 100+ directories) to empty for perfomance tune in DnD
				prevcwd = cwd;
				rmClass = 'elfinder-subtree-loaded ' + self.res('class', 'navexpand');
				collapsed = self.res('class', 'navcollapse');
				hashes = Object.keys(files);
				calc = function(n, i) {
					if (!files[i]) {
						return true;
					}
					
					var isDir = (files[i].mime === 'directory'),
						phash = files[i].phash,
						pnav;
					
					if (
						(!isDir
							|| emptyDirs[phash]
							|| (!stayDirs[phash]
								&& $('#'+self.navHash2Id(files[i].hash)).is(':hidden')
								&& $('#'+self.navHash2Id(phash)).next('.elfinder-navbar-subtree').children().length > 100
							)
						)
						&& (isDir || phash !== cwd)
						&& $.inArray(i, remember) === -1
					) {
						if (isDir && !emptyDirs[phash]) {
							emptyDirs[phash] = true;
							$('#'+self.navHash2Id(phash))
							 .removeClass(rmClass)
							 .next('.elfinder-navbar-subtree').empty();
						}
						delete files[i];
					} else if (isDir) {
						stayDirs[phash] = true;
					}
				};
				gc = function() {
					if (hashes.length) {
						$.each(hashes.splice(0, 100), calc);
						if (hashes.length) {
							setTimeout(gc, 20);
						}
					}
				};
				
				self.trigger('filesgc').one('filesgc', function() {
					hashes = [];
				});
				
				self.one('opendone', function() {
					if (prevcwd !== cwd) {
						if (! node.data('lazycnt')) {
							gc();
						} else {
							self.one('lazydone', gc);
						}
					}
				});
			}

			self.sorters = [];
			cwd = data.cwd.hash;
			cache(data.files);
			if (!files[cwd]) {
				cache([data.cwd]);
			}
			self.lastDir(cwd);
			
			self.autoSync();
		},
		
		/**
		 * Store info about files/dirs in "files" object.
		 *
		 * @param  Array  files
		 * @return void
		 **/
		cache = function(data) {
			var defsorter = { name: true, perm: true, date: true,  size: true, kind: true },
				sorterChk = (self.sorters.length === 0),
				l         = data.length,
				f, i;

			for (i = 0; i < l; i++) {
				f = data[i];
				if (f.name && f.hash && f.mime) {
					if (sorterChk && f.phash === cwd) {
						$.each(self.sortRules, function(key) {
							if (defsorter[key] || typeof f[key] !== 'undefined' || (key === 'mode' && typeof f.perm !== 'undefined')) {
								self.sorters.push(key);
							}
						});
						sorterChk = false;
					}
					
					// make or update of leaf roots cache
					if (f.isroot && f.phash) {
						if (! self.leafRoots[f.phash]) {
							self.leafRoots[f.phash] = [ f.hash ];
						} else {
							if ($.inArray(f.hash, self.leafRoots[f.phash]) === -1) {
								self.leafRoots[f.phash].push(f.hash);
							}
						}
						if (files[f.phash]) {
							if (! files[f.phash].dirs) {
								files[f.phash].dirs = 1;
							}
							if (f.ts && (files[f.phash].ts || 0) < f.ts) {
								files[f.phash].ts = f.ts;
							}
						}
					}
					
					files[f.hash] = f;
				} 
			}
		},
		
		/**
		 * Exec shortcut
		 *
		 * @param  jQuery.Event  keydown/keypress event
		 * @return void
		 */
		execShortcut = function(e) {
			var code    = e.keyCode,
				ctrlKey = !!(e.ctrlKey || e.metaKey),
				ddm;

			if (enabled) {

				$.each(shortcuts, function(i, shortcut) {
					if (shortcut.type    == e.type 
					&& shortcut.keyCode  == code 
					&& shortcut.shiftKey == e.shiftKey 
					&& shortcut.ctrlKey  == ctrlKey 
					&& shortcut.altKey   == e.altKey) {
						e.preventDefault();
						e.stopPropagation();
						shortcut.callback(e, self);
						self.debug('shortcut-exec', i+' : '+shortcut.description);
					}
				});
				
				// prevent tab out of elfinder
				if (code == $.ui.keyCode.TAB && !$(e.target).is(':input')) {
					e.preventDefault();
				}
				
				// cancel any actions by [Esc] key
				if (e.type === 'keydown' && code == $.ui.keyCode.ESCAPE) {
					// copy or cut 
					if (! node.find('.ui-widget:visible').length) {
						self.clipboard().length && self.clipboard([]);
					}
					// dragging
					if ($.ui.ddmanager) {
						ddm = $.ui.ddmanager.current;
						ddm && ddm.helper && ddm.cancel();
					}
					// button menus
					node.find('.ui-widget.elfinder-button-menu').hide();
				}

			}
		},
		date = new Date(),
		utc,
		i18n,
		inFrame = (window.parent !== window),
		parentIframe = (function() {
			var pifm, ifms;
			if (inFrame) {
				try {
					ifms = $('iframe', window.parent.document);
					if (ifms.length) {
						$.each(ifms, function(i, ifm) {
							if (ifm.contentWindow === window) {
								pifm = $(ifm);
								return false;
							}
						});
					}
				} catch(e) {}
			}
			return pifm;
		})();
		;


	/**
	 * Protocol version
	 *
	 * @type String
	 **/
	this.api = null;
	
	/**
	 * elFinder use new api
	 *
	 * @type Boolean
	 **/
	this.newAPI = false;
	
	/**
	 * elFinder use old api
	 *
	 * @type Boolean
	 **/
	this.oldAPI = false;
	
	/**
	 * Net drivers names
	 *
	 * @type Array
	 **/
	this.netDrivers = [];
	
	/**
	 * Configuration options
	 *
	 * @type Object
	 **/
	this.options = $.extend(true, {}, this._options, opts||{});
	
	// auto load required CSS
	if (this.options.cssAutoLoad) {
		(function(fm) {
			var myTag = $('head > script[src$="js/elfinder.min.js"],script[src$="js/elfinder.full.js"]:first'),
				baseUrl, hide, fi, cnt;
			if (myTag.length) {
				// hide elFinder node while css loading
				hide = $('<style>.elfinder{visibility:hidden;overflow:hidden}</style>');
				
				$('head').append(hide);
				baseUrl = myTag.attr('src').replace(/js\/[^\/]+$/, '');
				fm.loadCss([baseUrl+'css/elfinder.min.css', baseUrl+'css/theme.css']);
				
				// additional CSS files
				if ($.isArray(fm.options.cssAutoLoad)) {
					fm.loadCss(fm.options.cssAutoLoad);
				}
				
				// check css loaded and remove hide
				cnt = 1000; // timeout 10 secs
				fi = setInterval(function() {
					if (--cnt > 0 && node.css('visibility') !== 'hidden') {
						clearInterval(fi);
						hide.remove();
						fm.trigger('cssloaded');
					}
				}, 10);
			} else {
				fm.options.cssAutoLoad = false;
			}
		})(this);
	}
	
	/**
	 * Volume option to set the properties of the root Stat
	 * 
	 * @type Array
	 */
	this.optionProperties = ['icon', 'csscls', 'tmbUrl', 'uiCmdMap', 'netkey'];
	
	if (opts.ui) {
		this.options.ui = opts.ui;
	}
	
	if (opts.commands) {
		this.options.commands = opts.commands;
	}
	
	if (opts.uiOptions && opts.uiOptions.toolbar) {
		this.options.uiOptions.toolbar = opts.uiOptions.toolbar;
	}

	if (opts.uiOptions && opts.uiOptions.cwd && opts.uiOptions.cwd.listView && opts.uiOptions.cwd.listView.columns) {
		this.options.uiOptions.cwd.listView.columns = opts.uiOptions.cwd.listView.columns;
	}
	if (opts.uiOptions && opts.uiOptions.cwd && opts.uiOptions.cwd.listView && opts.uiOptions.cwd.listView.columnsCustomName) {
		this.options.uiOptions.cwd.listView.columnsCustomName = opts.uiOptions.cwd.listView.columnsCustomName;
	}

	if (! inFrame && ! this.options.enableAlways && $('body').children().length === 2) { // only node and beeper
		this.options.enableAlways = true;
	}
	
	/**
	 * Is elFinder over CORS
	 *
	 * @type Boolean
	 **/
	this.isCORS = false;
	
	// configure for CORS
	(function(){
		var parseUrl = document.createElement('a'),
			parseUploadUrl;
		parseUrl.href = opts.url;
		if (opts.urlUpload && (opts.urlUpload !== opts.url)) {
			parseUploadUrl = document.createElement('a');
			parseUploadUrl.href = opts.urlUpload;
		}
		if (window.location.host !== parseUrl.host || (parseUploadUrl && (window.location.host !== parseUploadUrl.host))) {
			self.isCORS = true;
			if (!$.isPlainObject(self.options.customHeaders)) {
				self.options.customHeaders = {};
			}
			if (!$.isPlainObject(self.options.xhrFields)) {
				self.options.xhrFields = {};
			}
			self.options.requestType = 'post';
			self.options.customHeaders['X-Requested-With'] = 'XMLHttpRequest';
			self.options.xhrFields['withCredentials'] = true;
		}
	})();

	$.extend(this.options.contextmenu, opts.contextmenu);
	
	/**
	 * Ajax request type
	 *
	 * @type String
	 * @default "get"
	 **/
	this.requestType = /^(get|post)$/i.test(this.options.requestType) ? this.options.requestType.toLowerCase() : 'get';
	
	/**
	 * Any data to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 **/
	this.customData = $.isPlainObject(this.options.customData) ? this.options.customData : {};

	/**
	 * Any custom headers to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	*/
	this.customHeaders = $.isPlainObject(this.options.customHeaders) ? this.options.customHeaders : {};

	/**
	 * Any custom xhrFields to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 */
	this.xhrFields = $.isPlainObject(this.options.xhrFields) ? this.options.xhrFields : {};

	/**
	 * command names for into queue for only cwd requests
	 * these commands aborts before `open` request
	 *
	 * @type Array
	 * @default ['tmb']
	 */
	this.abortCmdsOnOpen = this.options.abortCmdsOnOpen || ['tmb'];

	/**
	 * ID. Required to create unique cookie name
	 *
	 * @type String
	 **/
	this.id = id;
	
	/**
	 * ui.nav id prefix
	 * 
	 * @type String
	 */
	this.navPrefix = 'nav' + (elFinder.prototype.uniqueid? elFinder.prototype.uniqueid : '') + '-';
	
	/**
	 * ui.cwd id prefix
	 * 
	 * @type String
	 */
	this.cwdPrefix = elFinder.prototype.uniqueid? ('cwd' + elFinder.prototype.uniqueid + '-') : '';
	
	// Increment elFinder.prototype.uniqueid
	++elFinder.prototype.uniqueid;
	
	/**
	 * URL to upload files
	 *
	 * @type String
	 **/
	this.uploadURL = opts.urlUpload || opts.url;
	
	/**
	 * Events namespace
	 *
	 * @type String
	 **/
	this.namespace = namespace;

	/**
	 * Interface language
	 *
	 * @type String
	 * @default "en"
	 **/
	this.lang = this.i18[this.options.lang] && this.i18[this.options.lang].messages ? this.options.lang : 'en';
	
	i18n = this.lang == 'en' 
		? this.i18['en'] 
		: $.extend(true, {}, this.i18['en'], this.i18[this.lang]);
	
	/**
	 * Interface direction
	 *
	 * @type String
	 * @default "ltr"
	 **/
	this.direction = i18n.direction;
	
	/**
	 * i18 messages
	 *
	 * @type Object
	 **/
	this.messages = i18n.messages;
	
	/**
	 * Date/time format
	 *
	 * @type String
	 * @default "m.d.Y"
	 **/
	this.dateFormat = this.options.dateFormat || i18n.dateFormat;
	
	/**
	 * Date format like "Yesterday 10:20:12"
	 *
	 * @type String
	 * @default "{day} {time}"
	 **/
	this.fancyFormat = this.options.fancyDateFormat || i18n.fancyDateFormat;

	/**
	 * Today timestamp
	 *
	 * @type Number
	 **/
	this.today = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime()/1000;
	
	/**
	 * Yesterday timestamp
	 *
	 * @type Number
	 **/
	this.yesterday = this.today - 86400;
	
	utc = this.options.UTCDate ? 'UTC' : '';
	
	this.getHours    = 'get'+utc+'Hours';
	this.getMinutes  = 'get'+utc+'Minutes';
	this.getSeconds  = 'get'+utc+'Seconds';
	this.getDate     = 'get'+utc+'Date';
	this.getDay      = 'get'+utc+'Day';
	this.getMonth    = 'get'+utc+'Month';
	this.getFullYear = 'get'+utc+'FullYear';
	
	/**
	 * Css classes 
	 *
	 * @type String
	 **/
	this.cssClass = 'ui-helper-reset ui-helper-clearfix ui-widget ui-widget-content ui-corner-all elfinder elfinder-'
			+(this.direction == 'rtl' ? 'rtl' : 'ltr')
			+(this.UA.Touch? (' elfinder-touch' + (this.options.resizable ? ' touch-punch' : '')) : '')
			+(this.UA.Mobile? ' elfinder-mobile' : '')
			+' '+this.options.cssClass;

	/**
	 * elFinder node z-index (auto detect on elFinder load)
	 *
	 * @type null | Number
	 **/
	this.zIndex;

	/**
	 * Current search status
	 * 
	 * @type Object
	 */
	this.searchStatus = {
		state  : 0, // 0: search ended, 1: search started, 2: in search result
		query  : '',
		target : '',
		mime   : '',
		mixed  : false, // in multi volumes search
		ininc  : false // in incremental search
	};

	/**
	 * Method to store/fetch data
	 *
	 * @type Function
	 **/
	this.storage = (function() {
		try {
			if ('localStorage' in window && window['localStorage'] !== null) {
				if (self.UA.Safari) {
					// check for Mac/iOS safari private browsing mode
					window.localStorage.setItem('elfstoragecheck', 1);
					window.localStorage.removeItem('elfstoragecheck');
				}
				return self.localStorage;
			} else {
				return self.cookie;
			}
		} catch (e) {
			return self.cookie;
		}
	})();

	this.viewType = this.storage('view') || this.options.defaultView || 'icons';

	this.sortType = this.storage('sortType') || this.options.sortType || 'name';
	
	this.sortOrder = this.storage('sortOrder') || this.options.sortOrder || 'asc';

	this.sortStickFolders = this.storage('sortStickFolders');
	if (this.sortStickFolders === null) {
		this.sortStickFolders = !!this.options.sortStickFolders;
	} else {
		this.sortStickFolders = !!this.sortStickFolders
	}

	this.sortAlsoTreeview = this.storage('sortAlsoTreeview');
	if (this.sortAlsoTreeview === null) {
		this.sortAlsoTreeview = !!this.options.sortAlsoTreeview;
	} else {
		this.sortAlsoTreeview = !!this.sortAlsoTreeview
	}

	this.sortRules = $.extend(true, {}, this._sortRules, this.options.sortRules);
	
	$.each(this.sortRules, function(name, method) {
		if (typeof method != 'function') {
			delete self.sortRules[name];
		} 
	});
	
	this.compare = $.proxy(this.compare, this);
	
	/**
	 * Delay in ms before open notification dialog
	 *
	 * @type Number
	 * @default 500
	 **/
	this.notifyDelay = this.options.notifyDelay > 0 ? parseInt(this.options.notifyDelay) : 500;
	
	/**
	 * Dragging UI Helper object
	 *
	 * @type jQuery | null
	 **/
	this.draggingUiHelper = null;
	
	// draggable closure
	(function() {
		var ltr, wzRect, wzBottom, nodeStyle,
			keyEvt = keydown + 'draggable' + ' keyup.' + namespace + 'draggable';

		/**
		 * Base draggable options
		 *
		 * @type Object
		 **/
		self.draggable = {
			appendTo   : node,
			addClasses : false,
			distance   : 4,
			revert     : true,
			refreshPositions : false,
			cursor     : 'crosshair',
			cursorAt   : {left : 50, top : 47},
			scroll     : false,
			start      : function(e, ui) {
				var helper   = ui.helper,
					targets  = $.map(helper.data('files')||[], function(h) { return h || null ;}),
					locked   = false,
					cnt, h;
				
				// fix node size
				nodeStyle = node.attr('style');
				node.width(node.width()).height(node.height());
				
				// set var for drag()
				ltr = (self.direction === 'ltr');
				wzRect = self.getUI('workzone').data('rectangle');
				wzBottom = wzRect.top + wzRect.height;
				
				self.draggingUiHelper = helper;
				cnt = targets.length;
				while (cnt--) {
					h = targets[cnt];
					if (files[h].locked) {
						locked = true;
						helper.data('locked', true);
						break;
					}
				}
				!locked && self.trigger('lockfiles', {files : targets});
	
				helper.data('autoScrTm', setInterval(function() {
					if (helper.data('autoScr')) {
						self.autoScroll[helper.data('autoScr')](helper.data('autoScrVal'));
					}
				}, 50));
			},
			drag       : function(e, ui) {
				var helper = ui.helper,
					autoUp;
				
				if ((autoUp = wzRect.top > e.pageY) || wzBottom < e.pageY) {
					if (wzRect.cwdEdge > e.pageX) {
						helper.data('autoScr', (ltr? 'navbar' : 'cwd') + (autoUp? 'Up' : 'Down'));
					} else {
						helper.data('autoScr', (ltr? 'cwd' : 'navbar') + (autoUp? 'Up' : 'Down'));
					}
					helper.data('autoScrVal', Math.pow((autoUp? wzRect.top - e.pageY : e.pageY - wzBottom), 1.3));
				} else {
					if (helper.data('autoScr')) {
						helper.data('refreshPositions', 1).data('autoScr', null);
					}
				}
				if (helper.data('refreshPositions') && $(this).elfUiWidgetInstance('draggable')) {
					if (helper.data('refreshPositions') > 0) {
						$(this).draggable('option', { refreshPositions : true, elfRefresh : true });
						helper.data('refreshPositions', -1);
					} else {
						$(this).draggable('option', { refreshPositions : false, elfRefresh : false });
						helper.data('refreshPositions', null);
					}
				}
			},
			stop       : function(e, ui) {
				var helper = ui.helper,
					files;
				
				$(document).off(keyEvt);
				$(this).elfUiWidgetInstance('draggable') && $(this).draggable('option', { refreshPositions : false });
				self.draggingUiHelper = null;
				self.trigger('focus').trigger('dragstop');
				if (! helper.data('droped')) {
					files = $.map(helper.data('files')||[], function(h) { return h || null ;});
					self.trigger('unlockfiles', {files : files});
					self.trigger('selectfiles', {files : files});
				}
				self.enable();
				
				// restore node style
				node.attr('style', nodeStyle);
				
				helper.data('autoScrTm') && clearInterval(helper.data('autoScrTm'));
			},
			helper     : function(e, ui) {
				var element = this.id ? $(this) : $(this).parents('[id]:first'),
					helper  = $('<div class="elfinder-drag-helper"><span class="elfinder-drag-helper-icon-status"></span></div>'),
					icon    = function(f) {
						var mime = f.mime, i, tmb = self.tmb(f);
						i = '<div class="elfinder-cwd-icon '+self.mime2class(mime)+' ui-corner-all"></div>';
						if (tmb) {
							i = $(i).addClass(tmb.className).css('background-image', "url('"+tmb.url+"')").get(0).outerHTML;
						}
						return i;
					},
					hashes, l, ctr;
				
				self.draggingUiHelper && self.draggingUiHelper.stop(true, true);
				
				self.trigger('dragstart', {target : element[0], originalEvent : e});
				
				hashes = element.hasClass(self.res('class', 'cwdfile')) 
					? self.selected() 
					: [self.navId2Hash(element.attr('id'))];
				
				helper.append(icon(files[hashes[0]])).data('files', hashes).data('locked', false).data('droped', false).data('namespace', namespace).data('dropover', 0);
	
				if ((l = hashes.length) > 1) {
					helper.append(icon(files[hashes[l-1]]) + '<span class="elfinder-drag-num">'+l+'</span>');
				}
				
				$(document).on(keyEvt, function(e){
					var chk = (e.shiftKey||e.ctrlKey||e.metaKey);
					if (ctr !== chk) {
						ctr = chk;
						if (helper.is(':visible') && helper.data('dropover') && ! helper.data('droped')) {
							helper.toggleClass('elfinder-drag-helper-plus', helper.data('locked')? true : ctr);
							self.trigger(ctr? 'unlockfiles' : 'lockfiles', {files : hashes, helper: helper});
						}
					}
				});
				
				return helper;
			}
		};
	})();
	
	/**
	 * Base droppable options
	 *
	 * @type Object
	 **/
	this.droppable = {
		greedy     : true,
		tolerance  : 'pointer',
		accept     : '.elfinder-cwd-file-wrapper,.elfinder-navbar-dir,.elfinder-cwd-file,.elfinder-cwd-filename',
		hoverClass : this.res('class', 'adroppable'),
		classes    : { // Deprecated hoverClass jQueryUI>=1.12.0
			'ui-droppable-hover': this.res('class', 'adroppable')
		},
		autoDisable: true, // elFinder original, see jquery.elfinder.js
		drop : function(e, ui) {
			var dst     = $(this),
				targets = $.map(ui.helper.data('files')||[], function(h) { return h || null }),
				result  = [],
				dups    = [],
				faults  = [],
				isCopy  = ui.helper.hasClass('elfinder-drag-helper-plus'),
				c       = 'class',
				cnt, hash, i, h;
			
			if (typeof e.button === 'undefined' || ui.helper.data('namespace') !== namespace || ! self.insideWorkzone(e.pageX, e.pageY)) {
				return false;
			}
			if (dst.hasClass(self.res(c, 'cwdfile'))) {
				hash = self.cwdId2Hash(dst.attr('id'));
			} else if (dst.hasClass(self.res(c, 'navdir'))) {
				hash = self.navId2Hash(dst.attr('id'));
			} else {
				hash = cwd;
			}

			cnt = targets.length;
			
			while (cnt--) {
				h = targets[cnt];
				// ignore drop into itself or in own location
				if (h != hash && files[h].phash != hash) {
					result.push(h);
				} else {
					((isCopy && h !== hash && files[hash].write)? dups : faults).push(h);
				}
			}
			
			if (faults.length) {
				return false;
			}
			
			ui.helper.data('droped', true);
			
			if (dups.length) {
				ui.helper.hide();
				self.exec('duplicate', dups);
			}
			
			if (result.length) {
				ui.helper.hide();
				self.clipboard(result, !isCopy);
				self.exec('paste', hash, void 0, hash).always(function(){
					self.clipboard([]);
					self.trigger('unlockfiles', {files : targets});
				});
				self.trigger('drop', {files : targets});
			}
		}
	};
	
	/**
	 * Return true if filemanager is active
	 *
	 * @return Boolean
	 **/
	this.enabled = function() {
		return enabled && this.visible();
	};
	
	/**
	 * Return true if filemanager is visible
	 *
	 * @return Boolean
	 **/
	this.visible = function() {
		return node[0].elfinder && node.is(':visible');
	};
	
	/**
	 * Return file is root?
	 * 
	 * @param  Object  target file object
	 * @return Boolean
	 */
	this.isRoot = function(file) {
		return (file.isroot || ! file.phash)? true : false;
	}
	
	/**
	 * Return root dir hash for current working directory
	 * 
	 * @param  String   target hash
	 * @param  Boolean  include fake parent (optional)
	 * @return String
	 */
	this.root = function(hash, fake) {
		hash = hash || cwd;
		var dir, i;
		
		if (! fake) {
			$.each(self.roots, function(id, rhash) {
				if (hash.indexOf(id) === 0) {
					dir = rhash;
					return false;
				}
			});
			if (dir) {
				return dir;
			}
		}
		
		dir = files[hash];
		while (dir && dir.phash && (fake || ! dir.isroot)) {
			dir = files[dir.phash]
		}
		if (dir) {
			return dir.hash;
		}
		
		while (i in files && files.hasOwnProperty(i)) {
			dir = files[i]
			if (!dir.phash && !dir.mime == 'directory' && dir.read) {
				return dir.hash;
			}
		}
		
		return '';
	};
	
	/**
	 * Return current working directory info
	 * 
	 * @return Object
	 */
	this.cwd = function() {
		return files[cwd] || {};
	};
	
	/**
	 * Return required cwd option
	 * 
	 * @param  String  option name
	 * @param  String  target hash (optional)
	 * @return mixed
	 */
	this.option = function(name, target) {
		var res;
		target = target || cwd;
		if (self.optionsByHashes[target] && typeof self.optionsByHashes[target][name] !== 'undefined') {
			return self.optionsByHashes[target][name];
		}
		if (cwd !== target) {
			res = '';
			$.each(self.volOptions, function(id, opt) {
				if (target.indexOf(id) === 0) {
					res = opt[name] || '';
					return false;
				}
			});
			return res;
		} else {
			return cwdOptions[name] || '';
		}
	};
	
	/**
	 * Return disabled commands by each folder
	 * 
	 * @param  Array  target hashes
	 * @return Array
	 */
	this.getDisabledCmds = function(targets) {
		var disabled = [];
		if (! $.isArray(targets)) {
			targets = [ targets ];
		}
		$.each(targets, function(i, h) {
			var disCmds = self.option('disabled', h);
			if (disCmds) {
				$.each(disCmds, function(i, cmd) {
					if ($.inArray(cmd, disabled) === -1) {
						disabled.push(cmd);
					}
				});
			}
		});
		return disabled;
	}
	
	/**
	 * Return file data from current dir or tree by it's hash
	 * 
	 * @param  String  file hash
	 * @return Object
	 */
	this.file = function(hash) { 
		return hash? files[hash] : void(0); 
	};
	
	/**
	 * Return all cached files
	 * 
	 * @return Array
	 */
	this.files = function() {
		return $.extend(true, {}, files);
	};
	
	/**
	 * Return list of file parents hashes include file hash
	 * 
	 * @param  String  file hash
	 * @return Array
	 */
	this.parents = function(hash) {
		var parents = [],
			dir;
		
		while ((dir = this.file(hash))) {
			parents.unshift(dir.hash);
			hash = dir.phash;
		}
		return parents;
	};
	
	this.path2array = function(hash, i18) {
		var file, 
			path = [];
			
		while (hash) {
			if ((file = files[hash]) && file.hash) {
				path.unshift(i18 && file.i18 ? file.i18 : file.name);
				hash = file.isroot? null : file.phash;
			} else {
				path = [];
				break;
			}
		}
			
		return path;
	};
	
	/**
	 * Return file path or Get path async with jQuery.Deferred
	 * 
	 * @param  Object  file
	 * @param  Boolean i18
	 * @param  Object  asyncOpt
	 * @return String|jQuery.Deferred
	 */
	this.path = function(hash, i18, asyncOpt) { 
		var path = files[hash] && files[hash].path
			? files[hash].path
			: this.path2array(hash, i18).join(cwdOptions.separator);
		if (! asyncOpt || ! files[hash]) {
			return path;
		} else {
			asyncOpt = $.extend({notify: {type : 'parents', cnt : 1, hideCnt : true}}, asyncOpt);
			
			var dfd    = $.Deferred(),
				notify = asyncOpt.notify,
				noreq  = false,
				req    = function() {
					self.request({
						data : {cmd : 'parents', target : files[hash].phash},
						notify : notify,
						preventFail : true
					})
					.done(done)
					.fail(function() {
						dfd.reject();
					});
				},
				done   = function() {
					self.one('parentsdone', function() {
						path = self.path(hash, i18);
						if (path === '' && noreq) {
							//retry with request
							noreq = false;
							req();
						} else {
							if (notify) {
								clearTimeout(ntftm);
								notify.cnt = -(parseInt(notify.cnt || 0));
								self.notify(notify);
							}
							dfd.resolve(path);
						}
					});
				},
				ntftm;
		
			if (path) {
				return dfd.resolve(path);
			} else {
				if (self.ui['tree']) {
					// try as no request
					if (notify) {
						ntftm = setTimeout(function() {
							self.notify(notify);
						}, self.notifyDelay);
					}
					noreq = true;
					done(true);
				} else {
					req();
				}
				return dfd;
			}
		}
	};
	
	/**
	 * Return file url if set
	 * 
	 * @param  String  file hash
	 * @return String
	 */
	this.url = function(hash) {
		var file = files[hash],
			baseUrl;
		
		if (!file || !file.read) {
			return '';
		}
		
		if (file.url == '1') {
			this.request({
				data : {cmd : 'url', target : hash},
				preventFail : true,
				options: {async: false}
			})
			.done(function(data) {
				file.url = data.url || '';
			})
			.fail(function() {
				file.url = '';
			});
		}
		
		if (file.url) {
			return file.url;
		}
		
		baseUrl = (file.hash.indexOf(self.cwd().volumeid) === 0)? cwdOptions.url : this.option('url', file.hash);
		
		if (baseUrl) {
			return baseUrl + $.map(this.path2array(hash), function(n) { return encodeURIComponent(n); }).slice(1).join('/')
		}

		var params = $.extend({}, this.customData, {
			cmd: 'file',
			target: file.hash
		});
		if (this.oldAPI) {
			params.cmd = 'open';
			params.current = file.phash;
		}
		return this.options.url + (this.options.url.indexOf('?') === -1 ? '?' : '&') + $.param(params, true);
	};
	
	/**
	 * Return file url for open in elFinder
	 * 
	 * @param  String  file hash
	 * @param  Boolean for download link
	 * @return String
	 */
	this.openUrl = function(hash, download) {
		var file = files[hash],
			url  = '';
		
		if (!file || !file.read) {
			return '';
		}
		
		if (!download) {
			if (file.url) {
				if (file.url != 1) {
					return file.url;
				}
			} else if (cwdOptions.url && file.hash.indexOf(self.cwd().volumeid) === 0) {
				return cwdOptions.url + $.map(this.path2array(hash), function(n) { return encodeURIComponent(n); }).slice(1).join('/');
			}
		}
		
		url = this.options.url;
		url = url + (url.indexOf('?') === -1 ? '?' : '&')
			+ (this.oldAPI ? 'cmd=open&current='+file.phash : 'cmd=file')
			+ '&target=' + file.hash;
		
		if (download) {
			url += '&download=1';
		}
		
		$.each(this.options.customData, function(key, val) {
			url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val);
		});
		
		return url;
	};
	
	/**
	 * Return thumbnail url
	 * 
	 * @param  Object  file object
	 * @return String
	 */
	this.tmb = function(file) {
		var tmbUrl, tmbCrop,
			cls    = 'elfinder-cwd-bgurl',
			url    = '';

		if ($.isPlainObject(file)) {
			if (self.searchStatus.state && file.hash.indexOf(self.cwd().volumeid) !== 0) {
				tmbUrl = self.option('tmbUrl', file.hash);
				tmbCrop = self.option('tmbCrop', file.hash);
			} else {
				tmbUrl = cwdOptions['tmbUrl'];
				tmbCrop = cwdOptions['tmbCrop'];
			}
			if (tmbCrop) {
				cls += ' elfinder-cwd-bgurl-crop';
			}
			if (tmbUrl === 'self' && file.mime.indexOf('image/') === 0) {
				url = self.openUrl(file.hash);
				cls += ' elfinder-cwd-bgself';
			} else if ((self.oldAPI || tmbUrl) && file && file.tmb && file.tmb != 1) {
				url = tmbUrl + file.tmb;
			}
			if (url) {
				return { url: url, className: cls };
			}
		}
		
		return false;
	};
	
	/**
	 * Return selected files hashes
	 *
	 * @return Array
	 **/
	this.selected = function() {
		return selected.slice(0);
	};
	
	/**
	 * Return selected files info
	 * 
	 * @return Array
	 */
	this.selectedFiles = function() {
		return $.map(selected, function(hash) { return files[hash] ? $.extend({}, files[hash]) : null });
	};
	
	/**
	 * Return true if file with required name existsin required folder
	 * 
	 * @param  String  file name
	 * @param  String  parent folder hash
	 * @return Boolean
	 */
	this.fileByName = function(name, phash) {
		var hash;
	
		for (hash in files) {
			if (files.hasOwnProperty(hash) && files[hash].phash == phash && files[hash].name == name) {
				return files[hash];
			}
		}
	};
	
	/**
	 * Valid data for required command based on rules
	 * 
	 * @param  String  command name
	 * @param  Object  cammand's data
	 * @return Boolean
	 */
	this.validResponse = function(cmd, data) {
		return data.error || this.rules[this.rules[cmd] ? cmd : 'defaults'](data);
	};
	
	/**
	 * Return bytes from ini formated size
	 * 
	 * @param  String  ini formated size
	 * @return Integer
	 */
	this.returnBytes = function(val) {
		var last;
		if (isNaN(val)) {
			if (! val) {
				val = '';
			}
			// for ex. 1mb, 1KB
			val = val.replace(/b$/i, '');
			last = val.charAt(val.length - 1).toLowerCase();
			val = val.replace(/[tgmk]$/i, '');
			if (last == 't') {
				val = val * 1024 * 1024 * 1024 * 1024;
			} else if (last == 'g') {
				val = val * 1024 * 1024 * 1024;
			} else if (last == 'm') {
				val = val * 1024 * 1024;
			} else if (last == 'k') {
				val = val * 1024;
			}
			val = isNaN(val)? 0 : parseInt(val);
		} else {
			val = parseInt(val);
			if (val < 1) val = 0;
		}
		return val;
	};
	
	/**
	 * Proccess ajax request.
	 * Fired events :
	 * @todo
	 * @example
	 * @todo
	 * @return $.Deferred
	 */
	this.request = function(opts) { 
		var self     = this,
			o        = this.options,
			dfrd     = $.Deferred(),
			// request data
			data     = $.extend({}, o.customData, {mimes : o.onlyMimes}, opts.data || opts),
			// command name
			cmd      = data.cmd,
			isOpen   = (cmd === 'open'),
			// call default fail callback (display error dialog) ?
			deffail  = !(opts.preventDefault || opts.preventFail),
			// call default success callback ?
			defdone  = !(opts.preventDefault || opts.preventDone),
			// options for notify dialog
			notify   = $.extend({}, opts.notify),
			// make cancel button
			cancel   = !!opts.cancel,
			// do not normalize data - return as is
			raw      = !!opts.raw,
			// sync files on request fail
			syncOnFail = opts.syncOnFail,
			// use lazy()
			lazy     = !!opts.lazy,
			// prepare function before done()
			prepare  = opts.prepare,
			// open notify dialog timeout
			timeout,
			// request options
			options = $.extend({
				url      : o.url,
				async    : true,
				type     : this.requestType,
				dataType : 'json',
				cache    : false,
				// timeout  : 100,
				type     : this.requestType,
				contentType: "application/json;charset=UTF-8",
				data     : JSON.stringify({"eventId":"elfinder_cmds","lang":efw.lang,"params":data}),//EFW
				headers  : this.customHeaders,
				xhrFields: this.xhrFields
			}, opts.options || {}),
			/**
			 * Default success handler. 
			 * Call default data handlers and fire event with command name.
			 *
			 * @param Object  normalized response data
			 * @return void
			 **/
			done = function(data) {
				data.warning && self.error(data.warning);
				
				isOpen && open(data);

				self.lazy(function() {
					// fire some event to update cache/ui
					data.removed && data.removed.length && self.remove(data);
					data.added   && data.added.length   && self.add(data);
					data.changed && data.changed.length && self.change(data);
				}).then(function() {
					// fire event with command name
					return self.lazy(function() {
						self.trigger(cmd, data);
					});
				}).then(function() {
					// fire event with command name + 'done'
					return self.lazy(function() {
						self.trigger(cmd + 'done');
					});
				}).then(function() {
					// force update content
					data.sync && self.sync();
				});
			},
			/**
			 * Request error handler. Reject dfrd with correct error message.
			 *
			 * @param jqxhr  request object
			 * @param String request status
			 * @return void
			 **/
			error = function(xhr, status) {
				var error, data;
				
				switch (status) {
					case 'abort':
						error = xhr.quiet ? '' : ['errConnect', 'errAbort'];
						break;
					case 'timeout':	    
						error = ['errConnect', 'errTimeout'];
						break;
					case 'parsererror': 
						error = ['errResponse', 'errDataNotJSON'];
						if (xhr.responseText) {
							self.debug('backend-debug', { debug: {phpErrors: [ xhr.responseText] }});
							if (! cwd) {
								xhr.responseText && error.push(xhr.responseText);
							}
						}
						break;
					default:
						if (xhr.responseText) {
							// check responseText, Is that JSON?
							try {
								data = JSON.parse(xhr.responseText);
								if (data && data.error) {
									error = data.error;
								}
							} catch(e) {}
						}
						if (! error) {
							if (xhr.status == 403) {
								error = ['errConnect', 'errAccess', 'HTTP error ' + xhr.status];
							} else if (xhr.status == 404) {
								error = ['errConnect', 'errNotFound', 'HTTP error ' + xhr.status];
							} else {
								if (xhr.status == 414 && options.type === 'get') {
									// retry by POST method
									options.type = 'post';
									dfrd.xhr = xhr = self.transport.send(options).fail(error).done(success);
									return;
								}
								error = xhr.quiet ? '' : ['errConnect', 'HTTP error ' + xhr.status];
							} 
						}
				}
				
				self.trigger(cmd + 'done');
				dfrd.reject(error, xhr, status);
			},
			/**
			 * Request success handler. Valid response data and reject/resolve dfrd.
			 *
			 * @param Object  response data
			 * @param String request status
			 * @return void
			 **/
			success = function(response) {
				// Set currrent request command name
				self.currentReqCmd = cmd;
				
				if (raw) {
					response && response.debug && self.debug('backend-debug', response);
					return dfrd.resolve(response);
				}
				
				if (!response) {
					return dfrd.reject(['errResponse', 'errDataEmpty'], xhr, response);
				//------The response is from EFW .-------
				} else if (response.actions){
					EfwClient.prototype._showActions(response.actions);
					return;
				//----------------------------------------
				} else if (!$.isPlainObject(response)) {
					return dfrd.reject(['errResponse', 'errDataNotJSON'], xhr, response);
				} else if (response.error) {
					return dfrd.reject(response.error, xhr, response);
				} else if (!self.validResponse(cmd, response)) {
					return dfrd.reject('errResponse', xhr, response);
				}
				
				var resolve = function() {
					var pushLeafRoots = function(name) {
						if (self.leafRoots[data.target] && response[name]) {
							$.each(self.leafRoots[data.target], function(i, h) {
								var root;
								if (root = self.file(h)) {
									response[name].push(root);
								}
							});
						}
					};
					
					if (isOpen) {
						pushLeafRoots('files');
					} else if (cmd === 'tree') {
						pushLeafRoots('tree');
					}
					
					response = self.normalize(response);

					if (!self.api) {
						self.api    = response.api || 1;
						if (self.api == '2.0' && typeof response.options.uploadMaxSize !== 'undefined') {
							self.api = '2.1';
						}
						self.newAPI = self.api >= 2;
						self.oldAPI = !self.newAPI;
					}
					
					if (response.options) {
						cwdOptions = $.extend({}, cwdOptions, response.options);
					}

					if (response.netDrivers) {
						self.netDrivers = response.netDrivers;
					}

					if (response.maxTargets) {
						self.maxTargets = response.maxTargets;
					}

					if (isOpen && !!data.init) {
						self.uplMaxSize = self.returnBytes(response.uplMaxSize);
						self.uplMaxFile = !!response.uplMaxFile? parseInt(response.uplMaxFile) : 20;
					}

					if (typeof prepare === 'function') {
						prepare(response);
					}
					
					dfrd.resolve(response);
					response.debug && self.debug('backend-debug', response);
				};
				
				lazy? self.lazy(resolve) : resolve();
			},
			xhr, _xhr,
			abort = function(e){
				self.trigger(cmd + 'done');
				if (e.type == 'autosync') {
					if (e.data.action != 'stop') return;
				} else if (e.type != 'unload' && e.type != 'destroy' && e.type != 'openxhrabort') {
					if (!e.data.added || !e.data.added.length) {
						return;
					}
				}
				if (xhr.state() == 'pending') {
					xhr.quiet = true;
					xhr.abort();
					if (e.type != 'unload' && e.type != 'destroy') {
						self.autoSync();
					}
				}
			},
			request = function() {
				dfrd.fail(function(error, xhr, response) {
					self.trigger(cmd + 'fail', response);
					if (error) {
						deffail ? self.error(error) : self.debug('error', self.i18n(error));
					}
					syncOnFail && self.sync();
				})

				if (!cmd) {
					syncOnFail = false;
					return dfrd.reject('errCmdReq');
				}
				
				if (self.maxTargets && data.targets && data.targets.length > self.maxTargets) {
					syncOnFail = false;
					return dfrd.reject(['errMaxTargets', self.maxTargets]);
				}

				defdone && dfrd.done(done);
				if (notify.type && notify.cnt) {
					if (cancel) {
						notify.cancel = dfrd;
					}
					timeout = setTimeout(function() {
						self.notify(notify);
						dfrd.always(function() {
							notify.cnt = -(parseInt(notify.cnt)||0);
							self.notify(notify);
						})
					}, self.notifyDelay)
					
					dfrd.always(function() {
						clearTimeout(timeout);
					});
				}
				
				// quiet abort not completed "open" requests
				if (isOpen) {
					while ((_xhr = queue.pop())) {
						if (_xhr.state() == 'pending') {
							_xhr.quiet = true;
							_xhr.abort();
						}
					}
					if (cwd !== data.target) {
						while ((_xhr = cwdQueue.pop())) {
							if (_xhr.state() == 'pending') {
								_xhr.quiet = true;
								_xhr.abort();
							}
						}
					}
				}

				// trigger abort autoSync for commands to add the item
				if ($.inArray(cmd, (self.cmdsToAdd + ' autosync').split(' ')) !== -1) {
					if (cmd !== 'autosync') {
						self.autoSync('stop');
						dfrd.always(function() {
							self.autoSync();
						});
					}
					self.trigger('openxhrabort');
				}

				delete options.preventFail

				dfrd.xhr = xhr = self.transport.send(options).fail(error).done(success);
				
				if (isOpen || (data.compare && cmd === 'info')) {
					// add autoSync xhr into queue
					queue.unshift(xhr);
					// bind abort()
					data.compare && self.bind(self.cmdsToAdd + ' autosync openxhrabort', abort);
					dfrd.always(function() {
						var ndx = $.inArray(xhr, queue);
						data.compare && self.unbind(self.cmdsToAdd + ' autosync openxhrabort', abort);
						ndx !== -1 && queue.splice(ndx, 1);
					});
				} else if ($.inArray(cmd, self.abortCmdsOnOpen) !== -1) {
					// add "open" xhr, only cwd xhr into queue
					cwdQueue.unshift(xhr);
					dfrd.always(function() {
						var ndx = $.inArray(xhr, cwdQueue);
						ndx !== -1 && cwdQueue.splice(ndx, 1);
					});
				}
				
				// abort pending xhr on window unload or elFinder destroy
				self.bind('unload destroy', abort);
				dfrd.always(function() {
					self.unbind('unload destroy', abort);
				});
				
				return dfrd;
			},
			bindData = {opts: opts, result: true};
		
		// trigger "request.cmd" that callback be able to cancel request by substituting "false" for "event.data.result"
		self.trigger('request.' + cmd, bindData, true);
		
		if (! bindData.result) {
			self.trigger(cmd + 'done');
			return dfrd.reject();
		} else if (typeof bindData.result === 'object' && bindData.result.promise) {
			bindData.result
				.done(request)
				.fail(function() {
					self.trigger(cmd + 'done');
					dfrd.reject();
				});
			return dfrd;
		}
		
		// do request
		return request();
	};
	
	/**
	 * Compare current files cache with new files and return diff
	 * 
	 * @param  Array   new files
	 * @param  String  target folder hash
	 * @param  Array   exclude properties to compare
	 * @return Object
	 */
	this.diff = function(incoming, onlydir, excludeProps) {
		var raw       = {},
			added     = [],
			removed   = [],
			changed   = [],
			isChanged = function(hash) {
				var l = changed.length;

				while (l--) {
					if (changed[l].hash == hash) {
						return true;
					}
				}
			};
			
		$.each(incoming, function(i, f) {
			raw[f.hash] = f;
		});
			
		// find removed
		$.each(files, function(hash, f) {
			if (! raw[hash] && (! onlydir || f.phash === onlydir)) {
				removed.push(hash);
			}
		});
		
		// compare files
		$.each(raw, function(hash, file) {
			var origin = files[hash];

			if (!origin) {
				added.push(file);
			} else {
				$.each(file, function(prop) {
					if (! excludeProps || $.inArray(prop, excludeProps) === -1) {
						if (file[prop] !== origin[prop]) {
							changed.push(file)
							return false;
						}
					}
				});
			}
		});
		
		// parents of removed dirs mark as changed (required for tree correct work)
		$.each(removed, function(i, hash) {
			var file  = files[hash], 
				phash = file.phash;

			if (phash 
			&& file.mime == 'directory' 
			&& $.inArray(phash, removed) === -1 
			&& raw[phash] 
			&& !isChanged(phash)) {
				changed.push(raw[phash]);
			}
		});
		
		return {
			added   : added,
			removed : removed,
			changed : changed
		};
	};
	
	/**
	 * Sync content
	 * 
	 * @return jQuery.Deferred
	 */
	this.sync = function(onlydir, polling) {
		this.autoSync('stop');
		var self  = this,
			compare = function(){
				var c = '', cnt = 0, mtime = 0;
				if (onlydir && polling) {
					$.each(files, function(h, f) {
						if (f.phash && f.phash === onlydir) {
							++cnt;
							mtime = Math.max(mtime, f.ts);
						}
						c = cnt+':'+mtime;
					});
				}
				return c;
			},
			comp  = compare(),
			dfrd  = $.Deferred().done(function() { self.trigger('sync'); }),
			opts = [this.request({
				data           : {cmd : 'open', reload : 1, target : cwd, tree : (! onlydir && this.ui.tree) ? 1 : 0, compare : comp},
				preventDefault : true
			})],
			exParents = function() {
				var parents = [],
					curRoot = self.file(self.root(cwd)),
					curId = curRoot? curRoot.volumeid : null,
					phash = self.cwd().phash,
					isroot,pdir;
				
				while(phash) {
					if (pdir = self.file(phash)) {
						if (phash.indexOf(curId) !== 0) {
							if (! self.isRoot(pdir)) {
								parents.push( {target: phash, cmd: 'tree'} );
							}
							parents.push( {target: phash, cmd: 'parents'} );
							curRoot = self.file(self.root(phash));
							curId = curRoot? curRoot.volumeid : null;
						}
						phash = pdir.phash;
					} else {
						phash = null;
					}
				}
				return parents;
			};
		
		if (! onlydir) {
			(cwd !== this.root()) && opts.push(this.request({
				data           : {cmd : 'parents', target : cwd},
				preventDefault : true
			}));
			$.each(exParents(), function(i, data) {
				opts.push(self.request({
					data           : {cmd : data.cmd, target : data.target},
					preventDefault : true
				}));
			});
		}
		$.when.apply($, opts)
		.fail(function(error, xhr) {
			if (! polling || $.inArray('errOpen', error) !== -1) {
				dfrd.reject(error);
				error && self.request({
					data   : {cmd : 'open', target : (self.lastDir('') || self.root()), tree : 1, init : 1},
					notify : {type : 'open', cnt : 1, hideCnt : true}
				});
			} else {
				dfrd.reject((error && xhr.status != 0)? error : void 0);
			}
		})
		.done(function(odata) {
			var pdata, argLen, i;
			//------The response is from EFW .-------
			if(odata.actions) return;//efw return alert
			//---------------------------------------
			if (odata.cwd.compare) {
				if (comp === odata.cwd.compare) {
					return dfrd.reject();
				}
			}
			
			// for 2nd and more requests
			pdata = {tree : []};
			
			// results marge of 2nd and more requests
			argLen = arguments.length;
			if (argLen > 1) {
				for(i = 1; i < argLen; i++) {
					if (arguments[i].tree && arguments[i].tree.length) {
						pdata.tree.push.apply(pdata.tree, arguments[i].tree);
					}
				}
			}
			
			if (self.api < 2.1) {
				pdata.tree = (pdata.tree || []).push(odata.cwd);
			}
			
			// data normalize
			odata = self.normalize(odata);
			pdata = self.normalize(pdata);
			
			var diff = self.diff(odata.files.concat(pdata && pdata.tree ? pdata.tree : []), onlydir);

			diff.added.push(odata.cwd);
			diff.removed.length && self.remove(diff);
			diff.added.length   && self.add(diff);
			diff.changed.length && self.change(diff);
			return dfrd.resolve(diff);
		})
		.always(function() {
			self.autoSync();
		});
		
		return dfrd;
	};
	
	this.upload = function(files) {
		return this.transport.upload(files, this);
	};
	
	/**
	 * Attach listener to events
	 * To bind to multiply events at once, separate events names by space
	 * 
	 * @param  String  event(s) name(s)
	 * @param  Object  event handler
	 * @return elFinder
	 */
	this.bind = function(event, callback) {
		var i;
		
		if (typeof(callback) == 'function') {
			event = ('' + event).toLowerCase().split(/\s+/);
			
			for (i = 0; i < event.length; i++) {
				if (listeners[event[i]] === void(0)) {
					listeners[event[i]] = [];
				}
				listeners[event[i]].push(callback);
			}
		}
		return this;
	};
	
	/**
	 * Remove event listener if exists
	 * To un-bind to multiply events at once, separate events names by space
	 *
	 * @param  String    event(s) name(s)
	 * @param  Function  callback
	 * @return elFinder
	 */
	this.unbind = function(event, callback) {
		var i, l, ci;
		
		event = ('' + event).toLowerCase().split(/\s+/);
		
		for (i = 0; i < event.length; i++) {
			l = listeners[event[i]] || [];
			ci = $.inArray(callback, l);
			ci > -1 && l.splice(ci, 1);
		}
		
		callback = null
		return this;
	};
	
	/**
	 * Fire event - send notification to all event listeners
	 *
	 * @param  String   event type
	 * @param  Object   data to send across event
	 * @param  Boolean  allow modify data (call by reference of data)
	 * @return elFinder
	 */
	this.trigger = function(event, data, allowModify) {
		var event    = event.toLowerCase(),
			isopen   = (event === 'open'),
			handlers = listeners[event] || [], i, l, jst;
		
		this.debug('event-'+event, data);
		
		if (isopen && !allowModify) {
			// for performance tuning
			jst = JSON.stringify(data);
		}
		if (l = handlers.length) {
			event = $.Event(event);
			if (allowModify) {
				event.data = data;
			}

			for (i = 0; i < l; i++) {
				if (! handlers[i]) {
					// probably un-binded this handler
					continue;
				}
				// only callback has argument
				if (handlers[i].length) {
					if (!allowModify) {
						// to avoid data modifications. remember about "sharing" passing arguments in js :) 
						event.data = isopen? JSON.parse(jst) : $.extend(true, {}, data);
					}
				}

				try {
					if (handlers[i](event, this) === false 
					|| event.isDefaultPrevented()) {
						this.debug('event-stoped', event.type);
						break;
					}
				} catch (ex) {
					window.console && window.console.log && window.console.log(ex);
				}
				
			}
		}
		return this;
	};
	
	/**
	 * Get event listeners
	 *
	 * @param  String   event type
	 * @return Array    listed event functions
	 */
	this.getListeners = function(event) {
		return event? listeners[event.toLowerCase()] : listeners;
	};
	
	/**
	 * Bind keybord shortcut to keydown event
	 *
	 * @example
	 *    elfinder.shortcut({ 
	 *       pattern : 'ctrl+a', 
	 *       description : 'Select all files', 
	 *       callback : function(e) { ... }, 
	 *       keypress : true|false (bind to keypress instead of keydown) 
	 *    })
	 *
	 * @param  Object  shortcut config
	 * @return elFinder
	 */
	this.shortcut = function(s) {
		var patterns, pattern, code, i, parts;
		
		if (this.options.allowShortcuts && s.pattern && $.isFunction(s.callback)) {
			patterns = s.pattern.toUpperCase().split(/\s+/);
			
			for (i= 0; i < patterns.length; i++) {
				pattern = patterns[i]
				parts   = pattern.split('+');
				code    = (code = parts.pop()).length == 1 
					? code > 0 ? code : code.charCodeAt(0) 
					: (code > 0 ? code : $.ui.keyCode[code]);

				if (code && !shortcuts[pattern]) {
					shortcuts[pattern] = {
						keyCode     : code,
						altKey      : $.inArray('ALT', parts)   != -1,
						ctrlKey     : $.inArray('CTRL', parts)  != -1,
						shiftKey    : $.inArray('SHIFT', parts) != -1,
						type        : s.type || 'keydown',
						callback    : s.callback,
						description : s.description,
						pattern     : pattern
					};
				}
			}
		}
		return this;
	};
	
	/**
	 * Registered shortcuts
	 *
	 * @type Object
	 **/
	this.shortcuts = function() {
		var ret = [];
		
		$.each(shortcuts, function(i, s) {
			ret.push([s.pattern, self.i18n(s.description)]);
		});
		return ret;
	};
	
	/**
	 * Get/set clipboard content.
	 * Return new clipboard content.
	 *
	 * @example
	 *   this.clipboard([]) - clean clipboard
	 *   this.clipboard([{...}, {...}], true) - put 2 files in clipboard and mark it as cutted
	 * 
	 * @param  Array    new files hashes
	 * @param  Boolean  cut files?
	 * @return Array
	 */
	this.clipboard = function(hashes, cut) {
		var map = function() { return $.map(clipboard, function(f) { return f.hash }); };

		if (hashes !== void(0)) {
			clipboard.length && this.trigger('unlockfiles', {files : map()});
			remember = [];
			
			clipboard = $.map(hashes||[], function(hash) {
				var file = files[hash];
				if (file) {
					
					remember.push(hash);
					
					return {
						hash   : hash,
						phash  : file.phash,
						name   : file.name,
						mime   : file.mime,
						read   : file.read,
						locked : file.locked,
						cut    : !!cut
					}
				}
				return null;
			});
			this.trigger('changeclipboard', {clipboard : clipboard.slice(0, clipboard.length)});
			cut && this.trigger('lockfiles', {files : map()});
		}

		// return copy of clipboard instead of refrence
		return clipboard.slice(0, clipboard.length);
	};
	
	/**
	 * Return true if command enabled
	 * 
	 * @param  String       command name
	 * @param  String|void  hash for check of own volume's disabled cmds
	 * @return Boolean
	 */
	this.isCommandEnabled = function(name, dstHash) {
		var disabled,
			cvid = self.cwd().volumeid || '';
		if (dstHash && (! cvid || dstHash.indexOf(cvid) !== 0)) {
			disabled = self.option('disabled', dstHash);
			if (! disabled) {
				disabled = [];
			}
		} else {
			disabled = cwdOptions.disabled;
		}
		return this._commands[name] ? $.inArray(name, disabled) === -1 : false;
	};
	
	/**
	 * Exec command and return result;
	 *
	 * @param  String         command name
	 * @param  String|Array   usualy files hashes
	 * @param  String|Array   command options
	 * @param  String|void    hash for enabled check of own volume's disabled cmds
	 * @return $.Deferred
	 */		
	this.exec = function(cmd, files, opts, dstHash) {
		if (cmd === 'open') {
			if (this.searchStatus.state || this.searchStatus.ininc) {
				this.trigger('searchend', { noupdate: true });
			}
			this.autoSync('stop');
		}
		return this._commands[cmd] && this.isCommandEnabled(cmd, dstHash) 
			? this._commands[cmd].exec(files, opts) 
			: $.Deferred().reject('No such command');
	};
	
	/**
	 * Create and return dialog.
	 *
	 * @param  String|DOMElement  dialog content
	 * @param  Object             dialog options
	 * @return jQuery
	 */
	this.dialog = function(content, options) {
		var dialog = $('<div></div>').append(content).appendTo(node).elfinderdialog(options, this),
			dnode  = dialog.closest('.ui-dialog'),
			resize = function(){
				! dialog.data('draged') && dialog.is(':visible') && dialog.elfinderdialog('posInit');
			};
		if (dnode.length) {
			self.bind('resize', resize);
			dnode.on('remove', function() {
				self.unbind('resize', resize);
			});
		}
		return dialog;
	};
	
	/**
	 * Create and return toast.
	 *
	 * @param  Object  toast options - see ui/toast.js
	 * @return jQuery
	 */
	this.toast = function(options) {
		return $('<div class="ui-front"></div>').appendTo(this.ui.toast).elfindertoast(options || {}, this);
	};
	
	/**
	 * Return UI widget or node
	 *
	 * @param  String  ui name
	 * @return jQuery
	 */
	this.getUI = function(ui) {
		return this.ui[ui] || node;
	};
	
	/**
	 * Return elFinder.command instance or instances array
	 *
	 * @param  String  command name
	 * @return Object | Array
	 */
	this.getCommand = function(name) {
		return name === void(0) ? this._commands : this._commands[name];
	};
	
	/**
	 * Resize elfinder node
	 * 
	 * @param  String|Number  width
	 * @param  Number         height
	 * @return void
	 */
	this.resize = function(w, h) {
		node.css('width', w).height(h).trigger('resize');
		this.trigger('resize', {width : node.width(), height : node.height()});
	};
	
	/**
	 * Restore elfinder node size
	 * 
	 * @return elFinder
	 */
	this.restoreSize = function() {
		this.resize(width, height);
	};
	
	this.show = function() {
		node.show();
		this.enable().trigger('show');
	};
	
	this.hide = function() {
		if (this.options.enableAlways) {
			prevEnabled = enabled;
			enabled = false;
		}
		this.disable().trigger('hide');
		node.hide();
	};
	
	/**
	 * Lazy execution function
	 * 
	 * @param  Object  function
	 * @param  Number  delay
	 * @param  Object  options
	 * @return Object  jQuery.Deferred
	 */
	this.lazy = function(func, delay, opts) {
		var busy = function(state) {
				var cnt = node.data('lazycnt'),
					repaint;
				
				if (state) {
					repaint = node.data('lazyrepaint')? false : opts.repaint;
					if (! cnt) {
						node.data('lazycnt', 1)
							.addClass('elfinder-processing');
					} else {
						node.data('lazycnt', ++cnt);
					}
					if (repaint) {
						node.data('lazyrepaint', true).css('display'); // force repaint
					}
				} else {
					if (cnt && cnt > 1) {
						node.data('lazycnt', --cnt);
					} else {
						repaint = node.data('lazyrepaint');
						node.data('lazycnt', 0)
							.removeData('lazyrepaint')
							.removeClass('elfinder-processing');
						repaint && node.css('display'); // force repaint;
						self.trigger('lazydone');
					}
				}
			},
			dfd  = $.Deferred();
		
		delay = delay || 0;
		opts = opts || {};
		busy(true);
		
		setTimeout(function() {
			dfd.resolve(func.call(dfd));
			busy(false);
		}, delay);
		
		return dfd;
	}
	
	/**
	 * Destroy this elFinder instance
	 *
	 * @return void
	 **/
	this.destroy = function() {
		if (node && node[0].elfinder) {
			this.options.syncStart = false;
			this.autoSync('forcestop');
			this.trigger('destroy').disable();
			clipboard = [];
			selected = [];
			listeners = {};
			shortcuts = {};
			$(window).off('.' + namespace);
			$(document).off('.' + namespace);
			self.trigger = function(){}
			node.off();
			node.removeData();
			node.empty();
			node[0].elfinder = null;
			$(beeper).remove();
			node.append(prevContent.contents()).removeClass(this.cssClass).attr('style', prevStyle);
		}
	};
	
	/**
	 * Start or stop auto sync
	 * 
	 * @param  String|Bool  stop
	 * @return void
	 */
	this.autoSync = function(mode) {
		var sync;
		if (self.options.sync >= 1000) {
			if (syncInterval) {
				clearTimeout(syncInterval);
				syncInterval = null;
				self.trigger('autosync', {action : 'stop'});
			}
			
			if (mode === 'stop') {
				++autoSyncStop;
			} else {
				autoSyncStop = Math.max(0, --autoSyncStop);
			}
			
			if (autoSyncStop || mode === 'forcestop' || ! self.options.syncStart) {
				return;
			} 
			
			// run interval sync
			sync = function(start){
				var timeout;
				if (cwdOptions.syncMinMs && (start || syncInterval)) {
					start && self.trigger('autosync', {action : 'start'});
					timeout = Math.max(self.options.sync, cwdOptions.syncMinMs);
					syncInterval && clearTimeout(syncInterval);
					syncInterval = setTimeout(function() {
						var dosync = true, hash = cwd, cts;
						if (cwdOptions.syncChkAsTs && (cts = files[hash].ts)) {
							self.request({
								data           : {cmd : 'info', targets : [hash], compare : cts, reload : 1},
								preventDefault : true
							})
							.done(function(data){
								var ts;
								dosync = true;
								if (data.compare) {
									ts = data.compare;
									if (ts == cts) {
										dosync = false;
									}
								}
								if (dosync) {
									self.sync(hash).always(function(){
										if (ts) {
											// update ts for cache clear etc.
											files[hash].ts = ts;
										}
										sync();
									});
								} else {
									sync();
								}
							})
							.fail(function(error, xhr){
								if (error && xhr.status != 0) {
									self.error(error);
									if ($.inArray('errOpen', error) !== -1) {
										self.request({
											data   : {cmd : 'open', target : (self.lastDir('') || self.root()), tree : 1, init : 1},
											notify : {type : 'open', cnt : 1, hideCnt : true}
										});
									}
								} else {
									syncInterval = setTimeout(function() {
										sync();
									}, timeout);
								}
							});
						} else {
							self.sync(cwd, true).always(function(){
								sync();
							});
						}
					}, timeout);
				}
			};
			sync(true);
		}
	};
	
	/**
	 * Return bool is inside work zone of specific point
	 * 
	 * @param  Number event.pageX
	 * @param  Number event.pageY
	 * @return Bool
	 */
	this.insideWorkzone = function(x, y, margin) {
		var rectangle = this.getUI('workzone').data('rectangle');
		
		margin = margin || 1;
		if (x < rectangle.left + margin
		|| x > rectangle.left + rectangle.width + margin
		|| y < rectangle.top + margin
		|| y > rectangle.top + rectangle.height + margin) {
			return false;
		}
		return true;
	};
	
	/**
	 * Target ui node move to last of children of elFinder node fot to show front
	 * 
	 * @param  Object  target    Target jQuery node object
	 */
	this.toFront = function(target) {
		var lastnode = node.children(':last');
		target = $(target);
		if (lastnode.get(0) !== target.get(0)) {
			lastnode.after(target);
		}
	};
	
	/**
	 * Return css object for maximize
	 * 
	 * @return Object
	 */
	this.getMaximizeCss = function() {
		return {
			width   : '100%',
			height  : '100%',
			margin  : 0,
			padding : 0,
			top     : 0,
			left    : 0,
			display : 'block',
			position: 'fixed',
			zIndex  : Math.max(self.zIndex? (self.zIndex + 1) : 0 , 1000)
		};
	};
	
	// Closure for togglefullscreen
	(function() {
		// check is in iframe
		if (inFrame && self.UA.Fullscreen) {
			self.UA.Fullscreen = false;
			if (parentIframe && typeof parentIframe.attr('allowfullscreen') !== 'undefined') {
				self.UA.Fullscreen = true;
			}
		}

		var orgStyle, bodyOvf, resizeTm, fullElm, exitFull, toFull,
			cls = 'elfinder-fullscreen',
			clsN = 'elfinder-fullscreen-native',
			checkDialog = function() {
				var t = 0,
					l = 0;
				$.each(node.children('.ui-dialog,.ui-draggable'), function(i, d) {
					var $d = $(d),
						pos = $d.position();
					
					if (pos.top < 0) {
						$d.css('top', t);
						t += 20;
					}
					if (pos.left < 0) {
						$d.css('left', l);
						l += 20;
					}
				});
			},
			funcObj = self.UA.Fullscreen? {
				// native full screen mode
				
				fullElm: function() {
					return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
				},
				
				exitFull: function() {
					if (document.exitFullscreen) {
						return document.exitFullscreen();
					} else if (document.webkitExitFullscreen) {
						return document.webkitExitFullscreen();
					} else if (document.mozCancelFullScreen) {
						return document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						return document.msExitFullscreen();
					}
				},
				
				toFull: function(elem) {
					if (elem.requestFullscreen) {
						return elem.requestFullscreen();
					} else if (elem.webkitRequestFullscreen) {
						return elem.webkitRequestFullscreen();
					} else if (elem.mozRequestFullScreen) {
						return elem.mozRequestFullScreen();
					} else if (elem.msRequestFullscreen) {
						return elem.msRequestFullscreen();
					}
					return false;
				}
			} : {
				// node element maximize mode
				
				fullElm: function() {
					var full;
					if (node.hasClass(cls)) {
						return node.get(0);
					} else {
						full = node.find('.' + cls);
						if (full.length) {
							return full.get(0);
						}
					}
					return null;
				},
				
				exitFull: function() {
					var elm;
					
					$(window).off('resize.' + namespace, resize);
					if (bodyOvf !== void(0)) {
						$('body').css('overflow', bodyOvf);
					}
					bodyOvf = void(0);
					
					if (orgStyle) {
						elm = orgStyle.elm;
						restoreStyle(elm);
						$(elm).trigger('resize', {fullscreen: 'off'});
					}
					
					$(window).trigger('resize');
				},
				
				toFull: function(elem) {
					bodyOvf = $('body').css('overflow') || '';
					$('body').css('overflow', 'hidden');
					
					$(elem).css(self.getMaximizeCss())
						.addClass(cls)
						.trigger('resize', {fullscreen: 'on'});
					
					checkDialog();
					
					$(window).on('resize.' + namespace, resize).trigger('resize');
					
					return true;
				}
			},
			restoreStyle = function(elem) {
				if (orgStyle && orgStyle.elm == elem) {
					$(elem).removeClass(cls + ' ' + clsN).attr('style', orgStyle.style);
					orgStyle = null;
				}
			},
			resize = function(e) {
				var elm;
				if (e.target === window) {
					resizeTm && clearTimeout(resizeTm);
					resizeTm = setTimeout(function() {
						if (elm = funcObj.fullElm()) {
							$(elm).trigger('resize', {fullscreen: 'on'});
						}
					}, 100);
				}
			};
		
		$(document).on('fullscreenchange.' + namespace + ' webkitfullscreenchange.' + namespace + ' mozfullscreenchange.' + namespace + ' MSFullscreenChange.' + namespace, function(e){
			if (self.UA.Fullscreen) {
				var elm = funcObj.fullElm(),
					win = $(window);
				
				resizeTm && clearTimeout(resizeTm);
				if (elm === null) {
					win.off('resize.' + namespace, resize);
					if (orgStyle) {
						elm = orgStyle.elm;
						restoreStyle(elm);
						$(elm).trigger('resize', {fullscreen: 'off'});
					}
				} else {
					$(elm).addClass(cls + ' ' + clsN)
						.attr('style', 'width:100%; height:100%; margin:0; padding:0;')
						.trigger('resize', {fullscreen: 'on'});
					win.on('resize.' + namespace, resize);
					checkDialog();
				}
				win.trigger('resize');
			}
		});
		
		/**
		 * Toggle Full Scrren Mode
		 * 
		 * @param  Object target
		 * @param  Bool   full
		 * @return Object | Null  DOM node object of current full scrren
		 */
		self.toggleFullscreen = function(target, full) {
			var elm = $(target).get(0),
				curElm = null;
			
			curElm = funcObj.fullElm();
			if (curElm) {
				if (curElm == elm) {
					if (full === true) {
						return curElm;
					}
				} else {
					if (full === false) {
						return curElm;
					}
				}
				funcObj.exitFull();
				return null;
			} else {
				if (full === false) {
					return null;
				}
			}
			
			orgStyle = {elm: elm, style: $(elm).attr('style')};
			if (funcObj.toFull(elm) !== false) {
				return elm;
			} else {
				orgStyle = null;
				return null;
			}
		};
	})();
	
	// Closure for toggleMaximize
	(function(){
		var cls = 'elfinder-maximized',
		resizeTm,
		resize = function(e) {
			if (e.target === window && e.data && e.data.elm) {
				var elm = e.data.elm;
				resizeTm && clearTimeout(resizeTm);
				resizeTm = setTimeout(function() {
					elm.trigger('resize', {maximize: 'on'});
				}, 100);
			}
		},
		exitMax = function(elm) {
			$(window).off('resize.' + namespace, resize);
			$('body').css('overflow', elm.data('bodyOvf'));
			elm.removeClass(cls)
				.attr('style', elm.data('orgStyle'))
				.removeData('bodyOvf')
				.removeData('orgStyle');
			elm.trigger('resize', {maximize: 'off'});
		},
		toMax = function(elm) {
			elm.data('bodyOvf', $('body').css('overflow') || '')
				.data('orgStyle', elm.attr('style'))
				.addClass(cls)
				.css(self.getMaximizeCss());
			$('body').css('overflow', 'hidden');
			$(window).on('resize.' + namespace, {elm: elm}, resize).trigger('resize');
		};
		
		/**
		 * Toggle Maximize target node
		 * 
		 * @param  Object target
		 * @param  Bool   max
		 * @return void
		 */
		self.toggleMaximize = function(target, max) {
			var elm = $(target),
				maximized = elm.hasClass(cls);
			
			if (maximized) {
				if (max === true) {
					return;
				}
				exitMax(elm);
			} else {
				if (max === false) {
					return;
				}
				toMax(elm);
			}
		};
	})();
	
	/*************  init stuffs  ****************/
	
	// check jquery ui
	if (!($.fn.selectable && $.fn.draggable && $.fn.droppable)) {
		return alert(this.i18n('errJqui'));
	}

	// check node
	if (!node.length) {
		return alert(this.i18n('errNode'));
	}
	// check connector url
	if (!this.options.url) {
		return alert(this.i18n('errURL'));
	}

	$.extend($.ui.keyCode, {
		'F1' : 112,
		'F2' : 113,
		'F3' : 114,
		'F4' : 115,
		'F5' : 116,
		'F6' : 117,
		'F7' : 118,
		'F8' : 119,
		'F9' : 120,
		'F10' : 121,
		'F11' : 122,
		'F12' : 123,
		'CONTEXTMENU' : 93
	});
	
	this.dragUpload = false;
	this.xhrUpload  = (typeof XMLHttpRequestUpload != 'undefined' || typeof XMLHttpRequestEventTarget != 'undefined') && typeof File != 'undefined' && typeof FormData != 'undefined';
	
	// configure transport object
	this.transport = {};

	//-----Efw needs Html5----------------------------
	this.transport.send = function(opts) { return $.ajax(opts); }
	this.transport.upload = $.proxy(this.uploads.xhr, this);
	this.dragUpload = true;
	//------------------------------------------------

	/**
	 * Decoding 'raw' string converted to unicode
	 * 
	 * @param  String str
	 * @return String
	 */
	this.decodeRawString = $.isFunction(this.options.rawStringDecoder)? this.options.rawStringDecoder : function(str) {
		var charCodes = function(str) {
			var i, len, arr;
			for (i=0,len=str.length,arr=[]; i<len; i++) {
				arr.push(str.charCodeAt(i));
			}
			return arr;
		},
		scalarValues = function(arr) {
			var scalars = [], i, len, c;
			if (typeof arr === 'string') {arr = charCodes(arr);}
			for (i=0,len=arr.length; c=arr[i],i<len; i++) {
				if (c >= 0xd800 && c <= 0xdbff) {
					scalars.push((c & 1023) + 64 << 10 | arr[++i] & 1023);
				} else {
					scalars.push(c);
				}
			}
			return scalars;
		},
		decodeUTF8 = function(arr) {
			var i, len, c, str, char = String.fromCharCode;
			for (i=0,len=arr.length,str=""; c=arr[i],i<len; i++) {
				if (c <= 0x7f) {
					str += char(c);
				} else if (c <= 0xdf && c >= 0xc2) {
					str += char((c&31)<<6 | arr[++i]&63);
				} else if (c <= 0xef && c >= 0xe0) {
					str += char((c&15)<<12 | (arr[++i]&63)<<6 | arr[++i]&63);
				} else if (c <= 0xf7 && c >= 0xf0) {
					str += char(
						0xd800 | ((c&7)<<8 | (arr[++i]&63)<<2 | arr[++i]>>>4&3) - 64,
						0xdc00 | (arr[i++]&15)<<6 | arr[i]&63
					);
				} else {
					str += char(0xfffd);
				}
			}
			return str;
		};
		
		return decodeUTF8(scalarValues(str));
	};

	/**
	 * Alias for this.trigger('error', {error : 'message'})
	 *
	 * @param  String  error message
	 * @return elFinder
	 **/
	this.error = function() {
		var arg = arguments[0],
			opts = arguments[1] || null;
		return arguments.length == 1 && typeof(arg) == 'function'
			? self.bind('error', arg)
			: (arg === true? this : self.trigger('error', {error : arg, opts : opts}));
	};
	
	// create bind/trigger aliases for build-in events
	$.each(events, function(i, name) {
		self[name] = function() {
			var arg = arguments[0];
			return arguments.length == 1 && typeof(arg) == 'function'
				? self.bind(name, arg)
				: self.trigger(name, $.isPlainObject(arg) ? arg : {});
		}
	});

	// bind core event handlers
	this
		.enable(function() {
			if (!enabled && self.visible() && self.ui.overlay.is(':hidden') && ! node.children('.elfinder-dialog').find('.'+self.res('class', 'editing')).length) {
				enabled = true;
				document.activeElement && document.activeElement.blur();
				node.removeClass('elfinder-disabled');
			}
		})
		.disable(function() {
			prevEnabled = enabled;
			enabled = false;
			node.addClass('elfinder-disabled');
		})
		.open(function() {
			selected = [];
		})
		.select(function(e) {
			var cnt = 0,
				unselects = [];
			selected = $.map(e.data.selected || e.data.value|| [], function(hash) {
				if (unselects.length || (self.maxTargets && ++cnt > self.maxTargets)) {
					unselects.push(hash);
					return null;
				} else {
					return files[hash] ? hash : null;
				}
			});
			if (unselects.length) {
				self.trigger('unselectfiles', {files: unselects, inselect: true});
				self.toast({mode: 'warning', msg: self.i18n(['errMaxTargets', self.maxTargets])});
			}
		})
		.error(function(e) { 
			var opts  = {
					cssClass  : 'elfinder-dialog-error',
					title     : self.i18n(self.i18n('error')),
					resizable : false,
					destroyOnClose : true,
					buttons   : {}
			};
			
			opts.buttons[self.i18n(self.i18n('btnClose'))] = function() { $(this).elfinderdialog('close'); };

			if (e.data.opts && $.isPlainObject(e.data.opts)) {
				$.extend(opts, e.data.opts);
			}

			self.dialog('<span class="elfinder-dialog-icon elfinder-dialog-icon-error"></span>'+self.i18n(e.data.error), opts);
		})
		.bind('tree parents', function(e) {
			cache(e.data.tree || []);
		})
		.bind('tmb', function(e) {
			$.each(e.data.images||[], function(hash, tmb) {
				if (files[hash]) {
					files[hash].tmb = tmb;
				}
			})
		})
		.add(function(e) {
			cache(e.data.added || []);
		})
		.change(function(e) {
			$.each(e.data.changed||[], function(i, file) {
				var hash = file.hash;
				if (files[hash]) {
					$.each(['locked', 'hidden', 'width', 'height'], function(i, v){
						if (files[hash][v] && !file[v]) {
							delete files[hash][v];
						}
					});
				}
				files[hash] = files[hash] ? $.extend(files[hash], file) : file;
			});
		})
		.remove(function(e) {
			var removed = e.data.removed||[],
				l       = removed.length,
				roots   = {},
				rm      = function(hash) {
					var file = files[hash], i;
					if (file) {
						if (file.mime === 'directory') {
							if (roots[hash]) {
								delete self.roots[roots[hash]];
							}
							$.each(files, function(h, f) {
								f.phash == hash && rm(h);
							});
						}
						delete files[hash];
					}
				};
		
			$.each(self.roots, function(k, v) {
				roots[v] = k;
			});
			while (l--) {
				rm(removed[l]);
			}
			
		})
		.bind('searchstart', function(e) {
			$.extend(self.searchStatus, e.data);
			self.searchStatus.state = 1;
		})
		.bind('search', function(e) {
			self.searchStatus.state = 2;
			cache(e.data.files || []);
		})
		.bind('searchend', function() {
			self.searchStatus.state = 0;
			self.searchStatus.mixed = false;
		})

		;

	// We listen and emit a sound on delete according to option
	if (true === this.options.sound) {
		this.bind('rm', function(e) {
			var play  = beeper.canPlayType && beeper.canPlayType('audio/wav; codecs="1"');

			play && play != '' && play != 'no' && $(beeper).html('<source src="' + soundPath + 'rm.wav" type="audio/wav">')[0].play()
		});
	}

	// bind external event handlers
	$.each(this.options.handlers, function(event, callback) {
		self.bind(event, callback);
	});

	/**
	 * History object. Store visited folders
	 *
	 * @type Object
	 **/
	this.history = new this.history(this);
	
	// in getFileCallback set - change default actions on double click/enter/ctrl+enter
	if (this.commands.getfile) {
		if (typeof(this.options.getFileCallback) == 'function') {
			this.bind('dblclick', function(e) {
				e.preventDefault();
				self.exec('getfile').fail(function() {
					self.exec('open');
				});
			});
			this.shortcut({
				pattern     : 'enter',
				description : this.i18n('cmdgetfile'),
				callback    : function() { self.exec('getfile').fail(function() { self.exec(self.OS == 'mac' ? 'rename' : 'open') }) }
			})
			.shortcut({
				pattern     : 'ctrl+enter',
				description : this.i18n(this.OS == 'mac' ? 'cmdrename' : 'cmdopen'),
				callback    : function() { self.exec(self.OS == 'mac' ? 'rename' : 'open') }
			});
		} else {
			this.options.getFileCallback = null;
		}
	}

	/**
	 * Root hashed
	 * 
	 * @type Object
	 */
	this.roots = {};
	
	/**
	 * leaf roots
	 * 
	 * @type Object
	 */
	this.leafRoots = {};
	
	/**
	 * Loaded commands
	 *
	 * @type Object
	 **/
	this._commands = {};
	
	if (!$.isArray(this.options.commands)) {
		this.options.commands = [];
	}
	
	if ($.inArray('*', this.options.commands) !== -1) {
		this.options.commands = Object.keys(this.commands);
	}
	
	// load commands
	$.each(this.commands, function(name, cmd) {
		var proto = $.extend({}, cmd.prototype),
			extendsCmd, opts;
		if ($.isFunction(cmd) && !self._commands[name] && (cmd.prototype.forceLoad || $.inArray(name, self.options.commands) !== -1)) {
			extendsCmd = cmd.prototype.extendsCmd || '';
			if (extendsCmd) {
				if ($.isFunction(self.commands[extendsCmd])) {
					cmd.prototype = $.extend({}, base, new self.commands[extendsCmd](), cmd.prototype);
				} else {
					return true;
				}
			} else {
				cmd.prototype = $.extend({}, base, cmd.prototype);
			}
			self._commands[name] = new cmd();
			cmd.prototype = proto;
			opts = self.options.commandsOptions[name] || {};
			if (extendsCmd && self.options.commandsOptions[extendsCmd]) {
				opts = $.extend(true, {}, self.options.commandsOptions[extendsCmd], opts);
			}
			self._commands[name].setup(name, opts);
			// setup linked commands
			if (self._commands[name].linkedCmds.length) {
				$.each(self._commands[name].linkedCmds, function(i, n) {
					var lcmd = self.commands[n];
					if ($.isFunction(lcmd) && !self._commands[n]) {
						lcmd.prototype = base;
						self._commands[n] = new lcmd();
						self._commands[n].setup(n, self.options.commandsOptions[n]||{});
					}
				});
			}
		}
	});
	
	/**
	 * UI command map of cwd volume ( That volume driver option `uiCmdMap` )
	 *
	 * @type Object
	 **/
	this.commandMap = {};
	
	/**
	 * cwd options of each volume
	 * key: volumeid
	 * val: options object
	 * 
	 * @type Object
	 */
	this.volOptions = {};

	/**
	 * cwd options of each folder/file
	 * key: hash
	 * val: options object
	 *
	 * @type Object
	 */
	this.optionsByHashes = {};
	
	// prepare node
	node.addClass(this.cssClass)
		.on(mousedown, function() {
			!enabled && self.enable();
		});
	
	/**
	 * UI nodes
	 *
	 * @type Object
	 **/
	this.ui = {
		// container for nav panel and current folder container
		workzone : $('<div></div>').appendTo(node).elfinderworkzone(this),
		// container for folders tree / places
		navbar : $('<div></div>').appendTo(node).elfindernavbar(this, this.options.uiOptions.navbar || {}),
		// contextmenu
		contextmenu : $('<div></div>').appendTo(node).elfindercontextmenu(this),
		// overlay
		overlay : $('<div></div>').appendTo(node).elfinderoverlay({
			show : function() { self.disable(); },
			hide : function() { prevEnabled && self.enable(); }
		}),
		// current folder container
		cwd : $('<div></div>').appendTo(node).elfindercwd(this, this.options.uiOptions.cwd || {}),
		// notification dialog window
		notify : this.dialog('', {
			cssClass      : 'elfinder-dialog-notify',
			position      : this.options.notifyDialog.position,
			absolute      : true,
			resizable     : false,
			autoOpen      : false,
			closeOnEscape : false,
			title         : '&nbsp;',
			width         : parseInt(this.options.notifyDialog.width)
		}),
		statusbar : $('<div class="ui-widget-header ui-helper-clearfix ui-corner-bottom elfinder-statusbar"></div>').hide().appendTo(node),
		toast : $('<div class="elfinder-toast"></div>').appendTo(node),
		bottomtray : $('<div class="elfinder-bottomtray"></div>').appendTo(node)
	};
	
	/**
	 * UI Auto Hide Functions
	 * Each auto hide function mast be call to `fm.trigger('uiautohide')` at end of process
	 *
	 * @type Array
	 **/
	this.uiAutoHide = [];
	
	// trigger `uiautohide`
	this.one('open', function() {
		if (self.uiAutoHide.length) {
			setTimeout(function() {
				self.trigger('uiautohide');
			}, 500);
		}
	});
	
	// Auto Hide Functions sequential processing start
	this.bind('uiautohide', function() {
		if (self.uiAutoHide.length) {
			self.uiAutoHide.shift()();
		}
	});
	
	// load required ui
	$.each(this.options.ui || [], function(i, ui) {
		var name = 'elfinder'+ui,
			opts = self.options.uiOptions[ui] || {};

		if (!self.ui[ui] && $.fn[name]) {
			// regist to self.ui before make instance
			self.ui[ui] = $('<'+(opts.tag || 'div')+'></div>').appendTo(node);
			self.ui[ui][name](self, opts);
		}
	});
	


	// store instance in node
	node[0].elfinder = this;
	
	// make node resizable
	this.options.resizable 
	&& $.fn.resizable 
	&& node.resizable({
		resize    : function(e, ui) {
			self.resize(ui.size.width, ui.size.height);
		},
		handles   : 'se',
		minWidth  : 300,
		minHeight : 200
	});

	if (this.options.width) {
		width = this.options.width;
	}
	
	if (this.options.height) {
		height = parseInt(this.options.height);
	}
	
	if (this.options.soundPath) {
		soundPath = this.options.soundPath.replace(/\/+$/, '') + '/';
	}
	
	// update size	
	self.resize(width, height);
	
	// attach events to document
	$(document)
		// disable elfinder on click outside elfinder
		.on('click.'+namespace, function(e) { enabled && ! self.options.enableAlways && !$(e.target).closest(node).length && self.disable(); })
		// exec shortcuts
		.on(keydown+' '+keypress, execShortcut);
	
	// attach events to window
	self.options.useBrowserHistory && $(window)
		.on('popstate.' + namespace, function(ev) {
			var target = ev.originalEvent.state && ev.originalEvent.state.thash;
			target && !$.isEmptyObject(self.files()) && self.request({
				data   : {cmd  : 'open', target : target, onhistory : 1},
				notify : {type : 'open', cnt : 1, hideCnt : true},
				syncOnFail : true
			});
		});
	
	(function(){
		var tm;
		$(window).on('resize.' + namespace, function(e){
			if (e.target === this) {
				tm && clearTimeout(tm);
				tm = setTimeout(function() {
					self.trigger('resize', {width : node.width(), height : node.height()});
				}, 100);
			}
		})
		.on('beforeunload.' + namespace,function(e){
			var msg, cnt;
			if (node.is(':visible')) {
				if (self.ui.notify.children().length && $.inArray('hasNotifyDialog', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('ntfsmth');
				} else if (node.find('.'+self.res('class', 'editing')).length && $.inArray('editingFile', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('editingFile');
				} else if ((cnt = Object.keys(self.selected()).length) && $.inArray('hasSelectedItem', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('hasSelected', ''+cnt);
				} else if ((cnt = Object.keys(self.clipboard()).length) && $.inArray('hasClipboardData', self.options.windowCloseConfirm) !== -1) {
					msg = self.i18n('hasClipboard', ''+cnt);
				}
				if (msg) {
					e.returnValue = msg;
					return msg;
				}
			}
			self.trigger('unload');
		});
	})();

	// bind window onmessage for CORS
	$(window).on('message.' + namespace, function(e){
		var res = e.originalEvent || null,
			obj, data;
		if (res && self.uploadURL.indexOf(res.origin) === 0) {
			try {
				obj = JSON.parse(res.data);
				data = obj.data || null;
				if (data) {
					if (data.error) {
						if (obj.bind) {
							self.trigger(obj.bind+'fail', data);
						}
						self.error(data.error);
					} else {
						data.warning && self.error(data.warning);
						data.removed && data.removed.length && self.remove(data);
						data.added   && data.added.length   && self.add(data);
						data.changed && data.changed.length && self.change(data);
						if (obj.bind) {
							self.trigger(obj.bind, data);
							self.trigger(obj.bind+'done');
						}
						data.sync && self.sync();
					}
				}
			} catch (e) {
				self.sync();
			}
		}
	});

	// elFinder enable always
	if (self.options.enableAlways) {
		$(window).on('focus.' + namespace, function(e){
			(e.target === this) && self.enable();
		});
		if (inFrame) {
			$(window.top).on('focus.' + namespace, function() {
				if (self.enable() && (! parentIframe || parentIframe.is(':visible'))) {
					setTimeout(function() {
						$(window).focus();
					}, 10);
				}
			});
		}
	} else if (inFrame) {
		$(window).on('blur.' + namespace, function(e){
			enabled && e.target === this && self.disable();
		});
	}

	(function() {
		var navbar = self.getUI('navbar'),
			cwd    = self.getUI('cwd').parent();
		
		self.autoScroll = {
			navbarUp   : function(v) {
				navbar.scrollTop(Math.max(0, navbar.scrollTop() - v));
			},
			navbarDown : function(v) {
				navbar.scrollTop(navbar.scrollTop() + v);
			},
			cwdUp     : function(v) {
				cwd.scrollTop(Math.max(0, cwd.scrollTop() - v));
			},
			cwdDown   : function(v) {
				cwd.scrollTop(cwd.scrollTop() + v);
			}
		};
	})();

	if (self.dragUpload) {
		// add event listener for HTML5 DnD upload
		(function() {
			var isin = function(e) {
				return (e.target.nodeName !== 'TEXTAREA' && e.target.nodeName !== 'INPUT' && $(e.target).closest('div.ui-dialog-content').length === 0);
			},
			ent       = 'native-drag-enter',
			disable   = 'native-drag-disable',
			c         = 'class',
			navdir    = self.res(c, 'navdir'),
			droppable = self.res(c, 'droppable'),
			dropover  = self.res(c, 'adroppable'),
			arrow     = self.res(c, 'navarrow'),
			clDropActive = self.res(c, 'adroppable'),
			wz        = self.getUI('workzone'),
			ltr       = (self.direction === 'ltr'),
			clearTm   = function() {
				autoScrTm && clearTimeout(autoScrTm);
				autoScrTm = null;
			},
			wzRect, autoScrFn, autoScrTm;
			
			node.on('dragenter', function(e) {
				clearTm();
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
					wzRect = wz.data('rectangle');
				}
			})
			.on('dragleave', function(e) {
				clearTm();
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
				}
			})
			.on('dragover', function(e) {
				var autoUp;
				if (isin(e)) {
					e.preventDefault();
					e.stopPropagation();
					e.originalEvent.dataTransfer.dropEffect = 'none';
					if (! autoScrTm) {
						autoScrTm = setTimeout(function() {
							var wzBottom = wzRect.top + wzRect.height,
								fn;
							if ((autoUp = e.pageY < wzRect.top) || e.pageY > wzBottom ) {
								if (wzRect.cwdEdge > e.pageX) {
									fn = (ltr? 'navbar' : 'cwd') + (autoUp? 'Up' : 'Down');
								} else {
									fn = (ltr? 'cwd' : 'navbar') + (autoUp? 'Up' : 'Down');
								}
								self.autoScroll[fn](Math.pow((autoUp? wzRect.top - e.pageY : e.pageY - wzBottom), 1.3));
							}
							autoScrTm = null;
						}, 20);
					}
				} else {
					clearTm();
				}
			})
			.on('drop', function(e) {
				clearTm();
				if (isin(e)) {
					e.stopPropagation();
					e.preventDefault();
				}
			});
			
			node.on('dragenter', '.native-droppable', function(e){
				if (e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget),
						id   = e.currentTarget.id || null,
						cwd  = null,
						elfFrom;
					if (!id) { // target is cwd
						cwd = self.cwd();
						$elm.data(disable, false);
						try {
							$.each(e.originalEvent.dataTransfer.types, function(i, v){
								if (v.substr(0, 13) === 'elfinderfrom:') {
									elfFrom = v.substr(13).toLowerCase();
								}
							});
						} catch(e) {}
					}
					if (!cwd || (cwd.write && (!elfFrom || elfFrom !== (window.location.href + cwd.hash).toLowerCase()))) {
						e.preventDefault();
						e.stopPropagation();
						$elm.data(ent, true);
						$elm.addClass(clDropActive);
					} else {
						$elm.data(disable, true);
					}
				}
			})
			.on('dragleave', '.native-droppable', function(e){
				if (e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget);
					e.preventDefault();
					e.stopPropagation();
					if ($elm.data(ent)) {
						$elm.data(ent, false);
					} else {
						$elm.removeClass(clDropActive);
					}
				}
			})
			.on('dragover', '.native-droppable', function(e){
				if (e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget);
					e.preventDefault();
					e.stopPropagation();
					e.originalEvent.dataTransfer.dropEffect = $elm.data(disable)? 'none' : 'copy';
					$elm.data(ent, false);
				}
			})
			.on('drop', '.native-droppable', function(e){
				if (e.originalEvent && e.originalEvent.dataTransfer) {
					var $elm = $(e.currentTarget)
						id;
					e.preventDefault();
					e.stopPropagation();
					$elm.removeClass(clDropActive);
					if (e.currentTarget.id) {
						id = $elm.hasClass(navdir)? self.navId2Hash(e.currentTarget.id) : self.cwdId2Hash(e.currentTarget.id);
					} else {
						id = self.cwd().hash;
					}
					e.originalEvent._target = id;
					self.exec('upload', {dropEvt: e.originalEvent, target: id}, void 0, id);
				}
			});
		})();
	}

	// Swipe on the touch devices to show/hide of toolbar or navbar
	if (self.UA.Touch) {
		(function() {
			var lastX, lastY, nodeOffset, nodeWidth, nodeTop, navbarW, toolbarH,
				navbar = self.getUI('navbar'),
				toolbar = self.getUI('toolbar'),
				moveOn  = function(e) {
					e.preventDefault();
				},
				moveOff = function() {
					$(document).off('touchmove', moveOn);
				},
				handleW, handleH = 50;

			node.on('touchstart touchmove touchend', function(e) {
				if (e.type === 'touchend') {
					lastX = false;
					lastY = false;
					moveOff();
					return;
				}
				
				var touches = e.originalEvent.touches || [{}],
					x = touches[0].pageX || null,
					y = touches[0].pageY || null,
					ltr = (self.direction === 'ltr'),
					navbarMode, treeWidth, swipeX, moveX, toolbarT, mode;
				
				if (x === null || y === null || (e.type === 'touchstart' && touches.length > 1)) {
					return;
				}
				
				if (e.type === 'touchstart') {
					nodeOffset = node.offset();
					nodeWidth = node.width();
					if (navbar) {
						lastX = false;
						if (navbar.is(':hidden')) {
							if (! handleW) {
								handleW = Math.max(50, nodeWidth / 10)
							}
							if ((ltr? (x - nodeOffset.left) : (nodeWidth + nodeOffset.left - x)) < handleW) {
								lastX = x;
							}
						} else {
							navbarW = navbar.width();
							treeWidth = Math.max.apply(Math, $.map(navbar.children('.elfinder-tree'), function(c){return $(c).width();}));
							if (ltr) {
								swipeX = (x < nodeOffset.left + navbarW && treeWidth - navbar.scrollLeft() - 5 <= navbarW);
							} else {
								swipeX = (x > nodeOffset.left + nodeWidth - navbarW && treeWidth + navbar.scrollLeft() - 5 <= navbarW);
							}
							if (swipeX) {
								handleW = Math.max(50, nodeWidth / 10);
								lastX = x;
							} else {
								lastX = false;
							}
						}
					}
					if (toolbar) {
						toolbarH = toolbar.height();
						nodeTop = nodeOffset.top;
						if (y - nodeTop < (toolbar.is(':hidden')? handleH : (toolbarH + 30))) {
							lastY = y;
							$(document).on('touchmove.' + namespace, moveOn);
							setTimeout(function() {
								moveOff();
							}, 500);
						} else {
							lastY = false;
						}
					}
				} else {
					if (navbar && lastX !== false) {
						navbarMode = (ltr? (lastX > x) : (lastX < x))? 'navhide' : 'navshow';
						moveX = Math.abs(lastX - x);
						if (navbarMode === 'navhide' && moveX > navbarW * .6
							|| (moveX > (navbarMode === 'navhide'? navbarW / 3 : 45)
								&& (navbarMode === 'navshow'
									|| (ltr? x < nodeOffset.left + 20 : x > nodeOffset.left + nodeWidth - 20)
								))
						) {
							self.getUI('navbar').trigger(navbarMode, {handleW: handleW});
							lastX = false;
						}
					}
					if (toolbar && lastY !== false ) {
						toolbarT = toolbar.offset().top;
						if (Math.abs(lastY - y) > Math.min(45, toolbarH / 3)) {
							mode = (lastY > y)? 'slideUp' : 'slideDown';
							if (mode === 'slideDown' || toolbarT + 20 > y) {
								if (toolbar.is(mode === 'slideDown' ? ':hidden' : ':visible')) {
									toolbar.stop(true, true).trigger('toggle', {duration: 100, handleH: handleH});
									moveOff();
								}
								lastY = false;
							}
						}
					}
				}
			});
		})();
	}
	
	// return focus to the window on click (elFInder in the frame)
	if (inFrame) {
		node.on('click', function(e) {
			$(window).focus();
		});
	}
	
	// elFinder to enable by mouse over
	if (this.options.enableByMouseOver) {
		node.on('mouseenter', function(e) {
			(inFrame) && $(window).focus();
			! self.enabled() && self.enable();
		});
	}
	
	// trigger event cssloaded if cddAutoLoad disabled
	if (! this.options.cssAutoLoad) {
		this.trigger('cssloaded');
	}
	
	// send initial request and start to pray >_<
	this.trigger('init')
		.request({
			data        : {cmd : 'open', target : self.startDir(), init : 1, tree : this.ui.tree ? 1 : 0}, 
			preventDone : true,
			notify      : {type : 'open', cnt : 1, hideCnt : true},
			freeze      : true
		})
		.fail(function() {
			self.trigger('fail').disable().lastDir('');
			listeners = {};
			shortcuts = {};
			$(document).add(node).off('.'+namespace);
			self.trigger = function() { };
		})
		.done(function(data) {
			// detect elFinder node z-index
			var ni = node.css('z-index');
			if (ni && ni !== 'auto' && ni !== 'inherit') {
				self.zIndex = ni;
			} else {
				node.parents().each(function(i, n) {
					var z = $(n).css('z-index');
					if (z !== 'auto' && z !== 'inherit' && (z = parseInt(z))) {
						self.zIndex = z;
						return false;
					}
				});
			}
			
			self.load().debug('api', self.api);
			// update ui's size after init
			node.trigger('resize');
			// initial open
			open(data);
			self.trigger('open', data);
			
			if (inFrame && self.options.enableAlways) {
				$(window).focus();
			}
			//=========================================================================
			//Efw adds selection function to elfinder.
			if (data.selectedFolderHash){
				self.request({"data":{cmd:"open","target":data.selectedFolderHash}})
				.done(function(d){
					if (data.selectedFileHash){
						window.setTimeout(function(){
							$("#"+data.selectedFileHash,"#"+self.id).click();
						},500);
					}
				});
			}
			//=========================================================================
		});
	
	// self.timeEnd('load'); 

};

//register elFinder to global scope
if (typeof toGlobal === 'undefined' || toGlobal) {
	window.elFinder = elFinder;
}

/**
 * Prototype
 * 
 * @type  Object
 */
elFinder.prototype = {
	
	uniqueid : 0,
	
	res : function(type, id) {
		return this.resources[type] && this.resources[type][id];
	}, 

	/**
	 * User os. Required to bind native shortcuts for open/rename
	 *
	 * @type String
	 **/
	OS : navigator.userAgent.indexOf('Mac') !== -1 ? 'mac' : navigator.userAgent.indexOf('Win') !== -1  ? 'win' : 'other',
	
	/**
	 * User browser UA.
	 * jQuery.browser: version deprecated: 1.3, removed: 1.9
	 *
	 * @type Object
	 **/
	UA : (function(){
		var webkit = !document.uniqueID && !window.opera && !window.sidebar && window.localStorage && 'WebkitAppearance' in document.documentElement.style;
		return {
			// Browser IE <= IE 6
			ltIE6   : typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
			// Browser IE <= IE 7
			ltIE7   : typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
			// Browser IE <= IE 8
			ltIE8   : typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
			IE      : document.uniqueID,
			Firefox : window.sidebar,
			Opera   : window.opera,
			Webkit  : webkit,
			Chrome  : webkit && window.chrome,
			Safari  : webkit && !window.chrome,
			Mobile  : typeof window.orientation != "undefined",
			Touch   : typeof window.ontouchstart != "undefined",
			iOS     : navigator.platform.match(/^iP(?:[ao]d|hone)/),
			Fullscreen : (typeof (document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen) !== 'undefined')
		};
	})(),
	
	/**
	 * Current request command
	 * 
	 * @type  String
	 */
	currentReqCmd : '',
	
	/**
	 * Internationalization object
	 * 
	 * @type  Object
	 */
	i18 : {
		en : {
			translator      : '',
			language        : 'English',
			direction       : 'ltr',
			dateFormat      : 'd.m.Y H:i',
			fancyDateFormat : '$1 H:i',
			messages        : {}
		},
		months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthsShort : ['msJan', 'msFeb', 'msMar', 'msApr', 'msMay', 'msJun', 'msJul', 'msAug', 'msSep', 'msOct', 'msNov', 'msDec'],

		days : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysShort : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	},
	
	/**
	 * File mimetype to kind mapping
	 * 
	 * @type  Object
	 */
	kinds : 	{
			'unknown'                       : 'Unknown',
			'directory'                     : 'Folder',
			'symlink'                       : 'Alias',
			'symlink-broken'                : 'AliasBroken',
			'application/x-empty'           : 'TextPlain',
			'application/postscript'        : 'Postscript',
			'application/vnd.ms-office'     : 'MsOffice',
			'application/msword'            : 'MsWord',
			'application/vnd.ms-word'       : 'MsWord',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'MsWord',
			'application/vnd.ms-word.document.macroEnabled.12'                        : 'MsWord',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.template' : 'MsWord',
			'application/vnd.ms-word.template.macroEnabled.12'                        : 'MsWord',
			'application/vnd.ms-excel'      : 'MsExcel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'       : 'MsExcel',
			'application/vnd.ms-excel.sheet.macroEnabled.12'                          : 'MsExcel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.template'    : 'MsExcel',
			'application/vnd.ms-excel.template.macroEnabled.12'                       : 'MsExcel',
			'application/vnd.ms-excel.sheet.binary.macroEnabled.12'                   : 'MsExcel',
			'application/vnd.ms-excel.addin.macroEnabled.12'                          : 'MsExcel',
			'application/vnd.ms-powerpoint' : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation' : 'MsPP',
			'application/vnd.ms-powerpoint.presentation.macroEnabled.12'              : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.slideshow'  : 'MsPP',
			'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'                 : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.template'   : 'MsPP',
			'application/vnd.ms-powerpoint.template.macroEnabled.12'                  : 'MsPP',
			'application/vnd.ms-powerpoint.addin.macroEnabled.12'                     : 'MsPP',
			'application/vnd.openxmlformats-officedocument.presentationml.slide'      : 'MsPP',
			'application/vnd.ms-powerpoint.slide.macroEnabled.12'                     : 'MsPP',
			'application/pdf'               : 'PDF',
			'application/xml'               : 'XML',
			'application/vnd.oasis.opendocument.text' : 'OO',
			'application/vnd.oasis.opendocument.text-template'         : 'OO',
			'application/vnd.oasis.opendocument.text-web'              : 'OO',
			'application/vnd.oasis.opendocument.text-master'           : 'OO',
			'application/vnd.oasis.opendocument.graphics'              : 'OO',
			'application/vnd.oasis.opendocument.graphics-template'     : 'OO',
			'application/vnd.oasis.opendocument.presentation'          : 'OO',
			'application/vnd.oasis.opendocument.presentation-template' : 'OO',
			'application/vnd.oasis.opendocument.spreadsheet'           : 'OO',
			'application/vnd.oasis.opendocument.spreadsheet-template'  : 'OO',
			'application/vnd.oasis.opendocument.chart'                 : 'OO',
			'application/vnd.oasis.opendocument.formula'               : 'OO',
			'application/vnd.oasis.opendocument.database'              : 'OO',
			'application/vnd.oasis.opendocument.image'                 : 'OO',
			'application/vnd.openofficeorg.extension'                  : 'OO',
			'application/x-shockwave-flash' : 'AppFlash',
			'application/flash-video'       : 'Flash video',
			'application/x-bittorrent'      : 'Torrent',
			'application/javascript'        : 'JS',
			'application/rtf'               : 'RTF',
			'application/rtfd'              : 'RTF',
			'application/x-font-ttf'        : 'TTF',
			'application/x-font-otf'        : 'OTF',
			'application/x-rpm'             : 'RPM',
			'application/x-web-config'      : 'TextPlain',
			'application/xhtml+xml'         : 'HTML',
			'application/docbook+xml'       : 'DOCBOOK',
			'application/x-awk'             : 'AWK',
			'application/x-gzip'            : 'GZIP',
			'application/x-bzip2'           : 'BZIP',
			'application/x-xz'              : 'XZ',
			'application/zip'               : 'ZIP',
			'application/x-zip'               : 'ZIP',
			'application/x-rar'             : 'RAR',
			'application/x-tar'             : 'TAR',
			'application/x-7z-compressed'   : '7z',
			'application/x-jar'             : 'JAR',
			'text/plain'                    : 'TextPlain',
			'text/x-php'                    : 'PHP',
			'text/html'                     : 'HTML',
			'text/javascript'               : 'JS',
			'text/css'                      : 'CSS',
			'text/rtf'                      : 'RTF',
			'text/rtfd'                     : 'RTF',
			'text/x-c'                      : 'C',
			'text/x-csrc'                   : 'C',
			'text/x-chdr'                   : 'CHeader',
			'text/x-c++'                    : 'CPP',
			'text/x-c++src'                 : 'CPP',
			'text/x-c++hdr'                 : 'CPPHeader',
			'text/x-shellscript'            : 'Shell',
			'application/x-csh'             : 'Shell',
			'text/x-python'                 : 'Python',
			'text/x-java'                   : 'Java',
			'text/x-java-source'            : 'Java',
			'text/x-ruby'                   : 'Ruby',
			'text/x-perl'                   : 'Perl',
			'text/x-sql'                    : 'SQL',
			'text/xml'                      : 'XML',
			'text/x-comma-separated-values' : 'CSV',
			'text/x-markdown'               : 'Markdown',
			'image/x-ms-bmp'                : 'BMP',
			'image/jpeg'                    : 'JPEG',
			'image/gif'                     : 'GIF',
			'image/png'                     : 'PNG',
			'image/tiff'                    : 'TIFF',
			'image/x-targa'                 : 'TGA',
			'image/vnd.adobe.photoshop'     : 'PSD',
			'image/xbm'                     : 'XBITMAP',
			'image/pxm'                     : 'PXM',
			'audio/mpeg'                    : 'AudioMPEG',
			'audio/midi'                    : 'AudioMIDI',
			'audio/ogg'                     : 'AudioOGG',
			'audio/mp4'                     : 'AudioMPEG4',
			'audio/x-m4a'                   : 'AudioMPEG4',
			'audio/wav'                     : 'AudioWAV',
			'audio/x-mp3-playlist'          : 'AudioPlaylist',
			'video/x-dv'                    : 'VideoDV',
			'video/mp4'                     : 'VideoMPEG4',
			'video/mpeg'                    : 'VideoMPEG',
			'video/x-msvideo'               : 'VideoAVI',
			'video/quicktime'               : 'VideoMOV',
			'video/x-ms-wmv'                : 'VideoWM',
			'video/x-flv'                   : 'VideoFlash',
			'video/x-matroska'              : 'VideoMKV',
			'video/ogg'                     : 'VideoOGG'
		},
	
	/**
	 * Ajax request data validation rules
	 * 
	 * @type  Object
	 */
	rules : {
		defaults : function(data) {
			if (!data
			|| (data.added && !$.isArray(data.added))
			||  (data.removed && !$.isArray(data.removed))
			||  (data.changed && !$.isArray(data.changed))) {
				return false;
			}
			return true;
		},
		open    : function(data) { return data && data.cwd && data.files && $.isPlainObject(data.cwd) && $.isArray(data.files); },
		tree    : function(data) { return data && data.tree && $.isArray(data.tree); },
		parents : function(data) { return data && data.tree && $.isArray(data.tree); },
		tmb     : function(data) { return data && data.images && ($.isPlainObject(data.images) || $.isArray(data.images)); },
		upload  : function(data) { return data && ($.isPlainObject(data.added) || $.isArray(data.added));},
		search  : function(data) { return data && data.files && $.isArray(data.files)}
	},
	
	/**
	 * Commands costructors
	 *
	 * @type Object
	 */
	commands : {},
	
	/**
	 * Commands to add the item (space delimited)
	 * 
	 * @type String
	 */
	cmdsToAdd : 'archive duplicate extract mkdir mkfile paste rm upload',
	
	parseUploadData : function(text) {
		var data;
		
		if (!$.trim(text)) {
			return {error : ['errResponse', 'errDataEmpty']};
		}
		
		try {
			data = JSON.parse(text);
		} catch (e) {
			return {error : ['errResponse', 'errDataNotJSON']};
		}
		
		if (!this.validResponse('upload', data)) {
			return {error : ['errResponse']};
		}
		data = this.normalize(data);
		data.removed = $.merge((data.removed || []), $.map(data.added||[], function(f) { return f.hash; }));
		return data;
		
	},
	
	iframeCnt : 0,
	
	uploads : {
		// xhr muiti uploading flag
		xhrUploading: false,
		
		// check file/dir exists
		checkExists: function(files, target, fm) {
			var dfrd = $.Deferred(),
				names, name,
				cancel = function() {
					var i = files.length;
					while (--i > -1) {
						files[i]._remove = true;
					}
				},
				check = function() {
					var renames = [], hashes = {}, existed = [], exists = [], i, c;
					
					var confirm = function(ndx) {
						var last = ndx == exists.length-1,
						opts = {
							title  : fm.i18n('cmdupload'),
							text   : ['errExists', exists[ndx].name, 'confirmRepl'], 
							all    : !last,
							accept : {
								label    : 'btnYes',
								callback : function(all) {
									!last && !all
										? confirm(++ndx)
										: dfrd.resolve(renames, hashes);
								}
							},
							reject : {
								label    : 'btnNo',
								callback : function(all) {
									var i;
	
									if (all) {
										i = exists.length;
										while (ndx < i--) {
											files[exists[i].i]._remove = true;
										}
									} else {
										files[exists[ndx].i]._remove = true;
									}
	
									!last && !all
										? confirm(++ndx)
										: dfrd.resolve(renames, hashes);
								}
							},
							cancel : {
								label    : 'btnCancel',
								callback : function() {
									cancel();
									dfrd.resolve(renames, hashes);
								}
							},
							buttons : [
							    //-------------Efw not do backup---------------
							    //---------------------------------------------
							]
						};
						if (fm.iframeCnt > 0) {
							delete opts.reject;
						}
						fm.confirm(opts);
					};
					
					if (! fm.file(target).read) {
						// for dropbox type
						dfrd.resolve([]);
						return;
					}
					
					names = $.map(files, function(file, i) { return file.name? {i: i, name: file.name} : null ;});
					
					name = $.map(names, function(item) { return item.name;});
					fm.request({
						data : {cmd : 'ls', target : target, intersect : name},
						notify : {type : 'preupload', cnt : 1, hideCnt : true},
						preventFail : true
					})
					.done(function(data) {
						var existedArr, cwdItems;
						if (data) {
							if (data.error) {
								cancel();
							} else {
								if (fm.options.overwriteUploadConfirm && ! fm.UA.iOS && fm.option('uploadOverwrite', target)) {
									if (data.list) {
										if ($.isArray(data.list)) {
											existed = data.list || [];
										} else {
											existedArr = [];
											existed = $.map(data.list, function(n) {
												if (typeof n === 'string') {
													return n;
												} else {
													// support to >=2.1.11 plugin Normalizer, Sanitizer
													existedArr = existedArr.concat(n);
													return null;
												}
											});
											if (existedArr.length) {
												existed = existed.concat(existedArr);
											}
											hashes = data.list;
										}
										exists = $.map(names, function(name){
											return $.inArray(name.name, existed) !== -1 ? name : null ;
										});
										if (existed.length && target == fm.cwd().hash) {
											cwdItems = $.map(fm.files(), function(file) { return (file.phash == target) ? file.name : null; } );
											if ($.map(existed, function(n) { 
												return $.inArray(n, cwdItems) === -1? true : null;
											}).length){
												fm.sync();
											}
										}
									}
								}
							}
						}
						if (exists.length > 0) {
							confirm(0);
						} else {
							dfrd.resolve([]);
						}
					})
					.fail(function(error) {
						cancel();
						dfrd.resolve([]);
						error && fm.error(error);
					});
				};
			if (fm.api >= 2.1 && typeof files[0] == 'object') {
				check();
				return dfrd;
			} else {
				return dfrd.resolve([]);
			}
		},
		
		// check droped contents
		checkFile : function(data, fm, target) {
			if (!!data.checked || data.type == 'files') {
				return data.files;
			} else if (data.type == 'data') {
				var dfrd = $.Deferred(),
				files = [],
				paths = [],
				dirctorys = [],
				entries = [],
				processing = 0,
				items,
				mkdirs = [],
				
				readEntries = function(dirReader) {
					var toArray = function(list) {
						return Array.prototype.slice.call(list || []);
					};
				},
				
				doScan = function(items) {
					var dirReader, entry, length,
					entries = [],
					toArray = function(list) {
						return Array.prototype.slice.call(list || [], 0);
					},
					excludes = fm.options.folderUploadExclude[fm.OS] || null;
					length = items.length;
					for (var i = 0; i < length; i++) {
						entry = items[i];
						if (entry) {
							if (entry.isFile) {
								processing++;
								entry.file(function (file) {
									if (! excludes || ! file.name.match(excludes)) {
										paths.push(entry.fullPath || '');
										files.push(file);
									}
									processing--;
								});
							} else if (entry.isDirectory) {
								if (fm.api >= 2.1) {
									processing++;
									mkdirs.push(entry.fullPath);
									dirReader = entry.createReader();
									var entries = [];
									// Call the reader.readEntries() until no more results are returned.
									var readEntries = function() {
										 dirReader.readEntries (function(results) {
											if (!results.length) {
												for (var i = 0; i < entries.length; i++) {
													doScan([entries[i]]);
												}
												processing--;
											} else {
												entries = entries.concat(toArray(results));
												readEntries();
											}
										}, function(){
											processing--;
										});
									};
									readEntries(); // Start reading dirs.
								}
							}
						}
					}
				};
				
				items = $.map(data.files.items, function(item){
					return item.getAsEntry? item.getAsEntry() : item.webkitGetAsEntry();
				});
				if (items.length > 0) {
					fm.uploads.checkExists(items, target, fm).done(function(renames, hashes){
						var notifyto, dfds = [];
						if (fm.options.overwriteUploadConfirm && ! fm.UA.iOS && fm.option('uploadOverwrite', target)) {
							items = $.map(items, function(item){
								var i, bak, hash, dfd, hi;
								if (item.isDirectory) {
									i = $.inArray(item.name, renames);
									if (i !== -1) {
										renames.splice(i, 1);
										bak = fm.uniqueName(item.name + fm.options.backupSuffix , null, '');
										$.each(hashes, function(h, name) {
											if (item.name == name) {
												hash = h;
												return false;
											}
										});
										if (! hash) {
											hash = fm.fileByName(item.name, target).hash;
										}
										fm.lockfiles({files : [hash]});
										dfd = fm.request({
											data   : {cmd : 'rename', target : hash, name : bak},
											notify : {type : 'rename', cnt : 1}
										})
										.fail(function(error) {
											item._remove = true;
											fm.sync();
										})
										.always(function() {
											fm.unlockfiles({files : [hash]})
										});
										dfds.push(dfd);
									}
								}
								return !item._remove? item : null;
							});
						}
						$.when.apply($, dfds).done(function(){
							if (items.length > 0) {
								notifyto = setTimeout(function() {
									fm.notify({type : 'readdir', cnt : 1, hideCnt: true});
								}, fm.options.notifyDelay);
								doScan(items);
								setTimeout(function wait() {
									if (processing > 0) {
										setTimeout(wait, 10);
									} else {
										notifyto && clearTimeout(notifyto);
										fm.notify({type : 'readdir', cnt : -1});
										dfrd.resolve([files, paths, renames, hashes, mkdirs]);
									}
								}, 10);
							} else {
								dfrd.reject();
							}
						});
					});
					return dfrd.promise();
				} else {
					return dfrd.reject();
				}
			} else {
				var ret = [];
				var check = [];
				var str = data.files[0];
				if (data.type == 'html') {
					var tmp = $("<html></html>").append($.parseHTML(str.replace(/ src=/ig, ' _elfsrc='))),
						atag;
					$('img[_elfsrc]', tmp).each(function(){
						var url, purl,
						self = $(this),
						pa = self.closest('a');
						if (pa && pa.attr('href') && pa.attr('href').match(/\.(?:jpe?g|gif|bmp|png)/i)) {
							purl = pa.attr('href');
						}
						url = self.attr('_elfsrc');
						if (url) {
							if (purl) {
								$.inArray(purl, ret) == -1 && ret.push(purl);
								$.inArray(url, check) == -1 &&  check.push(url);
							} else {
								$.inArray(url, ret) == -1 && ret.push(url);
							}
						}
					});
					atag = $('a[href]', tmp);
					atag.each(function(){
						var loc,
							parseUrl = function(url) {
							    var a = document.createElement('a');
							    a.href = url;
							    return a;
							};
						if ($(this).text()) {
							loc = parseUrl($(this).attr('href'));
							if (loc.href && (atag.length === 1 || ! loc.pathname.match(/(?:\.html?|\/[^\/.]*)$/i))) {
								if ($.inArray(loc.href, ret) == -1 && $.inArray(loc.href, check) == -1) ret.push(loc.href);
							}
						}
					});
				} else {
					var regex, m, url;
					regex = /(http[^<>"{}|\\^\[\]`\s]+)/ig;
					while (m = regex.exec(str)) {
						url = m[1].replace(/&amp;/g, '&');
						if ($.inArray(url, ret) == -1) ret.push(url);
					}
				}
				return ret;
			}
		},

		// upload transport using XMLHttpRequest
		xhr : function(data, fm) { 
			var self   = fm ? fm : this,
				node        = self.getUI(),
				xhr         = new XMLHttpRequest(),
				notifyto    = null, notifyto2 = null,
				dataChecked = data.checked,
				isDataType  = (data.isDataType || data.type == 'data'),
				target      = (data.target || self.cwd().hash),
				dropEvt     = (data.dropEvt || null),
				chunkEnable = (self.option('uploadMaxConn', target) != -1),
				multiMax    = Math.min(5, Math.max(1, self.option('uploadMaxConn', target))),
				retryWait   = 10000, // 10 sec
				retryMax    = 30, // 10 sec * 30 = 300 secs (Max 5 mins)
				retry       = 0,
				dfrd   = $.Deferred()
					.fail(function(error) {
						if (self.uploads.xhrUploading) {
							setTimeout(function() { self.sync(); }, 5000);
							var file = files.length? (isDataType? files[0][0] : files[0]) : {};
							if (file._cid) {
								formData = new FormData();
								files = [{_chunkfail: true}];
								formData.append('chunk', file._chunk);
								formData.append('cid'  , file._cid);
								isDataType = false;
								send(files);
							}
						}
						self.uploads.xhrUploading = false;
						files = null;
						error && self.error(error);
					})
					.done(function(data) {
						xhr = null;
						self.uploads.xhrUploading = false;
						files = null;
						if (data) {
							self.currentReqCmd = 'upload';
							data.warning && self.error(data.warning);
							data.removed && self.remove(data);
							data.added   && self.add(data);
							data.changed && self.change(data);
		 					self.trigger('upload', data);
		 					self.trigger('uploaddone');
							data.sync && self.sync();
							data.debug && fm.debug('backend-debug', data);
						}
					})
					.always(function() {
						// unregist fnAbort function
						node.off('uploadabort', fnAbort);
						$(window).off('unload', fnAbort);
						notifyto && clearTimeout(notifyto);
						notifyto2 && clearTimeout(notifyto2);
						dataChecked && !data.multiupload && checkNotify() && self.notify({type : 'upload', cnt : -cnt, progress : 0, size : 0});
						chunkMerge && notifyElm.children('.elfinder-notify-chunkmerge').length && self.notify({type : 'chunkmerge', cnt : -1});
					}),
				formData    = new FormData(),
				files       = data.input ? data.input.files : self.uploads.checkFile(data, self, target), 
				cnt         = data.checked? (isDataType? files[0].length : files.length) : files.length,
				loaded      = 0,
				prev        = 0,
				filesize    = 0,
				notify      = false,
				notifyElm   = self.ui.notify,
				cancelBtn   = true,
				abort       = false,
				checkNotify = function() {
					return notify = (notify || notifyElm.children('.elfinder-notify-upload').length);
				},
				fnAbort     = function() {
					abort = true;
					if (xhr) {
						xhr.quiet = true;
						xhr.abort();
					}
					if (checkNotify()) {
						self.notify({type : 'upload', cnt : notifyElm.children('.elfinder-notify-upload').data('cnt') * -1, progress : 0, size : 0});
					}
				},
				cancelToggle = function(show) {
					notifyElm.children('.elfinder-notify-upload').children('.elfinder-notify-cancel')[show? 'show':'hide']();
				},
				startNotify = function(size) {
					if (!size) size = filesize;
					return setTimeout(function() {
						notify = true;
						self.notify({type : 'upload', cnt : cnt, progress : loaded - prev, size : size,
							cancel: function() {
								node.trigger('uploadabort');
								dfrd.resolve();
							}
						});
						prev = loaded;
						if (data.multiupload) {
							cancelBtn && cancelToggle(true);
						} else {
							cancelToggle(cancelBtn && loaded < size);
						}
					}, self.options.notifyDelay);
				},
				doRetry = function() {
					if (retry++ <= retryMax) {
						if (checkNotify() && prev) {
							self.notify({type : 'upload', cnt : 0, progress : 0, size : prev});
						}
						xhr.quiet = true;
						xhr.abort();
						prev = loaded = 0;
						setTimeout(function() {
							if (! abort) {
								xhr.open('POST', self.uploadURL, true);
								xhr.send(formData);
							}
						}, retryWait);
					} else {
						node.trigger('uploadabort');
						dfrd.reject(['errAbort', 'errTimeout']);
					}
				},
				renames = (data.renames || null),
				hashes = (data.hashes || null),
				chunkMerge = false;
			
			// regist fnAbort function
			node.one('uploadabort', fnAbort);
			$(window).one('unload.' + fm.namespace, fnAbort);
			
			!chunkMerge && (prev = loaded);
			
			if (!isDataType && !cnt) {
				return dfrd.reject(['errUploadNoFiles']);
			}
			
			xhr.addEventListener('error', function() {
				if (xhr.status == 0) {
					if (abort) {
						dfrd.reject();
					} else {
						// ff bug while send zero sized file
						// for safari - send directory
						if (!isDataType && data.files && $.map(data.files, function(f){return ! f.type && f.size === (self.UA.Safari? 1802 : 0)? f : null;}).length) {
							errors.push('errFolderUpload');
							dfrd.reject(['errAbort', 'errFolderUpload']);
						} else if (data.input && $.map(data.input.files, function(f){return ! f.type && f.size === (self.UA.Safari? 1802 : 0)? f : null;}).length) {
							dfrd.reject(['errUploadNoFiles']);
						} else {
							doRetry();
						}
					}
				} else {
					node.trigger('uploadabort');
					dfrd.reject('errConnect');
				}
			}, false);
			
			xhr.addEventListener('load', function(e) {
				var status = xhr.status, res, curr = 0, error = '';
				
				if (status >= 400) {
					if (status > 500) {
						error = 'errResponse';
					} else {
						error = 'errConnect';
					}
				} else {
					if (!xhr.responseText) {
						error = ['errResponse', 'errDataEmpty'];
					}
				}
				
				if (error) {
					node.trigger('uploadabort');
					var file = isDataType? files[0][0] : files[0];
					return dfrd.reject(file._cid? null : error);
				}
				
				loaded = filesize;
				
				if (checkNotify() && (curr = loaded - prev)) {
					self.notify({type : 'upload', cnt : 0, progress : curr, size : 0});
				}

				//--------Use Efw uploadServlet----------------
				//data.target
				fm.request({"data":{"cmd":"open","target":data.target,"saveupload":1,"reload":1,"tree":1,"compare":""}});//To refresh the elfinder view
				dfrd.resolve({});//close loading dialog
				return;
				//---------------------------------------------
			}, false);
			
			xhr.upload.addEventListener('loadstart', function(e) {
				if (!chunkMerge && e.lengthComputable) {
					loaded = e.loaded;
					retry && (loaded = 0);
					filesize = e.total;
					if (!loaded) {
						loaded = parseInt(filesize * 0.05);
					}
					if (checkNotify()) {
						self.notify({type : 'upload', cnt : 0, progress : loaded - prev, size : data.multiupload? 0 : filesize});
						prev = loaded;
					}
				}
			}, false);
			
			xhr.upload.addEventListener('progress', function(e) {
				var curr;

				if (e.lengthComputable && !chunkMerge && xhr.readyState < 2) {

					loaded = e.loaded;

					// to avoid strange bug in safari (not in chrome) with drag&drop.
					// bug: macos finder opened in any folder,
					// reset safari cache (option+command+e), reload elfinder page,
					// drop file from finder
					// on first attempt request starts (progress callback called ones) but never ends.
					// any next drop - successfull.
					if (!data.checked && loaded > 0 && !notifyto) {
						notifyto = startNotify(xhr._totalSize - loaded);
					}
					
					if (!filesize) {
						filesize = e.total;
						if (!loaded) {
							loaded = parseInt(filesize * 0.05);
						}
					}
					
					curr = loaded - prev;
					if (checkNotify() && (curr/e.total) >= 0.05) {
						self.notify({type : 'upload', cnt : 0, progress : curr, size : 0});
						prev = loaded;
					}
					
					if (! data.multiupload && loaded >= filesize) {
						cancelBtn = false;
						cancelToggle(false);
					}
					
				}
			}, false);
			
			var send = function(files, paths){
				var size = 0,
				fcnt = 1,
				sfiles = [],
				c = 0,
				total = cnt,
				maxFileSize,
				totalSize = 0,
				chunked = [],
				chunkID = new Date().getTime().toString().substr(-9), // for take care of the 32bit backend system
				BYTES_PER_CHUNK = Math.min((fm.uplMaxSize? fm.uplMaxSize : 2097152) - 8190, fm.options.uploadMaxChunkSize), // uplMaxSize margin 8kb or options.uploadMaxChunkSize
				blobSlice = chunkEnable? false : '',
				blobSize, blobMtime, i, start, end, chunks, blob, chunk, added, done, last, failChunk,
				multi = function(files, num){
					var sfiles = [], cid, sfilesLen = 0, cancelChk;
					if (!abort) {
						while(files.length && sfiles.length < num) {
							sfiles.push(files.shift());
						}
						sfilesLen = sfiles.length;
						if (sfilesLen) {
							cancelChk = sfilesLen;
							for (var i=0; i < sfilesLen; i++) {
								if (abort) {
									break;
								}
								cid = isDataType? (sfiles[i][0][0]._cid || null) : (sfiles[i][0]._cid || null);
								if (!!failChunk[cid]) {
									last--;
									continue;
								}
								fm.exec('upload', {
									type: data.type,
									isDataType: isDataType,
									files: sfiles[i],
									checked: true,
									target: target,
									dropEvt: dropEvt,
									renames: renames,
									hashes: hashes,
									multiupload: true}, void 0, target)
								.fail(function(error) {
									if (error && error === 'No such command') {
										abort = true;
										fm.error(['errUpload', 'errPerm']);
									}
									if (cid) {	
										failChunk[cid] = true;
									}
								})
								.always(function(e) {
									if (e && e.added) added = $.merge(added, e.added);
									if (last <= ++done) {
										fm.trigger('multiupload', {added: added});
										notifyto && clearTimeout(notifyto);
										if (checkNotify()) {
											self.notify({type : 'upload', cnt : -cnt, progress : 0, size : 0});
										}
									}
									if (files.length) {
										multi(files, 1); // Next one
									} else {
										if (--cancelChk <= 1) {
											cancelBtn = false;
											cancelToggle(false);
										}
									}
								});
							}
						}
					}
					if (sfiles.length < 1 || abort) {
						if (abort) {
							notifyto && clearTimeout(notifyto);
							if (cid) {
								failChunk[cid] = true;
							}
							dfrd.reject();
						} else {
							dfrd.resolve();
							self.uploads.xhrUploading = false;
						}
					}
				},
				check = function(){
					if (!self.uploads.xhrUploading) {
						self.uploads.xhrUploading = true;
						multi(sfiles, multiMax); // Max connection: 3
					} else {
						setTimeout(function(){ check(); }, 100);
					}
				};

				if (! dataChecked && (isDataType || data.type == 'files')) {
					if (! (maxFileSize = fm.option('uploadMaxSize', target))) {
						maxFileSize = 0;
					}
					for (i=0; i < files.length; i++) {
						try {
							blob = files[i];
							blobSize = blob.size;
							if (blobSlice === false) {
								blobSlice = '';
								if (self.api >= 2.1) {
									if ('slice' in blob) {
										blobSlice = 'slice';
									} else if ('mozSlice' in blob) {
										blobSlice = 'mozSlice';
									} else if ('webkitSlice' in blob) {
										blobSlice = 'webkitSlice';
									}
								}
							}
						} catch(e) {
							cnt--;
							total--;
							continue;
						}
						
						// file size check
						if ((maxFileSize && blobSize > maxFileSize) || (!blobSlice && fm.uplMaxSize && blobSize > fm.uplMaxSize)) {
							self.error(self.i18n('errUploadFile', blob.name) + ' ' + self.i18n('errUploadFileSize'));
							cnt--;
							total--;
							continue;
						}
						
						// file mime check
						if (blob.type && ! self.uploadMimeCheck(blob.type, target)) {
							self.error(self.i18n('errUploadFile', blob.name) + ' ' + self.i18n('errUploadMime') + ' (' + self.escape(blob.type) + ')');
							cnt--;
							total--;
							continue;
						}
						
						if (blobSlice && blobSize > BYTES_PER_CHUNK) {
							start = 0;
							end = BYTES_PER_CHUNK;
							chunks = -1;
							total = Math.floor(blobSize / BYTES_PER_CHUNK);
							blobMtime = blob.lastModified? Math.round(blob.lastModified/1000) : 0;

							totalSize += blobSize;
							chunked[chunkID] = 0;
							while(start <= blobSize) {
								chunk = blob[blobSlice](start, end);
								chunk._chunk = blob.name + '.' + (++chunks) + '_' + total + '.part';
								chunk._cid   = chunkID;
								chunk._range = start + ',' + chunk.size + ',' + blobSize;
								chunk._mtime = blobMtime;
								chunked[chunkID]++;
								
								if (size) {
									c++;
								}
								if (typeof sfiles[c] == 'undefined') {
									sfiles[c] = [];
									if (isDataType) {
										sfiles[c][0] = [];
										sfiles[c][1] = [];
									}
								}
								size = BYTES_PER_CHUNK;
								fcnt = 1;
								if (isDataType) {
									sfiles[c][0].push(chunk);
									sfiles[c][1].push(paths[i]);
								} else {
									sfiles[c].push(chunk);
								}

								start = end;
								end = start + BYTES_PER_CHUNK;
							}
							if (chunk == null) {
								self.error(self.i18n('errUploadFile', blob.name) + ' ' + self.i18n('errUploadFileSize'));
								cnt--;
								total--;
							} else {
								total += chunks;
								size = 0;
								fcnt = 1;
								c++;
							}
							continue;
						}
						if ((fm.uplMaxSize && size + blobSize >= fm.uplMaxSize) || fcnt > fm.uplMaxFile) {
							size = 0;
							fcnt = 1;
							c++;
						}
						if (typeof sfiles[c] == 'undefined') {
							sfiles[c] = [];
							if (isDataType) {
								sfiles[c][0] = [];
								sfiles[c][1] = [];
							}
						}
						if (isDataType) {
							sfiles[c][0].push(blob);
							sfiles[c][1].push(paths[i]);
						} else {
							sfiles[c].push(blob);
						}
						size += blobSize;
						totalSize += blobSize;
						fcnt++;
					}
					
					if (sfiles.length == 0) {
						// no data
						data.checked = true;
						return false;
					}
					
					if (sfiles.length > 1) {
						// multi upload
						notifyto = startNotify(totalSize);
						added = [];
						done = 0;
						last = sfiles.length;
						failChunk = [];
						check();
						return true;
					}
					
					// single upload
					if (isDataType) {
						files = sfiles[0][0];
						paths = sfiles[0][1];
					} else {
						files = sfiles[0];
					}
				}
				
				if (!dataChecked) {
					if (!fm.UA.Safari || !data.files) {
						notifyto = startNotify(totalSize);
					} else {
						xhr._totalSize = totalSize;
					}
				}
				
				dataChecked = true;
				
				if (! files.length) {
					dfrd.reject(['errUploadNoFiles']);
				}
				
				xhr.open('POST', self.uploadURL, true);
				
				// set request headers
				if (fm.customHeaders) {
					$.each(fm.customHeaders, function(key) {
						xhr.setRequestHeader(key, this);
					});
				}
				
				// set xhrFields
				if (fm.xhrFields) {
					$.each(fm.xhrFields, function(key) {
						if (key in xhr) {
							xhr[key] = this;
						}
					});
				}

				formData.append('cmd', 'upload');
				formData.append(self.newAPI ? 'target' : 'current', target);
				if (renames && renames.length) {
					$.each(renames, function(i, v) {
						formData.append('renames[]', v);
					});
					formData.append('suffix', fm.options.backupSuffix);
				}
				if (hashes) {
					$.each(hashes, function(i, v) {
						formData.append('hashes['+ i +']', v);
					});
				}
				$.each(self.options.customData, function(key, val) {
					formData.append(key, val);
				});
				$.each(self.options.onlyMimes, function(i, mime) {
					formData.append('mimes['+i+']', mime);
				});
				
				$.each(files, function(i, file) {
					if (file._chunkmerged) {
						formData.append('chunk', file._chunkmerged);
						formData.append('upload[]', file._name);
						formData.append('mtime[]', file._mtime);
					} else {
						if (file._chunkfail) {
							formData.append('upload[]', 'chunkfail');
							formData.append('mimes', 'chunkfail');
						} else {
							formData.append('upload[]', file);
						}
						if (file._chunk) {
							formData.append('chunk', file._chunk);
							formData.append('cid'  , file._cid);
							formData.append('range', file._range);
							formData.append('mtime[]', file._mtime);
						} else {
							formData.append('mtime[]', file.lastModified? Math.round(file.lastModified/1000) : 0);
						}
					}
					if (fm.UA.iOS) {
						formData.append('overwrite', 0);
					}
				});
				
				if (isDataType) {
					$.each(paths, function(i, path) {
						formData.append('upload_path[]', path);
					});
				}
				
				// send int value that which meta key was pressed when dropped  as `dropWith`
				if (dropEvt) {
					formData.append('dropWith', parseInt(
						(dropEvt.altKey  ? '1' : '0')+
						(dropEvt.ctrlKey ? '1' : '0')+
						(dropEvt.metaKey ? '1' : '0')+
						(dropEvt.shiftKey? '1' : '0'), 2));
				}
				xhr.send(formData);
				
				return true;
			};
			
			if (! isDataType) {
				if (files.length > 0) {
					if (renames == null) {
						var mkdirs = [],
							paths = [],
							excludes = fm.options.folderUploadExclude[fm.OS] || null;
						$.each(files, function(i, file) {
							var relPath = file.webkitRelativePath || file.relativePath || '';
							if (! relPath) {
								return false;
							}
							if (excludes && file.name.match(excludes)) {
								file._remove = true;
								relPath = void(0);
							} else {
								relPath = relPath.replace(/\/[^\/]*$/, '');
								if (relPath && $.inArray(relPath, mkdirs) === -1) {
									mkdirs.push(relPath);
								}
							}
							paths.push(relPath);
						});
						fm.getUI().find('div.elfinder-upload-dialog-wrapper').elfinderdialog('close');
						renames = [];
						hashes = {};
						if (mkdirs.length) {
							(function() {
								var checkDirs = $.map(mkdirs, function(name) { return name.indexOf('/') === -1 ? {name: name} : null;}),
									cancelDirs = [];
								fm.uploads.checkExists(checkDirs, target, fm).done(
									function(res, res2) {
										var dfds = [], dfd, bak, hash;
										if (fm.options.overwriteUploadConfirm && ! fm.UA.iOS && fm.option('uploadOverwrite', target)) {
											cancelDirs = $.map(checkDirs, function(dir) { return dir._remove? dir.name : null ;} );
											checkDirs = $.map(checkDirs, function(dir) { return !dir._remove? dir : null ;} );
										}
										if (cancelDirs.length) {
											$.each(paths.concat(), function(i, path) {
												if ($.inArray(path, cancelDirs) === 0) {
													files[i]._remove = true;
													delete paths[i];
												}
											});
										}
										files = $.map(files, function(file) { return file._remove? null : file; });
										paths = $.map(paths, function(path) { return path === void 0 ? null : path; });
										if (checkDirs.length) {
											dfd = $.Deferred();
											if (res.length) {
												$.each(res, function(i, existName) {
													// backup
													bak = fm.uniqueName(existName + fm.options.backupSuffix , null, '');
													$.each(res2, function(h, name) {
														if (res[0] == name) {
															hash = h;
															return false;
														}
													});
													if (! hash) {
														hash = fm.fileByName(res[0], target).hash;
													}
													fm.lockfiles({files : [hash]});
													dfds.push(
														fm.request({
															data   : {cmd : 'rename', target : hash, name : bak},
															notify : {type : 'rename', cnt : 1}
														})
														.fail(function(error) {
															dfrd.reject(error);
															fm.sync();
														})
														.always(function() {
															fm.unlockfiles({files : [hash]})
														})
													);
												});
											} else {
												dfds.push(null);
											}
											
											$.when.apply($, dfds).done(function() {
												// ensure directories
												fm.request({
													data   : {cmd : 'mkdir', target : target, dirs : mkdirs},
													notify : {type : 'mkdir', cnt : mkdirs.length}
												})
												.fail(function(error) {
													error = error || ['errUnknown'];
													if (error[0] === 'errCmdParams') {
														multiMax = 1;
													} else {
														multiMax = 0;
														dfrd.reject(error);
													}
												})
												.done(function(data) {
													if (data.hashes) {
														paths = $.map(paths.concat(), function(p) {
															if (p === '') {
																return target;
															} else {
																return data.hashes['/' + p];
															}
														});
													}
												})
												.always(function(data) {
													if (multiMax) {
														isDataType = true;
														if (! send(files, paths)) {
															dfrd.reject();
														}
													}
												});
											});
										} else {
											dfrd.reject();
										}
									}
								);
							})();
						} else {
							fm.uploads.checkExists(files, target, fm).done(
								function(res, res2){
									if (fm.options.overwriteUploadConfirm && ! fm.UA.iOS && fm.option('uploadOverwrite', target)) {
										renames = res;
										hashes = res2;
										files = $.map(files, function(file){return !file._remove? file : null ;});
									}
									cnt = files.length;
									if (cnt > 0) {
										if (! send(files)) {
											dfrd.reject();
										}
									} else {
										dfrd.reject();
									}
								}
							);
						}
					} else {
						if (! send(files)) {
							dfrd.reject();
						}
					}
				} else {
					dfrd.reject();
				}
			} else {
				if (dataChecked) {
					send(files[0], files[1]);
				} else {
					files.done(function(result) { // result: [files, paths, renames, hashes, mkdirs]
						renames = [];
						cnt = result[0].length;
						if (cnt) {
							if (result[4] && result[4].length) {
								// ensure directories
								fm.request({
									data   : {cmd : 'mkdir', target : target, dirs : result[4]},
									notify : {type : 'mkdir', cnt : result[4].length}
								})
								.fail(function(error) {
									error = error || ['errUnknown'];
									if (error[0] === 'errCmdParams') {
										multiMax = 1;
									} else {
										multiMax = 0;
										dfrd.reject(error);
									}
								})
								.done(function(data) {
									if (data.hashes) {
										result[1] = $.map(result[1], function(p) {
											p = p.replace(/\/[^\/]*$/, '');
											if (p === '') {
												return target;
											} else {
												return data.hashes[p];
											}
										});
									}
								})
								.always(function(data) {
									if (multiMax) {
										renames = result[2];
										hashes = result[3];
										send(result[0], result[1]);
									}
								});
								return;
							} else {
								result[1] = $.map(result[1], function() { return target; });
							}
							renames = result[2];
							hashes = result[3];
							send(result[0], result[1]);
						} else {
							dfrd.reject(['errUploadNoFiles']);
						}
					}).fail(function(){
						dfrd.reject();
					});
				}
			}

			return dfrd;
		},
		//Efw does not iframe=========
		//============================
	},
	
	
	/**
	 * Bind callback to event(s) The callback is executed at most once per event.
	 * To bind to multiply events at once, separate events names by space
	 *
	 * @param  String    event name
	 * @param  Function  callback
	 * @return elFinder
	 */
	one : function(event, callback) {
		var self = this,
			h    = function(e, f) {
				setTimeout(function() {self.unbind(event, h);}, 3);
				return callback.apply(self.getListeners(e.type), arguments);
			};
		return this.bind(event, h);
	},
	
	/**
	 * Set/get data into/from localStorage
	 *
	 * @param  String       key
	 * @param  String|void  value
	 * @return String
	 */
	localStorage : function(key, val) {
		var s      = window.localStorage,
			oldkey = 'elfinder-'+key+this.id, // old key of elFinder < 2.1.6
			retval, oldval,t;

		// new key of elFinder >= 2.1.6
		key = window.location.pathname+'-elfinder-'+key+this.id;
		
		if (val === null) {
			return s.removeItem(key);
		}
		
		if (val === void(0) && !(retval = s.getItem(key)) && (oldval = s.getItem(oldkey))) {
			val = oldval;
			s.removeItem(oldkey);
		}
		
		if (val !== void(0)) {
			t = typeof val;
			if (t !== 'string' && t !== 'number') {
				val = JSON.stringify(val);
			}
			try {
				s.setItem(key, val);
			} catch (e) {
				try {
					s.clear();
					s.setItem(key, val);
				} catch (e) {
					self.debug('error', e.toString());
				}
			}
			retval = s.getItem(key);
		}

		if (retval && (retval.substr(0,1) === '{' || retval.substr(0,1) === '[')) {
			try {
				return JSON.parse(retval);
			} catch(e) {}
		}
		return retval;
	},
	
	/**
	 * Get/set cookie
	 *
	 * @param  String       cookie name
	 * @param  String|void  cookie value
	 * @return String
	 */
	cookie : function(name, value) {
		var d, o, c, i, retval, t;

		name = 'elfinder-'+name+this.id;

		if (value === void(0)) {
			if (document.cookie && document.cookie != '') {
				c = document.cookie.split(';');
				name += '=';
				for (i=0; i<c.length; i++) {
					c[i] = $.trim(c[i]);
					if (c[i].substring(0, name.length) == name) {
						retval = decodeURIComponent(c[i].substring(name.length));
						if (retval.substr(0,1) === '{' || retval.substr(0,1) === '[') {
							try {
								return JSON.parse(retval);
							} catch(e) {}
						}
						return retval;
					}
				}
			}
			return '';
		}

		o = $.extend({}, this.options.cookie);
		if (value === null) {
			value = '';
			o.expires = -1;
		} else {
			t = typeof value;
			if (t !== 'string' && t !== 'number') {
				value = JSON.stringify(value);
			}
		}
		if (typeof(o.expires) == 'number') {
			d = new Date();
			d.setTime(d.getTime()+(o.expires * 86400000));
			o.expires = d;
		}
		document.cookie = name+'='+encodeURIComponent(value)+'; expires='+o.expires.toUTCString()+(o.path ? '; path='+o.path : '')+(o.domain ? '; domain='+o.domain : '')+(o.secure ? '; secure' : '');
		return value;
	},
	
	/**
	 * Get start directory (by location.hash or last opened directory)
	 * 
	 * @return String
	 */
	startDir : function() {
		var locHash = window.location.hash;
		if (locHash && locHash.match(/^#elf_/)) {
			return locHash.replace(/^#elf_/, '');
		} else if (this.options.startPathHash) {
			return this.options.startPathHash;
		} else {
			return this.lastDir();
		}
	},
	
	/**
	 * Get/set last opened directory
	 * 
	 * @param  String|undefined  dir hash
	 * @return String
	 */
	lastDir : function(hash) { 
		return this.options.rememberLastDir ? this.storage('lastdir', hash) : '';
	},
	
	/**
	 * Node for escape html entities in texts
	 * 
	 * @type jQuery
	 */
	_node : $('<span></span>'),
	
	/**
	 * Replace not html-safe symbols to html entities
	 * 
	 * @param  String  text to escape
	 * @return String
	 */
	escape : function(name) {
		return this._node.text(name).html().replace(/"/g, '&quot;').replace(/'/g, '&#039;');
	},
	
	/**
	 * Cleanup ajax data.
	 * For old api convert data into new api format
	 * 
	 * @param  String  command name
	 * @param  Object  data from backend
	 * @return Object
	 */
	normalize : function(data) {
		var self   = this,
			filter = function(file) { 
				var vid, targetOptions;
				
				if (file && file.hash && file.name && file.mime) {
					if (file.mime == 'application/x-empty') {
						file.mime = 'text/plain';
					}

					if (file.options) {
						self.optionsByHashes[file.hash] = file.options;
					}
					
					if (! file.phash || file.mime === 'directory') {
						// set options, tmbUrls for each volume
						if (file.volumeid) {
							vid = file.volumeid;
							
							if (self.isRoot(file)) {
								if (! self.volOptions[vid]) {
									self.volOptions[vid] = {};
								}
								
								targetOptions = self.volOptions[vid];
								
								if (file.options) {
									// >= v.2.1.14 has file.options
									targetOptions = $.extend(targetOptions, file.options);
								}
								
								// for compat <= v2.1.13
								if (file.disabled) {
									targetOptions.disabled = file.disabled;
								}
								if (file.tmbUrl) {
									targetOptions.tmbUrl = file.tmbUrl;
								}
								
								// set immediate properties
								$.each(self.optionProperties, function(i, k) {
									if (targetOptions[k]) {
										file[k] = targetOptions[k];
									}
								});
								self.roots[vid] = file.hash;
							}
							
							if (prevId !== vid) {
								prevId = vid;
								i18nFolderName = self.option('i18nFolderName', vid);
							}
						}
						
						// volume root i18n name
						if (! file.i18 && self.isRoot(file)) {
							name = 'volume_' + file.name,
							i18 = self.i18n(false, name);
	
							if (name !== i18) {
								file.i18 = i18;
							}
						}
						
						// i18nFolderName
						if (i18nFolderName && ! file.i18) {
							name = 'folder_' + file.name,
							i18 = self.i18n(false, name);
	
							if (name !== i18) {
								file.i18 = i18;
							}
						}
						
						if (self.leafRoots[file.hash]) {
							// has leaf root to `dirs: 1`
							if (! file.dirs) {
								file.dirs = 1;
							}
							// set ts
							$.each(self.leafRoots[file.hash], function() {
								var f = self.file(this);
								if (f && f.ts && (file.ts || 0) < f.ts) {
									file.ts = f.ts;
								}
							});
						}
					}
					
					return file;
				}
				return null;
			},
			name, i18, i18nFolderName, prevId;
		

		if (data.cwd) {
			if (data.cwd.volumeid && data.options && Object.keys(data.options).length) {
				self.volOptions[data.cwd.volumeid] = data.options;
			}
			data.cwd = filter(data.cwd);
		}
		if (data.files) {
			data.files = $.map(data.files, filter);
		} 
		if (data.tree) {
			data.tree = $.map(data.tree, filter);
		}
		if (data.added) {
			data.added = $.map(data.added, filter);
		}
		if (data.changed) {
			data.changed = $.map(data.changed, filter);
		}
		if (data.api) {
			data.init = true;
		}

		// merge options that apply only to cwd
		if (data.cwd && data.cwd.options && data.options) {
			$.extend(data.options, data.cwd.options);
		}
		
		return data;
	},
	
	/**
	 * Update sort options
	 *
	 * @param {String} sort type
	 * @param {String} sort order
	 * @param {Boolean} show folder first
	 */
	setSort : function(type, order, stickFolders, alsoTreeview) {
		this.storage('sortType', (this.sortType = this.sortRules[type] ? type : 'name'));
		this.storage('sortOrder', (this.sortOrder = /asc|desc/.test(order) ? order : 'asc'));
		this.storage('sortStickFolders', (this.sortStickFolders = !!stickFolders) ? 1 : '');
		this.storage('sortAlsoTreeview', (this.sortAlsoTreeview = !!alsoTreeview) ? 1 : '');
		this.trigger('sortchange');
	},
	
	_sortRules : {
		name : function(file1, file2) {
			return elFinder.prototype.naturalCompare(file1.i18 || file1.name, file2.i18 || file2.name);
		},
		size : function(file1, file2) { 
			var size1 = parseInt(file1.size) || 0,
				size2 = parseInt(file2.size) || 0;
				
			return size1 === size2 ? 0 : size1 > size2 ? 1 : -1;
		},
		kind : function(file1, file2) {
			return elFinder.prototype.naturalCompare(file1.mime, file2.mime);
		},
		date : function(file1, file2) { 
			var date1 = file1.ts || file1.date,
				date2 = file2.ts || file2.date;

			return date1 === date2 ? 0 : date1 > date2 ? 1 : -1
		},
		perm : function(file1, file2) { 
			var val = function(file) { return (file.write? 2 : 0) + (file.read? 1 : 0); },
				v1  = val(file1),
				v2  = val(file2);
			return v1 === v2 ? 0 : v1 > v2 ? 1 : -1
		},
		mode : function(file1, file2) { 
			var v1 = file1.mode || (file1.perm || ''),
				v2 = file2.mode || (file2.perm || '');
			return elFinder.prototype.naturalCompare(v1, v2);
		},
		owner : function(file1, file2) { 
			var v1 = file1.owner || '',
				v2 = file2.owner || '';
			return elFinder.prototype.naturalCompare(v1, v2);
		},
		group : function(file1, file2) { 
			var v1 = file1.group || '',
				v2 = file2.group || '';
			return elFinder.prototype.naturalCompare(v1, v2);
		}
	},
	
	/**
	 * Valid sort rule names
	 * 
	 * @type Array
	 */
	sorters : [],
	
	/**
	 * Compare strings for natural sort
	 *
	 * @param  String
	 * @param  String
	 * @return Number
	 */
	naturalCompare : function(a, b) {
		var self = elFinder.prototype.naturalCompare;
		if (typeof self.loc == 'undefined') {
			self.loc = (navigator.userLanguage || navigator.browserLanguage || navigator.language || 'en-US');
		}
		if (typeof self.sort == 'undefined') {
			if ('11'.localeCompare('2', self.loc, {numeric: true}) > 0) {
				// Native support
				if (window.Intl && window.Intl.Collator) {
					self.sort = new Intl.Collator(self.loc, {numeric: true}).compare;
				} else {
					self.sort = function(a, b) {
						return a.localeCompare(b, self.loc, {numeric: true});
					};
				}
			} else {
				/*
				 * Edited for elFinder (emulates localeCompare() by numeric) by Naoki Sawada aka nao-pon
				 */
				/*
				 * Huddle/javascript-natural-sort (https://github.com/Huddle/javascript-natural-sort)
				 */
				/*
				 * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
				 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
				 * http://opensource.org/licenses/mit-license.php
				 */
				self.sort = function(a, b) {
					var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
					sre = /(^[ ]*|[ ]*$)/g,
					dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
					hre = /^0x[0-9a-f]+$/i,
					ore = /^0/,
					syre = /^[\x01\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]/, // symbol first - (Naoki Sawada)
					i = function(s) { return self.sort.insensitive && (''+s).toLowerCase() || ''+s },
					// convert all to strings strip whitespace
					// first character is "_", it's smallest - (Naoki Sawada)
					x = i(a).replace(sre, '').replace(/^_/, "\x01") || '',
					y = i(b).replace(sre, '').replace(/^_/, "\x01") || '',
					// chunk/tokenize
					xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
					yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
					// numeric, hex or date detection
					xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
					yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
					oFxNcL, oFyNcL,
					locRes = 0;

					// first try and sort Hex codes or Dates
					if (yD) {
						if ( xD < yD ) return -1;
						else if ( xD > yD ) return 1;
					}
					// natural sorting through split numeric strings and default strings
					for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {

						// find floats not starting with '0', string or 0 if not defined (Clint Priest)
						oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
						oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;

						// handle numeric vs string comparison - number < string - (Kyle Adams)
						// but symbol first < number - (Naoki Sawada)
						if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
							if (isNaN(oFxNcL) && (typeof oFxNcL !== 'string' || ! oFxNcL.match(syre))) {
								return 1;
							} else if (typeof oFyNcL !== 'string' || ! oFyNcL.match(syre)) {
								return -1;
							}
						}

						// use decimal number comparison if either value is string zero
						if (parseInt(oFxNcL, 10) === 0) oFxNcL = 0;
						if (parseInt(oFyNcL, 10) === 0) oFyNcL = 0;

						// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
						if (typeof oFxNcL !== typeof oFyNcL) {
							oFxNcL += '';
							oFyNcL += '';
						}

						// use locale sensitive sort for strings when case insensitive
						// note: localeCompare interleaves uppercase with lowercase (e.g. A,a,B,b)
						if (self.sort.insensitive && typeof oFxNcL === 'string' && typeof oFyNcL === 'string') {
							locRes = oFxNcL.localeCompare(oFyNcL, self.loc);
							if (locRes !== 0) return locRes;
						}

						if (oFxNcL < oFyNcL) return -1;
						if (oFxNcL > oFyNcL) return 1;
					}
					return 0;
				};
				self.sort.insensitive = true;
			}
		}
		return self.sort(a, b);
	},
	
	/**
	 * Compare files based on elFinder.sort
	 *
	 * @param  Object  file
	 * @param  Object  file
	 * @return Number
	 */
	compare : function(file1, file2) {
		var self  = this,
			type  = self.sortType,
			asc   = self.sortOrder == 'asc',
			stick = self.sortStickFolders,
			rules = self.sortRules,
			sort  = rules[type],
			d1    = file1.mime == 'directory',
			d2    = file2.mime == 'directory',
			res;
			
		if (stick) {
			if (d1 && !d2) {
				return -1;
			} else if (!d1 && d2) {
				return 1;
			}
		}
		
		res = asc ? sort(file1, file2) : sort(file2, file1);
		
		return type !== 'name' && res === 0
			? res = asc ? rules.name(file1, file2) : rules.name(file2, file1)
			: res;
	},
	
	/**
	 * Sort files based on config
	 *
	 * @param  Array  files
	 * @return Array
	 */
	sortFiles : function(files) {
		return files.sort(this.compare);
	},
	
	/**
	 * Open notification dialog 
	 * and append/update message for required notification type.
	 *
	 * @param  Object  options
	 * @example  
	 * this.notify({
	 *    type : 'copy',
	 *    msg : 'Copy files', // not required for known types @see this.notifyType
	 *    cnt : 3,
	 *    hideCnt  : false,   // true for not show count
	 *    progress : 10,      // progress bar percents (use cnt : 0 to update progress bar)
	 *    cancel   : callback // callback function for cancel button
	 * })
	 * @return elFinder
	 */
	notify : function(opts) {
		var type     = opts.type,
			msg      = this.i18n((typeof opts.msg !== 'undefined')? opts.msg : (this.messages['ntf'+type] ? 'ntf'+type : 'ntfsmth')),
			ndialog  = this.ui.notify,
			notify   = ndialog.children('.elfinder-notify-'+type),
			button   = notify.children('div.elfinder-notify-cancel').children('button'),
			ntpl     = '<div class="elfinder-notify elfinder-notify-{type}"><span class="elfinder-dialog-icon elfinder-dialog-icon-{type}"></span><span class="elfinder-notify-msg">{msg}</span> <span class="elfinder-notify-cnt"></span><div class="elfinder-notify-progressbar"><div class="elfinder-notify-progress"></div></div><div class="elfinder-notify-cancel"></div></div>',
			delta    = opts.cnt,
			size     = (typeof opts.size != 'undefined')? parseInt(opts.size) : null,
			progress = (typeof opts.progress != 'undefined' && opts.progress >= 0) ? opts.progress : null,
			cancel   = opts.cancel,
			clhover  = 'ui-state-hover',
			close    = function() {
				notify._esc && $(document).off('keydown', notify._esc);
				notify.remove();
				!ndialog.children().length && ndialog.elfinderdialog('close');
			},
			cnt, total, prc;

		if (!type) {
			return this;
		}
		
		if (!notify.length) {
			notify = $(ntpl.replace(/\{type\}/g, type).replace(/\{msg\}/g, msg))
				.appendTo(ndialog)
				.data('cnt', 0);

			if (progress != null) {
				notify.data({progress : 0, total : 0});
			}

			if (cancel) {
				button = $('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text">'+this.i18n('btnCancel')+'</span></button>')
					.hover(function(e) { 
						$(this).toggleClass(clhover, e.type == 'mouseenter');
					});
				notify.children('div.elfinder-notify-cancel').append(button);
			}
		} else if (typeof opts.msg !== 'undefined') {
			notify.children('span.elfinder-notify-msg').html(msg);
		}

		cnt = delta + parseInt(notify.data('cnt'));
		
		if (cnt > 0) {
			if (cancel && button.length) {
				if ($.isFunction(cancel) || (typeof cancel === 'object' && cancel.promise)) {
					notify._esc = function(e) {
						if (e.type == 'keydown' && e.keyCode != $.ui.keyCode.ESCAPE) {
							return;
						}
						e.preventDefault();
						e.stopPropagation();
						close();
						if (cancel.promise) {
							if (cancel.xhr) {
								cancel.xhr.quiet = true;
								cancel.xhr.abort();
							}
							cancel.reject();
						} else {
							cancel(e);
						}
					};
					button.on('click', function(e) {
						notify._esc(e);
					});
					$(document).on('keydown.' + this.namespace, notify._esc);
				}
			}
			
			!opts.hideCnt && notify.children('.elfinder-notify-cnt').text('('+cnt+')');
			ndialog.is(':hidden') && ndialog.elfinderdialog('open', this);
			notify.data('cnt', cnt);
			
			if ((progress != null)
			&& (total = notify.data('total')) >= 0
			&& (prc = notify.data('progress')) >= 0) {

				total += size != null? size : delta;
				prc   += progress;
				(size == null && delta < 0) && (prc += delta * 100);
				notify.data({progress : prc, total : total});
				if (size != null) {
					prc *= 100;
					total = Math.max(1, total);
				}
				progress = parseInt(prc/total);
				
				notify.find('.elfinder-notify-progress')
					.animate({
						width : (progress < 100 ? progress : 100)+'%'
					}, 20);
			}
			
		} else {
			close();
		}
		
		return this;
	},
	
	/**
	 * Open confirmation dialog 
	 *
	 * @param  Object  options
	 * @example  
	 * this.confirm({
	 *    title : 'Remove files',
	 *    text  : 'Here is question text',
	 *    accept : {  // accept callback - required
	 *      label : 'Continue',
	 *      callback : function(applyToAll) { fm.log('Ok') }
	 *    },
	 *    cancel : { // cancel callback - required
	 *      label : 'Cancel',
	 *      callback : function() { fm.log('Cancel')}
	 *    },
	 *    reject : { // reject callback - optionally
	 *      label : 'No',
	 *      callback : function(applyToAll) { fm.log('No')}
	 *    },
	 *    buttons : [ // additional buttons callback - optionally
	 *      {
	 *        label : 'Btn1',
	 *        callback : function(applyToAll) { fm.log('Btn1')}
	 *      }
	 *    ],
	 *    all : true  // display checkbox "Apply to all"
	 * })
	 * @return elFinder
	 */
	confirm : function(opts) {
		var self     = this,
			complete = false,
			options = {
				cssClass  : 'elfinder-dialog-confirm',
				modal     : true,
				resizable : false,
				title     : this.i18n(opts.title || 'confirmReq'),
				buttons   : {},
				close     : function() { 
					!complete && opts.cancel.callback();
					$(this).elfinderdialog('destroy');
				}
			},
			apply = this.i18n('apllyAll'),
			label, checkbox;

		
		options.buttons[this.i18n(opts.accept.label)] = function() {
			opts.accept.callback(!!(checkbox && checkbox.prop('checked')))
			complete = true;
			$(this).elfinderdialog('close');
		};
		
		if (opts.reject) {
			options.buttons[this.i18n(opts.reject.label)] = function() {
				opts.reject.callback(!!(checkbox && checkbox.prop('checked')))
				complete = true;
				$(this).elfinderdialog('close');
			};
		}
		
		if (opts.buttons && opts.buttons.length > 0) {
			$.each(opts.buttons, function(i, v){
				options.buttons[self.i18n(v.label)] = function() {
					v.callback(!!(checkbox && checkbox.prop('checked')))
					complete = true;
					$(this).elfinderdialog('close');
				};
			});
		}
		
		options.buttons[this.i18n(opts.cancel.label)] = function() {
			$(this).elfinderdialog('close');
		};
		
		if (opts.all) {
			options.create = function() {
				var base = $('<div class="elfinder-dialog-confirm-applyall"></div>');
				checkbox = $('<input type="checkbox">');
				$(this).next().find('.ui-dialog-buttonset')
					.prepend(base.append($('<label>'+apply+'</label>').prepend(checkbox)));
			}
		}
		
		if (opts.optionsCallback && $.isFunction(opts.optionsCallback)) {
			opts.optionsCallback(options);
		}
		
		return this.dialog('<span class="elfinder-dialog-icon elfinder-dialog-icon-confirm"></span>' + this.i18n(opts.text), options);
	},
	
	/**
	 * Create unique file name in required dir
	 * 
	 * @param  String  file name
	 * @param  String  parent dir hash
	 * @param  String  glue
	 * @return String
	 */
	uniqueName : function(prefix, phash, glue) {
		var i = 0, ext = '', p, name;
		
		prefix = this.i18n(prefix); 
		phash = phash || this.cwd().hash;
		glue = (typeof glue === 'undefined')? ' ' : glue;

		if (p = prefix.match(/^(.+)(\.[^.]+)$/)) {
			ext    = p[2];
			prefix = p[1];
		}
		
		name   = prefix+ext;
		
		if (!this.fileByName(name, phash)) {
			return name;
		}
		while (i < 10000) {
			name = prefix + glue + (++i) + ext;
			if (!this.fileByName(name, phash)) {
				return name;
			}
		}
		return prefix + Math.random() + ext;
	},
	
	/**
	 * Return message translated onto current language
	 * Allowed accept HTML element that was wrapped in jQuery object
	 * To be careful to XSS vulnerability of HTML element Ex. You should use `fm.escape(file.name)`
	 *
	 * @param  String|Array  message[s]|Object jQuery
	 * @return String
	 **/
	i18n : function() {
		var self = this,
			messages = this.messages, 
			input    = [],
			ignore   = [], 
			message = function(m) {
				var file;
				if (m.indexOf('#') === 0) {
					if ((file = self.file(m.substr(1)))) {
						return file.name;
					}
				}
				return m;
			},
			i, j, m, escFunc, start = 0;
		
		if (arguments.length && arguments[0] === false) {
			escFunc = function(m){ return m; };
			start = 1;
		}
		for (i = start; i< arguments.length; i++) {
			m = arguments[i];
			
			if ($.isArray(m)) {
				for (j = 0; j < m.length; j++) {
					if (m[j] instanceof jQuery) {
						// jQuery object is HTML element
						input.push(m[j]);
					} else if (typeof m[j] !== 'undefined'){
						input.push(message('' + m[j]));
					}
				}
			} else if (m instanceof jQuery) {
				// jQuery object is HTML element
				input.push(m[j]);
			} else if (typeof m !== 'undefined'){
				input.push(message('' + m));
			}
		}
		
		for (i = 0; i < input.length; i++) {
			// dont translate placeholders
			if ($.inArray(i, ignore) !== -1) {
				continue;
			}
			m = input[i];
			if (typeof m == 'string') {
				// translate message
				m = messages[m] || (escFunc? escFunc(m) : self.escape(m));
				// replace placeholders in message
				m = m.replace(/\$(\d+)/g, function(match, placeholder) {
					placeholder = i + parseInt(placeholder);
					if (placeholder > 0 && input[placeholder]) {
						ignore.push(placeholder)
					}
					return escFunc? escFunc(input[placeholder]) : self.escape(input[placeholder]);
				});
			} else {
				// get HTML from jQuery object
				m = m.get(0).outerHTML;
			}

			input[i] = m;
		}

		return $.map(input, function(m, i) { return $.inArray(i, ignore) === -1 ? m : null; }).join('<br>');
	},
	
	/**
	 * Convert mimetype into css classes
	 * 
	 * @param  String  file mimetype
	 * @return String
	 */
	mime2class : function(mime) {
		var prefix = 'elfinder-cwd-icon-';
		
		mime = mime.split('/');
		
		return prefix+mime[0]+(mime[0] != 'image' && mime[1] ? ' '+prefix+mime[1].replace(/(\.|\+)/g, '-') : '');
	},
	
	/**
	 * Return localized kind of file
	 * 
	 * @param  Object|String  file or file mimetype
	 * @return String
	 */
	mime2kind : function(f) {
		var isObj = typeof(f) == 'object' ? true : false,
			mime  = isObj ? f.mime : f,
			kind;
		

		if (isObj && f.alias && mime != 'symlink-broken') {
			kind = 'Alias';
		} else if (this.kinds[mime]) {
			if (isObj && mime === 'directory' && (! f.phash || f.isroot)) {
				kind = 'Root';
			} else {
				kind = this.kinds[mime];
			}
		}
		if (! kind) {
			if (mime.indexOf('text') === 0) {
				kind = 'Text';
			} else if (mime.indexOf('image') === 0) {
				kind = 'Image';
			} else if (mime.indexOf('audio') === 0) {
				kind = 'Audio';
			} else if (mime.indexOf('video') === 0) {
				kind = 'Video';
			} else if (mime.indexOf('application') === 0) {
				kind = 'App';
			} else {
				kind = mime;
			}
		}
		
		return this.messages['kind'+kind] ? this.i18n('kind'+kind) : mime;
	},
	
	/**
	 * Return localized date
	 * 
	 * @param  Object  file object
	 * @return String
	 */
	formatDate : function(file, ts) {
		var self = this, 
			ts   = ts || file.ts, 
			i18  = self.i18,
			date, format, output, d, dw, m, y, h, g, i, s;

		if (self.options.clientFormatDate && ts > 0) {

			date = new Date(ts*1000);
			
			h  = date[self.getHours]();
			g  = h > 12 ? h - 12 : h;
			i  = date[self.getMinutes]();
			s  = date[self.getSeconds]();
			d  = date[self.getDate]();
			dw = date[self.getDay]();
			m  = date[self.getMonth]() + 1;
			y  = date[self.getFullYear]();
			
			format = ts >= this.yesterday 
				? this.fancyFormat 
				: this.dateFormat;

			output = format.replace(/[a-z]/gi, function(val) {
				switch (val) {
					case 'd': return d > 9 ? d : '0'+d;
					case 'j': return d;
					case 'D': return self.i18n(i18.daysShort[dw]);
					case 'l': return self.i18n(i18.days[dw]);
					case 'm': return m > 9 ? m : '0'+m;
					case 'n': return m;
					case 'M': return self.i18n(i18.monthsShort[m-1]);
					case 'F': return self.i18n(i18.months[m-1]);
					case 'Y': return y;
					case 'y': return (''+y).substr(2);
					case 'H': return h > 9 ? h : '0'+h;
					case 'G': return h;
					case 'g': return g;
					case 'h': return g > 9 ? g : '0'+g;
					case 'a': return h >= 12 ? 'pm' : 'am';
					case 'A': return h >= 12 ? 'PM' : 'AM';
					case 'i': return i > 9 ? i : '0'+i;
					case 's': return s > 9 ? s : '0'+s;
				}
				return val;
			});
			
			return ts >= this.yesterday
				? output.replace('$1', this.i18n(ts >= this.today ? 'Today' : 'Yesterday'))
				: output;
		} else if (file.date) {
			return file.date.replace(/([a-z]+)\s/i, function(a1, a2) { return self.i18n(a2)+' '; });
		}
		
		return self.i18n('dateUnknown');
	},
	
	/**
	 * Return css class marks file permissions
	 * 
	 * @param  Object  file 
	 * @return String
	 */
	perms2class : function(o) {
		var c = '';
		
		if (!o.read && !o.write) {
			c = 'elfinder-na';
		} else if (!o.read) {
			c = 'elfinder-wo';
		} else if (!o.write) {
			c = 'elfinder-ro';
		}
		
		if (o.type) {
			c += ' elfinder-' + this.escape(o.type);
		}
		
		return c;
	},
	
	/**
	 * Return localized string with file permissions
	 * 
	 * @param  Object  file
	 * @return String
	 */
	formatPermissions : function(f) {
		var p  = [];
			
		f.read && p.push(this.i18n('read'));
		f.write && p.push(this.i18n('write'));	

		return p.length ? p.join(' '+this.i18n('and')+' ') : this.i18n('noaccess');
	},
	
	/**
	 * Return formated file size
	 * 
	 * @param  Number  file size
	 * @return String
	 */
	formatSize : function(s) {
		var n = 1, u = 'b';
		
		if (s == 'unknown') {
			return this.i18n('unknown');
		}
		
		if (s > 1073741824) {
			n = 1073741824;
			u = 'GB';
		} else if (s > 1048576) {
			n = 1048576;
			u = 'MB';
		} else if (s > 1024) {
			n = 1024;
			u = 'KB';
		}
		s = s/n;
		return (s > 0 ? n >= 1048576 ? s.toFixed(2) : Math.round(s) : 0) +' '+u;
	},
	
	/**
	 * Return formated file mode by options.fileModeStyle
	 * 
	 * @param  String  file mode
	 * @param  String  format style
	 * @return String
	 */
	formatFileMode : function(p, style) {
		var i, o, s, b, sticy, suid, sgid, str, oct;
		
		if (!style) {
			style = this.options.fileModeStyle.toLowerCase();
		}
		p = $.trim(p);
		if (p.match(/[rwxs-]{9}$/i)) {
			str = p = p.substr(-9);
			if (style == 'string') {
				return str;;
			}
			oct = '';
			s = 0;
			for (i=0; i<7; i=i+3) {
				o = p.substr(i, 3);
				b = 0;
				if (o.match(/[r]/i)) {
					b += 4;
				}
				if (o.match(/[w]/i)) {
					b += 2;
				}
				if (o.match(/[xs]/i)) {
					if (o.match(/[xs]/)) {
						b += 1;
					}
					if (o.match(/[s]/i)) {
						if (i == 0) {
							s += 4;
						} else if (i == 3) {
							s += 2;
						}
					}
				}
				oct += b.toString(8);
			}
			if (s) {
				oct = s.toString(8) + oct;
			}
		} else {
			p = parseInt(p, 8);
			oct = p? p.toString(8) : '';
			if (!p || style == 'octal') {
				return oct;
			}
			o = p.toString(8);
			s = 0;
			if (o.length > 3) {
				o = o.substr(-4);
				s = parseInt(o.substr(0, 1), 8);
				o = o.substr(1);
			}
			sticy = ((s & 1) == 1); // not support
			sgid = ((s & 2) == 2);
			suid = ((s & 4) == 4);
			str = '';
			for(i=0; i<3; i++) {
				if ((parseInt(o.substr(i, 1), 8) & 4) == 4) {
					str += 'r';
				} else {
					str += '-';
				}
				if ((parseInt(o.substr(i, 1), 8) & 2) == 2) {
					str += 'w';
				} else {
					str += '-';
				}
				if ((parseInt(o.substr(i, 1), 8) & 1) == 1) {
					str += ((i==0 && suid)||(i==1 && sgid))? 's' : 'x';
				} else {
					str += '-';
				}
			}
		}
		if (style == 'both') {
			return str + ' (' + oct + ')';
		} else if (style == 'string') {
			return str;
		} else {
			return oct;
		}
	},
	
	/**
	 * Return boolean that uploadable MIME type into target folder
	 * 
	 * @param  String  mime    MIME type
	 * @param  String  target  target folder hash
	 * @return Bool
	 */
	uploadMimeCheck : function(mime, target) {
		target = target || this.cwd().hash;
		var res   = true, // default is allow
			mimeChecker = this.option('uploadMime', target),
			allow,
			deny,
			check = function(checker) {
				var ret = false;
				if (typeof checker === 'string' && checker.toLowerCase() === 'all') {
					ret = true;
				} else if ($.isArray(checker) && checker.length) {
					$.each(checker, function(i, v) {
						v = v.toLowerCase();
						if (v === 'all' || mime.indexOf(v) === 0) {
							ret = true;
							return false;
						}
					});
				}
				return ret;
			};
		if (mime && $.isPlainObject(mimeChecker)) {
			mime = mime.toLowerCase();
			allow = check(mimeChecker.allow);
			deny = check(mimeChecker.deny);
			if (mimeChecker.firstOrder === 'allow') {
				res = false; // default is deny
				if (! deny && allow === true) { // match only allow
					res = true;
				}
			} else {
				res = true; // default is allow
				if (deny === true && ! allow) { // match only deny
					res = false;
				}
			}
		}
		return res;
	},
	
	/**
	 * call chained sequence of async deferred functions
	 * 
	 * @param  Array   tasks async functions
	 * @return Object  jQuery.Deferred
	 */
	sequence : function(tasks) {
		var l = tasks.length,
			chain = function(task, idx) {
				++idx;
				if (tasks[idx]) {
					return chain(task.then(tasks[idx]), idx);
				} else {
					return task;
				}
			};
		if (l > 1) {
			return chain(tasks[0](), 0);
		} else {
			return tasks[0]();
		}
	},
	
	/**
	 * Reload contents of target URL for clear browser cache
	 * 
	 * @param  String  url target URL
	 * @return Object  jQuery.Deferred
	 */
	reloadContents : function(url) {
		var dfd = $.Deferred(),
			ifm;
		try {
			ifm = $('<iframe width="1" height="1" scrolling="no" frameborder="no" style="position:absolute; top:-1px; left:-1px" crossorigin="use-credentials">')
				.attr('src', url)
				.one('load', function() {
					var ifm = $(this);
					try {
						this.contentDocument.location.reload(true);
						ifm.one('load', function() {
							ifm.remove();
							dfd.resolve();
						});
					} catch(e) {
						ifm.attr('src', '').attr('src', url).one('load', function() {
							ifm.remove();
							dfd.resolve();
						});
					}
				})
				.appendTo('body');
		} catch(e) {
			ifm && ifm.remove();
			dfd.reject();
		}
		return dfd;
	},
	
	/**
	 * Make netmount option for OAuth2
	 * 
	 * @param  String   protocol
	 * @param  String   name
	 * @param  String   host
	 * @param  Boolean  noOffline
	 * 
	 * @return Object
	 */
	makeNetmountOptionOauth : function(protocol, name, host, noOffline) {
		return {
			vars : {},
			name : name,
			inputs: {
				offline  : $('<input type="checkbox">').on('change', function() {
					$(this).parents('table.elfinder-netmount-tb').find('select:first').trigger('change', 'reset');
				}),
				host     : $('<span><span class="elfinder-info-spinner"></span></span><input type="hidden">'),
				path     : $('<input type="text" value="root">'),
				user     : $('<input type="hidden">'),
				pass     : $('<input type="hidden">')
			},
			select: function(fm, ev, data){
				var f = this.inputs,
					oline = f.offline,
					f0 = $(f.host[0]),
					data = data || null;
				this.vars.mbtn = f.host.closest('.ui-dialog').children('.ui-dialog-buttonpane:first').find('button.elfinder-btncnt-0');
				if (! f0.data('inrequest')
						&& (f0.find('span.elfinder-info-spinner').length
							|| data === 'reset'
							|| (data === 'winfocus' && ! f0.siblings('span.elfinder-button-icon-reload').length))
							)
				{
					if (oline.parent().children().length === 1) {
						f.path.parent().prev().html(fm.i18n('folderId'));
						oline.attr('title', fm.i18n('offlineAccess'));
						oline.uniqueId().after($('<label></label>').attr('for', oline.attr('id')).html(' '+fm.i18n('offlineAccess')));
					}
					f0.data('inrequest', true).empty().addClass('elfinder-info-spinner')
						.parent().find('span.elfinder-button-icon').remove();
					fm.request({
						data : {cmd : 'netmount', protocol: protocol, host: host, user: 'init', options: {id: fm.id, offline: oline.prop('checked')? 1:0, pass: f.host[1].value}},
						preventDefault : true
					}).done(function(data){
						f0.removeClass("elfinder-info-spinner").html(data.body.replace(/\{msg:([^}]+)\}/g, function(whole,s1){return fm.i18n(s1, host);}));
					});
					noOffline && oline.closest('tr').hide();
				} else {
					oline.closest('tr')[(noOffline || f.user.val())? 'hide':'show']();
					f0.data('funcexpup') && f0.data('funcexpup')();
				}
				this.vars.mbtn[$(f.host[1]).val()? 'show':'hide']();
			},
			done: function(fm, data){
				var f = this.inputs,
					p = this.protocol,
					f0 = $(f.host[0]),
					f1 = $(f.host[1]),
					expires = '&nbsp;';
				
				noOffline && f.offline.closest('tr').hide();
				if (data.mode == 'makebtn') {
					f0.removeClass('elfinder-info-spinner').removeData('expires').removeData('funcexpup');
					f.host.find('input').hover(function(){$(this).toggleClass('ui-state-hover');});
					f1.val('');
					f.path.val('root').next().remove();
					f.user.val('');
					f.pass.val('');
					! noOffline && f.offline.closest('tr').show();
					this.vars.mbtn.hide();
				} else {
					if (data.expires) {
						expires = '()';
						f0.data('expires', data.expires);
					}
					f0.html(host + expires).removeClass('elfinder-info-spinner');
					if (data.expires) {
						f0.data('funcexpup', function() {
							var rem = Math.floor((f0.data('expires') - (+new Date()) / 1000) / 60);
							if (rem < 3) {
								f0.parent().children('.elfinder-button-icon-reload').click();
							} else {
								f0.text(f0.text().replace(/\(.*\)/, '('+fm.i18n(['minsLeft', rem])+')'));
								setTimeout(function() {
									if (f0.is(':visible')) {
										f0.data('funcexpup')();
									}
								}, 60000);
							}
						});
						f0.data('funcexpup')();
					}
					if (data.reset) {
						p.trigger('change', 'reset');
						return;
					}
					f0.parent().append($('<span class="elfinder-button-icon elfinder-button-icon-reload" title="'+fm.i18n('reAuth')+'">')
						.on('click', function() {
							f1.val('reauth');
							p.trigger('change', 'reset');
						}));
					f1.val(protocol);
					this.vars.mbtn.show();
					if (data.folders) {
						f.path.next().remove().end().after(
							$('<div></div>').append(
								$('<select class="ui-corner-all" style="max-width:200px;">').append(
									$($.map(data.folders, function(n,i){return '<option value="'+(i+'').trim()+'">'+fm.escape(n)+'</option>'}).join(''))
								).on('change', function(){f.path.val($(this).val());})
							)
						);
					}
					f.user.val('done');
					f.pass.val('done');
					f.offline.closest('tr').hide();
				}
				f0.removeData('inrequest');
			},
			fail: function(fm, err){
				$(this.inputs.host[0]).removeData('inrequest');
				this.protocol.trigger('change', 'reset');
			}
		};
	},
	
	/**
	 * Find cwd's nodes from files
	 * 
	 * @param  Array    files
	 * @param  Object   opts   {firstOnly: true|false}
	 */
	findCwdNodes : function(files, opts) {
		var self    = this,
			cwd     = this.getUI('cwd'),
			cwdHash = this.cwd().hash,
			newItem = $();
		
		opts = opts || {};
		
		$.each(files, function(i, f) {
			if (f.phash === cwdHash) {
				newItem = newItem.add(cwd.find('#'+self.cwdHash2Id(f.hash)));
				if (opts.firstOnly) {
					return false;
				}
			}
		});
		
		return newItem;
	},
	
	/**
	 * Convert from relative URL to abstract URL based on current URL
	 * 
	 * @param  String  URL
	 * @return String
	 */
	convAbsUrl : function(url) {
		if (url.match(/^http/i)) {
			return url;
		}
		if (url.substr(0,2) === '//') {
			return window.location.protocol + url;
		}
		var root = window.location.protocol + '//' + window.location.host,
			reg  = /[^\/]+\/\.\.\//,
			ret;
		if (url.substr(0, 1) === '/') {
			ret = root + url;
		} else {
			ret = root + window.location.pathname.replace(/\/[^\/]+$/, '/') + url;
		}
		ret = ret.replace('/./', '/');
		while(reg.test(ret)) {
			ret = ret.replace(reg, '');
		}
		return ret;
	},
	
	navHash2Id : function(hash) {
		return this.navPrefix + hash;
	},
	
	navId2Hash : function(id) {
		return typeof(id) == 'string' ? id.substr(this.navPrefix.length) : false;
	},
	
	cwdHash2Id : function(hash) {
		return this.cwdPrefix + hash;
	},
	
	cwdId2Hash : function(id) {
		return typeof(id) == 'string' ? id.substr(this.cwdPrefix.length) : false;
	},
	
	isInWindow : function(elem, nochkHide) {
		if (! nochkHide && elem.is(':hidden')) {
			return false;
		}
		var elm, rect;
		if (! (elm = elem.get(0))) {
			return false;
		}
		rect = elm.getBoundingClientRect();
		return document.elementFromPoint(rect.left, rect.top)? true : false;
	},
	
	/**
	 * Load JavaScript files
	 * 
	 * @param  Array    urls      to load JavaScript file URLs
	 * @param  Function callback  call back function on script loaded
	 * @param  Object   opts      Additional options to $.ajax OR {loadType: 'tag'} to load by script tag
	 * @param  Object   check     { obj: (Object)ParentObject, name: (String)"Attribute name", timeout: (Integer)milliseconds }
	 * @return elFinder
	 */
	loadScript : function(urls, callback, opts, check) {
		var defOpts = {
				dataType : 'script',
				cache    : true
			},
			success = null;
		if ($.isFunction(callback)) {
			success = function() {
				if (check) {
					if (typeof check.obj[check.name] === 'undefined') {
						var cnt = check.timeout? (check.timeout / 10) : 1000; // timeout 10 secs
						var fi = setInterval(function() {
							if (--cnt > 0 && typeof check.obj[check.name] !== 'undefined') {
								clearInterval(fi);
								callback();
							}
						}, 10);
					} else {
						callback();
					}
				} else {
					callback();
				}
			}
		}
		if (opts && opts.loadType === 'tag') {
			$.each(urls, function(i, url) {
				$('head').append($('<script defer="defer">').attr('src', url));
			});
			success();
		} else {
			opts = $.isPlainObject(opts)? $.extend(defOpts, opts) : defOpts;
			(function appendScript() {
				$.ajax($.extend(opts, {
					url: urls.shift(),
					success: urls.length? appendScript : success
				}));
			})();
		}
		return this;
	},
	
	/**
	 * Load CSS files
	 * 
	 * @param  Array    to load CSS file URLs
	 * @return elFinder
	 */
	loadCss : function(urls) {
		var self = this;
		if (typeof urls === 'string') {
			urls = [ urls ];
		}
		$.each(urls, function(i, url) {
			url = self.convAbsUrl(url).replace(/^https?:/i, '');
			if (! $("head > link[href='+url+']").length) {
				$('head').append('<link rel="stylesheet" type="text/css" href="' + url + '">');
			}
		});
		return this;
	},
	
	log : function(m) { window.console && window.console.log && window.console.log(m); return this; },
	
	debug : function(type, m) {
		var d = this.options.debug;

		if (d == 'all' || d === true || ($.isArray(d) && $.inArray(type, d) != -1)) {
			window.console && window.console.log && window.console.log('elfinder debug: ['+type+'] ['+this.id+']', m);
		} 
		
		if (type === 'backend-debug') {
			this.trigger('backenddebug', m);
		}
		
		return this;
	},
	time : function(l) { window.console && window.console.time && window.console.time(l); },
	timeEnd : function(l) { window.console && window.console.timeEnd && window.console.timeEnd(l); },
	//=========================================================================
	//Efw adds some funtions to elfinder object.
	setReadOnly : function(readonly){
		this.options.customData.readonly=readonly;
		this.options.customData.id=this.id;
		this.exec("reload");
	},
	setHome : function(home,selection){
		this.options.customData.home=home;
		this.options.customData.id=this.id;
		this.options.customData.selection=selection;
		var id=this.id;
		$("#"+id).after("<div id=\"_after_"+id+"\"></div>");
		$("#"+id).remove();
		$("#_after_"+id).after("<div id=\""+id+"\"></div>");
		window[id]=$("#"+id).elfinder(this.options).elfinder("instance");
	},
	setHeight : function(height){
		this.options.height=height;
		this.resize(this.options.width,this.options.height);
	},
	setWidth : function(width){
		this.options.width=width;
		this.resize(this.options.width,this.options.height);
	},
	//=========================================================================
};

/**
 * for conpat ex. ie8...
 *
 * Object.keys() - JavaScript | MDN
 * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 */
if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')

			var result = []

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) result.push(prop)
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
				}
			}
			return result
		}
	})()
};


/*
 * File: /js/elFinder.version.js
 */

/**
 * Application version
 *
 * @type String
 **/
elFinder.prototype.version = '2.1.20';



/*
 * File: /js/jquery.elfinder.js
 */

/*** jQuery UI droppable performance tune for elFinder ***/
(function(){
if ($.ui) {
	if ($.ui.ddmanager) {
		var origin = $.ui.ddmanager.prepareOffsets;
		$.ui.ddmanager.prepareOffsets = function( t, event ) {
			var isOutView = function(elem) {
				if (elem.is(':hidden')) {
					return true;
				}
				var rect = elem[0].getBoundingClientRect();
				return document.elementFromPoint(rect.left, rect.top)? false : true;
			}
			
			if (event.type === 'mousedown' || t.options.elfRefresh) {
				var i, d,
				m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
				l = m.length;
				for ( i = 0; i < l; i++ ) {
					d = m[ i ];
					if (d.options.autoDisable && (!d.options.disabled || d.options.autoDisable > 1)) {
						d.options.disabled = isOutView(d.element);
						d.options.autoDisable = d.options.disabled? 2 : 1;
					}
				}
			}
			
			// call origin function
			return origin( t, event );
		};
	}
}
})();

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 */
(function ($) {

  // Detect touch support
  $.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$.support.touch) {
	return;
  }

  var mouseProto = $.ui.mouse.prototype,
	  _mouseInit = mouseProto._mouseInit,
	  _mouseDestroy = mouseProto._mouseDestroy,
	  touchHandled,
	  posX, posY;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

	// Ignore multi-touch events
	if (event.originalEvent.touches.length > 1) {
	  return;
	}

	if (! $(event.currentTarget).hasClass('touch-punch-keep-default')) {
		event.preventDefault();
	}

	var touch = event.originalEvent.changedTouches[0],
		simulatedEvent = document.createEvent('MouseEvents');
	
	// Initialize the simulated mouse event using the touch event's coordinates
	simulatedEvent.initMouseEvent(
	  simulatedType,	// type
	  true,				// bubbles					  
	  true,				// cancelable				  
	  window,			// view						  
	  1,				// detail					  
	  touch.screenX,	// screenX					  
	  touch.screenY,	// screenY					  
	  touch.clientX,	// clientX					  
	  touch.clientY,	// clientY					  
	  false,			// ctrlKey					  
	  false,			// altKey					  
	  false,			// shiftKey					  
	  false,			// metaKey					  
	  0,				// button					  
	  null				// relatedTarget			  
	);

	// Dispatch the simulated event to the target element
	event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

	var self = this;

	// Ignore the event if another widget is already being handled
	if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
	  return;
	}

	// Track element position to avoid "false" move
	posX = event.originalEvent.changedTouches[0].screenX.toFixed(0);
	posY = event.originalEvent.changedTouches[0].screenY.toFixed(0);

	// Set the flag to prevent other widgets from inheriting the touch event
	touchHandled = true;

	// Track movement to determine if interaction was a click
	self._touchMoved = false;

	// Simulate the mouseover event
	simulateMouseEvent(event, 'mouseover');

	// Simulate the mousemove event
	simulateMouseEvent(event, 'mousemove');

	// Simulate the mousedown event
	simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

	// Ignore event if not handled
	if (!touchHandled) {
	  return;
	}

	// Ignore if it's a "false" move (position not changed)
	var x = event.originalEvent.changedTouches[0].screenX.toFixed(0);
	var y = event.originalEvent.changedTouches[0].screenY.toFixed(0);
	// Ignore if it's a "false" move (position not changed)
	if (Math.abs(posX - x) <= 2 && Math.abs(posY - y) <= 2) {
		return;
	}

	// Interaction was not a click
	this._touchMoved = true;

	// Simulate the mousemove event
	simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

	// Ignore event if not handled
	if (!touchHandled) {
	  return;
	}

	// Simulate the mouseup event
	simulateMouseEvent(event, 'mouseup');

	// Simulate the mouseout event
	simulateMouseEvent(event, 'mouseout');

	// If the touch interaction did not move, it should trigger a click
	if (!this._touchMoved) {

	  // Simulate the click event
	  simulateMouseEvent(event, 'click');
	}

	// Unset the flag to allow other widgets to inherit the touch event
	touchHandled = false;
	this._touchMoved = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {
	
	var self = this;

	if (self.element.hasClass('touch-punch')) {
		// Delegate the touch handlers to the widget's element
		self.element.bind({
		  touchstart: $.proxy(self, '_touchStart'),
		  touchmove: $.proxy(self, '_touchMove'),
		  touchend: $.proxy(self, '_touchEnd')
		});
	}

	// Call the original $.ui.mouse init method
	_mouseInit.call(self);
  };

  /**
   * Remove the touch event handlers
   */
  mouseProto._mouseDestroy = function () {
	
	var self = this;

	if (self.element.hasClass('touch-punch')) {
		// Delegate the touch handlers to the widget's element
		self.element.unbind({
		  touchstart: $.proxy(self, '_touchStart'),
		  touchmove: $.proxy(self, '_touchMove'),
		  touchend: $.proxy(self, '_touchEnd')
		});
	}

	// Call the original $.ui.mouse destroy method
	_mouseDestroy.call(self);
  };

})(jQuery);

$.fn.elfinder = function(o) {
	
	if (o == 'instance') {
		return this.getElFinder();
	}
	
	return this.each(function() {
		
		var cmd = typeof(o) == 'string' ? o : '';
		if (!this.elfinder) {
			new elFinder(this, typeof(o) == 'object' ? o : {});
		}
		
		switch(cmd) {
			case 'close':
			case 'hide':
				this.elfinder.hide();
				break;
				
			case 'open':
			case 'show':
				this.elfinder.show();
				break;
				
			case'destroy':
				this.elfinder.destroy();
				break;
		}
		
	})
};

$.fn.getElFinder = function() {
	var instance;
	
	this.each(function() {
		if (this.elfinder) {
			instance = this.elfinder;
			return false;
		}
	});
	
	return instance;
};

$.fn.elfUiWidgetInstance = function(name) {
	try {
		return this[name]('instance');
	} catch(e) {
		// fallback for jQuery UI < 1.11
		var data = this.data('ui-' + name);
		if (data && typeof data === 'object' && data.widgetFullName === 'ui-' + name) {
			return data;
		}
		return null;
	}
};


/*
 * File: /js/elFinder.options.js
 */

/**
 * Default elFinder config
 *
 * @type  Object
 * @autor Dmitry (dio) Levashov
 */
elFinder.prototype._options = {
	/**
	 * Connector url. Required!
	 *
	 * @type String
	 */
	url : '',

	/**
	 * Ajax request type.
	 *
	 * @type String
	 * @default "get"
	 */
	requestType : 'get',

	/**
	 * Transport to send request to backend.
	 * Required for future extensions using websockets/webdav etc.
	 * Must be an object with "send" method.
	 * transport.send must return $.Deferred() object
	 *
	 * @type Object
	 * @default null
	 * @example
	 *  transport : {
	 *    init : function(elfinderInstance) { },
	 *    send : function(options) {
	 *      var dfrd = $.Deferred();
	 *      // connect to backend ...
	 *      return dfrd;
	 *    },
	 *    upload : function(data) {
	 *      var dfrd = $.Deferred();
	 *      // upload ...
	 *      return dfrd;
	 *    }
	 *    
	 *  }
	 **/
	transport : {},

	/**
	 * URL to upload file to.
	 * If not set - connector URL will be used
	 *
	 * @type String
	 * @default  ''
	 */
	urlUpload : '',

	/**
	 * Allow to drag and drop to upload files
	 *
	 * @type Boolean|String
	 * @default  'auto'
	 */
	dragUploadAllow : 'auto',
	
	/**
	 * Confirmation dialog displayed at the time of overwriting upload
	 * 
	 * @type Boolean
	 * @default true
	 */
	overwriteUploadConfirm : true,
	
	/**
	 * Max size of chunked data of file upload
	 * 
	 * @type Number
	 * @default  10485760(10MB)
	 */
	uploadMaxChunkSize : 10485760,
	
	/**
	 * Regular expression of file name to exclude when uploading folder
	 * 
	 * @type Object
	 * @default { win: /^(?:desktop\.ini|thumbs\.db)$/i, mac: /^\.ds_store$/i }
	 */
	folderUploadExclude : {
		win: /^(?:desktop\.ini|thumbs\.db)$/i,
		mac: /^\.ds_store$/i
	},
	
	/**
	 * Timeout for upload using iframe
	 *
	 * @type Number
	 * @default  0 - no timeout
	 */
	iframeTimeout : 0,
	
	/**
	 * Data to append to all requests and to upload files
	 *
	 * @type Object
	 * @default  {}
	 */
	customData : {},
	
	/**
	 * Event listeners to bind on elFinder init
	 *
	 * @type Object
	 * @default  {}
	 */
	handlers : {},

	/**
	 * Any custom headers to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 */
	customHeaders : {},

	/**
	 * Any custom xhrFields to send across every ajax request
	 *
	 * @type Object
	 * @default {}
	 */
	xhrFields : {},

	/**
	 * Interface language
	 *
	 * @type String
	 * @default "en"
	 */
	lang : 'en',

	/**
	 * Auto load required CSS
	 * `false` to disable this function or
	 * CSS URL Array to load additional CSS files
	 * 
	 * @type Boolean|Array
	 * @default true
	 */
	cssAutoLoad : true,
	
	/**
	 * Additional css class for filemanager node.
	 *
	 * @type String
	 */
	cssClass : '',

	/**
	 * Active commands list. '*' means all of the commands that have been load.
	 * If some required commands will be missed here, elFinder will add its
	 *
	 * @type Array
	 */
	commands : ['*'],
	// Available commands list
	//commands : [
	//	'archive', 'back', 'chmod', 'colwidth', 'copy', 'cut', 'download', 'duplicate',
	//	'edit', 'extract', 'forward', 'fullscreen', 'getfile', 'help', 'home', 'info',
	//	'mkdir', 'mkfile', 'netmount', 'netunmount', 'open', 'opendir', 'paste', 'places',
	//	'quicklook', 'reload', 'rename', 'resize', 'rm', 'search', 'sort', 'up', 'upload', 'view'
	//],
	
	/**
	 * Commands options.
	 *
	 * @type Object
	 **/
	commandsOptions : {
		// // configure shortcuts of any command
		// // add `shortcuts` property into each command
		// any_command_name : {
		// 	shortcuts : [] // for disable this command's shortcuts
		// },
		// any_command_name : {
		// 	shortcuts : function(fm, shortcuts) {
		// 		// for add `CTRL + E` for this command action
		// 		shortcuts[0]['pattern'] += ' ctrl+e';
		// 		return shortcuts;
		// 	}
		// },
		// any_command_name : {
		// 	shortcuts : function(fm, shortcuts) {
		// 		// for full customize of this command's shortcuts
		// 		return [ { pattern: 'ctrl+e ctrl+down numpad_enter' + (fm.OS != 'mac' && ' enter') } ];
		// 	}
		// },
		// "getfile" command options.
		getfile : {
			onlyURL  : false,
			// allow to return multiple files info
			multiple : false,
			// allow to return filers info
			folders  : false,
			// action after callback (""/"close"/"destroy")
			oncomplete : '',
			// get path before callback call
			getPath    : true, 
			// get image sizes before callback call
			getImgSize : false
		},
		open : {
			// HTTP method that request to the connector when item URL is not valid URL.
			// If you set to "get" will be displayed request parameter in the browser's location field
			// so if you want to conceal its parameters should be given "post".
			// Nevertheless, please specify "get" if you want to enable the partial request by HTTP Range header.
			method : 'post'
		},
		// "upload" command options.
		upload : {
			// Open elFinder upload dialog: 'button' OR Open system OS upload dialog: 'uploadbutton'
			ui : 'button'
		},
		// "download" command options.
		download : {
			maxRequests : 10
		},
		// "quicklook" command options.
		quicklook : {
			autoplay : true,
			width    : 450,
			height   : 300,
			// MIME types to use Google Docs online viewer
			// Example ['application/pdf', 'image/tiff', 'application/vnd.ms-office', 'application/msword', 'application/vnd.ms-word', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
			googleDocsMimes : []
		},
		// "quicklook" command options.
		edit : {
			// list of allowed mimetypes to edit
			// if empty - any text files can be edited
			mimes : [],
			// edit files in wysisyg's
			editors : [
				// {
				// 	/**
				// 	 * files mimetypes allowed to edit in current wysisyg
				// 	 * @type  Array
				// 	 */
				// 	mimes : ['text/html'], 
				// 	/**
				// 	 * Called when "edit" dialog loaded.
				// 	 * Place to init wysisyg.
				// 	 * Can return wysisyg instance
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @return Object      editor instance|jQuery.Deferred(return instance on resolve())
				// 	 */
				// 	load : function(textarea) { },
				// 	/**
				// 	 * Called before "edit" dialog closed.
				// 	 * Place to destroy wysisyg instance.
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @return void
				// 	 */
				// 	close : function(textarea, instance) { },
				// 	/**
				// 	 * Called before file content send to backend.
				// 	 * Place to update textarea content if needed.
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @return void
				// 	 */
				// 	save : function(textarea, instance) {},
				// 	/**
				// 	 * Called after load() or save().
				// 	 * Set focus to wysisyg editor.
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @return void
				// 	 */
				// 	focus : function(textarea, instance) {}
				// 	/**
				// 	 * Called after dialog resized..
				// 	 *
				// 	 * @param  DOMElement  textarea node
				// 	 * @param  Object      wysisyg instance (if was returned by "load" callback)
				// 	 * @param  Object      resize event object
				// 	 * @param  Object      data object
				// 	 * @return void
				// 	 */
				// 	resize : function(textarea, instance, event, data) {}
				// 
				// }
			],
			// Character encodings of select box
			encodings : ['Big5', 'Big5-HKSCS', 'Cp437', 'Cp737', 'Cp775', 'Cp850', 'Cp852', 'Cp855', 'Cp857', 'Cp858', 
				'Cp862', 'Cp866', 'Cp874', 'EUC-CN', 'EUC-JP', 'EUC-KR', 'ISO-2022-CN', 'ISO-2022-JP', 'ISO-2022-KR', 
				'ISO-8859-1', 'ISO-8859-2', 'ISO-8859-3', 'ISO-8859-4', 'ISO-8859-5', 'ISO-8859-6', 'ISO-8859-7', 
				'ISO-8859-8', 'ISO-8859-9', 'ISO-8859-13', 'ISO-8859-15', 'KOI8-R', 'KOI8-U', 'Shift-JIS', 
				'Windows-1250', 'Windows-1251', 'Windows-1252', 'Windows-1253', 'Windows-1254', 'Windows-1257']
		},
		search : {
			// Incremental search from the current view
			incsearch : {
				enable : true, // is enable true or false
				minlen : 1,    // minimum number of characters
				wait   : 500   // wait milliseconds
			}
		},
		// "info" command options.
		info : {
			nullUrlDirLinkSelf : true,
			custom : {
				// /**
				//  * Example of custom info `desc`
				//  */
				// desc : {
				// 	/**
				// 	 * Lable (require)
				// 	 * It is filtered by the `fm.i18n()`
				// 	 * 
				// 	 * @type String
				// 	 */
				// 	label : 'Description',
				// 	
				// 	/**
				// 	 * Template (require)
				// 	 * `{id}` is replaced in dialog.id
				// 	 * 
				// 	 * @type String
				// 	 */
				// 	tpl : '<div class="elfinder-info-desc"><span class="elfinder-info-spinner"></span></div>',
				// 	
				// 	/**
				// 	 * Restricts to mimetypes (optional)
				// 	 * Exact match or category match
				// 	 * 
				// 	 * @type Array
				// 	 */
				// 	mimes : ['text', 'image/jpeg', 'directory'],
				// 	
				// 	/**
				// 	 * Restricts to file.hash (optional)
				// 	 * 
				// 	 * @ type Regex
				// 	 */
				// 	hashRegex : /^l\d+_/,
				// 
				// 	/**
				// 	 * Request that asks for the description and sets the field (optional)
				// 	 * 
				// 	 * @type Function
				// 	 */
				// 	action : function(file, fm, dialog) {
				// 		fm.request({
				// 		data : { cmd : 'desc', target: file.hash },
				// 			preventDefault: true,
				// 		})
				// 		.fail(function() {
				// 			dialog.find('div.elfinder-info-desc').html(fm.i18n('unknown'));
				// 		})
				// 		.done(function(data) {
				// 			dialog.find('div.elfinder-info-desc').html(data.desc);
				// 		});
				// 	}
				// }
			}
		},
		mkdir: {
			// Enable automatic switching function ["New Folder" / "Into New Folder"] of toolbar buttton
			intoNewFolderToolbtn: false,
		},
		resize: {
			// defalt status of snap to 8px grid of the jpeg image ("enable" or "disable")
			grid8px : 'enable'
		},
		help : {view : ['about', 'shortcuts', 'help', 'debug']}
	},
	
	/**
	 * Callback for "getfile" commands.
	 * Required to use elFinder with WYSIWYG editors etc..
	 *
	 * @type Function
	 * @default null (command not active)
	 */
	getFileCallback : null,
	
	/**
	 * Default directory view. icons/list
	 *
	 * @type String
	 * @default "icons"
	 */
	defaultView : 'icons',
	
	/**
	 * Hash of default directory path to open
	 * 
	 * If you want to find the hash in Javascript
	 * can be obtained with the following code. (In the case of a standard hashing method)
	 * 
	 * var volumeId = 'l1_'; // volume id
	 * var path = 'path/to/target'; // without root path
	 * //var path = 'path\\to\\target'; // use \ on windows server
	 * var hash = volumeId + btoa(path).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '.').replace(/\.+$/, '');
	 * 
	 * @type String
	 * @default ""
	 */
	startPathHash : '',

	/**
	 * Emit a sound when a file is deleted
	 * Sounds are in sounds/ folder
	 * 
	 * @type Boolean
	 * @default true
	 */
	sound : true,
	
	/**
	 * UI plugins to load.
	 * Current dir ui and dialogs loads always.
	 * Here set not required plugins as folders tree/toolbar/statusbar etc.
	 *
	 * @type Array
	 * @default ['toolbar', 'tree', 'path', 'stat']
	 * @full ['toolbar', 'places', 'tree', 'path', 'stat']
	 */
	ui : ['toolbar', 'tree', 'path', 'stat'],
	
	/**
	 * Some UI plugins options.
	 * @type Object
	 */
	uiOptions : {
		// toolbar configuration
		toolbar : [
			['back', 'forward'],
			// ['netmount'],
			// ['reload'],
			// ['home', 'up'],
			['mkdir', 'mkfile', 'upload'],
			//['open', 'download', 'getfile'],
			['info', 'chmod'],
			['quicklook'],
			['copy', 'cut', 'paste'],
			['rm'],//it is remove not rename
			['duplicate', 'rename', 'resize'],//edit
			//['extract', 'archive'],
			//['search'],
			['view', 'sort'],
			['help'],
			['fullscreen'],
			// extra options
			{
				// also displays the text label on the button (true / false)
				displayTextLabel: false,
				// Exclude `displayTextLabel` setting UA type
				labelExcludeUA: ['Mobile'],
				// auto hide on initial open
				autoHideUA: ['Mobile']
			}
		],
		// directories tree options
		tree : {
			// expand current root on init
			openRootOnLoad : true,
			// expand current work directory on open
			openCwdOnOpen  : true,
			// auto load current dir parents
			syncTree : true
			// ,
			// /**
			//  * Add CSS class name to navbar directories (optional)
			//  * see: https://github.com/Studio-42/elFinder/pull/1061,
			//  *      https://github.com/Studio-42/elFinder/issues/1231
			//  * 
			//  * @type Function
			//  */
			// getClass: function(dir) {
			// 	// e.g. This adds the directory's name (lowercase) with prefix as a CSS class
			// 	return 'elfinder-tree-' + dir.name.replace(/[ "]/g, '').toLowerCase();
			// }
		},
		// navbar options
		navbar : {
			minWidth : 150,
			maxWidth : 500,
			// auto hide on initial open
			autoHideUA: [] // e.g. ['Mobile']
		},
		cwd : {
			// display parent folder with ".." name :)
			oldSchool : false,
			
			// fm.UA types array to show item select checkboxes e.g. ['All'] or ['Mobile'] etc. default: ['Touch']
			showSelectCheckboxUA : ['Touch'],
			
			// file info columns displayed
			listView : {
				// name is always displayed, cols are ordered
				// e.g. ['perm', 'date', 'size', 'kind', 'owner', 'group', 'mode']
				// mode: 'mode'(by `fileModeStyle` setting), 'modestr'(rwxr-xr-x) , 'modeoct'(755), 'modeboth'(rwxr-xr-x (755))
				// 'owner', 'group' and 'mode', It's necessary set volume driver option "statOwner" to `true`
				// for custom, characters that can be used in the name is `a-z0-9_`
				columns : ['perm', 'date', 'size', 'kind'],
				// override this if you want custom columns name
				// example
				// columnsCustomName : {
				//		date : 'Last modification',
				// 		kind : 'Mime type'
				// }
				columnsCustomName : {},
				// fixed list header colmun
				fixedHeader : true
			}

			// /**
			//  * Add CSS class name to cwd directories (optional)
			//  * see: https://github.com/Studio-42/elFinder/pull/1061,
			//  *      https://github.com/Studio-42/elFinder/issues/1231
			//  * 
			//  * @type Function
			//  */
			// ,
			// getClass: function(file) {
			// 	// e.g. This adds the directory's name (lowercase) with prefix as a CSS class
			// 	return 'elfinder-cwd-' + file.name.replace(/[ "]/g, '').toLowerCase();
			//}
			
			//,
			//// Template placeholders replacement rules for overwrite. see ui/cwd.js replacement
			//replacement : {
			//	tooltip : function(f, fm) {
			//		var list = fm.viewType == 'list', // current view type
			//			query = fm.searchStatus.state == 2, // is in search results
			//			title = fm.formatDate(f) + (f.size > 0 ? ' ('+fm.formatSize(f.size)+')' : ''),
			//			info  = '';
			//		if (query && f.path) {
			//			info = fm.escape(f.path.replace(/\/[^\/]*$/, ''));
			//		} else {
			//			info = f.tooltip? fm.escape(f.tooltip).replace(/\r/g, '&#13;') : '';
			//		}
			//		if (list) {
			//			info += (info? '&#13;' : '') + fm.escape(f.name);
			//		}
			//		return info? info + '&#13;' + title : title;
			//	}
			//}
		}
	},

	/**
	 * Display only required files by types
	 *
	 * @type Array
	 * @default []
	 * @example
	 *  onlyMimes : ["image"] - display all images
	 *  onlyMimes : ["image/png", "application/x-shockwave-flash"] - display png and flash
	 */
	onlyMimes : [],

	/**
	 * Custom files sort rules.
	 * All default rules (name/size/kind/date/perm/mode/owner/group) set in elFinder._sortRules
	 *
	 * @type {Object}
	 * @example
	 * sortRules : {
	 *   name : function(file1, file2) { return file1.name.toLowerCase().localeCompare(file2.name.toLowerCase()); }
	 * }
	 */
	sortRules : {},

	/**
	 * Default sort type.
	 *
	 * @type {String}
	 */
	sortType : 'name',
	
	/**
	 * Default sort order.
	 *
	 * @type {String}
	 * @default "asc"
	 */
	sortOrder : 'asc',
	
	/**
	 * Display folders first?
	 *
	 * @type {Boolean}
	 * @default true
	 */
	sortStickFolders : true,
	
	/**
	 * Sort also applies to the treeview
	 *
	 * @type {Boolean}
	 * @default false
	 */
	sortAlsoTreeview : false,
	
	/**
	 * If true - elFinder will formating dates itself, 
	 * otherwise - backend date will be used.
	 *
	 * @type Boolean
	 */
	clientFormatDate : true,
	
	/**
	 * Show UTC dates.
	 * Required set clientFormatDate to true
	 *
	 * @type Boolean
	 */
	UTCDate : false,
	
	/**
	 * File modification datetime format.
	 * Value from selected language data  is used by default.
	 * Set format here to overwrite it.
	 *
	 * @type String
	 * @default  ""
	 */
	dateFormat : '',
	
	/**
	 * File modification datetime format in form "Yesterday 12:23:01".
	 * Value from selected language data is used by default.
	 * Set format here to overwrite it.
	 * Use $1 for "Today"/"Yesterday" placeholder
	 *
	 * @type String
	 * @default  ""
	 * @example "$1 H:m:i"
	 */
	fancyDateFormat : '',
	
	/**
	 * Style of file mode at cwd-list, info dialog
	 * 'string' (ex. rwxr-xr-x) or 'octal' (ex. 755) or 'both' (ex. rwxr-xr-x (755))
	 * 
	 * @type {String}
	 * @default 'both'
	 */
	fileModeStyle : 'both',
	
	/**
	 * elFinder width
	 *
	 * @type String|Number
	 * @default  "auto"
	 */
	width : 'auto',
	
	/**
	 * elFinder height
	 *
	 * @type Number
	 * @default  400
	 */
	height : 400,
	
	/**
	 * Make elFinder resizable if jquery ui resizable available
	 *
	 * @type Boolean
	 * @default  true
	 */
	resizable : true,
	
	/**
	 * Timeout before open notifications dialogs
	 *
	 * @type Number
	 * @default  500 (.5 sec)
	 */
	notifyDelay : 500,
	
	/**
	 * Position CSS, Width of notifications dialogs
	 *
	 * @type Object
	 * @default {position: {top : '12px', right : '12px'}, width : 280}
	 * position: CSS object | null (null: position center & middle)
	 */
	notifyDialog : {position: {top : '12px', right : '12px'}, width : 280},
	
	/**
	 * Allow shortcuts
	 *
	 * @type Boolean
	 * @default  true
	 */
	allowShortcuts : true,
	
	/**
	 * Remeber last opened dir to open it after reload or in next session
	 *
	 * @type Boolean
	 * @default  true
	 */
	rememberLastDir : false,
	
	/**
	 * Clear historys(elFinder) on reload(not browser) function
	 * Historys was cleared on Reload function on elFinder 2.0 (value is true)
	 * 
	 * @type Boolean
	 * @default  false
	 */
	reloadClearHistory : false,
	
	/**
	 * Use browser native history with supported browsers
	 *
	 * @type Boolean
	 * @default  true
	 */
	useBrowserHistory : false,
	
	/**
	 * Lazy load config.
	 * How many files display at once?
	 *
	 * @type Number
	 * @default  50
	 */
	showFiles : 50,
	
	/**
	 * Lazy load config.
	 * Distance in px to cwd bottom edge to start display files
	 *
	 * @type Number
	 * @default  50
	 */
	showThreshold : 50,
	
	/**
	 * Additional rule to valid new file name.
	 * By default not allowed empty names or '..'
	 * This setting does not have a sense of security.
	 *
	 * @type false|RegExp|function
	 * @default  false
	 * @example
	 *  disable names with spaces:
	 *  validName : /^[^\s]+$/,
	 */
	validName : false,
	
	/**
	 * Backup name suffix.
	 *
	 * @type String
	 * @default  "~"
	 */
	backupSuffix : '~',
	
	/**
	 * Sync content interval
	 *
	 * @type Number
	 * @default  0 (do not sync)
	 */
	sync : 0,
	
	/**
	 * Sync start on load if sync value >= 1000
	 *
	 * @type     Bool
	 * @default  true
	 */
	syncStart : true,
	
	/**
	 * How many thumbnails create in one request
	 *
	 * @type Number
	 * @default  5
	 */
	loadTmbs : 5,
	
	/**
	 * Cookie option for browsersdoes not suppot localStorage
	 *
	 * @type Object
	 */
	cookie         : {
		expires : 30,
		domain  : '',
		path    : '/',
		secure  : false
	},
	
	/**
	 * Contextmenu config
	 *
	 * @type Object
	 */
	contextmenu : {
		// navbarfolder menu
		navbar : ['open', 'download', '|', 'upload', 'mkdir', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'rename', '|', 'archive', '|', 'places', 'info', 'chmod', 'netunmount'],
		// current directory menu
		cwd    : ['reload', 'back', '|', 'upload', 'mkdir', 'mkfile', 'paste', '|', 'view', 'sort', 'colwidth', '|', 'info', '|', 'fullscreen'],
		// current directory file menu
		files  : ['getfile', '|' ,'open', 'download', 'opendir', 'quicklook', '|', 'upload', 'mkdir', '|', 'copy', 'cut', 'paste', 'duplicate', '|', 'rm', '|', 'rename', 'resize', '|', 'archive', 'extract', '|', 'places', 'info', 'chmod', 'netunmount']//edit
	},

	/**
	 * elFinder node enable always
	 * This value will set to `true` if <body> has elFinder node only
	 * 
	 * @type     Bool
	 * @default  false
	 */
	enableAlways : false,
	
	/**
	 * elFinder node enable by mouse over
	 * 
	 * @type     Bool
	 * @default  true
	 */
	enableByMouseOver : true,

	/**
	 * Show window close confirm dialog
	 * Value is which state to show
	 * 'hasNotifyDialog', 'editingFile', 'hasSelectedItem' and 'hasClipboardData'
	 * 
	 * @type     Array
	 * @default  ['hasNotifyDialog', 'editingFile']
	 */
	windowCloseConfirm : ['hasNotifyDialog', 'editingFile'],

	/**
	 * Function decoding 'raw' string converted to unicode
	 * It is used instead of fm.decodeRawString(str)
	 * 
	 * @type Null|Function
	 */
	rawStringDecoder : typeof Encoding === 'object' && $.isFunction(Encoding.convert)? function(str) {
		return Encoding.convert(str, {
			to: 'UNICODE',
			type: 'string'
		});
	} : null,

	/**
	 * Debug config
	 *
	 * @type Array|Boolean
	 */
	// debug : true
	debug : ['error', 'warning', 'event-destroy']
};

/*
 * File: /js/elFinder.history.js
 */

/**
 * @class elFinder.history
 * Store visited folders
 * and provide "back" and "forward" methods
 *
 * @author Dmitry (dio) Levashov
 */
elFinder.prototype.history = function(fm) {
	var self = this,
		/**
		 * Update history on "open" event?
		 *
		 * @type Boolean
		 */
		update = true,
		/**
		 * Directories hashes storage
		 *
		 * @type Array
		 */
		history = [],
		/**
		 * Current directory index in history
		 *
		 * @type Number
		 */
		current,
		/**
		 * Clear history
		 *
		 * @return void
		 */
		reset = function() {
			history = [fm.cwd().hash];
			current = 0;
			update  = true;
		},
		/**
		 * Browser native history object
		 */
		nativeHistory = (fm.options.useBrowserHistory && window.history && window.history.pushState)? window.history : null,
		/**
		 * Open prev/next folder
		 *
		 * @Boolen  open next folder?
		 * @return jQuery.Deferred
		 */
		go = function(fwd) {
			if ((fwd && self.canForward()) || (!fwd && self.canBack())) {
				update = false;
				return fm.exec('open', history[fwd ? ++current : --current]).fail(reset);
			}
			return $.Deferred().reject();
		};
	
	/**
	 * Return true if there is previous visited directories
	 *
	 * @return Boolen
	 */
	this.canBack = function() {
		return current > 0;
	}
	
	/**
	 * Return true if can go forward
	 *
	 * @return Boolen
	 */
	this.canForward = function() {
		return current < history.length - 1;
	}
	
	/**
	 * Go back
	 *
	 * @return void
	 */
	this.back = go;
	
	/**
	 * Go forward
	 *
	 * @return void
	 */
	this.forward = function() {
		return go(true);
	}
	
	// bind to elfinder events
	fm.open(function() {
		var l = history.length,
			cwd = fm.cwd().hash;

		if (update) {
			current >= 0 && l > current + 1 && history.splice(current+1);
			history[history.length-1] != cwd && history.push(cwd);
			current = history.length - 1;
		}
		update = true;

		if (nativeHistory) {
			if (! nativeHistory.state) {
				nativeHistory.replaceState({thash: cwd}, null, location.pathname + location.search + '#elf_' + cwd);
			} else {
				nativeHistory.state.thash != cwd && nativeHistory.pushState({thash: cwd}, null, location.pathname + location.search + '#elf_' + cwd);
			}
		}
	})
	.reload(fm.options.reloadClearHistory && reset);
	
};


/*
 * File: /js/elFinder.command.js
 */

/**
 * elFinder command prototype
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.command = function(fm) {

	/**
	 * elFinder instance
	 *
	 * @type  elFinder
	 */
	this.fm = fm;
	
	/**
	 * Command name, same as class name
	 *
	 * @type  String
	 */
	this.name = '';
	
	/**
	 * Command icon class name with out 'elfinder-button-icon-'
	 * Use this.name if it is empty
	 *
	 * @type  String
	 */
	this.className = '';

	/**
	 * Short command description
	 *
	 * @type  String
	 */
	this.title = '';
	
	/**
	 * Linked(Child) commands name
	 * They are loaded together when tthis command is loaded.
	 * 
	 * @type  Array
	 */
	this.linkedCmds = [];
	
	/**
	 * Current command state
	 *
	 * @example
	 * this.state = -1; // command disabled
	 * this.state = 0;  // command enabled
	 * this.state = 1;  // command active (for example "fullscreen" command while elfinder in fullscreen mode)
	 * @default -1
	 * @type  Number
	 */
	this.state = -1;
	
	/**
	 * If true, command can not be disabled by connector.
	 * @see this.update()
	 *
	 * @type  Boolen
	 */
	this.alwaysEnabled = false;
	
	/**
	 * If true, this means command was disabled by connector.
	 * @see this.update()
	 *
	 * @type  Boolen
	 */
	this._disabled = false;
	
	this.disableOnSearch = false;
	
	this.updateOnSelect = true;
	
	/**
	 * elFinder events defaults handlers.
	 * Inside handlers "this" is current command object
	 *
	 * @type  Object
	 */
	this._handlers = {
		enable  : function() { this.update(void(0), this.value); },
		disable : function() { this.update(-1, this.value); },
		'open reload load sync'    : function() { 
			this._disabled = !(this.alwaysEnabled || this.fm.isCommandEnabled(this.name));
			this.update(void(0), this.value)
			this.change(); 
		}
	};
	
	/**
	 * elFinder events handlers.
	 * Inside handlers "this" is current command object
	 *
	 * @type  Object
	 */
	this.handlers = {}
	
	/**
	 * Shortcuts
	 *
	 * @type  Array
	 */
	this.shortcuts = [];
	
	/**
	 * Command options
	 *
	 * @type  Object
	 */
	this.options = {ui : 'button'};
	
	/**
	 * Prepare object -
	 * bind events and shortcuts
	 *
	 * @return void
	 */
	this.setup = function(name, opts) {
		var self = this,
			fm   = this.fm, i, s, sc, cb;

		this.name      = name;
		this.title     = fm.messages['cmd'+name] ? fm.i18n('cmd'+name)
		               : ((this.extendsCmd && fm.messages['cmd'+this.extendsCmd]) ? fm.i18n('cmd'+this.extendsCmd) : name), 
		this.options   = $.extend({}, this.options, opts);
		this.listeners = [];

		if (opts.shortcuts) {
			if (typeof opts.shortcuts === 'function') {
				sc = opts.shortcuts(this.fm, this.shortcuts);
			} else if ($.isArray(opts.shortcuts)) {
				sc = opts.shortcuts;
			}
			this.shortcuts = sc || [];
		}

		if (this.updateOnSelect) {
			this._handlers.select = function() { this.update(void(0), this.value); }
		}

		$.each($.extend({}, self._handlers, self.handlers), function(cmd, handler) {
			fm.bind(cmd, $.proxy(handler, self));
		});

		for (i = 0; i < this.shortcuts.length; i++) {
			s = this.shortcuts[i];
			cb = s.callback || self.exec;
			s.callback = function() {
				if (fm.isCommandEnabled(self.name)) {
					cb.call(self);
				}
			};
			!s.description && (s.description = this.title);
			fm.shortcut(s);
		}

		if (this.disableOnSearch) {
			fm.bind('search searchend', function(e) {
				self._disabled = e.type === 'search'? true : ! (this.alwaysEnabled || fm.isCommandEnabled(name));
				self.update(void(0), self.value);
			});
		}

		this.init();
	}

	/**
	 * Command specific init stuffs
	 *
	 * @return void
	 */
	this.init = function() { }

	/**
	 * Exec command
	 *
	 * @param  Array         target files hashes
	 * @param  Array|Object  command value
	 * @return $.Deferred
	 */
	this.exec = function(files, opts) { 
		return $.Deferred().reject(); 
	}
	
	/**
	 * Return true if command disabled.
	 *
	 * @return Boolen
	 */
	this.disabled = function() {
		return this.state < 0;
	}
	
	/**
	 * Return true if command enabled.
	 *
	 * @return Boolen
	 */
	this.enabled = function() {
		return this.state > -1;
	}
	
	/**
	 * Return true if command active.
	 *
	 * @return Boolen
	 */
	this.active = function() {
		return this.state > 0;
	}
	
	/**
	 * Return current command state.
	 * Must be overloaded in most commands
	 *
	 * @return Number
	 */
	this.getstate = function() {
		return -1;
	}
	
	/**
	 * Update command state/value
	 * and rize 'change' event if smth changed
	 *
	 * @param  Number  new state or undefined to auto update state
	 * @param  mixed   new value
	 * @return void
	 */
	this.update = function(s, v) {
		var state = this.state,
			value = this.value;

		if (this._disabled) {
			this.state = -1;
		} else {
			this.state = s !== void(0) ? s : this.getstate();
		}

		this.value = v;
		
		if (state != this.state || value != this.value) {
			this.change();
		}
	}
	
	/**
	 * Bind handler / fire 'change' event.
	 *
	 * @param  Function|undefined  event callback
	 * @return void
	 */
	this.change = function(c) {
		var cmd, i;
		
		if (typeof(c) === 'function') {
			this.listeners.push(c);			
		} else {
			for (i = 0; i < this.listeners.length; i++) {
				cmd = this.listeners[i];
				try {
					cmd(this.state, this.value);
				} catch (e) {
					this.fm.debug('error', e)
				}
			}
		}
		return this;
	}
	

	/**
	 * With argument check given files hashes and return list of existed files hashes.
	 * Without argument return selected files hashes.
	 *
	 * @param  Array|String|void  hashes
	 * @return Array
	 */
	this.hashes = function(hashes) {
		return hashes
			? $.map($.isArray(hashes) ? hashes : [hashes], function(hash) { return fm.file(hash) ? hash : null; })
			: fm.selected();
	}
	
	/**
	 * Return only existed files from given fils hashes | selected files
	 *
	 * @param  Array|String|void  hashes
	 * @return Array
	 */
	this.files = function(hashes) {
		var fm = this.fm;
		
		return hashes
			? $.map($.isArray(hashes) ? hashes : [hashes], function(hash) { return fm.file(hash) || null })
			: fm.selectedFiles();
	}
};


/*
 * File: /js/elFinder.resources.js
 */

/**
 * elFinder resources registry.
 * Store shared data
 *
 * @type Object
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.resources = {
	'class' : {
		hover       : 'ui-state-hover',
		active      : 'ui-state-active',
		disabled    : 'ui-state-disabled',
		draggable   : 'ui-draggable',
		droppable   : 'ui-droppable',
		adroppable  : 'elfinder-droppable-active',
		cwdfile     : 'elfinder-cwd-file',
		cwd         : 'elfinder-cwd',
		tree        : 'elfinder-tree',
		treeroot    : 'elfinder-navbar-root',
		navdir      : 'elfinder-navbar-dir',
		navdirwrap  : 'elfinder-navbar-dir-wrapper',
		navarrow    : 'elfinder-navbar-arrow',
		navsubtree  : 'elfinder-navbar-subtree',
		navcollapse : 'elfinder-navbar-collapsed',
		navexpand   : 'elfinder-navbar-expanded',
		treedir     : 'elfinder-tree-dir',
		placedir    : 'elfinder-place-dir',
		searchbtn   : 'elfinder-button-search',
		editing     : 'elfinder-to-editing'
	},
	tpl : {
		perms      : '<span class="elfinder-perms"></span>',
		lock       : '<span class="elfinder-lock"></span>',
		symlink    : '<span class="elfinder-symlink"></span>',
		navicon    : '<span class="elfinder-nav-icon"></span>',
		navspinner : '<span class="elfinder-navbar-spinner"></span>',
		navdir     : '<div class="elfinder-navbar-wrapper"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}"><span class="elfinder-navbar-arrow"></span><span class="elfinder-navbar-icon" {style}></span>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree" style="display:none"></div></div>',
		placedir   : '<div class="elfinder-navbar-wrapper"><span id="{id}" class="ui-corner-all elfinder-navbar-dir {cssclass}" title="{title}"><span class="elfinder-navbar-arrow"></span><span class="elfinder-navbar-icon" {style}></span>{symlink}{permissions}{name}</span><div class="elfinder-navbar-subtree" style="display:none"></div></div>'
		
	},
	
	mimes : {
		text : [
			'application/x-empty',
			'application/javascript', 
			'application/xhtml+xml', 
			'audio/x-mp3-playlist', 
			'application/x-web-config',
			'application/docbook+xml',
			'application/x-php',
			'application/x-perl',
			'application/x-awk',
			'application/x-config',
			'application/x-csh',
			'application/xml'
		]
	},
	
	mixin : {
		make : function() {
			var fm   = this.fm,
				cmd  = this.name,
				wz   = fm.getUI('workzone'),
				org  = (this.origin && this.origin === 'navbar')? 'tree' : 'cwd',
				ui   = fm.getUI(org),
				tree = (org === 'tree'),
				find = tree? 'navHash2Id' : 'cwdHash2Id',
				tarea= (! tree && fm.storage('view') != 'list'),
				sel  = fm.selected(),
				move = this.move || false,
				empty= wz.hasClass('elfinder-cwd-wrapper-empty'),
				rest = function(){
					if (!overlay.is(':hidden')) {
						overlay.addClass('ui-front')
							.elfinderoverlay('hide')
							.off('click', cancel);
					}
					node.removeClass('ui-front').css('position', '');
					if (tarea) {
						nnode.css('max-height', '');
					} else if (pnode) {
						pnode.css('width', '')
							.parent('td').css('overflow', '');
					}
				}, colwidth,
				dfrd = $.Deferred()
					.fail(function(error) {
						dstCls && dst.attr('class', dstCls);
						empty && wz.addClass('elfinder-cwd-wrapper-empty');
						if (sel) {
							move && fm.trigger('unlockfiles', {files: sel});
							fm.clipboard([]);
							fm.trigger('selectfiles', { files: sel })
						}
						error && fm.error(error);
					})
					.always(function() {
						rest();
						cleanup();
						fm.enable();
						fm.trigger('resMixinMake');
					}),
				id    = 'tmp_'+parseInt(Math.random()*100000),
				phash = tree? fm.file(sel[0]).hash : fm.cwd().hash,
				date = new Date(),
				file   = {
					hash  : id,
					phash : phash,
					name  : fm.uniqueName(this.prefix, phash),
					mime  : this.mime,
					read  : true,
					write : true,
					date  : 'Today '+date.getHours()+':'+date.getMinutes(),
					move  : move
				},
				data = this.data || {},
				node = ui.trigger('create.'+fm.namespace, file).find('#'+fm[find](id))
					.on('unselect.'+fm.namespace, function() {
						setTimeout(function() {
							input && input.blur();
						}, 50);
					}),
				nnode, pnode,
				overlay = fm.getUI('overlay'),
				cleanup = function() {
					fm.unbind('resize', resize);
					input.remove();
					if (tree) {
						node.closest('.elfinder-navbar-wrapper').remove();
					}
					node.remove();
				},
				cancel = function(e) { 
					if (! inError) {
						cleanup();
						e.stopPropagation();
						dfrd.reject();
					}
				},
				input = $(tarea? '<textarea></textarea>' : '<input type="text">')
					.on('keyup text', function(){
						if (tarea) {
							this.style.height = '1px';
							this.style.height = this.scrollHeight + 'px';
						} else if (colwidth) {
							this.style.width = colwidth + 'px';
							if (this.scrollWidth > colwidth) {
								this.style.width = this.scrollWidth + 10 + 'px';
							}
						}
					})
					.keydown(function(e) {
						e.stopImmediatePropagation();
						if (e.keyCode == $.ui.keyCode.ESCAPE) {
							dfrd.reject();
						} else if (e.keyCode == $.ui.keyCode.ENTER) {
							input.blur();
						}
					})
					.mousedown(function(e) {
						e.stopPropagation();
					})
					.blur(function() {
						var name   = $.trim(input.val()),
							parent = input.parent(),
							valid  = true,
							cut;

						if (!inError && parent.length) {

							if (fm.options.validName && fm.options.validName.test) {
								try {
									valid = fm.options.validName.test(name);
								} catch(e) {
									valid = false;
								}
							}
							if (!name || name === '..' || !valid) {
								inError = true;
								fm.error('errInvName', {modal: true, close: select});
								return false;
							}
							if (fm.fileByName(name, phash)) {
								inError = true;
								fm.error(['errExists', name], {modal: true, close: select});
								return false;
							}

							cut = (sel && move)? fm.exec('cut', sel) : null;

							$.when(cut)
							.done(function() {
								rest();
								input.hide().before($('<span>').text(name));

								fm.lockfiles({files : [id]});

								fm.request({
										data        : $.extend({cmd : cmd, name : name, target : phash}, data || {}), 
										notify      : {type : cmd, cnt : 1},
										preventFail : true,
										syncOnFail  : true
									})
									.fail(function(error) {
										fm.unlockfiles({files : [id]});
										inError = true;
										input.show().prev().remove();
										fm.error(error, {modal: true, close: select});
									})
									.done(function(data) {
										dfrd.resolve(data);
										if (data && data.added && data.added[0]) {
											var item    = data.added[0],
												dirhash = item.hash,
												newItem = ui.find('#'+fm[find](dirhash));
											if (sel && move) {
												fm.one(cmd+'done', function() {
													fm.exec('paste', dirhash);
												});
											}
											fm.one(cmd+'done', function() {
												var acts = {
														'directory' : { cmd: 'open', msg: 'cmdopendir' },
														//Efw does not edit===============
														//'text/plain': { cmd: 'edit', msg: 'cmdedit' },
														//================================
														'default'   : { cmd: 'open', msg: 'cmdopen' }
													},
													act, extNode;
												newItem = ui.find('#'+fm[find](item.hash));
												if (data.added.length === 1) {
													act = acts[item.mime] || acts['default'];
													extNode = $('<div></div>').append(
														$('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all elfinder-tabstop"><span class="ui-button-text">'
															+fm.i18n(act.msg)
															+'</span></button>')
														.on('mouseenter mouseleave', function(e) { 
															$(this).toggleClass('ui-state-hover', e.type == 'mouseenter');
														})
														.on('click', function() {
															fm.exec(act.cmd, item.hash);
														})
													);
												}
												if (newItem.length) {
													newItem.trigger('scrolltoview');
													! move && extNode && fm.toast({msg: fm.i18n(['complete', fm.i18n('cmd'+cmd)]), extNode: extNode});
												} else {
													fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
													! move && fm.toast({msg: fm.i18n(['complete', fm.i18n('cmd'+cmd)]), extNode: extNode});
												}
											});
										}
									});
							})
							.fail(function() {
								dfrd.reject();
							});
						}
					}),
				select = function() {
					var name = input.val().replace(/\.((tar\.(gz|bz|bz2|z|lzo))|cpio\.gz|ps\.gz|xcf\.(gz|bz2)|[a-z0-9]{1,4})$/ig, '');
					inError = false;
					if (fm.UA.Mobile) {
						overlay.on('click', cancel)
							.removeClass('ui-front').elfinderoverlay('show');
					}
					input.select().focus();
					input[0].setSelectionRange && input[0].setSelectionRange(0, name.length);
				},
				resize = function() {
					node.trigger('scrolltoview');
				},
				inError = false,
				// for tree
				dst, dstCls, collapsed, expanded, arrow, subtree;

			if ((! tree && this.disabled()) || !node.length) {
				return dfrd.reject();
			}

			if (tree) {
				dst = $('#'+fm[find](phash));
				collapsed = fm.res('class', 'navcollapse');
				expanded  = fm.res('class', 'navexpand');
				arrow = fm.res('class', 'navarrow');
				subtree = fm.res('class', 'navsubtree');
				
				node.closest('.'+subtree).show();
				if (! dst.hasClass(collapsed)) {
					dstCls = dst.attr('class');
					dst.addClass(collapsed+' '+expanded+' elfinder-subtree-loaded');
				}
				if (dst.is('.'+collapsed+':not(.'+expanded+')')) {
					dst.children('.'+arrow).click().data('dfrd').done(function() {
						if (input.val() === file.name) {
							input.val(fm.uniqueName(this.prefix, phash)).select().focus();
						}
					}.bind(this));
				}
				nnode = node.contents().filter(function(){ return this.nodeType==3 && $(this).parent().attr('id') === fm.navHash2Id(file.hash); });
				nnode.replaceWith(input.val(file.name));
			} else {
				empty && wz.removeClass('elfinder-cwd-wrapper-empty');
				nnode = node.find('.elfinder-cwd-filename');
				pnode = nnode.parent();
				node.css('position', 'relative').addClass('ui-front');
				if (tarea) {
					nnode.css('max-height', 'none');
				} else {
					colwidth = pnode.width();
					pnode.width(colwidth - 15)
						.parent('td').css('overflow', 'visible');
				}
				nnode.empty('').append(input.val(file.name));
			}
			
			fm.bind('resize', resize);
			
			input.trigger('keyup');
			select();

			return dfrd;

		}
	},
	blink: function(elm, mode) {
		var acts = {
			slowonce : function(){elm.hide().delay(250).fadeIn(750).delay(500).fadeOut(3500);},
			lookme   : function(){elm.show().fadeOut(500).fadeIn(750);}
		}, func;
		mode = mode || 'slowonce';
		
		func = acts[mode] || acts['lookme'];
		
		elm.stop(true, true);
		func();
	}
};


/*
 * File: /js/jquery.dialogelfinder.js
 */

/**
 * @class dialogelfinder - open elFinder in dialog window
 *
 * @param  Object  elFinder options with dialog options
 * @example
 * $(selector).dialogelfinder({
 *     // some elfinder options
 *     title          : 'My files', // dialog title, default = "Files"
 *     width          : 850,        // dialog width, default 840
 *     autoOpen       : false,      // if false - dialog will not be opened after init, default = true
 *     destroyOnClose : true        // destroy elFinder on close dialog, default = false
 * })
 * @author Dmitry (dio) Levashov
 **/
$.fn.dialogelfinder = function(opts) {
	var position = 'elfinderPosition',
		destroy  = 'elfinderDestroyOnClose';
	
	this.not('.elfinder').each(function() {

		
		var doc     = $(document),
			toolbar = $('<div class="ui-widget-header dialogelfinder-drag ui-corner-top">'+(opts.title || 'Files')+'</div>'),
			button  = $('<a href="#" class="dialogelfinder-drag-close ui-corner-all"><span class="ui-icon ui-icon-closethick"> </span></a>')
				.appendTo(toolbar)
				.click(function(e) {
					e.preventDefault();
					
					node.dialogelfinder('close');
				}),
			node    = $(this).addClass('dialogelfinder')
				.css('position', 'absolute')
				.hide()
				.appendTo('body')
				.draggable({
					handle : '.dialogelfinder-drag',
					containment : 'window',
					stop : function() {
						node.trigger('resize');
						elfinder.trigger('resize');
					}
				})
				.elfinder(opts)
				.prepend(toolbar),
			elfinder = node.elfinder('instance');
		
		
		node.width(parseInt(node.width()) || 840) // fix width if set to "auto"
			.data(destroy, !!opts.destroyOnClose)
			.find('.elfinder-toolbar').removeClass('ui-corner-top');
		
		opts.position && node.data(position, opts.position);
		
		opts.autoOpen !== false && $(this).dialogelfinder('open');

	});
	
	if (opts == 'open') {
		var node = $(this),
			pos  = node.data(position) || {
				top  : parseInt($(document).scrollTop() + ($(window).height() < node.height() ? 2 : ($(window).height() - node.height())/2)),
				left : parseInt($(document).scrollLeft() + ($(window).width() < node.width()  ? 2 : ($(window).width()  - node.width())/2))
			};

		if (node.is(':hidden')) {
			node.addClass('ui-front').css(pos).show().trigger('resize');

			setTimeout(function() {
				// fix resize icon position and make elfinder active
				node.trigger('resize').mousedown();
			}, 200);
		}
	} else if (opts == 'close') {
		var node = $(this).removeClass('ui-front');
			
		if (node.is(':visible')) {
			!!node.data(destroy)
				? node.elfinder('destroy').remove()
				: node.elfinder('close');
		}
	} else if (opts == 'instance') {
		return $(this).getElFinder();
	}

	return this;
};



/*
 * File: /js/ui/button.js
 */

/**
 * @class  elFinder toolbar button widget.
 * If command has variants - create menu
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderbutton = function(cmd) {
	return this.each(function() {
		
		var c        = 'class',
			fm       = cmd.fm,
			disabled = fm.res(c, 'disabled'),
			active   = fm.res(c, 'active'),
			hover    = fm.res(c, 'hover'),
			item     = 'elfinder-button-menu-item',
			selected = 'elfinder-button-menu-item-selected',
			menu,
			text     = $('<span class="elfinder-button-text">'+cmd.title+'</span>'),
			button   = $(this).addClass('ui-state-default elfinder-button')
				.attr('title', cmd.title)
				.append('<span class="elfinder-button-icon elfinder-button-icon-' + (cmd.className? cmd.className : cmd.name) + '"></span>', text)
				.hover(function(e) { !button.hasClass(disabled) && button[e.type == 'mouseleave' ? 'removeClass' : 'addClass'](hover) /**button.toggleClass(hover);*/ })
				.click(function(e) { 
					if (!button.hasClass(disabled)) {
						if (menu && cmd.variants.length > 1) {
							// close other menus
							menu.is(':hidden') && cmd.fm.getUI().click();
							e.stopPropagation();
							menu.slideToggle(100);
						} else {
							cmd.exec();
						}
						
					}
				}),
			hideMenu = function() {
				menu.hide();
			};
			
		text.hide();
		
		// if command has variants create menu
		if ($.isArray(cmd.variants)) {
			button.addClass('elfinder-menubutton');
			
			menu = $('<div class="ui-front ui-widget ui-widget-content elfinder-button-menu ui-corner-all"></div>')
				.hide()
				.appendTo(button)
				.on('mouseenter mouseleave', '.'+item, function() { $(this).toggleClass(hover) })
				.on('click', '.'+item, function(e) {
					e.preventDefault();
					e.stopPropagation();
					button.removeClass(hover);
					menu.hide();
					cmd.exec(cmd.fm.selected(), $(this).data('value'));
				});

			cmd.fm.bind('disable select', hideMenu).getUI().click(hideMenu);
			
			cmd.change(function() {
				menu.html('');
				$.each(cmd.variants, function(i, variant) {
					menu.append($('<div class="'+item+'">'+variant[1]+'</div>').data('value', variant[0]).addClass(variant[0] == cmd.value ? selected : ''));
				});
			});
		}	
			
		cmd.change(function() {
			if (cmd.disabled()) {
				button.removeClass(active+' '+hover).addClass(disabled);
			} else {
				button.removeClass(disabled);
				button[cmd.active() ? 'addClass' : 'removeClass'](active);
			}
		})
		.change();
	});
};


/*
 * File: /js/ui/contextmenu.js
 */

/**
 * @class  elFinder contextmenu
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindercontextmenu = function(fm) {
	
	return this.each(function() {
		var cmItem = 'elfinder-contextmenu-item',
			smItem = 'elfinder-contextsubmenu-item',
			exIcon = 'elfinder-contextmenu-extra-icon',
			dragOpt = {
				distance: 8,
				start: function() {
					menu.data('touching') && menu.find('.ui-state-hover').removeClass('ui-state-hover');
				},
				stop: function() {
					menu.data('draged', true);
				}
			},
			menu = $(this).addClass('touch-punch ui-helper-reset ui-front ui-widget ui-state-default ui-corner-all elfinder-contextmenu elfinder-contextmenu-'+fm.direction)
				.hide()
				.on('touchstart', function(e) {
					menu.data('touching', true);
				})
				.on('touchend', function(e) {
					menu.removeData('touching');
				})
				.on('mouseenter mouseleave', '.'+cmItem, function(e) {
					$(this).toggleClass('ui-state-hover', (e.type === 'mouseenter' || (! menu.data('draged') && menu.data('submenuKeep'))? true : false));
					if (menu.data('draged') && menu.data('submenuKeep')) {
						menu.find('.elfinder-contextmenu-sub:visible').parent().addClass('ui-state-hover');
					}
				})
				.on('mouseenter mouseleave', '.'+exIcon, function(e) {
					$(this).parent().toggleClass('ui-state-hover', e.type === 'mouseleave');
				})
				.on('mouseenter mouseleave', '.'+cmItem+',.'+smItem, function(e) {
					var setIndex = function(target, sub) {
						$.each(sub? subnodes : nodes, function(i, n) {
							if (target[0] === n) {
								(sub? subnodes : nodes)._cur = i;
								if (sub) {
									subselected = target;
								} else {
									selected = target;
								}
								return false;
							}
						});
					};
					if (e.originalEvent) {
						var target = $(this);
						if (e.type === 'mouseenter') {
							// mouseenter
							if (target.hasClass(smItem)) {
								// submenu
								if (subselected) {
									subselected.removeClass('ui-state-hover');
								}
								subnodes = selected.find('div.'+smItem);
								setIndex(target, true);
							} else {
								// menu
								if (selected) {
									selected.removeClass('ui-state-hover');
								}
								setIndex(target);
							}
						} else {
							// mouseleave
							if (target.hasClass(smItem)) {
								//submenu
								subselected = null;
								subnodes = null;
							} else {
								// menu
								if (selected) {
									selected.removeClass('ui-state-hover');
								}
								(function(sel) {
									setTimeout(function() {
										if (sel === selected) {
											selected = null;
										}
									}, 250);
								})(selected);
							}
						}
					}
				})
				.on('contextmenu', function(){return false;})
				.on('mouseup', function() {
					setTimeout(function() {
						menu.removeData('draged');
					}, 100);
				})
				.draggable(dragOpt),
			subpos  = fm.direction == 'ltr' ? 'left' : 'right',
			types = $.extend({}, fm.options.contextmenu),
			tpl     = '<div class="'+cmItem+'{className}"><span class="elfinder-button-icon {icon} elfinder-contextmenu-icon"{style}></span><span>{label}</span></div>',
			item = function(label, icon, callback, opts) {
				var className = '',
					style = '',
					iconClass = '';
				if (opts) {
					if (opts.className) {
						className = ' ' + opts.className;
					}
					if (opts.iconClass) {
						iconClass = opts.iconClass;
						icon = '';
					}
					if (opts.iconImg) {
						style = ' style="background:url(\''+fm.escape(opts.iconImg)+'\') 0 0 no-repeat;background-size:contain;"';
					}
				}
				return $(tpl.replace('{icon}', icon ? 'elfinder-button-icon-'+icon : (iconClass? iconClass : ''))
						.replace('{label}', label)
						.replace('{style}', style)
						.replace('{className}', className))
					.click(function(e) {
						e.stopPropagation();
						e.preventDefault();
						callback();
					});
			},
			base, cwd,
			nodes, selected, subnodes, subselected, autoSyncStop,

			autoToggle = function() {
				var evTouchStart = 'touchstart.contextmenuAutoToggle';
				menu.data('hideTm') && clearTimeout(menu.data('hideTm'));
				if (menu.is(':visible')) {
					menu.on('touchstart', function(e) {
						if (e.originalEvent.touches.length > 1) {
							return;
						}
						menu.stop().show();
						menu.data('hideTm') && clearTimeout(menu.data('hideTm'));
					})
					.data('hideTm', setTimeout(function() {
						cwd.find('.elfinder-cwd-file').off(evTouchStart);
						cwd.find('.elfinder-cwd-file.ui-selected')
						.one(evTouchStart, function(e) {
							if (e.originalEvent.touches.length > 1) {
								return;
							}
							var tgt = $(e.target);
							if (menu.first().length && !tgt.is('input:checkbox') && !tgt.hasClass('elfinder-cwd-select')) {
								open(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
								return false;
							}
							cwd.find('.elfinder-cwd-file').off(evTouchStart);
						})
						.one('unselect.'+fm.namespace, function() {
							cwd.find('.elfinder-cwd-file').off(evTouchStart);
						});
						menu.fadeOut({
							duration: 300,
							fail: function() {
								menu.css('opacity', '1').show();
							}
						});
					}, 4500));
				}
			},
			
			keyEvts = function(e) {
				var code = e.keyCode,
					ESC = $.ui.keyCode.ESCAPE,
					ENT = $.ui.keyCode.ENTER,
					LEFT = $.ui.keyCode.LEFT,
					RIGHT = $.ui.keyCode.RIGHT,
					UP = $.ui.keyCode.UP,
					DOWN = $.ui.keyCode.DOWN,
					subent = fm.direction === 'ltr'? RIGHT : LEFT,
					sublev = subent === RIGHT? LEFT : RIGHT;
				
				if ($.inArray(code, [ESC, ENT, LEFT, RIGHT, UP, DOWN]) !== -1) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					if (code == ESC || code === sublev) {
						if (selected && subnodes && subselected) {
							subselected.trigger('mouseleave');
							selected.addClass('ui-state-hover');
							subnodes = null;
							subselected = null;
						} else {
							code == ESC && close();
						}
					} else if (code == UP || code == DOWN) {
						if (subnodes) {
							if (subselected) {
								subselected.trigger('mouseleave');
							}
							if (code == DOWN && (! subselected || subnodes.length <= ++subnodes._cur)) {
								subnodes._cur = 0;
							} else if (code == UP && (! subselected || --subnodes._cur < 0)) {
								subnodes._cur = subnodes.length - 1;
							}
							subselected = subnodes.eq(subnodes._cur).trigger('mouseenter');
						} else {
							subnodes = null;
							if (selected) {
								selected.trigger('mouseleave');
							}
							if (code == DOWN && (! selected || nodes.length <= ++nodes._cur)) {
								nodes._cur = 0;
							} else if (code == UP && (! selected || --nodes._cur < 0)) {
								nodes._cur = nodes.length - 1;
							}
							selected = nodes.eq(nodes._cur).addClass('ui-state-hover');
						}
					} else if (selected && (code == ENT || code === subent)) {
						if (selected.hasClass('elfinder-contextmenu-group')) {
							if (subselected) {
								code == ENT && subselected.click();
							} else {
								selected.trigger('mouseenter');
								subnodes = selected.find('div.'+smItem);
								subnodes._cur = 0;
								subselected = subnodes.first().addClass('ui-state-hover');
							}
						} else {
							code == ENT && selected.click();
						}
					}
				}
			},
			
			open = function(x, y, css) {
				var width      = menu.outerWidth(),
					height     = menu.outerHeight(),
					bstyle     = base.attr('style'),
					bpos       = base.offset(),
					bwidth     = base.width(),
					bheight    = base.height(),
					mw         = fm.UA.Mobile? 40 : 2,
					mh         = fm.UA.Mobile? 20 : 2,
					x          = x - (bpos? bpos.left : 0),
					y          = y - (bpos? bpos.top : 0),
					css        = $.extend(css || {}, {
						top  : Math.max(0, y + mh + height < bheight ? y + mh : y - (y + height - bheight)),
						left : Math.max(0, (x < width + mw || x + mw + width < bwidth)? x + mw : x - mw - width),
						opacity : '1'
					}),
					evts;

				autoSyncStop = true;
				fm.autoSync('stop');
				fm.toFront(menu);
				base.width(bwidth);
				menu.stop().removeAttr('style').css(css).show();
				base.attr('style', bstyle);
				
				css[subpos] = parseInt(menu.width());
				menu.find('.elfinder-contextmenu-sub').css(css);
				if (fm.UA.iOS) {
					$('div.elfinder div.overflow-scrolling-touch').css('-webkit-overflow-scrolling', 'auto');
				}
				
				selected = null;
				subnodes = null;
				subselected = null;
				$(document).on('keydown.' + fm.namespace, keyEvts);
				evts = $._data(document).events;
				if (evts && evts.keydown) {
					evts.keydown.unshift(evts.keydown.pop());
				}
				
				fm.UA.Mobile && autoToggle();
			},
			
			close = function() {
				$(document).off('keydown.' + fm.namespace, keyEvts);
				currentType = null;
				
				if (menu.is(':visible') || menu.children().length) {
					menu.removeAttr('style').hide().empty().removeData('submenuKeep');
					try {
						if (! menu.draggable('instance')) {
							menu.draggable(dragOpt);
						}
					} catch(e) {
						if (! menu.hasClass('ui-draggable')) {
							menu.draggable(dragOpt);
						}
					}
					if (menu.data('prevNode')) {
						menu.data('prevNode').after(menu);
						menu.removeData('prevNode');
					}
					fm.trigger('closecontextmenu');
					if (fm.UA.iOS) {
						$('div.elfinder div.overflow-scrolling-touch').css('-webkit-overflow-scrolling', 'touch');
					}
				}
				
				autoSyncStop && fm.searchStatus.state < 1 && ! fm.searchStatus.ininc && fm.autoSync();
				autoSyncStop = false;
			},
			
			create = function(type, targets) {
				var sep    = false,
					insSep = false,
					cmdMap = {},
					disabled = [],
					isCwd = type === 'cwd',
					selcnt = 0;

				currentType = type;
				if (menu.data('cmdMaps')) {
					$.each(menu.data('cmdMaps'), function(i, v){
						if (targets[0].indexOf(i, 0) == 0) {
							cmdMap = v;
							return false;
						}
					});
				}
				if (!isCwd) {
					disabled = fm.getDisabledCmds(targets);
				}
				
				if (type === 'navbar') {
					fm.select({selected: targets, origin: 'navbar'});
				}

				selcnt = fm.selected().length;
				if (selcnt > 1) {
					menu.append('<div class="ui-corner-top ui-widget-header elfinder-contextmenu-header"><span>'
					 + fm.i18n('selectedItems', ''+selcnt)
					 + '</span></div>');
				}
				
				nodes = $();
				$.each(types[type]||[], function(i, name) {
					var cmd, node, submenu, hover;
					
					if (name === '|') {
						if (sep) {
							insSep = true;
						}
						return;
					}
					
					if (cmdMap[name]) {
						name = cmdMap[name];
					}
					cmd = fm.getCommand(name);

					if (cmd && !isCwd && (!fm.searchStatus.state || !cmd.disableOnSearch)) {
						cmd.__disabled = cmd._disabled;
						cmd._disabled = !(cmd.alwaysEnabled || (fm._commands[name] ? $.inArray(name, disabled) === -1 : false));
						$.each(cmd.linkedCmds, function(i, n) {
							var c;
							if (c = fm.getCommand(n)) {
								c.__disabled = c._disabled;
								c._disabled = !(c.alwaysEnabled || (fm._commands[n] ? $.inArray(n, disabled) === -1 : false));
							}
						});
					}

					if (cmd && cmd.getstate(targets) != -1) {
						if (cmd.variants) {
							if (!cmd.variants.length) {
								return;
							}
							node = item(cmd.title, cmd.className? cmd.className : cmd.name, function(){});
							
							submenu = $('<div class="ui-front ui-corner-all elfinder-contextmenu-sub"></div>')
								.hide()
								.appendTo(node.append('<span class="elfinder-contextmenu-arrow"></span>'));
							
							hover = function(show){
								if (! show) {
									submenu.hide();
								} else {
									var bstyle = base.attr('style');
									base.width(base.width());
									submenu.css({ left: 'auto', right: 'auto' });
									var nodeOffset = node.offset(),
										nodeleft   = nodeOffset.left,
										nodetop    = nodeOffset.top,
										nodewidth  = node.outerWidth(),
										width      = submenu.outerWidth(true),
										height     = submenu.outerHeight(true),
										baseOffset = base.offset(),
										wwidth     = baseOffset.left + base.width(),
										wheight    = baseOffset.top + base.height(),
										x, y, over;
	
									over = (nodeleft + nodewidth + width) - wwidth;
									x = (nodeleft > width && over > 0)? (fm.UA.Mobile? 10 - width : nodewidth - over) : nodewidth;
									if (subpos === 'right' && nodeleft < width) {
										x = fm.UA.Mobile? 30 - nodewidth : nodewidth - (width - nodeleft);
									}
									over = (nodetop + 5 + height) - wheight;
									y = (over > 0 && nodetop < wheight)? 5 - over : (over > 0? 30 - height : 5);
	
									menu.find('.elfinder-contextmenu-sub:visible').hide().parent().removeClass('ui-state-hover');
									submenu.css({ top : y }).css(subpos, x).show();
									base.attr('style', bstyle);
								}
							};
							
							node.addClass('elfinder-contextmenu-group')
								.on('touchstart', '.elfinder-contextmenu-sub', function(e) {
									node.data('touching', true);
								})
								.on('mouseleave', '.elfinder-contextmenu-sub', function(e) {
									if (! menu.data('draged')) {
										menu.removeData('submenuKeep');
									}
								})
								.on('click', '.'+smItem, function(e){
									var opts;
									e.stopPropagation();
									if (! menu.data('draged')) {
										menu.hide();
										opts = $(this).data('exec');
										if ($.isPlainObject(opts)) {
											opts._currentType = type;
										}
										close();
										cmd.exec(targets, opts);
									}
								})
								.on('touchend', function(e) {
									menu.data('submenuKeep', true);
								})
								.on('mouseenter mouseleave', function(e){
									if (e.type === 'mouseleave') {
										if (! menu.data('submenuKeep')) {
											node.data('timer', setTimeout(function() {
												node.removeData('timer');
												hover(false);
											}, 250));
										}
									} else {
										if (node.data('timer')) {
											clearTimeout(node.data('timer'));
											node.removeData('timer');
										}
										if (! node.data('touching')) {
											hover(true);
										}
									}
									node.removeData('touching');
								});
							
							$.each(cmd.variants, function(i, variant) {
								submenu.append(
									variant === '|' ? '<div class="elfinder-contextmenu-separator"></div>' :
									$('<div class="'+cmItem+' '+smItem+'"><span>'+variant[1]+'</span></div>').data('exec', variant[0])
								);
							});
								
						} else {
							node = item(cmd.title, cmd.className? cmd.className : cmd.name, function() {
								if (! menu.data('draged')) {
									close();
									cmd.exec(targets, {_currentType: type});
								}
							});
							if (cmd.extra && cmd.extra.node) {
								$('<span class="elfinder-button-icon elfinder-button-icon-'+(cmd.extra.icon || '')+' elfinder-contextmenu-extra-icon"></span>')
									.append(cmd.extra.node).appendTo(node);
								$(cmd.extra.node).trigger('ready');
							} else {
								node.remove('.elfinder-contextmenu-extra-icon');
							}
						}
						
						if (cmd.extendsCmd) {
							node.children('span.elfinder-button-icon').addClass('elfinder-button-icon-' + cmd.extendsCmd);
						}
						
						if (insSep) {
							menu.append('<div class="elfinder-contextmenu-separator"></div>');
						}
						menu.append(node);
						sep = true;
						insSep = false;
					}
					
					if (cmd && typeof cmd.__disabled !== 'undefined') {
						cmd._disabled = cmd.__disabled;
						delete cmd.__disabled;
						$.each(cmd.linkedCmds, function(i, n) {
							var c;
							if (c = fm.getCommand(n)) {
								c._disabled = c.__disabled;
								delete c.__disabled;
							}
						});
					}
				});
				nodes = menu.children('div.'+cmItem);
			},
			
			createFromRaw = function(raw) {
				currentType = 'raw';
				$.each(raw, function(i, data) {
					var node;
					
					if (data === '|') {
						menu.append('<div class="elfinder-contextmenu-separator"></div>');
					} else if (data.label && typeof data.callback == 'function') {
						node = item(data.label, data.icon, function() {
							if (! menu.data('draged')) {
								!data.remain && close();
								data.callback();
							}
						}, data.options || null);
						menu.append(node);
					}
				});
				nodes = menu.children('div.'+cmItem);
			},
			
			currentType = null;
		
		fm.one('load', function() {
			base = fm.getUI();
			cwd = fm.getUI('cwd');
			fm.bind('contextmenu', function(e) {
				var data = e.data,
					css = {},
					prevNode;

				if (!data.type || data.type !== 'files') {
					cwd.trigger('unselectall');
				}
				close();

				if (data.type && data.targets) {
					create(data.type, data.targets);
				} else if (data.raw) {
					createFromRaw(data.raw);
				}

				if (menu.children().length) {
					prevNode = data.prevNode || null;
					if (prevNode) {
						menu.data('prevNode', menu.prev());
						prevNode.after(menu);
					}
					if (data.fitHeight) {
						css = {maxHeight: Math.min(fm.getUI().height(), $(window).height()), overflowY: 'auto'};
						menu.draggable('destroy').removeClass('ui-draggable');
					}
					open(data.x, data.y, css);
				}
			})
			.one('destroy', function() { menu.remove(); })
			.bind('disable', close)
			.bind('select', function(){
				(currentType === 'files') && close();
			})
			.getUI().click(close);
		})
		.shortcut({
			pattern     : fm.OS === 'mac' ? 'ctrl+m' : 'contextmenu shift+f10',
			description : 'contextmenu',
			callback    : function(e) {
				e.stopPropagation();
				e.preventDefault();
				$(document).one('contextmenu.' + fm.namespace, function(e) {
					e.preventDefault();
					e.stopPropagation();
				});
				var sel = fm.selected(),
					type, targets, pos, elm;
				
				if (sel.length) {
					type = 'files';
					targets = sel;
					elm = $('#'+fm.cwdHash2Id(sel[0]));
				} else {
					type = 'cwd';
					targets = [ fm.cwd().hash ];
					pos = fm.getUI('workzone').offset();
				}
				if (! elm || ! elm.length) {
					elm = fm.getUI('workzone');
				}
				pos = elm.offset();
				pos.top += (elm.height() / 2);
				pos.left += (elm.width() / 2);
				fm.trigger('contextmenu', {
					'type'    : type,
					'targets' : targets,
					'x'       : pos.left,
					'y'       : pos.top
				});
			}
		});
		
	});
	
};


/*
 * File: /js/ui/cwd.js
 */

/**
 * elFinder current working directory ui.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindercwd = function(fm, options) {
	
	this.not('.elfinder-cwd').each(function() {
		// fm.time('cwdLoad');
		
		var mobile = fm.UA.Mobile,
			list = fm.viewType == 'list',

			undef = 'undefined',
			/**
			 * Select event full name
			 *
			 * @type String
			 **/
			evtSelect = 'select.'+fm.namespace,
			
			/**
			 * Unselect event full name
			 *
			 * @type String
			 **/
			evtUnselect = 'unselect.'+fm.namespace,
			
			/**
			 * Disable event full name
			 *
			 * @type String
			 **/
			evtDisable = 'disable.'+fm.namespace,
			
			/**
			 * Disable event full name
			 *
			 * @type String
			 **/
			evtEnable = 'enable.'+fm.namespace,
			
			c = 'class',
			/**
			 * File css class
			 *
			 * @type String
			 **/
			clFile       = fm.res(c, 'cwdfile'),
			
			/**
			 * Selected css class
			 *
			 * @type String
			 **/
			fileSelector = '.'+clFile,
			
			/**
			 * Selected css class
			 *
			 * @type String
			 **/
			clSelected = 'ui-selected',
			
			/**
			 * Disabled css class
			 *
			 * @type String
			 **/
			clDisabled = fm.res(c, 'disabled'),
			
			/**
			 * Draggable css class
			 *
			 * @type String
			 **/
			clDraggable = fm.res(c, 'draggable'),
			
			/**
			 * Droppable css class
			 *
			 * @type String
			 **/
			clDroppable = fm.res(c, 'droppable'),
			
			/**
			 * Hover css class
			 *
			 * @type String
			 **/
			clHover     = fm.res(c, 'hover'), 

			/**
			 * Hover css class
			 *
			 * @type String
			 **/
			clDropActive = fm.res(c, 'adroppable'),

			/**
			 * Css class for temporary nodes (for mkdir/mkfile) commands
			 *
			 * @type String
			 **/
			clTmp = clFile+'-tmp',

			/**
			 * Number of thumbnails to load in one request (new api only)
			 *
			 * @type Number
			 **/
			tmbNum = fm.options.loadTmbs > 0 ? fm.options.loadTmbs : 5,
			
			/**
			 * Current search query.
			 *
			 * @type String
			 */
			query = '',

			/**
			 * Currect clipboard(cut) hashes as object key
			 * 
			 * @type Object
			 */
			clipCuts = {},

			/**
			 * Parents hashes of cwd
			 *
			 * @type Array
			 */
			cwdParents = [],
			
			/**
			 * cwd current hashes
			 * 
			 * @type Array
			 */
			cwdHashes = [],

			/**
			 * incsearch current hashes
			 * 
			 * @type Array
			 */
			incHashes = void 0,

			/**
			 * Custom columns name and order
			 *
			 * @type Array
			 */
			customCols = [],

			/**
			 * Custom columns builder
			 *
			 * @type Function
			 */
			customColsBuild = function() {
				var cols = '';
				for (var i = 0; i < customCols.length; i++) {
					cols += '<td class="elfinder-col-'+customCols[i]+'">{' + customCols[i] + '}</td>';
				}
				return cols;
			},

			/**
			 * Make template.row from customCols
			 *
			 * @type Function
			 */
			makeTemplateRow = function() {
				return '<tr id="{id}" class="'+clFile+' {permsclass} {dirclass}" title="{tooltip}"{css}><td class="elfinder-col-name"><div class="elfinder-cwd-file-wrapper"><span class="elfinder-cwd-icon {mime}"{style}></span>{marker}<span class="elfinder-cwd-filename">{name}</span></div>'+selectCheckbox+'</td>'+customColsBuild()+'</tr>';
			},
			
			selectCheckbox = ($.map(options.showSelectCheckboxUA, function(t) {return (fm.UA[t] || t.match(/^all$/i))? true : null;}).length)? '<div class="elfinder-cwd-select"><input type="checkbox"></div>' : '',

			colResizing = false,
			
			colWidth = null,

			/**
			 * File templates
			 *
			 * @type Object
			 **/
			templates = {
				icon : '<div id="{id}" class="'+clFile+' {permsclass} {dirclass} ui-corner-all" title="{tooltip}"><div class="elfinder-cwd-file-wrapper ui-corner-all"><div class="elfinder-cwd-icon {mime} ui-corner-all" unselectable="on"{style}></div>{marker}</div><div class="elfinder-cwd-filename" title="{nametitle}">{name}</div>'+selectCheckbox+'</div>',
				row  : '',
			},
			
			permsTpl = fm.res('tpl', 'perms'),
			
			lockTpl = fm.res('tpl', 'lock'),
			
			symlinkTpl = fm.res('tpl', 'symlink'),
			
			/**
			 * Template placeholders replacement rules
			 *
			 * @type Object
			 **/
			replacement = {
				id : function(f) {
					return fm.cwdHash2Id(f.hash);
				},
				name : function(f) {
					var name = fm.escape(f.i18 || f.name);
					!list && (name = name.replace(/([_.])/g, '&#8203;$1'));
					return name;
				},
				nametitle : function(f) {
					return fm.escape(f.i18 || f.name);
				},
				permsclass : function(f) {
					return fm.perms2class(f);
				},
				perm : function(f) {
					return fm.formatPermissions(f);
				},
				dirclass : function(f) {
					var cName = f.mime == 'directory' ? 'directory' : '';
					f.isroot && (cName += ' isroot');
					f.csscls && (cName += ' ' + fm.escape(f.csscls));
					options.getClass && (cName += ' ' + options.getClass(f));
					return cName;
				},
				style : function(f) {
					return f.icon? 'style="background:url(\''+fm.escape(f.icon)+'\') 0 0 no-repeat;background-size:contain;"' : '';
				},
				mime : function(f) {
					return fm.mime2class(f.mime);
				},
				size : function(f) {
					return (f.mime === 'directory' && !f.size)? '-' : fm.formatSize(f.size);
				},
				date : function(f) {
					return fm.formatDate(f);
				},
				kind : function(f) {
					return fm.mime2kind(f);
				},
				mode : function(f) {
					return f.perm? fm.formatFileMode(f.perm) : '';
				},
				modestr : function(f) {
					return f.perm? fm.formatFileMode(f.perm, 'string') : '';
				},
				modeoct : function(f) {
					return f.perm? fm.formatFileMode(f.perm, 'octal') : '';
				},
				modeboth : function(f) {
					return f.perm? fm.formatFileMode(f.perm, 'both') : '';
				},
				marker : function(f) {
					return (f.alias || f.mime == 'symlink-broken' ? symlinkTpl : '')+(!f.read || !f.write ? permsTpl : '')+(f.locked ? lockTpl : '');
				},
				tooltip : function(f) {
					var title = fm.formatDate(f) + (f.size > 0 ? ' ('+fm.formatSize(f.size)+')' : ''),
						info  = '';
					if (query && f.path) {
						info = fm.escape(f.path.replace(/\/[^\/]*$/, ''));
					} else {
						info = f.tooltip? fm.escape(f.tooltip).replace(/\r/g, '&#13;') : '';
					}
					if (list) {
						info += (info? '&#13;' : '') + fm.escape(f.i18 || f.name);
					}
					return info? info + '&#13;' + title : title;
				}
			},
			
			/**
			 * Return file html
			 *
			 * @param  Object  file info
			 * @return String
			 **/
			itemhtml = function(f) {
				return templates[list ? 'row' : 'icon']
						.replace(/\{([a-z0-9_]+)\}/g, function(s, e) { 
							return replacement[e] ? replacement[e](f, fm) : (f[e] ? f[e] : ''); 
						});
			},
			
			/**
			 * jQueery node that will be selected next
			 * 
			 * @type Object jQuery node
			 */
			selectedNext = $(),
			
			/**
			 * Flag. Required for msie to avoid unselect files on dragstart
			 *
			 * @type Boolean
			 **/
			selectLock = false,
			
			/**
			 * Move selection to prev/next file
			 *
			 * @param String  move direction
			 * @param Boolean append to current selection
			 * @return void
			 * @rise select			
			 */
			select = function(keyCode, append) {
				var code     = $.ui.keyCode,
					prev     = keyCode == code.LEFT || keyCode == code.UP,
					sel      = cwd.find('[id].'+clSelected),
					selector = prev ? 'first:' : 'last',
					s, n, sib, top, left;

				function sibling(n, direction) {
					return n[direction+'All']('[id]:not(.'+clDisabled+'):not(.elfinder-cwd-parent):first');
				}
				
				if (sel.length) {
					s = sel.filter(prev ? ':first' : ':last');
					sib = sibling(s, prev ? 'prev' : 'next');
					
					if (!sib.length) {
						// there is no sibling on required side - do not move selection
						n = s;
					} else if (list || keyCode == code.LEFT || keyCode == code.RIGHT) {
						// find real prevoius file
						n = sib;
					} else {
						// find up/down side file in icons view
						top = s.position().top;
						left = s.position().left;

						n = s;
						if (prev) {
							do {
								n = n.prev('[id]');
							} while (n.length && !(n.position().top < top && n.position().left <= left));

							if (n.hasClass(clDisabled)) {
								n = sibling(n, 'next');
							}
						} else {
							do {
								n = n.next('[id]');
							} while (n.length && !(n.position().top > top && n.position().left >= left));
							
							if (n.hasClass(clDisabled)) {
								n = sibling(n, 'prev');
							}
							// there is row before last one - select last file
							if (!n.length) {
								sib = cwd.find('[id]:not(.'+clDisabled+'):last');
								if (sib.position().top > top) {
									n = sib;
								}
							}
						}
					}
					// !append && unselectAll();
				} else {
					if (selectedNext.length) {
						n = prev? selectedNext.prev() : selectedNext;
					} else {
						// there are no selected file - select first/last one
						n = cwd.find('[id]:not(.'+clDisabled+'):not(.elfinder-cwd-parent):'+(prev ? 'last' : 'first'));
					}
				}
				
				if (n && n.length && !n.hasClass('elfinder-cwd-parent')) {
					if (s && append) {
						// append new files to selected
						n = s.add(s[prev ? 'prevUntil' : 'nextUntil']('#'+n.attr('id'))).add(n);
					} else {
						// unselect selected files
						sel.trigger(evtUnselect);
					}
					// select file(s)
					n.trigger(evtSelect);
					// set its visible
					scrollToView(n.filter(prev ? ':first' : ':last'));
					// update cache/view
					trigger();
				}
			},
			
			selectedFiles = [],
			
			selectFile = function(hash) {
				$('#'+fm.cwdHash2Id(hash)).trigger(evtSelect);
			},
			
			selectAll = function() {
				var phash = fm.cwd().hash;

				selectCheckbox && selectAllCheckbox.find('input').prop('checked', true);
				fm.lazy(function() {
					var files;
					cwd.find('[id]:not(.'+clSelected+'):not(.elfinder-cwd-parent)').trigger(evtSelect);
					if (fm.maxTargets && (incHashes || cwdHashes).length > fm.maxTargets) {
						files = $.map(incHashes || cwdHashes, function(hash) { return fm.file(hash) || null });
						files = fm.sortFiles(files);
						selectedFiles = $.map(files, function(f) { return f.hash; });
					} else {
						selectedFiles = (incHashes || cwdHashes).concat();
					}
					trigger();
					selectCheckbox && selectAllCheckbox.data('pending', false);
				}, 0, {repaint: true});
			},
			
			/**
			 * Unselect all files
			 *
			 * @return void
			 */
			unselectAll = function() {
				selectCheckbox && selectAllCheckbox.find('input').prop('checked', false);
				if (selectedFiles.length) {
					selectLock = false;
					selectedFiles = [];
					cwd.find('[id].'+clSelected).trigger(evtUnselect);
					selectCheckbox && cwd.find('input:checkbox').prop('checked', false);
				} else {
					fm.select({selected: []});
				}
				trigger();
				selectCheckbox && selectAllCheckbox.data('pending', false);
				cwd.removeClass('elfinder-cwd-allselected');
			},
			
			/**
			 * Return selected files hashes list
			 *
			 * @return Array
			 */
			selected = function() {
				return selectedFiles;
			},
			
			/**
			 * Last selected node id
			 * 
			 * @type String|Void
			 */
			lastSelect = void 0,
			
			/**
			 * Fire elfinder "select" event and pass selected files to it
			 *
			 * @return void
			 */
			trigger = function() {
				if (selectCheckbox) {
					var all = (selectedFiles.length === cwdHashes.length);
					selectAllCheckbox.find('input').prop('checked', all);
					cwd[all? 'addClass' : 'removeClass']('elfinder-cwd-allselected');
				}
				fm.trigger('select', {selected : selectedFiles});
			},
			
			/**
			 * Scroll file to set it visible
			 *
			 * @param DOMElement  file/dir node
			 * @return void
			 */
			scrollToView = function(o, blink) {
				var ftop    = o.position().top,
					fheight = o.outerHeight(true),
					wtop    = wrapper.scrollTop(),
					wheight = wrapper.get(0).clientHeight,
					thheight = tableHeader? tableHeader.outerHeight(true) : 0;

				if (ftop + thheight + fheight > wtop + wheight) {
					wrapper.scrollTop(parseInt(ftop + thheight + fheight - wheight));
				} else if (ftop < wtop) {
					wrapper.scrollTop(ftop);
				}
				list && wrapper.scrollLeft(0);
				!!blink && fm.resources.blink(o, 'lookme');
			},
			
			/**
			 * Files we get from server but not show yet
			 *
			 * @type Array
			 **/
			buffer = [],
			
			/**
			 * Extra data of buffer
			 *
			 * @type Object
			 **/
			bufferExt = {},
			
			/**
			 * Return index of elements with required hash in buffer 
			 *
			 * @param String  file hash
			 * @return Number
			 */
			index = function(hash) {
				var l = buffer.length;
				
				while (l--) {
					if (buffer[l].hash == hash) {
						return l;
					}
				}
				return -1;
			},
			
			/**
			 * Scroll event name
			 *
			 * @type String
			 **/
			scrollEvent = 'elfscrstop',
			
			/**
			 * jQuery UI selectable option
			 * 
			 * @type Object
			 */
			selectableOption = {
				filter     : fileSelector,
				stop       : trigger,
				delay      : 250,
				appendTo   : 'body',
				autoRefresh: false,
				selected   : function(e, ui) { $(ui.selected).trigger(evtSelect); },
				unselected : function(e, ui) { $(ui.unselected).trigger(evtUnselect); }
			},
			
			/**
			 * display parent folder with ".." name
			 * 
			 * @param  String  phash
			 * @return void
			 */
			oldSchool = function(phash) {
				var phash = fm.cwd().phash,
					pdir  = fm.file(phash) || null,
					set   = function(pdir) {
						if (pdir) {
							parent = $(itemhtml($.extend(true, {}, pdir, {name : '..', mime : 'directory'})))
								.addClass('elfinder-cwd-parent')
								.bind('mousedown click mouseup touchstart touchmove touchend dblclick mouseenter', function(e) {
									e.preventDefault();
									e.stopPropagation();
								})
								.dblclick(function() {
									fm.exec('open', fm.cwdId2Hash(this.id));
								}
							);
							(list ? cwd.find('tbody') : cwd).prepend(parent);
						}
					};
				if (pdir) {
					set(pdir);
				} else {
					if (fm.getUI('tree').hasClass('elfinder-tree')) {
						fm.one('parents', function() {
							set(fm.file(phash) || null);
						});
					} else {
						fm.request({
							data : {cmd : 'parents', target : fm.cwd().hash},
							preventFail : true
						})
						.done(function(data) {
							set(fm.file(phash) || null);
						});
					}
				}
			},
			
			showFiles = fm.options.showFiles,
			
			/**
			 * Cwd scroll event handler.
			 * Lazy load - append to cwd not shown files
			 *
			 * @return void
			 */
			render = function() {
				var place = (list ? cwd.children('table').children('tbody') : cwd),
					chk,
					phash,
					proc    = false,
					// created document fragment for jQuery >= 1.12, 2.2, 3.0
					// see Studio-42/elFinder#1544 @ github
					docFlag = $.htmlPrefilter? true : false,
					tempDom = docFlag? $(document.createDocumentFragment()) : $('<div></div>'),
					go      = function(over){
						var over  = over || null,
							html  = [],
							dirs  = false,
							atmb  = {},
							stmb  = (fm.option('tmbUrl') === 'self'),
							files, locks, selected;
						
						files = buffer.splice(0, showFiles + (over || 0) / (bufferExt.hpi || 1));
						bufferExt.renderd += files.length;
						if (! buffer.length) {
							bottomMarker.hide();
							wrapper.off(scrollEvent, render);
						}
						
						locks = [];
						html = $.map(files, function(f) {
							if (f.hash && f.name) {
								if (f.mime == 'directory') {
									dirs = true;
								}
								if (f.tmb || (stmb && f.mime.indexOf('image/') === 0)) {
									atmb[f.hash] = f.tmb;
								}
								clipCuts[f.hash] && locks.push(f.hash);
								return itemhtml(f);
							}
							return null;
						});

						// html into temp node
						tempDom.empty().append(html.join(''));
						
						// make directory droppable
						dirs && !mobile && makeDroppable(tempDom);
						
						// check selected items
						selected = [];
						if (selectedFiles.length) {
							tempDom.find('[id]:not(.'+clSelected+'):not(.elfinder-cwd-parent)').each(function() {
								$.inArray(fm.cwdId2Hash(this.id), selectedFiles) !== -1 && selected.push($(this));
							});
						}
						
						// append to cwd
						place.append(docFlag? tempDom : tempDom.children());
						
						// trigger select
						if (selected.length) {
							$.each(selected, function(i, n) { n.trigger(evtSelect); });
							trigger();
						}
						
						locks.length && fm.trigger('lockfiles', {files: locks});
						!bufferExt.hpi && bottomMarkerShow(place, files.length);
						
						if (list) {
							// show thead
							cwd.find('thead').show();
							// fixed table header
							fixTableHeader({fitWidth: ! colWidth});
						}
						
						if (Object.keys(atmb).length) {
							if (Object.keys(bufferExt.attachTmbs).length < 1) {
								wrapper.off(scrollEvent, attachThumbnails).on(scrollEvent, attachThumbnails);
								fm.unbind('resize', attachThumbnails).bind('resize', attachThumbnails);
							}
							$.extend(bufferExt.attachTmbs, atmb);
							attachThumbnails(atmb);
						}
						
						wrapper.trigger(scrollEvent);
					};
				
				if (! bufferExt.renderd) {
					// first time to go()
					proc = true;
					// scroll top on dir load to avoid scroll after page reload
					wrapper.scrollTop(0);
					phash = fm.cwd().phash;
					go();
					if (options.oldSchool && phash && !query) {
						oldSchool(phash);
					}
					if (list) {
						colWidth && setColwidth();
						fixTableHeader({fitWidth: true});
					}
					bufferExt.itemH = (list? place.find('tr:first') : place.find('[id]:first')).outerHeight(true);
					fm.trigger('cwdrender');
					proc = false;
				} else if (! proc) {
					// next go()
					if ((chk = (wrapper.height() + wrapper.scrollTop() + fm.options.showThreshold + bufferExt.row) - (bufferExt.renderd * bufferExt.hpi)) > 0) {
						proc = true;
						fm.lazy(function() {
							go(chk);
							proc = false;
						});
					}
				}
			},
			
			// fixed table header jQuery object
			tableHeader = null,
			
			// To fixed table header colmun
			fixTableHeader = function(opts) {
				if (! options.listView.fixedHeader) {
					return;
				}
				var setPos = function() {
					var val, pos;
					
					if (fm.direction === 'ltr') {
						val = wrapper.scrollLeft() * -1;
						pos = 'left';
					} else {
						val = wrapper.scrollLeft();
						pos = 'right';
					}
					if (base.css(pos) !== val) {
						base.css(pos, val);
					}
				},
				opts = opts || {},
				cnt, base, table, thead, tbody, hheight, htr, btr, htd, btd, htw, btw, init;
				
				tbody = cwd.find('tbody');
				btr = tbody.children('tr:first');
				if (btr.length) {
					table = tbody.parent();
					if (! tableHeader) {
						init = true;
						tbody.addClass('elfinder-cwd-fixheader');
						thead = cwd.find('thead').attr('id', fm.namespace+'-cwd-thead');
						htr = thead.children('tr:first');
						hheight = htr.outerHeight(true);
						cwd.css('margin-top', hheight - parseInt(table.css('padding-top')));
						base = $('<div/>').addClass(cwd.attr('class')).append($('<table/>').append(thead));
						tableHeader = $('<div></div>').addClass(wrapper.attr('class') + ' elfinder-cwd-fixheader')
							.removeClass('ui-droppable native-droppable')
							.css(wrapper.position())
							.css('height', hheight)
							.append(base);
						if (fm.direction === 'rtl') {
							tableHeader.css('right', (fm.getUI().width() - wrapper.width()) + 'px');
						}
						setPos();
						wrapper.after(tableHeader)
							.on('scroll.fixheader resize.fixheader', function(e) {
								setPos();
								if (e.type === 'resize') {
									e.stopPropagation();
									fixTableHeader();
								}
							});
					} else {
						thead = $('#'+fm.namespace+'-cwd-thead');
						htr = thead.children('tr:first');
					}
					
					if (init || opts.fitWidth || Math.abs(btr.outerWidth() - htr.outerWidth()) > 2) {
						cnt = customCols.length + 1;
						for (var i = 0; i < cnt; i++) {
							htd = htr.children('td:eq('+i+')');
							btd = btr.children('td:eq('+i+')');
							htw = htd.width();
							btw = btd.width();
							if (typeof htd.data('delta') === 'undefined') {
								htd.data('delta', (htd.outerWidth() - htw) - (btd.outerWidth() - btw));
							}
							btw -= htd.data('delta');
							if (! init && ! opts.fitWidth && htw === btw) {
								break;
							}
							htd.css('width', btw + 'px');
						}
					}
					
					tableHeader.data('widthTimer') && clearTimeout(tableHeader.data('widthTimer'));
					tableHeader.data('widthTimer', setTimeout(function() {
						if (tableHeader) {
							if (fm.direction === 'rtl') {
								tableHeader.css('right', (fm.getUI().width() - wrapper.width()) + 'px');
							}
							tableHeader.css(wrapper.position()).css('width', cwd.outerWidth() + 'px');
						}
					}, 10));
				}
			},
			
			// Set colmun width
			setColwidth = function() {
				if (list && colWidth) {
					var cl = 'elfinder-cwd-colwidth',
					first = cwd.find('tr[id]:first'),
					former;
					if (! first.hasClass(cl)) {
						former = cwd.find('tr.'+cl);
						former.removeClass(cl).find('td').css('width', '');
						first.addClass(cl);
						cwd.find('table:first').css('table-layout', 'fixed');
						$.each($.merge(['name'], customCols), function(i, k) {
							var w = colWidth[k] || first.find('td.elfinder-col-'+k).width();
							first.find('td.elfinder-col-'+k).width(w);
						});
					}
				}
			},
			
			/**
			 * Droppable options for cwd.
			 * Drop target is `wrapper`
			 * Do not add class on childs file over
			 *
			 * @type Object
			 */
			droppable = $.extend({}, fm.droppable, {
				over : function(e, ui) {
					var dst    = $(this),
						helper = ui.helper,
						ctr    = (e.shiftKey || e.ctrlKey || e.metaKey),
						hash, status, inParent;
					e.stopPropagation();
					helper.data('dropover', helper.data('dropover') + 1);
					dst.data('dropover', true);
					if (helper.data('namespace') !== fm.namespace || ! fm.insideWorkzone(e.pageX, e.pageY)) {
						dst.removeClass(clDropActive);
						helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus');
						return;
					}
					if (dst.hasClass(fm.res(c, 'cwdfile'))) {
						hash = fm.cwdId2Hash(dst.attr('id'));
						dst.data('dropover', hash);
					} else {
						hash = fm.cwd().hash;
						fm.cwd().write && dst.data('dropover', hash);
					}
					inParent = (fm.file(helper.data('files')[0]).phash === hash);
					if (dst.data('dropover') === hash) {
						$.each(helper.data('files'), function(i, h) {
							if (h === hash || (inParent && !ctr && !helper.hasClass('elfinder-drag-helper-plus'))) {
								dst.removeClass(clDropActive);
								return false; // break $.each
							}
						});
					} else {
						dst.removeClass(clDropActive);
					}
					if (helper.data('locked') || inParent) {
						status = 'elfinder-drag-helper-plus';
					} else {
						status = 'elfinder-drag-helper-move';
						if (ctr) {
							status += ' elfinder-drag-helper-plus';
						}
					}
					dst.hasClass(clDropActive) && helper.addClass(status);
					setTimeout(function(){ dst.hasClass(clDropActive) && helper.addClass(status); }, 20);
				},
				out : function(e, ui) {
					var helper = ui.helper;
					e.stopPropagation();
					helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus').data('dropover', Math.max(helper.data('dropover') - 1, 0));
					$(this).removeData('dropover')
					       .removeClass(clDropActive);
				},
				deactivate : function() {
					$(this).removeData('dropover')
					       .removeClass(clDropActive);
				},
				drop : function(e, ui) {
					unselectAll();
					fm.droppable.drop.call(this, e, ui);
				}
			}),
			
			/**
			 * Make directory droppable
			 *
			 * @return void
			 */
			makeDroppable = function(place) {
				place = place? place : (list ? cwd.find('tbody') : cwd);
				var targets = place.children('.directory:not(.'+clDroppable+',.elfinder-na,.elfinder-ro)');

				if (fm.isCommandEnabled('paste')) {
					targets.droppable(droppable);
				}
				if (fm.isCommandEnabled('upload')) {
					targets.addClass('native-droppable');
				}
				
				place.children('.isroot').each(function(i, n) {
					var $n   = $(n),
						hash = fm.cwdId2Hash(n.id);
					
					if (fm.isCommandEnabled('paste', hash)) {
						if (! $n.hasClass(clDroppable+',elfinder-na,elfinder-ro')) {
							$n.droppable(droppable);
						}
					} else {
						if ($n.hasClass(clDroppable)) {
							$n.droppable('destroy');
						}
					}
					if (fm.isCommandEnabled('upload', hash)) {
						if (! $n.hasClass('native-droppable,elfinder-na,elfinder-ro')) {
							$n.addClass('native-droppable');
						}
					} else {
						if ($n.hasClass('native-droppable')) {
							$n.removeClass('native-droppable');
						}
					}
				});
			},
			
			/**
			 * Preload required thumbnails and on load add css to files.
			 * Return false if required file is not visible yet (in buffer) -
			 * required for old api to stop loading thumbnails.
			 *
			 * @param  Object  file hash -> thumbnail map
			 * @param  Bool    reload
			 * @return void
			 */
			attachThumbnails = function(image, reload) {
				var url  = fm.option('tmbUrl'),
					done = [],
					attach = function(node, tmb) {
						$('<img>')
							.on('load', function() {
								node.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')");
							})
							.attr('src', tmb.url);
					},
					chk  = function(hash, tmb) {
						var node = $('#'+fm.cwdHash2Id(hash)),
							file, tmbObj, reloads = [];
	
						if (node.length) {
							if (fm.isInWindow(node, true)) {
								if (tmb != '1') {
									file = fm.file(hash);
									if (file.tmb !== tmb) {
										file.tmb = tmb;
									}
									tmbObj = fm.tmb(file);
									if (reload) {
										fm.reloadContents(tmbObj.url).done(function() {
											node.find('.elfinder-cwd-icon').addClass(tmbObj.className).css('background-image', "url('"+tmbObj.url+"')");
										});
									} else {
										attach(node, tmbObj);
									}
								} else {
									if (reload) {
										reloads.push(hash);
									} else {
										bufferExt.getTmbs.push(hash);
									}
								}
								done.push(hash);
							}
						}
						
						$.each(done, function(i, h) {
							delete bufferExt.attachTmbs[h];
						});
						if (reload) {
							loadThumbnails(reloads);
						} else if (bufferExt.getTmbs.length) {
							loadThumbnails();
						}
						if (Object.keys(bufferExt.attachTmbs).length < 1 && bufferExt.getTmbs.length < 1) {
							wrapper.off(scrollEvent, attachThumbnails);
							fm.unbind('resize', attachThumbnails);
						}
					};

				if ($.isPlainObject(image) && Object.keys(image).length) {
					$.extend(bufferExt.attachTmbs, image);
					$.each(image, chk);
				} else {
					bufferExt.attachThumbTm && clearTimeout(bufferExt.attachThumbTm);
					bufferExt.attachThumbTm = setTimeout(function() {
						$.each(bufferExt.attachTmbs, chk);
					}, 0);
				}
			},
			
			/**
			 * Load thumbnails from backend.
			 *
			 * @param  Array|void reloads  hashes list for reload thumbnail items
			 * @return void
			 */
			loadThumbnails = function(reloads) {
				var tmbs = [],
					reload = false;
				
				// do not parallel request
				if (bufferExt.gettingTmb && ! reloads) {
					return;
				}
				
				if (! reloads) {
					bufferExt.gettingTmb = true;
				}
				
				if (fm.oldAPI) {
					fm.request({
						data : {cmd : 'tmb', current : fm.cwd().hash},
						preventFail : true
					})
					.done(function(data) {
						bufferExt.gettingTmb = false;
						if (data.images && Object.keys(data.images).length) {
							attachThumbnails(data.images);
						}
						if (data.tmb) {
							loadThumbnails();
						}
					})
					.fail(function() {
						bufferExt.gettingTmb = false;
					});
					return;
				} 

				if (reloads) {
					reload = true;
					tmbs = reloads.splice(0, tmbNum);
				} else {
					tmbs = bufferExt.getTmbs.splice(0, tmbNum);
				}
				if (tmbs.length) {
					if (reload || fm.isInWindow($('#'+fm.cwdHash2Id(tmbs[0])), true) || fm.isInWindow($('#'+fm.cwdHash2Id(tmbs[tmbs.length-1])), true)) {
						fm.request({
							data : {cmd : 'tmb', targets : tmbs},
							preventFail : true
						})
						.done(function(data) {
							bufferExt.gettingTmb = false;
							if (data.images && Object.keys(data.images).length) {
								attachThumbnails(data.images, reload);
							}
							if (reload) {
								if (reloads.length) {
									loadThumbnails(reloads);
								}
							} else {
								if (bufferExt.getTmbs.length) {
									loadThumbnails();
								}
							}
						})
						.fail(function() {
							bufferExt.gettingTmb = false;
						});
					} else {
						// out of window tmb get later
						$.each(tmbs, function(i, h) {
							bufferExt.attachTmbs[h] = '1';
						});
						bufferExt.gettingTmb = false;
						attachThumbnails();
					}
				}
			},
			
			/**
			 * Add new files to cwd/buffer
			 *
			 * @param  Array  new files
			 * @return void
			 */
			add = function(files, mode) {
				var place    = list ? cwd.find('tbody') : cwd,
					l        = files.length, 
					atmb     = {},
					ltmb     = {},
					findNode = function(file) {
						var pointer = cwd.find('[id]:first'), file2;

						while (pointer.length) {
							file2 = fm.file(fm.cwdId2Hash(pointer.attr('id')));
							if (!pointer.hasClass('elfinder-cwd-parent') && file2 && fm.compare(file, file2) < 0) {
								return pointer;
							}
							pointer = pointer.next('[id]');
						}
					},
					findIndex = function(file) {
						var l = buffer.length, i;
						
						for (i =0; i < l; i++) {
							if (fm.compare(file, buffer[i]) < 0) {
								return i;
							}
						}
						return l || -1;
					},
					// created document fragment for jQuery >= 1.12, 2.2, 3.0
					// see Studio-42/elFinder#1544 @ github
					docFlag = $.htmlPrefilter? true : false,
					tempDom = docFlag? $(document.createDocumentFragment()) : $('<div></div>'),
					file, hash, node, nodes, ndx;

				if (l > showFiles) {
					// re-render for performance tune
					content();
					selectedFiles = files.concat();
					trigger();
				} else {
					// add the item immediately
					l && wz.removeClass('elfinder-cwd-wrapper-empty');
					
					while (l--) {
						file = files[l];
						hash = file.hash;
						
						if ($('#'+fm.cwdHash2Id(hash)).length) {
							continue;
						}
						
						if ((node = findNode(file)) && ! node.length) {
							node = null;
						}
						if (! node && (ndx = findIndex(file)) >= 0) {
							buffer.splice(ndx, 0, file);
						} else {
							tempDom.empty().append(itemhtml(file));
							(file.mime === 'directory') && !mobile && makeDroppable(tempDom);
							nodes = docFlag? tempDom : tempDom.children();
							if (node) {
								node.before(nodes);
							} else {
								place.append(nodes);
							}
						}
						
						if ($('#'+fm.cwdHash2Id(hash)).length) {
							if (file.mime !== 'directory' && file.tmb) {
								if (file.tmb == 1) {
									ltmb[hash] = file.tmb;
								} else {
									atmb[hash] = file.tmb;
								}
							}
						}
					}
	
					setColwidth();
					bottomMarkerShow(place);
					if (Object.keys(atmb).length || Object.keys(ltmb).length) {
						if (Object.keys(bufferExt.attachTmbs).length < 1) {
							wrapper.off(scrollEvent, attachThumbnails).on(scrollEvent, attachThumbnails);
							fm.unbind('resize', attachThumbnails).bind('resize', attachThumbnails);
						}
						$.extend(bufferExt.attachTmbs, atmb, ltmb);
						Object.keys(atmb).length && attachThumbnails(atmb, (mode === 'change' && fm.currentReqCmd === 'resize')? true : false);
						Object.keys(ltmb).length && attachThumbnails(ltmb);
					}
				}
			},
			
			/**
			 * Remove files from cwd/buffer
			 *
			 * @param  Array  files hashes
			 * @return void
			 */
			remove = function(files) {
				var l = files.length, hash, n, ndx;

				// removed cwd
				if (!fm.cwd().hash && fm.currentReqCmd !== 'open') {
					$.each(cwdParents.reverse(), function(i, h) {
						if (fm.files()[h]) {
							fm.one(fm.currentReqCmd + 'done', function(e, fm) {
								!fm.cwd().hash && fm.exec('open', h);
							});
							return false;
						}
					});
					return;
				}
				
				while (l--) {
					hash = files[l];
					if ((n = $('#'+fm.cwdHash2Id(hash))).length) {
						try {
							n.remove();
							--bufferExt.renderd;
						} catch(e) {
							fm.debug('error', e);
						}
					} else if ((ndx = index(hash)) != -1) {
						buffer.splice(ndx, 1);
					}
				}
				
				setColwidth();
			},
			
			msg = {
				name : fm.i18n('name'),
				perm : fm.i18n('perms'),
				date : fm.i18n('modify'),
				size : fm.i18n('size'),
				kind : fm.i18n('kind'),
				modestr : fm.i18n('mode'),
				modeoct : fm.i18n('mode'),
				modeboth : fm.i18n('mode'),
			},
			
			customColsNameBuild = function() {
				var name = '',
				customColsName = '',
				names = $.extend({}, msg, options.listView.columnsCustomName);
				for (var i = 0; i < customCols.length; i++) {
					if (typeof names[customCols[i]] !== 'undefined') {
						name = names[customCols[i]];
					} else {
						name = fm.i18n(customCols[i]);
					}
					customColsName +='<td class="elfinder-cwd-view-th-'+customCols[i]+' sortable-item">'+name+'</td>';
				}
				return customColsName;
			},
			
			bottomMarkerShow = function(place, cnt) {
				var ph, col = 1;
				place = place || (list ? cwd.find('tbody') : cwd);

				if (buffer.length > 0) {
					place.css({height: 'auto'});
					ph = place.height();
					if (cnt) {
						if (! list) {
							col = Math.floor(place.width()/place.find('[id]:first').width());
							cnt = Math.ceil(cnt/col) * col;
						}
						bufferExt.hpi = ph / cnt;
						bufferExt.row = bufferExt.hpi * col;
					}
					bottomMarker.css({top: (bufferExt.hpi * buffer.length + ph) + 'px'}).show();
				}
			},
			
			wrapperContextMenu = {
				contextmenu : function(e) {
					e.preventDefault();
					fm.trigger('contextmenu', {
						'type'    : 'cwd',
						'targets' : [fm.cwd().hash],
						'x'       : e.pageX,
						'y'       : e.pageY
					});
				},
				touchstart : function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					cwd.data('longtap', null);
					wrapper.data('touching', {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY});
					if (e.target === this || e.target === cwd.get(0)) {
						cwd.data('tmlongtap', setTimeout(function(){
							// long tap
							cwd.data('longtap', true);
							fm.trigger('contextmenu', {
								'type'    : 'cwd',
								'targets' : [fm.cwd().hash],
								'x'       : wrapper.data('touching').x,
								'y'       : wrapper.data('touching').y
							});
						}, 500));
					}
				},
				touchend : function(e) {
					if (e.type === 'touchmove') {
						if (! wrapper.data('touching') ||
								( Math.abs(wrapper.data('touching').x - e.originalEvent.touches[0].pageX)
								+ Math.abs(wrapper.data('touching').y - e.originalEvent.touches[0].pageY)) > 4) {
							wrapper.data('touching', null);
						}
					}
					clearTimeout(cwd.data('tmlongtap'));
				},
				click : function(e) {
					if (cwd.data('longtap')) {
						e.preventDefault();
						e.stopPropagation();
					}
				}
			},
			
			/**
			 * Update directory content
			 *
			 * @return void
			 */
			content = function() {
				var phash, emptyMethod, thtr;

				wz.append(selectAllCheckbox).removeClass('elfinder-cwd-wrapper-empty elfinder-search-result elfinder-incsearch-result');
				if (fm.searchStatus.state > 1 || fm.searchStatus.ininc) {
					wz.addClass('elfinder-search-result' + (fm.searchStatus.ininc? ' elfinder-incsearch-result' : ''));
				}
				
				selectedNext = $();
				try {
					// to avoid problem with draggable
					cwd.empty();
				} catch (e) {
					cwd.html('');
				}
				
				if (tableHeader) {
					wrapper.off('scroll.fixheader resize.fixheader');
					tableHeader.remove();
					tableHeader = null;
				}

				cwd.removeClass('elfinder-cwd-view-icons elfinder-cwd-view-list')
					.addClass('elfinder-cwd-view-'+(list ? 'list' :'icons'))
					.attr('style', '')
					.css('height', 'auto');
				bottomMarker.hide();

				wrapper[list ? 'addClass' : 'removeClass']('elfinder-cwd-wrapper-list')
					._padding = parseInt(wrapper.css('padding-top')) + parseInt(wrapper.css('padding-bottom'));
				if (fm.UA.iOS) {
					wrapper.removeClass('overflow-scrolling-touch').addClass('overflow-scrolling-touch');
				}

				if (list) {
					cwd.html('<table><thead></thead><tbody></tbody></table>');
					thtr = $('<tr class="ui-state-default"><td class="elfinder-cwd-view-th-name">'+msg.name+'</td>'+customColsNameBuild()+'</tr>');
					cwd.find('thead').hide().append(
						thtr
						.on('contextmenu.'+fm.namespace, wrapperContextMenu.contextmenu)
						.on('touchstart.'+fm.namespace, 'td', wrapperContextMenu.touchstart)
						.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace+' mouseup.'+fm.namespace, 'td', wrapperContextMenu.touchend)
						.on('click.'+fm.namespace,'td', wrapperContextMenu.click)
					).find('td:first').append(selectAllCheckbox);

					if ($.fn.sortable) {
						thtr.addClass('touch-punch touch-punch-keep-default')
							.sortable({
							axis: 'x',
							distance: 8,
							items: '> .sortable-item',
							start: function(e, ui) {
								$(ui.item[0]).data('dragging', true);
								ui.placeholder
									.width(ui.helper.removeClass('ui-state-hover').width())
									.removeClass('ui-state-active')
									.addClass('ui-state-hover')
									.css('visibility', 'visible');
							},
							update: function(e, ui){
								var target = $(ui.item[0]).attr('class').split(' ')[0].replace('elfinder-cwd-view-th-', ''),
									prev, done;
								customCols = $.map($(this).children(), function(n) {
									var name = $(n).attr('class').split(' ')[0].replace('elfinder-cwd-view-th-', '');
									if (! done) {
										if (target === name) {
											done = true;
										} else {
											prev = name;
										}
									}
									return (name === 'name')? null : name;
								});
								templates.row = makeTemplateRow();
								fm.storage('cwdCols', customCols);
								prev = '.elfinder-col-'+prev+':first';
								target = '.elfinder-col-'+target+':first';
								fm.lazy(function() {
									cwd.find('tbody tr').each(function() {
										var $this = $(this);
										$this.children(prev).after($this.children(target));
									});
								});
							},
							stop: function(e, ui) {
								setTimeout(function() {
									$(ui.item[0]).removeData('dragging');
								}, 100);
							}
						});
					}

					if ($.fn.resizable) {
						thtr.find('td').addClass('touch-punch').resizable({
							handles: fm.direction === 'ltr'? 'e' : 'w',
							start: function(e, ui) {
								var target = cwd.find('td.elfinder-col-'
									+ ui.element.attr('class').split(' ')[0].replace('elfinder-cwd-view-th-', '')
									+ ':first');
								
								ui.element
									.data('resizeTarget', target)
									.data('targetWidth', target.width());
								colResizing = true;
								if (cwd.find('table').css('table-layout') !== 'fixed') {
									cwd.find('tbody tr:first td').each(function() {
										$(this).width($(this).width());
									});
									cwd.find('table').css('table-layout', 'fixed');
								}
							},
							resize: function(e, ui) {
								ui.element.data('resizeTarget').width(ui.element.data('targetWidth') - (ui.originalSize.width - ui.size.width));
							},
							stop : function() {
								colResizing = false;
								fixTableHeader({fitWidth: true});
								colWidth = {};
								cwd.find('tbody tr:first td').each(function() {
									var name = $(this).attr('class').split(' ')[0].replace('elfinder-col-', '');
									colWidth[name] = $(this).width();
								});
								fm.storage('cwdColWidth', colWidth);
							}
						})
						.find('.ui-resizable-handle').addClass('ui-icon ui-icon-grip-dotted-vertical');
					}
				}

				fm.lazy(function() {
					buffer = $.map(incHashes || cwdHashes, function(hash) { return fm.file(hash) || null });
					
					buffer = fm.sortFiles(buffer);
					bufferExt = {
						renderd: 0,
						attachTmbs: {},
						getTmbs: [],
						lazyOpts: { tm : 0 }
					};
					
					wz[(buffer.length < 1) ? 'addClass' : 'removeClass']('elfinder-cwd-wrapper-empty');
					wrapper.off(scrollEvent, render).on(scrollEvent, render).trigger(scrollEvent);
					
					// set droppable
					if (!fm.cwd().write) {
						wrapper.removeClass('native-droppable')
						       .droppable('disable')
						       .removeClass('ui-state-disabled'); // for old jQueryUI see https://bugs.jqueryui.com/ticket/5974
					} else {
						wrapper[fm.isCommandEnabled('upload')? 'addClass' : 'removeClass']('native-droppable');
						wrapper.droppable('enable');
					}
				});
			},
			
			/**
			 * CWD node itself
			 *
			 * @type JQuery
			 **/
			cwd = $(this)
				.addClass('ui-helper-clearfix elfinder-cwd')
				.attr('unselectable', 'on')
				// fix ui.selectable bugs and add shift+click support 
				.on('click.'+fm.namespace, fileSelector, function(e) {
					var p    = this.id ? $(this) : $(this).parents('[id]:first'),
						tgt  = $(e.target),
						prev,
						next,
						pl,
						nl,
						sib;

					if (selectCheckbox && (tgt.is('input:checkbox') || tgt.hasClass('elfinder-cwd-select'))) {
						e.stopPropagation();
						e.preventDefault();
						if (! wrapper.data('touching')) {
							p.trigger(p.hasClass(clSelected) ? evtUnselect : evtSelect);
							trigger();
						}
						setTimeout(function() {
							tgt.prop('checked', p.hasClass(clSelected));
						}, 10);
						
						return false;
					}
					
					if (cwd.data('longtap')) {
						e.stopPropagation();
						return;
					}

					if (e.shiftKey) {
						prev = p.prevAll(lastSelect || '.'+clSelected+':first');
						next = p.nextAll(lastSelect || '.'+clSelected+':first');
						pl   = prev.length;
						nl   = next.length;
					}
					if (e.shiftKey && (pl || nl)) {
						sib = pl ? p.prevUntil('#'+prev.attr('id')) : p.nextUntil('#'+next.attr('id'));
						sib.add(p).trigger(evtSelect);
					} else if (e.ctrlKey || e.metaKey) {
						p.trigger(p.hasClass(clSelected) ? evtUnselect : evtSelect);
					} else {
						if (wrapper.data('touching') && p.hasClass(clSelected)) {
							wrapper.data('touching', null);
							fm.dblclick({file : fm.cwdId2Hash(this.id)});
							return;
						} else {
							unselectAll();
							p.trigger(evtSelect);
						}
					}

					trigger();
				})
				// call fm.open()
				.on('dblclick.'+fm.namespace, fileSelector, function(e) {
					fm.dblclick({file : fm.cwdId2Hash(this.id)});
				})
				// for touch device
				.on('touchstart.'+fm.namespace, fileSelector, function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					var p   = this.id ? $(this) : $(this).parents('[id]:first'),
						tgt = $(e.target),
						sel;
					
					wrapper.data('touching', {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY});
					if (selectCheckbox && (tgt.is('input:checkbox') || tgt.hasClass('elfinder-cwd-select'))) {
						setTimeout(function() {
							if (wrapper.data('touching')) {
								p.trigger(p.hasClass(clSelected) ? evtUnselect : evtSelect);
								trigger();
							}
						}, 150);
						return;
					}

					if (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA') {
						return;
					}
					
					sel = p.prevAll('.'+clSelected+':first').length +
					      p.nextAll('.'+clSelected+':first').length;
					cwd.data('longtap', null);
					p.addClass(clHover)
					 .data('tmlongtap', setTimeout(function(){
						// long tap
						cwd.data('longtap', true);
						if (e.target.nodeName != 'TD' || fm.selected().length > 0) {
							p.trigger(evtSelect);
							trigger();
							fm.trigger('contextmenu', {
								'type'    : 'files',
								'targets' : fm.selected(),
								'x'       : e.originalEvent.touches[0].pageX,
								'y'       : e.originalEvent.touches[0].pageY
							});
						}
					}, 500));
				})
				.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace, fileSelector, function(e) {
					if (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA' || $(e.target).hasClass('elfinder-cwd-select')) {
						return;
					}
					var p = this.id ? $(this) : $(this).parents('[id]:first');
					clearTimeout(p.data('tmlongtap'));
					if (e.type === 'touchmove') {
						wrapper.data('touching', null);
						p.removeClass(clHover);
					} else if (wrapper.data('touching') && !cwd.data('longtap') && p.hasClass(clSelected)) {
						e.preventDefault();
						wrapper.data('touching', null);
						fm.dblclick({file : fm.cwdId2Hash(this.id)});
					}
				})
				// attach draggable
				.on('mouseenter.'+fm.namespace, fileSelector, function(e) {
					var $this = $(this), helper = null,
						target = list ? $this : $this.children('div.elfinder-cwd-file-wrapper,div.elfinder-cwd-filename');

					if (!mobile && !$this.hasClass(clTmp) && !target.hasClass(clDraggable) && !target.hasClass(clDisabled)) {
						target.on('mousedown', function(e) {
							// shiftKey + drag start for HTML5 native drag function
							if (e.shiftKey && !fm.UA.IE && cwd.data('selectable')) {
								// destroy jQuery-ui selectable while trigger native drag
								cwd.selectable('destroy').data('selectable', false);
								setTimeout(function(){
									cwd.selectable(selectableOption).data('selectable', true);
								}, 10);
							}
							target.draggable('option', 'disabled', e.shiftKey).removeClass('ui-state-disabled');
							if (e.shiftKey) {
								target.attr('draggable', 'true');
							} else {
								target.removeAttr('draggable')
								      .draggable('option', 'cursorAt', {left: 50 - parseInt($(e.currentTarget).css('margin-left')), top: 47});
							}
						})
						.on('dragstart', function(e) {
							var dt = e.dataTransfer || e.originalEvent.dataTransfer || null;
							helper = null;
							if (dt && !fm.UA.IE) {
								var p = this.id ? $(this) : $(this).parents('[id]:first'),
									elm   = $('<span>'),
									url   = '',
									durl  = null,
									murl  = null,
									files = [],
									icon  = function(f) {
										var mime = f.mime, i, tmb = fm.tmb(f);
										i = '<div class="elfinder-cwd-icon '+fm.mime2class(mime)+' ui-corner-all"></div>';
										if (tmb) {
											i = $(i).addClass(tmb.className).css('background-image', "url('"+tmb.url+"')").get(0).outerHTML;
										}
										return i;
									}, l, geturl = [];
								p.trigger(evtSelect);
								trigger();
								$.each(selectedFiles, function(i, v){
									var file = fm.file(v),
										furl = file.url;
									if (file && file.mime !== 'directory') {
										if (!furl) {
											furl = fm.url(file.hash);
										} else if (furl == '1') {
											geturl.push(v);
											return true;
										}
										if (furl) {
											furl = fm.convAbsUrl(furl);
											files.push(v);
											$('<a>').attr('href', furl).text(furl).appendTo(elm);
											url += furl + "\n";
											if (!durl) {
												durl = file.mime + ':' + file.name + ':' + furl;
											}
											if (!murl) {
												murl = furl + "\n" + file.name;
											}
										}
									}
								});
								if (geturl.length) {
									$.each(geturl, function(i, v){
										var rfile = fm.file(v);
										rfile.url = '';
										fm.request({
											data : {cmd : 'url', target : v},
											notify : {type : 'url', cnt : 1},
											preventDefault : true
										})
										.always(function(data) {
											rfile.url = data.url? data.url : '1';
										});
									});
									return false;
								} else if (url) {
									if (dt.setDragImage) {
										helper = $('<div class="elfinder-drag-helper html5-native"></div>').append(icon(fm.file(files[0]))).appendTo($(document.body));
										if ((l = files.length) > 1) {
											helper.append(icon(fm.file(files[l-1])) + '<span class="elfinder-drag-num">'+l+'</span>');
										}
										dt.setDragImage(helper.get(0), 50, 47);
									}
									dt.effectAllowed = 'copyLink';
									dt.setData('DownloadURL', durl);
									dt.setData('text/x-moz-url', murl);
									dt.setData('text/uri-list', url);
									dt.setData('text/plain', url);
									dt.setData('text/html', elm.html());
									dt.setData('elfinderfrom', window.location.href + fm.cwd().hash);
									dt.setData('elfinderfrom:' + dt.getData('elfinderfrom'), '');
								} else {
									return false;
								}
							}
						})
						.on('dragend', function(e){
							unselectAll();
							helper && helper.remove();
						})
						.draggable(fm.draggable);
					}
				})
				// add hover class to selected file
				.on(evtSelect, fileSelector, function(e) {
					var $this = $(this),
						id    = fm.cwdId2Hash($this.attr('id'));
					
					if (!selectLock && !$this.hasClass(clDisabled)) {
						lastSelect = '#'+ this.id;
						$this.addClass(clSelected).children().addClass(clHover).find('input:checkbox').prop('checked', true);;
						if ($.inArray(id, selectedFiles) === -1) {
							selectedFiles.push(id);
						}
						// will be selected next
						selectedNext = cwd.find('[id].'+clSelected+':last').next();
					}
				})
				// remove hover class from unselected file
				.on(evtUnselect, fileSelector, function(e) {
					var $this = $(this), 
						id    = fm.cwdId2Hash($this.attr('id')),
						ndx;
					
					if (!selectLock) {
						$this.removeClass(clSelected).children().removeClass(clHover).find('input:checkbox').prop('checked', false);
						if (cwd.hasClass('elfinder-cwd-allselected')) {
							selectCheckbox && selectAllCheckbox.children('input').prop('checked', false);
							cwd.removeClass('elfinder-cwd-allselected');
						}
						ndx = $.inArray(id, selectedFiles);
						if (ndx !== -1) {
							lastSelect = void 0;
							selectedFiles.splice(ndx, 1);
						}
					}
					
				})
				// disable files wich removing or moving
				.on(evtDisable, fileSelector, function() {
					var $this  = $(this).removeClass(clHover+' '+clSelected).addClass(clDisabled), 
						child  = $this.children(),
						target = (list ? $this : child.find('div.elfinder-cwd-file-wrapper,div.elfinder-cwd-filename'));
					
					child.removeClass(clHover+' '+clSelected);
					
					$this.hasClass(clDroppable) && $this.droppable('disable');
					target.hasClass(clDraggable) && target.draggable('disable');
				})
				// if any files was not removed/moved - unlock its
				.on(evtEnable, fileSelector, function() {
					var $this  = $(this).removeClass(clDisabled), 
						target = list ? $this : $this.children('div.elfinder-cwd-file-wrapper,div.elfinder-cwd-filename');
					
					$this.hasClass(clDroppable) && $this.droppable('enable');	
					target.hasClass(clDraggable) && target.draggable('enable');
				})
				.on('scrolltoview', fileSelector, function() {
					scrollToView($(this), true);
				})
				.on('mouseenter.'+fm.namespace+' mouseleave.'+fm.namespace, fileSelector, function(e) {
					fm.trigger('hover', {hash : fm.cwdId2Hash($(this).attr('id')), type : e.type});
					$(this).toggleClass(clHover, (e.type == 'mouseenter'));
				})
				.on('contextmenu.'+fm.namespace, function(e) {
					var file = $(e.target).closest('.'+clFile);
					
					if (file.length && (e.target.nodeName != 'TD' || $.inArray(fm.cwdId2Hash(file.get(0).id), fm.selected()) > -1)) {
						e.stopPropagation();
						e.preventDefault();
						if (!file.hasClass(clDisabled) && !wrapper.data('touching')) {
							if (!file.hasClass(clSelected)) {
								unselectAll();
								file.trigger(evtSelect);
								trigger();
							}
							fm.trigger('contextmenu', {
								'type'    : 'files',
								'targets' : fm.selected(),
								'x'       : e.pageX,
								'y'       : e.pageY
							});

						}
						
					}
				})
				// unselect all on cwd click
				.on('click.'+fm.namespace, function(e) {
					if (e.target === this && ! cwd.data('longtap')) {
						!e.shiftKey && !e.ctrlKey && !e.metaKey && unselectAll();
					}
				})
				// prepend fake file/dir
				.on('create.'+fm.namespace, function(e, file) {
					var parent = list ? cwd.find('tbody') : cwd,
						p = parent.find('.elfinder-cwd-parent'),
						lock = file.move || false,
						file = $(itemhtml(file)).addClass(clTmp),
						selected = fm.selected();
						
					if (selected.length) {
						lock && fm.trigger('lockfiles', {files: selected});
					} else {
						unselectAll();
					}

					if (p.length) {
						p.after(file);
					} else {
						parent.prepend(file);
					}
					
					setColwidth();
					wrapper.scrollTop(0).scrollLeft(0);
				})
				// unselect all selected files
				.on('unselectall', unselectAll)
				.on('selectfile', function(e, id) {
					$('#'+fm.cwdHash2Id(id)).trigger(evtSelect);
					trigger();
				})
				.on('colwidth', function() {
					if (list) {
						cwd.find('table').css('table-layout', '')
							.find('td').css('width', '');
						fixTableHeader({fitWidth: true});
						fm.storage('cwdColWidth', colWidth = null);
					}
				}),
			wrapper = $('<div class="elfinder-cwd-wrapper"></div>')
				// make cwd itself droppable for folders from nav panel
				.droppable($.extend({}, droppable, {autoDisable: false}))
				.on('contextmenu.'+fm.namespace, wrapperContextMenu.contextmenu)
				.on('touchstart.'+fm.namespace, wrapperContextMenu.touchstart)
				.on('touchmove.'+fm.namespace+' touchend.'+fm.namespace, wrapperContextMenu.touchend)
				.on('click.'+fm.namespace, wrapperContextMenu.click)
				.on('scroll.'+fm.namespace, function() {
					bufferExt.seltm && clearTimeout(bufferExt.seltm);
					bufferExt.scrtm && clearTimeout(bufferExt.scrtm);
					if (bufferExt.scrtm && Math.abs((bufferExt.scrolltop || 0) - (bufferExt.scrolltop = $(this).scrollTop())) < 2) {
						bufferExt.scrtm = 0;
						wrapper.trigger(scrollEvent);
					} else {
						bufferExt.scrtm = setTimeout(function() {
							bufferExt.scrtm = 0;
							wrapper.trigger(scrollEvent);
						}, 100);
					}
				}),
			
			bottomMarker = $('<div>&nbsp;</div>')
				.css({position: 'absolute', width: '1px', height: '1px'})
				.hide(),
			
			selectAllCheckbox = selectCheckbox? $('<div class="elfinder-cwd-selectall"><input type="checkbox"></div>')
				.attr('title', fm.i18n('selectall'))
				.on('touchstart mousedown click', function(e) {
					e.stopPropagation();
					e.preventDefault();
					if ($(this).data('pending') || e.type === 'click') {
						return false;
					}
					selectAllCheckbox.data('pending', true);
					if (cwd.hasClass('elfinder-cwd-allselected')) {
						selectAllCheckbox.find('input').prop('checked', false);
						setTimeout(function() {
							unselectAll();
						}, 10);
					} else {
						selectAll();
					}
				}) : $(),
			
			restm = null,
			resize = function(init) {
				var initHeight = function() {
					var h = 0;
					wrapper.siblings('div.elfinder-panel:visible').each(function() {
						h += $(this).outerHeight(true);
					});
					wrapper.height(wz.height() - h - wrapper._padding);
				};
				
				init && initHeight();
				
				restm && clearTimeout(restm);
				restm = setTimeout(function(){
					!init && initHeight();
					var wph, cwdoh;
					// fix cwd height if it less then wrapper
					cwd.css('height', 'auto');
					wph = wrapper[0].clientHeight - parseInt(wrapper.css('padding-top')) - parseInt(wrapper.css('padding-bottom')) - parseInt(cwd.css('margin-top')),
					cwdoh = cwd.outerHeight(true);
					if (cwdoh < wph) {
						cwd.height(wph);
					}
				}, 20);
				
				list && ! colResizing && fixTableHeader();
			},
			
			// elfinder node
			parent = $(this).parent().resize(resize),
			
			// workzone node 
			wz = parent.children('.elfinder-workzone').append(wrapper.append(this).append(bottomMarker)),
			
			winScrTm;

		// setup by options
		replacement = $.extend(replacement, options.replacement || {});
		
		try {
			colWidth = fm.storage('cwdColWidth')? fm.storage('cwdColWidth') : null;
		} catch(e) {
			colWidth = null;
		}
		
		// setup costomCols
		if (customCols = fm.storage('cwdCols')) {
			customCols = $.map(customCols, function(n) {
				return (options.listView.columns.indexOf(n) !== -1)? n : null;
			});
			if (options.listView.columns.length > customCols.length) {
				$.each(options.listView.columns, function(i, n) {
					if (customCols.indexOf(n) === -1) {
						customCols.push(n);
					}
				});
			}
		} else {
			customCols = options.listView.columns;
		}
		templates.row = makeTemplateRow();
		
		if (mobile) {
			// for iOS5 bug
			$('body').on('touchstart touchmove touchend', function(e){});
		}
		
		selectCheckbox && cwd.addClass('elfinder-has-checkbox');
		
		$(window).on('scroll.'+fm.namespace, function() {
			winScrTm && clearTimeout(winScrTm);
			winScrTm = setTimeout(function() {
				wrapper.trigger(scrollEvent);
			}, 50);
		});
		
		$(document).on('keydown.'+fm.namespace, function(e) {
			if (e.keyCode == $.ui.keyCode.ESCAPE) {
				if (! fm.getUI().find('.ui-widget:visible').length) {
					unselectAll();
				}
			}
		});
		
		fm
			.one('init', function(){
				var style = document.createElement('style'),
				sheet, selRefresh, node, base, resizeTm;
				document.head.appendChild(style);
				sheet = style.sheet;
				sheet.insertRule('.elfinder-cwd-wrapper-empty .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder')+'" }', 0);
				sheet.insertRule('.elfinder-cwd-wrapper-empty .ui-droppable .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder'+(mobile? 'LTap' : 'Drop'))+'" }', 1);
				sheet.insertRule('.elfinder-cwd-wrapper-empty .ui-droppable-disabled .elfinder-cwd:after{ content:"'+fm.i18n('emptyFolder')+'" }', 2);
				sheet.insertRule('.elfinder-cwd-wrapper-empty.elfinder-search-result .elfinder-cwd:after{ content:"'+fm.i18n('emptySearch')+'" }', 3);
				sheet.insertRule('.elfinder-cwd-wrapper-empty.elfinder-search-result.elfinder-incsearch-result .elfinder-cwd:after{ content:"'+fm.i18n('emptyIncSearch')+'" }', 3);
				if (! mobile) {
					// make files selectable
					cwd.selectable(selectableOption)
						.data('selectable', true);
					selRefresh = function() {
						if (cwd.data('selectable')) {
							bufferExt.seltm && clearTimeout(bufferExt.seltm);
							bufferExt.seltm = 0;
							cwd.selectable('enable').selectable('refresh');
						}
					};
					wrapper.on(scrollEvent, function() {
						cwd.off('mousedown', selRefresh).one('mousedown', selRefresh);
						bufferExt.seltm = setTimeout(function() {
							cwd.off('mousedown', selRefresh);
							selRefresh();
						}, 2000);
					});
					base = $('<div style="position:absolute"></div>');
					node = fm.getUI();
					node.on('resize', function(e, data) {
						var offset;
						if (data && data.fullscreen) {
							offset = node.offset();
							if (data.fullscreen === 'on') {
								base.css({top:offset.top * -1 , left:offset.left * -1 }).appendTo(node);
								selectableOption.appendTo = base;
							} else {
								base.detach();
								selectableOption.appendTo = 'body';
							}
							cwd.selectable('option', {appendTo : selectableOption.appendTo});
						}
						selRefresh();
					});
				}
			})
			.bind('open add remove searchend', function() {
				var phash = fm.cwd().hash;
				cwdHashes = $.map(fm.files(), function(f) { return f.phash == phash ? f.hash : null ;});
			})
			.bind('open', function() {
				cwdParents = fm.parents(fm.cwd().hash);
				incHashes = void 0;
				unselectAll();
				content();
				resize();
			})
			.bind('search', function(e) {
				cwdHashes = $.map(e.data.files, function(f) { return f.hash; });
				incHashes = void 0;
				fm.searchStatus.ininc = false;
				content();
				fm.autoSync('stop');
				resize();
			})
			.bind('searchend', function(e) {
				if (query || incHashes) {
					query = '';
					if (incHashes) {
						fm.trigger('incsearchend', e.data);
					}
					if (!e.data || !e.data.noupdate) {
						content();
					}
				}
				fm.autoSync();
				resize();
			})
			.bind('searchstart', function(e) {
				unselectAll();
				query = e.data.query;
			})
			.bind('incsearchstart', function(e) {
				selectedFiles = [];
				fm.lazy(function() {
					// incremental search
					query = e.data.query || '';
					if (query) {
						var regex = new RegExp(query.replace(/([\\*\;\.\?\[\]\{\}\(\)\^\$\-\|])/g, '\\$1'), 'i');
						incHashes = $.map(cwdHashes, function(hash) {
							var file = fm.file(hash);
							return (file && (file.name.match(regex) || (file.i18 && file.i18.match(regex))))? file.hash : null;
						});
						fm.trigger('incsearch', { hashes: incHashes, query: query })
							.searchStatus.ininc = true;
						content();
						fm.autoSync('stop');
					} else {
						fm.trigger('incsearchend');
					}
					resize();
				});
			})
			.bind('incsearchend', function(e) {
				query = '';
				fm.searchStatus.ininc = false;
				incHashes = void 0;
				if (!e.data || !e.data.noupdate) {
					content();
				}
				fm.autoSync();
			})
			.bind('sortchange', function() {
				var lastScrollLeft = wrapper.scrollLeft();
				
				content();
				fm.one('cwdrender', function() {
					wrapper.scrollLeft(lastScrollLeft);
					selectedFiles.length && trigger();
					resize();
				});
			})
			.bind('viewchange', function() {
				var l      = fm.storage('view') == 'list',
					allsel = cwd.hasClass('elfinder-cwd-allselected');
				
				if (l != list) {
					list = l;
					fm.viewType = list? 'list' : 'icons';
					content();

					if (allsel) {
						cwd.addClass('elfinder-cwd-allselected');
						selectAllCheckbox.find('input').prop('checked', true);
					}
					selectedFiles.length && trigger();
				}
				resize();
			})
			.bind('wzresize', function() {
				var place = list ? cwd.find('tbody') : cwd,
					cwdOffset;
				resize(true);
				if (bufferExt.hpi) {
					bottomMarkerShow(place, place.find('[id]').length);
				}
				
				cwdOffset = cwd.offset();
				wz.data('rectangle', $.extend(
					{
						width: wz.width(),
						height: wz.height(),
						cwdEdge: (fm.direction === 'ltr')? cwdOffset.left : cwdOffset.left + cwd.width()
					},
					wz.offset())
				);
				
				bufferExt.itemH = (list? place.find('tr:first') : place.find('[id]:first')).outerHeight(true);
			})
			.bind('changeclipboard', function(e) {
				clipCuts = {};
				if (e.data && e.data.clipboard && e.data.clipboard.length) {
					$.each(e.data.clipboard, function(i, f) {
						if (f.cut) {
							clipCuts[f.hash] = true;
						}
					});
				}
			})
			.bind('resMixinMake', function() {
				setColwidth();
			})
			.bind('tmbreload', function(e) {
				var imgs = {},
					files = (e.data && e.data.files)? e.data.files : null;
				
				$.each(files, function(i, f) {
					if (f.tmb && f.tmb != '1') {
						imgs[f.hash] = f.tmb;
					}
				});
				if (Object.keys(imgs).length) {
					attachThumbnails(imgs, true);
				}
			})
			.add(function(e) {
				var phash = fm.cwd().hash,
					regex = query? new RegExp(query.replace(/([\\*\;\.\?\[\]\{\}\(\)\^\$\-\|])/g, '\\$1'), 'i') : null,
					files = regex
						? $.map(e.data.added || [], function(f) { return (! fm.searchStatus.ininc || f.phash == phash) && (f.name.match(regex) || (f.i18 && f.i18.match(regex)))? f : null ;})
						: $.map(e.data.added || [], function(f) { return f.phash == phash ? f : null; })
						;
				add(files);
				list && resize();
				wrapper.trigger(scrollEvent);
			})
			.change(function(e) {
				var phash = fm.cwd().hash,
					sel   = fm.selected(),
					files;

				if (query) {
					$.each(e.data.changed || [], function(i, file) {
						remove([file.hash]);
						if (file.name.indexOf(query) !== -1) {
							add([file], 'change');
							$.inArray(file.hash, sel) !== -1 && selectFile(file.hash);
						}
					});
				} else {
					$.each($.map(e.data.changed || [], function(f) { return f.phash == phash ? f : null; }), function(i, file) {
						remove([file.hash]);
						add([file], 'change');
						$.inArray(file.hash, sel) !== -1 && selectFile(file.hash);
					});
				}
				
				trigger();
			})
			.remove(function(e) {
				var place = list ? cwd.find('tbody') : cwd;
				remove(e.data.removed || []);
				trigger();
				if (buffer.length < 1 && place.children().length < 1) {
					wz.addClass('elfinder-cwd-wrapper-empty');
					selectCheckbox && selectAllCheckbox.find('input').prop('checked', false);
					bottomMarker.hide();
					wrapper.off(scrollEvent, render);
					resize();
				} else {
					bottomMarkerShow(place);
					wrapper.trigger(scrollEvent);
				}
			})
			// select dragged file if no selected, disable selectable
			.dragstart(function(e) {
				var target = $(e.data.target),
					oe     = e.data.originalEvent;

				if (target.hasClass(fileSelector.substr(1))) {
					
					if (!target.hasClass(clSelected)) {
						!(oe.ctrlKey || oe.metaKey || oe.shiftKey) && unselectAll();
						target.trigger(evtSelect);
						trigger();
					}
				}
				
				cwd.selectable('disable').removeClass(clDisabled);
				selectLock = true;
			})
			// enable selectable
			.dragstop(function() {
				cwd.selectable('enable');
				selectLock = false;
			})
			.bind('lockfiles unlockfiles selectfiles unselectfiles', function(e) {
				var events = {
						lockfiles     : evtDisable ,
						unlockfiles   : evtEnable ,
						selectfiles   : evtSelect,
						unselectfiles : evtUnselect },
					event  = events[e.type],
					files  = e.data.files || [],
					l      = files.length,
					helper = e.data.helper || $(),
					parents, ctr, add, sels;

				if (l > 0) {
					parents = fm.parents(files[0]);
				}
				if (event === evtSelect || event === evtUnselect) {
					add  = (event === evtSelect),
					sels = add? selectedFiles.concat() : selectedFiles;
					$.each(files, function(i, hash) {
						var idx = $.inArray(hash, sels),
							all = cwd.hasClass('elfinder-cwd-allselected');
						if (idx === -1) {
							add && selectedFiles.push(hash);
						} else {
							if (all) {
								selectCheckbox && selectAllCheckbox.children('input').prop('checked', false);
								cwd.removeClass('elfinder-cwd-allselected');
								all = false;
							}
							! add && selectedFiles.splice(idx, 1);
						}
					});
				}
				if (!helper.data('locked')) {
					while (l--) {
						$('#'+fm.cwdHash2Id(files[l])).trigger(event);
					}
					! e.data.inselect && trigger();
				}
				if (wrapper.data('dropover') && parents.indexOf(wrapper.data('dropover')) !== -1) {
					ctr = e.type !== 'lockfiles';
					helper.toggleClass('elfinder-drag-helper-plus', ctr);
					wrapper.toggleClass(clDropActive, ctr);
				}
			})
			// select new files after some actions
			.bind('mkdir mkfile duplicate upload rename archive extract paste multiupload', function(e) {
				if (e.type == 'upload' && e.data._multiupload) return;
				var phash = fm.cwd().hash, files;
				
				unselectAll();

				$.each((e.data.added || []).concat(e.data.changed || []), function(i, file) { 
					file && file.phash == phash && selectFile(file.hash);
				});
				trigger();
			})
			.shortcut({
				pattern     :'ctrl+a', 
				description : 'selectall',
				callback    : selectAll
			})
			.shortcut({
				pattern     : 'left right up down shift+left shift+right shift+up shift+down',
				description : 'selectfiles',
				type        : 'keydown' , //fm.UA.Firefox || fm.UA.Opera ? 'keypress' : 'keydown',
				callback    : function(e) { select(e.keyCode, e.shiftKey); }
			})
			.shortcut({
				pattern     : 'home',
				description : 'selectffile',
				callback    : function(e) { 
					unselectAll();
					scrollToView(cwd.find('[id]:first').trigger(evtSelect));
					trigger();
				}
			})
			.shortcut({
				pattern     : 'end',
				description : 'selectlfile',
				callback    : function(e) { 
					unselectAll();
					scrollToView(cwd.find('[id]:last').trigger(evtSelect)) ;
					trigger();
				}
			})
			.shortcut({
				pattern     : 'page_up',
				description : 'pageTurning',
				callback    : function(e) {
					if (bufferExt.itemH) {
						wrapper.scrollTop(
							Math.round(
								wrapper.scrollTop()
								- (Math.floor((wrapper.height() + (list? bufferExt.itemH * -1 : 16)) / bufferExt.itemH)) * bufferExt.itemH
							)
						);
					}
				}
			}).shortcut({
				pattern     : 'page_down',
				description : 'pageTurning',
				callback    : function(e) { 
					if (bufferExt.itemH) {
						wrapper.scrollTop(
							Math.round(
								wrapper.scrollTop()
								+ (Math.floor((wrapper.height() + (list? bufferExt.itemH * -1 : 16)) / bufferExt.itemH)) * bufferExt.itemH
							)
						);
					}
				}
			});
		
	});
	
	// fm.timeEnd('cwdLoad')
	
	return this;
};


/*
 * File: /js/ui/dialog.js
 */

/**
 * @class  elFinder dialog
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderdialog = function(opts, fm) {
	var platformWin = (window.navigator.platform.indexOf('Win') != -1),
		dialog, elfNode;
	
	if (fm && fm.ui) {
		elfNode = fm.getUI();
	} else {
		elfNode = this.closest('.elfinder');
		if (! fm) {
			fm = elfNode.elfinder('instance');
		}
	}
	
	if (typeof opts  === 'string') {
		if ((dialog = this.closest('.ui-dialog')).length) {
			if (opts == 'open') {
				dialog.css('display') == 'none' && dialog.fadeIn(120, function() {
					dialog.trigger('open');
				});
			} else if (opts == 'close' || opts == 'destroy') {
				dialog.stop(true);
				(dialog.is(':visible') || elfNode.is(':hidden')) && dialog.hide().trigger('close');
				opts == 'destroy' && dialog.remove();
			} else if (opts == 'toTop') {
				dialog.trigger('totop');
			} else if (opts == 'posInit') {
				dialog.trigger('posinit');
			} else if (opts == 'tabstopsInit') {
				dialog.trigger('tabstopsInit');
			}
		}
		return this;
	}
	
	opts = $.extend({}, $.fn.elfinderdialog.defaults, opts);
	
	if (opts.allowMinimize && opts.allowMinimize === 'auto') {
		opts.allowMinimize = this.find('textarea,input').length? true : false; 
	}
	if (opts.headerBtnPos && opts.headerBtnPos === 'auto') {
		opts.headerBtnPos = platformWin? 'right' : 'left';
	}
	if (opts.headerBtnOrder && opts.headerBtnOrder === 'auto') {
		opts.headerBtnOrder = platformWin? 'close:maximize:minimize' : 'close:minimize:maximize';
	}
	
	if (opts.modal && opts.allowMinimize) {
		opts.allowMinimize = false;
	}
	
	this.filter(':not(.ui-dialog-content)').each(function() {
		var self       = $(this).addClass('ui-dialog-content ui-widget-content'),
			clactive   = 'elfinder-dialog-active',
			cldialog   = 'elfinder-dialog',
			clnotify   = 'elfinder-dialog-notify',
			clhover    = 'ui-state-hover',
			cltabstop  = 'elfinder-tabstop',
			cl1stfocus = 'elfinder-focus',
			id         = parseInt(Math.random()*1000000),
			titlebar   = $('<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="elfinder-dialog-title">'+opts.title+'</span></div>'),
			buttonset  = $('<div class="ui-dialog-buttonset"></div>'),
			buttonpane = $('<div class=" ui-helper-clearfix ui-dialog-buttonpane ui-widget-content"></div>')
				.append(buttonset),
			btnWidth   = 0,
			btnCnt     = 0,
			tabstops   = $(),
			tabstopsInit = function() {
				tabstops = dialog.find('.'+cltabstop);
				if (tabstops.length) {
					tabstops.attr('tabindex', '-1');
					if (! tabstops.filter('.'+cl1stfocus).length) {
						buttonset.children('.'+cltabstop+':'+(platformWin? 'first' : 'last')).addClass(cl1stfocus);
					}
				}
			},
			tabstopNext = function(cur) {
				var elms = tabstops.filter(':visible'),
					node = cur? null : elms.filter('.'+cl1stfocus+':first');
					
				if (! node || ! node.length) {
					node = elms.first();
				}
				if (cur) {
					$.each(elms, function(i, elm) {
						if (elm === cur && elms[i+1]) {
							node = elms.eq(i+1);
							return false;
						}
					});
				}
				return node;
			},
			tabstopPrev = function(cur) {
				var elms = tabstops.filter(':visible'),
					node = elms.last();
				$.each(elms, function(i, elm) {
					if (elm === cur && elms[i-1]) {
						node = elms.eq(i-1);
						return false;
					}
				});
				return node;
			},
			makeHeaderBtn = function() {
				$.each(opts.headerBtnOrder.split(':').reverse(), function(i, v) {
					headerBtns[v] && headerBtns[v]();
				})
				if (platformWin) {
					titlebar.children('.elfinder-titlebar-button').addClass('elfinder-titlebar-button-right');
				}
			},
			headerBtns = {
				close: function() {
					titlebar.prepend($('<span class="ui-widget-header ui-dialog-titlebar-close ui-corner-all elfinder-titlebar-button"><span class="ui-icon ui-icon-closethick"></span></span>')
						.on('mousedown', function(e) {
							e.preventDefault();
							e.stopPropagation();
							self.elfinderdialog('close');
						})
					);
				},
				maximize: function() {
					if (opts.allowMaximize) {
						dialog.on('resize', function(e, data) {
							var full, elm;
							if (data && data.maximize) {
								elm = titlebar.find('.elfinder-titlebar-full');
								full = (data.maximize === 'on');
								elm.children('span.ui-icon')
									.toggleClass('ui-icon-plusthick', ! full)
									.toggleClass('ui-icon-arrowreturnthick-1-s', full);
								if (full) {
									try {
										dialog.hasClass('ui-draggable') && dialog.draggable('disable');
										dialog.hasClass('ui-resizable') && dialog.resizable('disable');
									} catch(e) {}
									if (typeof elm.data('style') === 'undefined') {
										self.height(self.height());
										elm.data('style', self.attr('style') || '');
									}
									self.css('width', '100%').css('height', dialog.height() - dialog.children('.ui-dialog-titlebar').outerHeight(true) - buttonpane.outerHeight(true));
								} else {
									self.attr('style', elm.data('style'));
									elm.removeData('style');
									try {
										dialog.hasClass('ui-draggable') && dialog.draggable('enable');
										dialog.hasClass('ui-resizable') && dialog.resizable('enable');
									} catch(e) {}
								}
								dialog.trigger('resize');
							}
						});
						titlebar.prepend($('<span class="ui-widget-header ui-corner-all elfinder-titlebar-button elfinder-titlebar-full"><span class="ui-icon ui-icon-plusthick"></span></span>')
							.on('mousedown', function(e) {
								e.preventDefault();
								e.stopPropagation();
								fm.toggleMaximize(dialog);
							})
						);
					}
					
				},
				minimize: function() {
					if (opts.allowMinimize) {
						titlebar.on('dblclick', function(e) {
								$(this).children('.elfinder-titlebar-minimize').trigger('mousedown');
							})
							.prepend($('<span class="ui-widget-header ui-corner-all elfinder-titlebar-button elfinder-titlebar-minimize"><span class="ui-icon ui-icon-minusthick"></span></span>')
							.on('mousedown', function(e) {
								var $this = $(this),
									pos, w;
								
								e.preventDefault();
								e.stopPropagation();
								if (typeof $this.data('style') !== 'undefined') {
									elfNode.append(dialog);
									dialog.attr('style', $this.data('style'))
										.removeClass('elfinder-dialog-minimized')
										.off('mousedown.minimize');
									$this.removeData('style').show();
									titlebar.children('.elfinder-titlebar-full').show();
									dialog.children('.ui-widget-content').slideDown('fast', function() {
										var eData;
										if (this === dialog.children('.ui-widget-content:first').get(0)) {
											if (dialog.find('.'+fm.res('class', 'editing'))) {
												fm.disable();
											}
											eData = { minimize: 'off' };
											if (! dialog.hasClass('elfinder-maximized')) {
												try {
													dialog.hasClass('ui-draggable') && dialog.draggable('enable');
													dialog.hasClass('ui-resizable') && dialog.resizable('enable');
												} catch(e) {}
											} else {
												eData.maximize = 'on';
											}
											dialog.trigger('resize', eData);
										}
									});
								} else {
									try {
										dialog.hasClass('ui-draggable') && dialog.draggable('disable');
										dialog.hasClass('ui-resizable') && dialog.resizable('disable');
									} catch(e) {}
									$this.data('style', dialog.attr('style') || '').hide();
									titlebar.children('.elfinder-titlebar-full').hide();
									w = dialog.width();
									dialog.children('.ui-widget-content').slideUp('fast', function() {
										if (this === dialog.children('.ui-widget-content:first').get(0)) {
											dialog.trigger('resize', { minimize: 'on' });
											dialog.attr('style', '').css({ maxWidth: w})
												.addClass('elfinder-dialog-minimized')
												.one('mousedown.minimize', function(e) {
													$this.trigger('mousedown');
												})
												.appendTo(fm.getUI('bottomtray'));
										}
									});
								}
							})
						);
					}
				}
			},
			dialog = $('<div class="ui-front ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable std42-dialog touch-punch '+cldialog+' '+opts.cssClass+'"></div>')
				.hide()
				.append(self)
				.appendTo(elfNode)
				.draggable({
					handle : '.ui-dialog-titlebar',
					containment : 'document',
					stop : function(e, ui){
						dialog.css({height : opts.height});
						self.data('draged', true);
					}
				})
				.css({
					width  : opts.width,
					height : opts.height
				})
				.on('mousedown', function(e) {
					if (! dialog.hasClass('ui-front')) {
						setTimeout(function() {
							dialog.is(':visible:not(.elfinder-dialog-minimized)') && dialog.trigger('totop');
						}, 10);
					}
				})
				.on('open', function() {
					var d           = $(this),
						maxWinWidth = (d.outerWidth() > elfNode.width()-10)? elfNode.width()-10 : null;
					
					maxWinWidth && d.css({width: maxWinWidth, left: '5px'});

					if (!dialog.hasClass(clnotify)) {
						elfNode.children('.'+cldialog+':visible:not(.'+clnotify+')').each(function() {
							var d     = $(this),
								top   = parseInt(d.css('top')),
								left  = parseInt(d.css('left')),
								_top  = parseInt(dialog.css('top')),
								_left = parseInt(dialog.css('left'))
								;

							if (d[0] != dialog[0] && (top == _top || left == _left)) {
								dialog.css({
									top  : (top+(maxWinWidth? 15 : 10))+'px',
									left : (maxWinWidth? 5 : left+10)+'px'
								});
							}
						});
					} 
					
					dialog.data('modal') && fm.getUI('overlay').elfinderoverlay('show');
					
					dialog.trigger('totop');
					
					typeof(opts.open) == 'function' && $.proxy(opts.open, self[0])();
					
					fm.UA.Mobile && tabstopNext().focus();
					
					if (opts.closeOnEscape) {
						$(document).on('keyup.'+id, function(e) {
							if (e.keyCode == $.ui.keyCode.ESCAPE && dialog.hasClass(clactive)) {
								self.elfinderdialog('close');
							}
						})
					}
				})
				.on('close', function() {
					var dialogs;
					
					if (opts.closeOnEscape) {
						$(document).off('keyup.'+id);
					}
					
					if (opts.allowMaximize) {
						fm.toggleMaximize(dialog, false);
					}
					
					dialog.data('modal') && fm.getUI('overlay').elfinderoverlay('hide');

					if (typeof(opts.close) == 'function') {
						$.proxy(opts.close, self[0])();
					} else if (opts.destroyOnClose) {
						dialog.hide().remove();
					}
					
					// get focus to next dialog
					dialogs = elfNode.children('.'+cldialog+':visible');
					if (dialogs.length) {
						dialogs.filter(':last').trigger('totop');
					} else {
						setTimeout(function() {
							// return focus to elfNode
							fm.enable();
						}, 20);
					}
				})
				.on('totop', function() {
					if (dialog.hasClass('elfinder-dialog-minimized')) {
						titlebar.children('.elfinder-titlebar-minimize').trigger('mousedown');
					}
					
					fm.toFront(dialog);
					elfNode.children('.'+cldialog).removeClass(clactive+' ui-front');
					dialog.addClass(clactive+' ui-front');

					! fm.UA.Mobile && tabstopNext().focus();
				})
				.on('posinit', function() {
					var css = opts.position;
					if (! css && ! dialog.data('resizing')) {
						css = {
							top  : Math.max(0, parseInt((elfNode.height() - dialog.outerHeight())/2 - 42))+'px',
							left : Math.max(0, parseInt((elfNode.width() - dialog.outerWidth())/2))+'px'
						};
					}
					if (opts.absolute) {
						css.position = 'absolute';
					}
					css && dialog.css(css);
				})
				.on('resize', function(e, data) {
					if (typeof(opts.resize) === 'function') {
						$.proxy(opts.resize, self[0])(e, data);
					}
				})
				.on('tabstopsInit', tabstopsInit)
				.on('focus', '.'+cltabstop, function() {
					$(this).addClass(clhover).parent('label').addClass(clhover);
					this.id && $(this).parent().find('label[for='+this.id+']').addClass(clhover);
				})
				.on('blur', '.'+cltabstop, function() {
					$(this).removeClass(clhover).parent('label').removeClass(clhover);
					this.id && $(this).parent().find('label[for='+this.id+']').removeClass(clhover);
				})
				.on('mouseenter mouseleave', '.'+cltabstop, function(e) {
					var $this = $(this);
					if (opts.btnHoverFocus) {
						if (e.type == 'mouseenter') {
							$this.focus();
						}
					} else {
						$this.toggleClass(clhover, e.type == 'mouseenter');
					}
				})
				.on('keydown', '.'+cltabstop, function(e) {
					var $this = $(this);
					if ($this.is(':focus')) {
						e.stopPropagation();
						if (e.keyCode == $.ui.keyCode.ENTER) {
							e.preventDefault();
							$this.click();
						}  else if ((e.keyCode == $.ui.keyCode.TAB && e.shiftKey) || e.keyCode == $.ui.keyCode.LEFT || e.keyCode == $.ui.keyCode.UP) {
							if ($this.is('input:text') && (!(e.ctrlKey || e.metaKey) && e.keyCode == $.ui.keyCode.LEFT)) {
								return;
							}
							if ($this.is('select') && e.keyCode != $.ui.keyCode.TAB) {
								return;
							}
							if ($this.is('textarea') && !(e.ctrlKey || e.metaKey)) {
								return;
							}
							e.preventDefault();
							tabstopPrev(this).focus();
						}  else if (e.keyCode == $.ui.keyCode.TAB || e.keyCode == $.ui.keyCode.RIGHT || e.keyCode == $.ui.keyCode.DOWN) {
							if ($this.is('input:text') && (!(e.ctrlKey || e.metaKey) && e.keyCode == $.ui.keyCode.RIGHT)) {
								return;
							}
							if ($this.is('select') && e.keyCode != $.ui.keyCode.TAB) {
								return;
							}
							if ($this.is('textarea') && !(e.ctrlKey || e.metaKey)) {
								return;
							}
							e.preventDefault();
							tabstopNext(this).focus();
						}
					}
				})
				.data({modal: opts.modal})
			;
		
		dialog.prepend(titlebar);

		makeHeaderBtn();

		$.each(opts.buttons, function(name, cb) {
			var button = $('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only '
					+'elfinder-btncnt-'+(btnCnt++)+' '
					+cltabstop
					+'"><span class="ui-button-text">'+name+'</span></button>')
				.on('click', $.proxy(cb, self[0]));
			if (platformWin) {
				buttonset.append(button);
			} else {
				buttonset.prepend(button);
			}
		});
		
		if (buttonset.children().length) {
			dialog.append(buttonpane);
			
			dialog.show();
			buttonpane.find('button').each(function(i, btn) {
				btnWidth += $(btn).outerWidth(true);
			});
			dialog.hide();
			btnWidth += 20;
			
			if (dialog.width() < btnWidth) {
				dialog.width(btnWidth);
			}
		}
		
		dialog.trigger('posinit').data('margin-y', self.outerHeight(true) - self.height());
		
		if (opts.resizable && $.fn.resizable) {
			dialog.resizable({
				minWidth   : opts.minWidth,
				minHeight  : opts.minHeight,
				start      : function() {
					if (dialog.data('resizing') !== true && dialog.data('resizing')) {
						clearTimeout(dialog.data('resizing'));
					}
					dialog.data('resizing', true);
				},
				stop       : function() {
					dialog.data('resizing', setTimeout(function() {
						dialog.data('resizing', false);
					}, 200));
				},
				resize     : function(e, ui) {
					var oh = 0;
					dialog.children('.ui-widget-header,.ui-dialog-buttonpane').each(function() {
						oh += $(this).outerHeight(true);
					});
					self.height(ui.size.height - oh - dialog.data('margin-y'));
					dialog.trigger('resize');
				}
			});
		} 
			
		typeof(opts.create) == 'function' && $.proxy(opts.create, this)();
			
		tabstopsInit();
		
		opts.autoOpen && self.elfinderdialog('open');

	});
	
	return this;
};

$.fn.elfinderdialog.defaults = {
	cssClass  : '',
	title     : '',
	modal     : false,
	resizable : true,
	autoOpen  : true,
	closeOnEscape : true,
	destroyOnClose : false,
	buttons   : {},
	btnHoverFocus : true,
	position  : null,
	absolute  : false,
	width     : 320,
	height    : 'auto',
	minWidth  : 200,
	minHeight : 110,
	allowMinimize : 'auto',
	allowMaximize : false,
	headerBtnPos : 'auto',
	headerBtnOrder : 'auto'
};


/*
 * File: /js/ui/fullscreenbutton.js
 */

/**
 * @class  elFinder toolbar button to switch full scrren mode.
 *
 * @author Naoki Sawada
 **/

$.fn.elfinderfullscreenbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd),
			icon   = button.children('.elfinder-button-icon');
		cmd.change(function() {
			var fullscreen = cmd.value;
			icon.toggleClass('elfinder-button-icon-unfullscreen', fullscreen);
			button.attr('title', fullscreen? cmd.fm.i18n('reinstate') : cmd.fm.i18n('cmdfullscreen'));
			cmd.className = fullscreen? 'unfullscreen' : '';
			cmd.title = cmd.fm.i18n(fullscreen ? 'reinstate' : 'cmdfullscreen');
		});
	});
};


/*
 * File: /js/ui/mkdirbutton.js
 */

/**
 * @class  elFinder toolbar button to switch mkdir mode.
 *
 * @author Naoki Sawada
 **/
$.fn.elfindermkdirbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd);

		cmd.change(function() {
			button.attr('title', cmd.value);
		});
	});
};


/*
 * File: /js/ui/navbar.js
 */

/**
 * @class elfindernav - elFinder container for diretories tree and places
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindernavbar = function(fm, opts) {

	this.not('.elfinder-navbar').each(function() {
		var nav    = $(this).hide().addClass('ui-state-default elfinder-navbar'),
			parent = nav.parent(),
			wz     = parent.children('.elfinder-workzone').append(nav),
			delta  = nav.outerHeight() - nav.height(),
			ltr    = fm.direction == 'ltr',
			handle, swipeHandle, autoHide, setWidth,
			setWzRect = function() {
				var cwd = fm.getUI('cwd'),
					wz  = fm.getUI('workzone'),
					wzRect = wz.data('rectangle'),
					cwdOffset = cwd.offset();
				wz.data('rectangle', $.extend(wzRect, { cwdEdge: (fm.direction === 'ltr')? cwdOffset.left : cwdOffset.left + cwd.width() }));
			};

			fm.one('cssloaded', function() {
				var old = delta;
				delta = nav.outerHeight() - nav.height();
				if (old !== delta) {
					fm.trigger('wzresize');
				}
			}).bind('wzresize', function() {
				nav.height(wz.height() - delta);
			});
		
		if (fm.UA.Touch) {
			autoHide = fm.storage('autoHide') || {};
			if (typeof autoHide.navbar === 'undefined') {
				autoHide.navbar = (opts.autoHideUA && opts.autoHideUA.length > 0 && $.map(opts.autoHideUA, function(v){ return fm.UA[v]? true : null; }).length);
				fm.storage('autoHide', autoHide);
			}
			
			if (autoHide.navbar) {
				fm.one('init', function() {
					fm.uiAutoHide.push(function(){ nav.stop(true, true).trigger('navhide', { duration: 'slow', init: true }); });
				});
			}
			
			fm.bind('load', function() {
				swipeHandle = $('<div class="elfinder-navbar-swipe-handle"></div>').hide().appendTo(wz);
				if (swipeHandle.css('pointer-events') !== 'none') {
					swipeHandle.remove();
					swipeHandle = null;
				}
			});
			
			nav.on('navshow navhide', function(e, data) {
				var mode     = (e.type === 'navshow')? 'show' : 'hide',
					duration = (data && data.duration)? data.duration : 'fast',
					handleW = (data && data.handleW)? data.handleW : Math.max(50, fm.getUI().width() / 10);
				nav.stop(true, true)[mode](duration, function() {
					if (mode === 'show') {
						swipeHandle && swipeHandle.stop(true, true).hide();
					} else {
						if (swipeHandle) {
							swipeHandle.width(handleW? handleW : '');
							fm.resources.blink(swipeHandle, 'slowonce');
						}
					}
					fm.trigger('navbar'+ mode).getUI('cwd').trigger('resize');
					data.init && fm.trigger('uiautohide');
					setWzRect();
				});
				autoHide.navbar = (mode !== 'show');
				fm.storage('autoHide', $.extend(fm.storage('autoHide'), {navbar: autoHide.navbar}));
			});
		}
		
		if ($.fn.resizable && ! fm.UA.Mobile) {
			handle = nav.resizable({
					handles : ltr ? 'e' : 'w',
					minWidth : opts.minWidth || 150,
					maxWidth : opts.maxWidth || 500,
					stop : function(e, ui) {
						fm.storage('navbarWidth', ui.size.width);
						setWzRect();
					}
				})
				.on('resize scroll', function(e) {
					if (! ltr && e.type === 'resize') {
						nav.css('left', 0);
					}
					clearTimeout($(this).data('posinit'));
					$(this).data('posinit', setTimeout(function() {
						var offset = (fm.UA.Opera && nav.scrollLeft())? 20 : 2;
						handle.css({
							top  : parseInt(nav.scrollTop())+'px',
							left : ltr ? 'auto' : parseInt(nav.scrollLeft() + offset),
							right: ltr ? parseInt(nav.scrollLeft() - offset) * -1 : 'auto'
						});
						if (e.type === 'resize') {
							fm.getUI('cwd').trigger('resize');
						}
					}, 50));
				})
				.find('.ui-resizable-handle').addClass('ui-front');

			fm.one('open', function() {
				setTimeout(function() {
					nav.trigger('resize');
				}, 150);
			});
		}

		if (setWidth = fm.storage('navbarWidth')) {
			nav.width(setWidth);
		} else {
			if (fm.UA.Mobile) {
				fm.one('cssloaded', function() {
					nav.data('defWidth', nav.width());
					$(window).on('resize.' + fm.namespace, function(e){
						setWidth = nav.parent().width() / 2;
						if (nav.data('defWidth') > setWidth) {
							nav.width(setWidth);
						} else {
							nav.width(nav.data('defWidth'));
						}
						nav.data('width', nav.width());
					});
				});
			}
		}

	});
	
	return this;
};


/*
 * File: /js/ui/overlay.js
 */


$.fn.elfinderoverlay = function(opts) {
	
	var fm = this.parent().elfinder('instance');
	
	this.filter(':not(.elfinder-overlay)').each(function() {
		opts = $.extend({}, opts);
		$(this).addClass('ui-front ui-widget-overlay elfinder-overlay')
			.hide()
			.mousedown(function(e) {
				e.preventDefault();
				e.stopPropagation();
			})
			.data({
				cnt  : 0,
				show : typeof(opts.show) == 'function' ? opts.show : function() { },
				hide : typeof(opts.hide) == 'function' ? opts.hide : function() { }
			});
	});
	
	if (opts == 'show') {
		var o    = this.eq(0),
			cnt  = o.data('cnt') + 1,
			show = o.data('show');

		fm.toFront(o);
		o.data('cnt', cnt);

		if (o.is(':hidden')) {
			o.show();
			show();
		}
	} 
	
	if (opts == 'hide') {
		var o    = this.eq(0),
			cnt  = o.data('cnt') - 1,
			hide = o.data('hide');
		
		o.data('cnt', cnt);
			
		if (cnt <= 0) {
			o.hide();
			hide();
		}
	}
	
	return this;
};


/*
 * File: /js/ui/panel.js
 */

$.fn.elfinderpanel = function(fm) {
	
	return this.each(function() {
		var panel = $(this).addClass('elfinder-panel ui-state-default ui-corner-all'),
			margin = 'margin-'+(fm.direction == 'ltr' ? 'left' : 'right');
		
		fm.one('load', function(e) {
			var navbar = fm.getUI('navbar');
			
			panel.css(margin, parseInt(navbar.outerWidth(true)));
			navbar.on('resize', function() {
				panel.is(':visible') && panel.css(margin, parseInt(navbar.outerWidth(true)))
			})
		})
	})
};


/*
 * File: /js/ui/path.js
 */

/**
 * @class elFinder ui
 * Display current folder path in statusbar.
 * Click on folder name in path - open folder
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderpath = function(fm) {
	return this.each(function() {
		var query  = '',
			target = '',
			mimes  = [],
			place  = 'statusbar',
			clHover= fm.res('class', 'hover'),
			prefix = 'path' + (elFinder.prototype.uniqueid? elFinder.prototype.uniqueid : '') + '-',
			wzbase = $('<div class="ui-widget-header ui-helper-clearfix elfinder-workzone-path"></div>'),
			path   = $(this).addClass('elfinder-path').html('&nbsp;')
				.on('mousedown', 'span.elfinder-path-dir', function(e) {
					var hash = $(this).attr('id').substr(prefix.length);
					e.preventDefault();
					if (hash != fm.cwd().hash) {
						$(this).addClass(clHover);
						if (query) {
							fm.exec('search', query, { target: hash, mime: mimes.join(' ') });
						} else {
							fm.exec('open', hash);
						}
					}
				})
				.prependTo(fm.getUI('statusbar').show()),
			roots = $('<div class="elfinder-path-roots"></div>').on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				
				var roots = $.map(fm.roots, function(h) { return fm.file(h)}),
				raw = [];

				$.each(roots, function(i, f) {
					if (! f.phash && fm.root(fm.cwd().hash, true) !== f.hash) {
						raw.push({
							label    : fm.escape(f.i18 || f.name),
							icon     : 'home',
							callback : function() { fm.exec('open', f.hash); },
							options  : {
								iconClass : f.csscls || '',
								iconImg   : f.icon   || ''
							}
						});
					}
				});
				fm.trigger('contextmenu', {
					raw: raw,
					x: e.pageX,
					y: e.pageY
				});
			}).append('<span class="elfinder-button-icon elfinder-button-icon-menu" ></span>').appendTo(wzbase),
			render = function(cwd) {
				var dirs = [];
				$.each(fm.parents(cwd), function(i, hash) {
					var c = (cwd === hash)? 'elfinder-path-dir elfinder-path-cwd' : 'elfinder-path-dir',
						f = fm.file(hash),
						name = fm.escape(f.i18 || f.name);
					dirs.push('<span id="'+prefix+hash+'" class="'+c+'" title="'+name+'">'+name+'</span>');
				});
				return dirs.join('<span class="elfinder-path-other">'+fm.option('separator')+'</span>');
			},
			toWorkzone = function() {
				var prev;
				path.children('span.elfinder-path-dir').attr('style', '');
				prev = fm.direction === 'ltr'? $('#'+prefix + fm.cwd().hash).prevAll('span.elfinder-path-dir:first') : $();
				path.scrollLeft(prev.length? prev.position().left : 0);
			},
			fit = function() {
				var dirs = path.children('span.elfinder-path-dir'),
					cnt  = dirs.length,
					m, bg = 0, ids;
				
				if (place === 'workzone' || cnt < 2) {
					dirs.attr('style', '');
					return;
				}
				path.width(path.css('max-width'));
				dirs.css({maxWidth: (100/cnt)+'%', display: 'inline-block'});
				m = path.width() - 9;
				path.children('span.elfinder-path-other').each(function() {
					m -= $(this).width();
				});
				ids = [];
				dirs.each(function(i) {
					var dir = $(this),
						w   = dir.width();
					m -= w;
					if (w < this.scrollWidth) {
						ids.push(i);
					}
				});
				path.width('');
				if (ids.length) {
					if (m > 0) {
						m = m / ids.length;
						$.each(ids, function(i, k) {
							var d = $(dirs[k]);
							d.css('max-width', d.width() + m);
						});
					}
					dirs.last().attr('style', '');
				} else {
					dirs.attr('style', '');
				}
			};

			fm.bind('open searchend parents', function() {
				var dirs = [];

				query  = '';
				target = '';
				mimes  = [];
				
				path.html(render(fm.cwd().hash));
				if (Object.keys(fm.roots).length > 1) {
					path.css('margin', '');
					roots.show();
				} else {
					path.css('margin', 0);
					roots.hide();
				}
				fit();
			})
			.bind('searchstart', function(e) {
				if (e.data) {
					query  = e.data.query || '';
					target = e.data.target || '';
					mimes  = e.data.mimes || []
				}
			})
			.bind('search', function(e) {
				var dirs = [],
					html = '';
				if (target) {
					html = render(target);
				} else {
					html = fm.i18n('btnAll');
				}
				path.html('<span class="elfinder-path-other">'+fm.i18n('searcresult') + ': </span>' + html);
				fit();
			})
			// on swipe to navbar show/hide
			.bind('navbarshow navbarhide', function(e) {
				var wz = fm.getUI('workzone');
				if (e.type === 'navbarshow') {
					wz.height(wz.height() + wzbase.outerHeight());
					path.prependTo(fm.getUI('statusbar'));
					wzbase.detach();
					place = 'statusbar';
					fm.unbind('open', toWorkzone);
				} else {
					wzbase.append(path).insertBefore(wz);
					wz.height(wz.height() - wzbase.outerHeight());
					place = 'workzone';
					toWorkzone();
					fm.bind('open', toWorkzone);
				}
				fm.trigger('uiresize');
			})
			.bind('resize', fit);
	});
};


/*
 * File: /js/ui/places.js
 */

/**
 * @class elFinder places/favorites ui
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderplaces = function(fm, opts) {
	return this.each(function() {
		var dirs      = {},
			c         = 'class',
			navdir    = fm.res(c, 'navdir'),
			collapsed = fm.res(c, 'navcollapse'),
			expanded  = fm.res(c, 'navexpand'),
			hover     = fm.res(c, 'hover'),
			clroot    = fm.res(c, 'treeroot'),
			dropover  = fm.res(c, 'adroppable'),
			tpl       = fm.res('tpl', 'placedir'),
			ptpl      = fm.res('tpl', 'perms'),
			spinner   = $(fm.res('tpl', 'navspinner')),
			key       = 'places'+(opts.suffix? opts.suffix : ''),
			menuTimer = null,
			/**
			 * Convert places dir node into dir hash
			 *
			 * @param  String  directory id
			 * @return String
			 **/
			id2hash   = function(id) { return id.substr(6);	},
			/**
			 * Convert places dir node into dir hash
			 *
			 * @param  String  directory id
			 * @return String
			 **/
			hash2id   = function(hash) { return 'place-'+hash; },
			
			/**
			 * Save current places state
			 *
			 * @return void
			 **/
			save      = function() {
				var hashes = [], data = {};
				
				hashes = $.map(subtree.children().find('[id]'), function(n) {
					return id2hash(n.id);
				});
				if (hashes.length) {
					$.each(hashes.reverse(), function(i, h) {
						data[h] = dirs[h];
					});
				} else {
					data = null;
				}
				
				fm.storage(key, data);
			},
			/**
			 * Return node for given dir object
			 *
			 * @param  Object  directory object
			 * @return jQuery
			 **/
			create    = function(dir, hash) {
				return $(tpl.replace(/\{id\}/, hash2id(dir? dir.hash : hash))
						.replace(/\{name\}/, fm.escape(dir? dir.i18 || dir.name : hash))
						.replace(/\{cssclass\}/, dir? (fm.perms2class(dir) + (dir.notfound? ' elfinder-na' : '') + (dir.csscls? ' '+dir.csscls : '')) : '')
						.replace(/\{permissions\}/, (dir && (!dir.read || !dir.write || dir.notfound))? ptpl : '')
						.replace(/\{title\}/, (dir && dir.path)? fm.escape(dir.path) : '')
						.replace(/\{symlink\}/, '')
						.replace(/\{style\}/, ''));
			},
			/**
			 * Add new node into places
			 *
			 * @param  Object  directory object
			 * @return void
			 **/
			add = function(dir) {
				var node, hash;

				if (dir.mime !== 'directory') {
					return false;
				}
				hash = dir.hash;
				if (!fm.files().hasOwnProperty(hash)) {
					// update cache
					fm.trigger('tree', {tree: [dir]});
				}
				
				node = create(dir, hash);
				
				dirs[hash] = dir;
				subtree.prepend(node);
				root.addClass(collapsed);
				sortBtn.toggle(subtree.children().length > 1);
				
				return true;
			},
			/**
			 * Remove dir from places
			 *
			 * @param  String  directory hash
			 * @return String  removed name
			 **/
			remove = function(hash) {
				var name = null, tgt, cnt;

				if (dirs[hash]) {
					delete dirs[hash];
					tgt = $('#'+hash2id(hash));
					if (tgt.length) {
						name = tgt.text();
						tgt.parent().remove();
						cnt = subtree.children().length;
						sortBtn.toggle(cnt > 1);
						if (! cnt) {
							root.removeClass(collapsed);
							places.removeClass(expanded);
							subtree.slideToggle(false);
						}
					}
				}
				
				return name;
			},
			/**
			 * Move up dir on places
			 *
			 * @param  String  directory hash
			 * @return void
			 **/
			moveup = function(hash) {
				var self = $('#'+hash2id(hash)),
					tgt  = self.parent(),
					prev = tgt.prev('div'),
					cls  = 'ui-state-hover',
					ctm  = fm.getUI('contextmenu');
				
				menuTimer && clearTimeout(menuTimer);
				
				if (prev.length) {
					ctm.find(':first').data('placesHash', hash);
					self.addClass(cls);
					tgt.insertBefore(prev);
					prev = tgt.prev('div');
					menuTimer = setTimeout(function() {
						self.removeClass(cls);
						if (ctm.find(':first').data('placesHash') === hash) {
							ctm.hide().empty();
						}
					}, 1500);
				}
				
				if(!prev.length) {
					self.removeClass(cls);
					ctm.hide().empty();
				}
			},
			/**
			 * Update dir at places
			 *
			 * @param  Object   directory
			 * @param  String   previous hash
			 * @return Boolean
			 **/
			update = function(dir, preHash) {
				var hash = dir.hash,
					tgt  = $('#'+hash2id(preHash || hash)),
					node = create(dir, hash);

				if (tgt.length > 0) {
					tgt.parent().replaceWith(node);
					dirs[hash] = dir;
					return true
				} else {
					return false;
				}
			},
			/**
			 * Remove all dir from places
			 *
			 * @return void
			 **/
			clear = function() {
				subtree.empty();
				root.removeClass(collapsed);
				places.removeClass(expanded);
				subtree.slideToggle(false);
			},
			/**
			 * Sort places dirs A-Z
			 *
			 * @return void
			 **/
			sort = function() {
				$.each(dirs, function(h, f) {
					var dir = fm.file(h) || f,
						node = create(dir, h),
						ret = null;
					if (!dir) {
						node.hide();
					}
					if (subtree.children().length) {
						$.each(subtree.children(), function() {
							var current =  $(this);
							if ((dir.i18 || dir.name).localeCompare(current.children('.'+navdir).text()) < 0) {
								ret = !node.insertBefore(current);
								return ret;
							}
						});
						if (ret !== null) {
							return true;
						}
					}
					!$('#'+hash2id(h)).length && subtree.append(node);
				});
				save();
			},
			// sort button
			sortBtn = $('<span class="elfinder-button-icon elfinder-button-icon-sort elfinder-places-root-icon" title="'+fm.i18n('cmdsort')+'"></span>')
				.hide()
				.on('click', function(e) {
					e.stopPropagation();
					subtree.empty();
					sort();
				}
			),
			/**
			 * Node - wrapper for places root
			 *
			 * @type jQuery
			 **/
			wrapper = create({
					hash  : 'root-'+fm.namespace, 
					name  : fm.i18n(opts.name, 'places'),
					read  : true,
					write : true
				}),
			/**
			 * Places root node
			 *
			 * @type jQuery
			 **/
			root = wrapper.children('.'+navdir)
				.addClass(clroot)
				.click(function(e) {
					e.stopPropagation();
					if (root.hasClass(collapsed)) {
						places.toggleClass(expanded);
						subtree.slideToggle();
						fm.storage('placesState', places.hasClass(expanded)? 1 : 0);
					}
				})
				.append(sortBtn),
			/**
			 * Container for dirs
			 *
			 * @type jQuery
			 **/
			subtree = wrapper.children('.'+fm.res(c, 'navsubtree')),
			
			/**
			 * Main places container
			 *
			 * @type jQuery
			 **/
			places = $(this).addClass(fm.res(c, 'tree')+' elfinder-places ui-corner-all')
				.hide()
				.append(wrapper)
				.appendTo(fm.getUI('navbar'))
				.on('mouseenter mouseleave', '.'+navdir, function(e) {
					$(this).toggleClass('ui-state-hover', (e.type == 'mouseenter'));
				})
				.on('click', '.'+navdir, function(e) {
					var p = $(this);
					if (p.data('longtap')) {
						e.stopPropagation();
						return;
					}
					! p.hasClass('elfinder-na') && fm.exec('open', p.attr('id').substr(6));
				})
				.on('contextmenu', '.'+navdir+':not(.'+clroot+')', function(e) {
					var self = $(this),
						hash = self.attr('id').substr(6);
					
					e.preventDefault();

					fm.trigger('contextmenu', {
						raw : [{
							label    : fm.i18n('moveUp'),
							icon     : 'up',
							remain   : true,
							callback : function() { moveup(hash); save(); }
						},'|',{
							label    : fm.i18n('rmFromPlaces'),
							icon     : 'rm',
							callback : function() { remove(hash); save(); }
						}],
						'x'       : e.pageX,
						'y'       : e.pageY
					});
					
					self.addClass('ui-state-hover');
					
					fm.getUI('contextmenu').children().on('mouseenter', function() {
						self.addClass('ui-state-hover');
					});
					
					fm.bind('closecontextmenu', function() {
						self.removeClass('ui-state-hover');
					});
				})
				.droppable({
					tolerance  : 'pointer',
					accept     : '.elfinder-cwd-file-wrapper,.elfinder-tree-dir,.elfinder-cwd-file',
					hoverClass : fm.res('class', 'adroppable'),
					classes    : { // Deprecated hoverClass jQueryUI>=1.12.0
						'ui-droppable-hover': fm.res('class', 'adroppable')
					},
					over       : function(e, ui) {
						var helper = ui.helper,
							dir    = $.map(helper.data('files'), function(h) { return (fm.file(h).mime === 'directory' && !dirs[h])? h : null});
						e.stopPropagation();
						helper.data('dropover', helper.data('dropover') + 1);
						if (fm.insideWorkzone(e.pageX, e.pageY)) {
							if (dir.length > 0) {
								helper.addClass('elfinder-drag-helper-plus');
								fm.trigger('unlockfiles', {files : helper.data('files'), helper: helper});
							} else {
								$(this).removeClass(dropover);
							}
						}
					},
					out : function(e, ui) {
						var helper = ui.helper,
							ctr    = (e.shiftKey||e.ctrlKey||e.metaKey);
						e.stopPropagation();
						helper.toggleClass('elfinder-drag-helper-move elfinder-drag-helper-plus', helper.data('locked')? true : ctr).data('dropover', Math.max(helper.data('dropover') - 1, 0));
						$(this).removeData('dropover')
						       .removeClass(dropover);
						fm.trigger(ctr? 'unlockfiles' : 'lockfiles', {files : helper.data('files'), helper: helper});
					},
					drop       : function(e, ui) {
						var helper  = ui.helper,
							resolve = true;
						
						$.each(helper.data('files'), function(i, hash) {
							var dir = fm.file(hash);
							
							if (dir && dir.mime == 'directory' && !dirs[dir.hash]) {
								add(dir);
							} else {
								resolve = false;
							}
						})
						save();
						resolve && helper.hide();
					}
				})
				// for touch device
				.on('touchstart', '.'+navdir+':not(.'+clroot+')', function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					var hash = $(this).attr('id').substr(6),
					p = $(this)
					.addClass(hover)
					.data('longtap', null)
					.data('tmlongtap', setTimeout(function(){
						// long tap
						p.data('longtap', true);
						fm.trigger('contextmenu', {
							raw : [{
								label    : fm.i18n('rmFromPlaces'),
								icon     : 'rm',
								callback : function() { remove(hash); save(); }
							}],
							'x'       : e.originalEvent.touches[0].pageX,
							'y'       : e.originalEvent.touches[0].pageY
						});
					}, 500));
				})
				.on('touchmove touchend', '.'+navdir+':not(.'+clroot+')', function(e) {
					clearTimeout($(this).data('tmlongtap'));
					if (e.type == 'touchmove') {
						$(this).removeClass(hover);
					}
				});

		if ($.fn.sortable) {
			subtree.addClass('touch-punch')
			.sortable({
				appendTo : fm.getUI(),
				revert   : false,
				helper   : function(e) {
					var dir = $(e.target).parent();
						
					dir.children().removeClass('ui-state-hover');
					
					return $('<div class="ui-widget elfinder-place-drag elfinder-'+fm.direction+'"></div>')
							.append($('<div class="elfinder-navbar"></div>').show().append(dir.clone()));

				},
				stop     : function(e, ui) {
					var target = $(ui.item[0]),
						top    = places.offset().top,
						left   = places.offset().left,
						width  = places.width(),
						height = places.height(),
						x      = e.pageX,
						y      = e.pageY;
					
					if (!(x > left && x < left+width && y > top && y < y+height)) {
						remove(id2hash(target.children(':first').attr('id')));
						save();
					}
				},
				update   : function(e, ui) {
					save();
				}
			});
		}

		// "on regist" for command exec
		$(this).on('regist', function(e, files){
			var added = false;
			$.each(files, function(i, dir) {
				if (dir && dir.mime == 'directory' && !dirs[dir.hash]) {
					if (add(dir)) {
						added = true;
					}
				}
			});
			added && save();
		});
	

		// on fm load - show places and load files from backend
		fm.one('load', function() {
			var dat, hashes;
			
			if (fm.oldAPI) {
				return;
			}
			
			places.show().parent().show();

			dirs = {};
			dat = fm.storage(key);
			if (typeof dat === 'string') {
				// old data type elFinder <= 2.1.12
				dat = $.map(dat.split(','), function(hash) { return hash || null;});
				$.each(dat, function(i, d) {
					var dir = d.split('#')
					dirs[dir[0]] = dir[1]? dir[1] : dir[0];
				});
			} else if ($.isPlainObject(dat)) {
				dirs = dat;
			}
			// allow modify `dirs`
			/**
			 * example for preset places
			 * 
			 * elfinderInstance.bind('placesload', function(e, fm) {
			 * 	//if (fm.storage(e.data.storageKey) === null) { // for first time only
			 * 	if (!fm.storage(e.data.storageKey)) {           // for empty places
			 * 		e.data.dirs[targetHash] = fallbackName;     // preset folder
			 * 	}
			 * }
			 **/
			fm.trigger('placesload', {dirs: dirs, storageKey: key}, true);
			
			hashes = Object.keys(dirs);
			if (hashes.length) {
				root.prepend(spinner);
				
				fm.request({
					data : {cmd : 'info', targets : hashes},
					preventDefault : true
				})
				.done(function(data) {
					var exists = {};
					$.each(data.files, function(i, f) {
						var hash = f.hash;
						exists[hash] = f;
					});
					$.each(dirs, function(h, f) {
						add(exists[h] || $.extend({notfound: true}, f));
					});
					if (fm.storage('placesState') > 0) {
						root.click();
					}
				})
				.always(function() {
					spinner.remove();
				})
			}
			

			fm.change(function(e) {
				var changed = false;
				$.each(e.data.changed, function(i, file) {
					if (dirs[file.hash]) {
						if (file.mime !== 'directory') {
							if (remove(file.hash)) {
								changed = true;
							}
						} else {
							if (update(file)) {
								changed = true;
							}
						}
					}
				});
				changed && save();
			})
			.bind('rename', function(e) {
				var changed = false;
				if (e.data.removed) {
					$.each(e.data.removed, function(i, hash) {
						if (e.data.added[i]) {
							if (update(e.data.added[i], hash)) {
								changed = true;
							}
						}
					});
				}
				changed && save();
			})
			.bind('rm paste', function(e) {
				var names = [],
					changed = false;
				if (e.data.removed) {
					$.each(e.data.removed, function(i, hash) {
						var name = remove(hash);
						name && names.push(name);
					});
				}
				if (names.length) {
					changed = true;
				}
				if (e.data.added && names.length) {
					$.each(e.data.added, function(i, file) {
						if ($.inArray(file.name, names) !== 1) {
							file.mime == 'directory' && add(file);
						}
					});
				}
				changed && save();
			})
			.bind('sync netmount', function(e) {
				var hashes = Object.keys(dirs);
				if (hashes.length) {
					root.prepend(spinner);

					fm.request({
						data : {cmd : 'info', targets : hashes},
						preventDefault : true
					})
					.done(function(data) {
						var exists  = {},
							updated = false,
							cwd     = fm.cwd().hash;
						$.each(data.files || [], function(i, file) {
							var hash = file.hash;
							exists[hash] = file;
							if (!fm.files().hasOwnProperty(file.hash)) {
								// update cache
								fm.trigger('tree', {tree: [file]});
							}
						});
						$.each(dirs, function(h, f) {
							if (!f.notfound != !!exists[h]) {
								if ((f.phash === cwd && e.type !== 'netmount') || (exists[h] && exists[h].mime !== 'directory')) {
									if (remove(h)) {
										updated = true;
									}
								} else {
									if (update(exists[h] || $.extend({notfound: true}, f))) {
										updated = true;
									}
								}
							} else if (exists[h] && exists[h].phash != cwd) {
								// update permission of except cwd
								update(exists[h]);
							}
						});
						updated && save();
					})
					.always(function() {
						spinner.remove();
					});
				}
			})
			
		})
		
	});
};


/*
 * File: /js/ui/sortbutton.js
 */

/**
 * @class  elFinder toolbar button menu with sort variants.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindersortbutton = function(cmd) {
	
	return this.each(function() {
		var fm       = cmd.fm,
			name     = cmd.name,
			c        = 'class',
			disabled = fm.res(c, 'disabled'),
			hover    = fm.res(c, 'hover'),
			item     = 'elfinder-button-menu-item',
			selected = item+'-selected',
			asc      = selected+'-asc',
			desc     = selected+'-desc',
			text     = $('<span class="elfinder-button-text">'+cmd.title+'</span>'),
			button   = $(this).addClass('ui-state-default elfinder-button elfinder-menubutton elfiner-button-'+name)
				.attr('title', cmd.title)
				.append('<span class="elfinder-button-icon elfinder-button-icon-'+name+'"></span>', text)
				.hover(function(e) { !button.hasClass(disabled) && button.toggleClass(hover); })
				.click(function(e) {
					if (!button.hasClass(disabled)) {
						e.stopPropagation();
						menu.is(':hidden') && cmd.fm.getUI().click();
						menu.slideToggle(100);
					}
				}),
			menu = $('<div class="ui-front ui-widget ui-widget-content elfinder-button-menu ui-corner-all"></div>')
				.hide()
				.appendTo(button)
				.on('mouseenter mouseleave', '.'+item, function() { $(this).toggleClass(hover) })
				.on('click', '.'+item, function(e) {
					e.preventDefault();
					e.stopPropagation();
					hide();
				}),
			update = function() {
				menu.children('[rel]').removeClass(selected+' '+asc+' '+desc)
					.filter('[rel="'+fm.sortType+'"]')
					.addClass(selected+' '+(fm.sortOrder == 'asc' ? asc : desc));

				menu.children('.elfinder-sort-stick').toggleClass(selected, fm.sortStickFolders);
				menu.children('.elfinder-sort-tree').toggleClass(selected, fm.sortAlsoTreeview);
			},
			hide = function() { menu.hide(); };
			
		text.hide();
		
		$.each(fm.sortRules, function(name, value) {
			menu.append($('<div class="'+item+'" rel="'+name+'"><span class="ui-icon ui-icon-arrowthick-1-n"></span><span class="ui-icon ui-icon-arrowthick-1-s"></span>'+fm.i18n('sort'+name)+'</div>').data('type', name));
		});
		
		menu.children().click(function(e) {
			var type = $(this).attr('rel');
			
			cmd.exec([], {
				type  : type, 
				order : type == fm.sortType ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder, 
				stick : fm.sortStickFolders,
				tree  : fm.sortAlsoTreeview
			});
		});
		
		$('<div class="'+item+' '+item+'-separated elfinder-sort-ext elfinder-sort-stick"><span class="ui-icon ui-icon-check"></span>'+fm.i18n('sortFoldersFirst')+'</div>')
			.appendTo(menu)
			.click(function() {
				cmd.exec([], {type : fm.sortType, order : fm.sortOrder, stick : !fm.sortStickFolders, tree : fm.sortAlsoTreeview});
			});

		if ($.fn.elfindertree && $.inArray('tree', fm.options.ui) !== -1) {
			$('<div class="'+item+' '+item+'-separated elfinder-sort-ext elfinder-sort-tree"><span class="ui-icon ui-icon-check"></span>'+fm.i18n('sortAlsoTreeview')+'</div>')
				.appendTo(menu)
				.click(function() {
					cmd.exec([], {type : fm.sortType, order : fm.sortOrder, stick : fm.sortStickFolders, tree : !fm.sortAlsoTreeview});
				});
		}
		
		fm.bind('disable select', hide).getUI().click(hide);
			
		fm.bind('sortchange', update)
		
		if (menu.children().length > 1) {
			cmd.change(function() {
					button.toggleClass(disabled, cmd.disabled());
					update();
				})
				.change();
			
		} else {
			button.addClass(disabled);
		}

	});
	
};


/*
 * File: /js/ui/stat.js
 */

/**
 * @class elFinder ui
 * Display number of files/selected files and its size in statusbar
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderstat = function(fm) {
	return this.each(function() {
		var size       = $(this).addClass('elfinder-stat-size'),
			sel        = $('<div class="elfinder-stat-selected"></div>')
				.on('click', 'a', function(e) {
					var hash = $(this).data('hash');
					e.preventDefault();
					fm.exec('opendir', [ hash ]);
				}),
			titlesize  = fm.i18n('size'),
			titleitems = fm.i18n('items'),
			titlesel   = fm.i18n('selected'),
			setstat    = function(files, cwd) {
				var c = 0, 
					s = 0;

				$.each(files, function(i, file) {
					if (!cwd || file.phash == cwd) {
						c++;
						s += parseInt(file.size)||0;
					}
				})
				size.html(titleitems+': <span class="elfinder-stat-incsearch"></span>'+c+', '+titlesize+': '+fm.formatSize(s));
			},
			setIncsearchStat = function(data) {
				size.find('span.elfinder-stat-incsearch').html(data? data.hashes.length + ' / ' : '');
			},
			search = false;

		fm.getUI('statusbar').prepend(size).append(sel).show();
		
		fm
		.bind('open reload add remove change searchend', function() {
			setstat(fm.files(), fm.cwd().hash);
		})
		.bind('searchend', function() {
			search = false;
		})
		.search(function(e) {
			search = true;
			setstat(e.data.files);
		})
		.select(function() {
			var s = 0,
				c = 0,
				files = fm.selectedFiles(),
				dirs = [],
				file;

			if (files.length == 1) {
				file = files[0];
				s = file.size;
				if (search) {
					dirs.push('<a href="#elf_'+file.phash+'" data-hash="'+file.hash+'">'+(file.path? file.path.replace(/\/[^\/]*$/, '') : '..')+'</a>');
				}
				dirs.push(fm.escape(file.name));
				sel.html(dirs.join('/') + (s > 0 ? ', '+fm.formatSize(s) : ''));
				
				return;
			}

			$.each(files, function(i, file) {
				c++;
				s += parseInt(file.size)||0;
			});

			sel.html(c ? titlesel+': '+c+', '+titlesize+': '+fm.formatSize(s) : '&nbsp;');
		})
		.bind('incsearch', function(e) {
			setIncsearchStat(e.data);
		})
		.bind('incsearchend', function() {
			setIncsearchStat();
		})
		;
	})
};


/*
 * File: /js/ui/toast.js
 */

/**
 * @class  elFinder toast
 * 
 * This was created inspired by the toastr. Thanks to developers of toastr.
 * CodeSeven/toastr: http://johnpapa.net <https://github.com/CodeSeven/toastr>
 *
 * @author Naoki Sawada
 **/
$.fn.elfindertoast = function(opts, fm) {
	var defOpts = {
		mode: 'success',
		msg: '',
		showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
		showDuration: 300,
		showEasing: 'swing', //swing and linear are built into jQuery
		onShown: undefined,
		hideMethod: 'fadeOut',
		hideDuration: 1500,
		hideEasing: 'swing',
		onHidden: undefined,
		timeOut: 3000,
		extNode: undefined
	};
	return this.each(function() {
		opts = $.extend({}, defOpts, opts || {});
		
		var self = $(this),
			show = function(notm) {
				self.stop();
				self[opts.showMethod]({
					duration: opts.showDuration,
					easing: opts.showEasing,
					complete: function() {
						opts.onShown && opts.onShown();
						if (!notm && opts.timeOut) {
							rmTm = setTimeout(rm, opts.timeOut);
						}
					}
				});
			},
			rm = function() {
				self[opts.hideMethod]({
					duration: opts.hideDuration,
					easing: opts.hideEasing,
					complete: function() {
						opts.onHidden && opts.onHidden();
						self.remove();
					}
				});
			},
			rmTm;
		
		self.on('click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			self.stop().remove();
		}).on('mouseenter mouseleave', function(e) {
			if (opts.timeOut) {
				rmTm && clearTimeout(rmTm);
				rmTm = null;
				if (e.type === 'mouseenter') {
					show(true);
				} else {
					rmTm = setTimeout(rm, opts.timeOut);
				}
			}
		}).hide().addClass('toast-' + opts.mode).append($('<div class="elfinder-toast-msg"></div>').html(opts.msg));
		
		if (opts.extNode) {
			self.append(opts.extNode);
		}
		
		show();
	});
};

/*
 * File: /js/ui/toolbar.js
 */

/**
 * @class  elFinder toolbar
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindertoolbar = function(fm, opts) {
	this.not('.elfinder-toolbar').each(function() {
		var commands = fm._commands,
			self     = $(this).addClass('ui-helper-clearfix ui-widget-header ui-corner-top elfinder-toolbar'),
			options  = {
				// default options
				displayTextLabel: false,
				labelExcludeUA: ['Mobile'],
				autoHideUA: ['Mobile']
			},
			filter   = function(opts) {
				return $.map(opts, function(v) {
					if ($.isPlainObject(v)) {
						options = $.extend(options, v);
						return null;
					}
					return [v];
				});
			},
			render = function(disabled){
				var name;
				
				$.each(buttons, function(i, b) { b.detach(); });
				self.empty();
				l = panels.length;
				while (l--) {
					if (panels[l]) {
						panel = $('<div class="ui-widget-content ui-corner-all elfinder-buttonset"></div>');
						i = panels[l].length;
						while (i--) {
							name = panels[l][i];
							if ((!disabled || $.inArray(name, disabled) === -1) && (cmd = commands[name])) {
								button = 'elfinder'+cmd.options.ui;
								if (! buttons[name] && $.fn[button]) {
									buttons[name] = $('<div></div>')[button](cmd);
								}
								if (buttons[name]) {
									textLabel && buttons[name].find('.elfinder-button-text').show();
									panel.prepend(buttons[name]);
								}
							}
						}
						
						panel.children().length && self.prepend(panel);
						panel.children(':gt(0)').before('<span class="ui-widget-content elfinder-toolbar-button-separator"></span>');

					}
				}
				
				(! self.data('swipeClose') && self.children().length)? self.show() : self.hide();
				fm.trigger('toolbarload').trigger('uiresize');
			},
			buttons = {},
			panels   = filter(opts || []),
			dispre   = null,
			uiCmdMapPrev = '',
			l, i, cmd, panel, button, swipeHandle, autoHide, textLabel;
		
		// correction of options.displayTextLabel
		textLabel = fm.storage('toolbarTextLabel');
		if (textLabel === null) {
			textLabel = (options.displayTextLabel && (! options.labelExcludeUA || ! options.labelExcludeUA.length || ! $.map(options.labelExcludeUA, function(v){ return fm.UA[v]? true : null; }).length));
		} else {
			textLabel = (textLabel == 1);
		}
		
		// add contextmenu
		self.on('contextmenu', function(e) {
				e.stopPropagation();
				e.preventDefault();
				fm.trigger('contextmenu', {
					raw: [{
						label    : fm.i18n('textLabel'),
						icon     : 'accept',
						callback : function() {
							textLabel = ! textLabel;
							self.height('').find('.elfinder-button-text')[textLabel? 'show':'hide']();
							fm.trigger('uiresize').storage('toolbarTextLabel', textLabel? '1' : '0');
						}
					}],
					x: e.pageX,
					y: e.pageY
				});
			}).on('touchstart', function(e) {
				if (e.originalEvent.touches.length > 1) {
					return;
				}
				self.data('tmlongtap') && clearTimeout(self.data('tmlongtap'));
				self.removeData('longtap')
					.data('longtap', {x: e.originalEvent.touches[0].pageX, y: e.originalEvent.touches[0].pageY})
					.data('tmlongtap', setTimeout(function() {
						self.removeData('longtapTm')
							.trigger({
								type: 'contextmenu',
								pageX: self.data('longtap').x,
								pageY: self.data('longtap').y
							})
							.data('longtap', {longtap: true});
					}, 500));
			}).on('touchmove touchend', function(e) {
				if (self.data('tmlongtap')) {
					if (e.type === 'touchend' ||
							( Math.abs(self.data('longtap').x - e.originalEvent.touches[0].pageX)
							+ Math.abs(self.data('longtap').y - e.originalEvent.touches[0].pageY)) > 4)
					clearTimeout(self.data('tmlongtap'));
					self.removeData('longtapTm');
				}
			}).on('click', function(e) {
				if (self.data('longtap') && self.data('longtap').longtap) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			}).on('touchend click', '.elfinder-button', function(e) {
				if (self.data('longtap') && self.data('longtap').longtap) {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			});

		self.prev().length && self.parent().prepend(this);
		
		render();
		
		fm.bind('open sync select', function(e) {
			var disabled = fm.option('disabled'),
				doRender, sel;
			
			if (e.type === 'select') {
				sel = fm.selected();
				if (sel.length) {
					disabled = fm.getDisabledCmds(sel);
				}
			}
			
			if (!dispre || dispre.toString() !== disabled.sort().toString()) {
				render(disabled && disabled.length? disabled : null);
				doRender = true;
			}
			dispre = disabled.concat().sort();

			if (doRender || uiCmdMapPrev !== JSON.stringify(fm.commandMap)) {
				uiCmdMapPrev = JSON.stringify(fm.commandMap);
				if (! doRender) {
					// reset toolbar
					$.each($('div.elfinder-button'), function(){
						var origin = $(this).data('origin');
						if (origin) {
							$(this).after(origin).detach();
						}
					});
				}
				if (Object.keys(fm.commandMap).length) {
					$.each(fm.commandMap, function(from, to){
						var cmd = fm._commands[to],
							button = cmd? 'elfinder'+cmd.options.ui : null,
							btn;
						if (button && $.fn[button]) {
							btn = buttons[from];
							if (btn) {
								if (! buttons[to] && $.fn[button]) {
									buttons[to] = $('<div></div>')[button](fm._commands[to]);
									if (buttons[to]) {
										textLabel && buttons[to].find('.elfinder-button-text').show();
										if (cmd.extendsCmd) {
											buttons[to].children('span.elfinder-button-icon').addClass('elfinder-button-icon-' + cmd.extendsCmd)
										};
									}
								}
								if (buttons[to]) {
									btn.after(buttons[to]);
									buttons[to].data('origin', btn.detach());
								}
							}
						}
					});
				}
			}
		});
		
		if (fm.UA.Touch) {
			autoHide = fm.storage('autoHide') || {};
			if (typeof autoHide.toolbar === 'undefined') {
				autoHide.toolbar = (options.autoHideUA && options.autoHideUA.length > 0 && $.map(options.autoHideUA, function(v){ return fm.UA[v]? true : null; }).length);
				fm.storage('autoHide', autoHide);
			}
			
			if (autoHide.toolbar) {
				fm.one('init', function() {
					fm.uiAutoHide.push(function(){ self.stop(true, true).trigger('toggle', { duration: 500, init: true }); });
				});
			}
			
			fm.bind('load', function() {
				swipeHandle = $('<div class="elfinder-toolbar-swipe-handle"></div>').hide().appendTo(fm.getUI());
				if (swipeHandle.css('pointer-events') !== 'none') {
					swipeHandle.remove();
					swipeHandle = null;
				}
			});
			
			self.on('toggle', function(e, data) {
				var wz    = fm.getUI('workzone'),
					toshow= self.is(':hidden'),
					wzh   = wz.height(),
					h     = self.height(),
					tbh   = self.outerHeight(true),
					delta = tbh - h,
					opt   = $.extend({
						step: function(now) {
							wz.height(wzh + (toshow? (now + delta) * -1 : h - now));
							fm.trigger('resize');
						},
						always: function() {
							self.css('height', '');
							fm.trigger('uiresize');
							if (swipeHandle) {
								if (toshow) {
									swipeHandle.stop(true, true).hide();
								} else {
									swipeHandle.height(data.handleH? data.handleH : '');
									fm.resources.blink(swipeHandle, 'slowonce');
								}
							}
							data.init && fm.trigger('uiautohide');
						}
					}, data);
				self.data('swipeClose', ! toshow).stop(true, true).animate({height : 'toggle'}, opt);
				autoHide.toolbar = !toshow;
				fm.storage('autoHide', $.extend(fm.storage('autoHide'), {toolbar: autoHide.toolbar}));
			});
		}
	});
	
	return this;
};


/*
 * File: /js/ui/tree.js
 */

/**
 * @class  elFinder folders tree
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfindertree = function(fm, opts) {
	var treeclass = fm.res('class', 'tree');
	
	this.not('.'+treeclass).each(function() {

		var c = 'class', mobile = fm.UA.Mobile,
			
			/**
			 * Root directory class name
			 *
			 * @type String
			 */
			root      = fm.res(c, 'treeroot'),

			/**
			 * Open root dir if not opened yet
			 *
			 * @type Boolean
			 */
			openRoot  = opts.openRootOnLoad,

			/**
			 * Open current work dir if not opened yet
			 *
			 * @type Boolean
			 */
			openCwd   = opts.openCwdOnOpen,

			/**
			 * Subtree class name
			 *
			 * @type String
			 */
			subtree   = fm.res(c, 'navsubtree'),
			
			/**
			 * Directory class name
			 *
			 * @type String
			 */
			navdir    = fm.res(c, 'treedir'),
			
			/**
			 * Directory CSS selector
			 *
			 * @type String
			 */
			selNavdir = 'span.' + navdir,
			
			/**
			 * Collapsed arrow class name
			 *
			 * @type String
			 */
			collapsed = fm.res(c, 'navcollapse'),
			
			/**
			 * Expanded arrow class name
			 *
			 * @type String
			 */
			expanded  = fm.res(c, 'navexpand'),
			
			/**
			 * Class name to mark arrow for directory with already loaded children
			 *
			 * @type String
			 */
			loaded    = 'elfinder-subtree-loaded',
			
			/**
			 * Arraw class name
			 *
			 * @type String
			 */
			arrow = fm.res(c, 'navarrow'),
			
			/**
			 * Current directory class name
			 *
			 * @type String
			 */
			active    = fm.res(c, 'active'),
			
			/**
			 * Droppable dirs dropover class
			 *
			 * @type String
			 */
			dropover = fm.res(c, 'adroppable'),
			
			/**
			 * Hover class name
			 *
			 * @type String
			 */
			hover    = fm.res(c, 'hover'),
			
			/**
			 * Disabled dir class name
			 *
			 * @type String
			 */
			disabled = fm.res(c, 'disabled'),
			
			/**
			 * Draggable dir class name
			 *
			 * @type String
			 */
			draggable = fm.res(c, 'draggable'),
			
			/**
			 * Droppable dir  class name
			 *
			 * @type String
			 */
			droppable = fm.res(c, 'droppable'),
			
			/**
			 * root wrapper class
			 * 
			 * @type String
			 */
			wrapperRoot = 'elfinder-navbar-wrapper-root',

			/**
			 * Un-disabled cmd `paste` volume's root wrapper class
			 * 
			 * @type String
			 */
			pastable = 'elfinder-navbar-wrapper-pastable',
			
			/**
			 * Un-disabled cmd `upload` volume's root wrapper class
			 * 
			 * @type String
			 */
			uploadable = 'elfinder-navbar-wrapper-uploadable',
			
			insideNavbar = function(x) {
				var left = navbar.offset().left;
					
				return left <= x && x <= left + navbar.width();
			},
			
			drop = fm.droppable.drop,
			
			/**
			 * Droppable options
			 *
			 * @type Object
			 */
			droppableopts = $.extend(true, {}, fm.droppable, {
				// show subfolders on dropover
				over : function(e, ui) {
					var dst    = $(this),
						helper = ui.helper,
						cl     = hover+' '+dropover,
						hash, status;
					e.stopPropagation();
					helper.data('dropover', helper.data('dropover') + 1);
					dst.data('dropover', true);
					if (ui.helper.data('namespace') !== fm.namespace || ! insideNavbar(e.clientX) || ! fm.insideWorkzone(e.pageX, e.pageY)) {
						dst.removeClass(cl);
						helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus');
						return;
					}
					dst.addClass(hover);
					if (dst.is('.'+collapsed+':not(.'+expanded+')')) {
						dst.data('expandTimer', setTimeout(function() {
							dst.is('.'+collapsed+'.'+hover) && dst.children('.'+arrow).click();
						}, 500));
					}
					if (dst.is('.elfinder-ro,.elfinder-na')) {
						dst.removeClass(dropover);
						helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus');
						return;
					}
					hash = fm.navId2Hash(dst.attr('id'));
					dst.data('dropover', hash);
					$.each(ui.helper.data('files'), function(i, h) {
						if (h === hash || (fm.file(h).phash === hash && !ui.helper.hasClass('elfinder-drag-helper-plus'))) {
							dst.removeClass(cl);
							return false; // break $.each
						}
					});
					if (helper.data('locked')) {
						status = 'elfinder-drag-helper-plus';
					} else {
						status = 'elfinder-drag-helper-move';
						if (e.shiftKey || e.ctrlKey || e.metaKey) {
							status += ' elfinder-drag-helper-plus';
						}
					}
					dst.hasClass(dropover) && helper.addClass(status);
					setTimeout(function(){ dst.hasClass(dropover) && helper.addClass(status); }, 20);
				},
				out : function(e, ui) {
					var dst    = $(this),
						helper = ui.helper;
					e.stopPropagation();
					helper.removeClass('elfinder-drag-helper-move elfinder-drag-helper-plus').data('dropover', Math.max(helper.data('dropover') - 1, 0));
					dst.data('expandTimer') && clearTimeout(dst.data('expandTimer'));
					dst.removeData('dropover')
					   .removeClass(hover+' '+dropover);
				},
				deactivate : function() {
					$(this).removeData('dropover')
					       .removeClass(hover+' '+dropover);
				},
				drop : function(e, ui) {
					insideNavbar(e.clientX) && drop.call(this, e, ui);
				}
			}),
			
			spinner = $(fm.res('tpl', 'navspinner')),
			
			/**
			 * Directory html template
			 *
			 * @type String
			 */
			tpl = fm.res('tpl', 'navdir'),
			
			/**
			 * Permissions marker html template
			 *
			 * @type String
			 */
			ptpl = fm.res('tpl', 'perms'),
			
			/**
			 * Lock marker html template
			 *
			 * @type String
			 */
			ltpl = fm.res('tpl', 'lock'),
			
			/**
			 * Symlink marker html template
			 *
			 * @type String
			 */
			stpl = fm.res('tpl', 'symlink'),
			
			/**
			 * Html template replacement methods
			 *
			 * @type Object
			 */
			replace = {
				id          : function(dir) { return fm.navHash2Id(dir.hash) },
				cssclass    : function(dir) {
					var cname = (dir.phash && ! dir.isroot ? '' : root)+' '+navdir+' '+fm.perms2class(dir);
					dir.dirs && !dir.link && (cname += ' ' + collapsed);
					opts.getClass && (cname += ' ' + opts.getClass(dir));
					dir.csscls && (cname += ' ' + fm.escape(dir.csscls));
					return cname;
				},
				permissions : function(dir) { return !dir.read || !dir.write ? ptpl : ''; },
				symlink     : function(dir) { return dir.alias ? stpl : ''; },
				style       : function(dir) { return dir.icon ? 'style="background:url(\''+fm.escape(dir.icon)+'\') 0 0 no-repeat;background-size:contain;"' : ''; }
			},
			
			/**
			 * Return html for given dir
			 *
			 * @param  Object  directory
			 * @return String
			 */
			itemhtml = function(dir) {
				dir.name = fm.escape(dir.i18 || dir.name);
				
				return tpl.replace(/(?:\{([a-z]+)\})/ig, function(m, key) {
					return dir[key] || (replace[key] ? replace[key](dir) : '');
				});
			},
			
			/**
			 * Return only dirs from files list
			 *
			 * @param  Array  files list
			 * @return Array
			 */
			filter = function(files) {
				return $.map(files||[], function(f) { return f.mime == 'directory' ? f : null });
			},
			
			/**
			 * Find parent subtree for required directory
			 *
			 * @param  String  dir hash
			 * @return jQuery
			 */
			findSubtree = function(hash) {
				return hash ? $('#'+fm.navHash2Id(hash)).next('.'+subtree) : tree;
			},
			
			/**
			 * Find directory (wrapper) in required node
			 * before which we can insert new directory
			 *
			 * @param  jQuery  parent directory
			 * @param  Object  new directory
			 * @return jQuery
			 */
			findSibling = function(subtree, dir) {
				var node = subtree.children(':first'),
					info;

				while (node.length) {
					info = fm.file(fm.navId2Hash(node.children('[id]').attr('id')));
					
					if ((info = fm.file(fm.navId2Hash(node.children('[id]').attr('id')))) 
					&& compare(dir, info) < 0) {
						return node;
					}
					node = node.next();
				}
				return $('');
			},
			
			/**
			 * Add new dirs in tree
			 *
			 * @param  Array  dirs list
			 * @return void
			 */
			updateTree = function(dirs) {
				var length  = dirs.length,
					orphans = [],
					i = length,
					tgts = $(),
					done = {},
					dir, html, parent, sibling, init, atonce = {}, base, node;

				var firstVol = true; // check for netmount volume
				while (i--) {
					dir = dirs[i];

					if (done[dir.hash] || $('#'+fm.navHash2Id(dir.hash)).length) {
						continue;
					}
					done[dir.hash] = true;
					
					if ((parent = findSubtree(dir.phash)).length) {
						if (dir.phash && ((init = !parent.children().length) || (sibling = findSibling(parent, dir)).length)) {
							if (init) {
								if (!atonce[dir.phash]) {
									atonce[dir.phash] = [];
								}
								atonce[dir.phash].push(dir);
							} else {
								node = itemhtml(dir);
								sibling.before(node);
								! mobile && (tgts = tgts.add(node));
							}
						} else {
							node = itemhtml(dir);
							parent[firstVol || dir.phash ? 'append' : 'prepend'](node);
							firstVol = false;
							if (!dir.phash || dir.isroot) {
								base = $('#'+fm.navHash2Id(dir.hash)).parent().addClass(wrapperRoot);
								if (!dir.disabled || dir.disabled.length < 1) {
									base.addClass(pastable+' '+uploadable);
								} else {
									if ($.inArray('paste', dir.disabled) === -1) {
										base.addClass(pastable);
									}
									if ($.inArray('upload', dir.disabled) === -1) {
										base.addClass(uploadable);
									}
								}
							}
							! mobile && updateDroppable(null, base);
						}
					} else {
						orphans.push(dir);
					}
				}

				// When init, html append at once
				if (Object.keys(atonce).length){
					$.each(atonce, function(p, dirs){
						var parent = findSubtree(p),
						    html   = [];
						dirs.sort(compare);
						$.each(dirs, function(i, d){
							html.push(itemhtml(d));
						});
						parent.append(html.join(''));
						! mobile && fm.lazy(function() { updateDroppable(null, parent); });
					});
				}
				
				if (orphans.length && orphans.length < length) {
					updateTree(orphans);
					return;
				} 
				
				! mobile && tgts.length && fm.lazy(function() { updateDroppable(tgts); });
				
			},
			
			/**
			 * sort function by dir.name
			 * 
			 */
			compare = function(dir1, dir2) {
				if (! fm.sortAlsoTreeview) {
					return fm.sortRules.name(dir1, dir2);
				} else {
					var asc   = fm.sortOrder == 'asc',
						type  = fm.sortType,
						rules = fm.sortRules,
						res;
					
					res = asc? rules[fm.sortType](dir1, dir2) : rules[fm.sortType](dir2, dir1);
					
					return type !== 'name' && res === 0
						? res = asc ? rules.name(dir1, dir2) : rules.name(dir2, dir1)
						: res;
				}
			},

			/**
			 * Auto scroll to cwd
			 *
			 * @return void
			 */
			autoScroll = function(target) {
				var self = $(this),
					dfrd = $.Deferred();
				self.data('autoScrTm') && clearTimeout(self.data('autoScrTm'));
				self.data('autoScrTm', setTimeout(function() {
					var current = $('#'+(target || fm.navHash2Id(fm.cwd().hash)));
					
					if (current.length) {
						var parent = tree.parent().stop(false, true),
						top = parent.offset().top,
						treeH = parent.height(),
						bottom = top + treeH - current.outerHeight(),
						tgtTop = current.offset().top;
						
						if (tgtTop < top || tgtTop > bottom) {
							parent.animate({
								scrollTop : parent.scrollTop() + tgtTop - top - treeH / 3
							}, {
								duration : 'fast',
								complete : function() {	dfrd.resolve(); }
							});
						} else {
							dfrd.resolve();
						}
					} else {
						dfrd.reject();
					}
				}, 100));
				return dfrd;
			},
			
			/**
			 * Mark current directory as active
			 * If current directory is not in tree - load it and its parents
			 *
			 * @param {Boolean} do not expand cwd
			 * @return void
			 */
			sync = function(noCwd, dirs, init, open) {
				var cwd     = fm.cwd(),
					cwdhash = cwd.hash,
					current = $('#'+fm.navHash2Id(cwdhash)), 
					noCwd   = noCwd || false,
					dirs    = dirs || [],
					open    = open || inOpen,
					reqCmd  = 'parents',
					reqs    = [],
					getCmd  = function(target) {
						var pnode = fm.file(target);
						return (pnode && (pnode.isroot || ! pnode.phash))? 'tree' : 'parents';
					},
					reqPush = function(cmd, target) {
						var link, spinner;
						if (! registed[cmd + target]) {
							if (cmd === 'tree' && target !== cwdhash) {
								link = $('#'+fm.navHash2Id(target));
								if (link.length) {
									spinner = $(fm.res('tpl', 'navspinner')).insertBefore(link.children('.'+arrow));
									link.removeClass(collapsed);
								}
							}
							registed[cmd + target] = true;
							reqs.push(fm.request({
								data : {
									cmd    : cmd,
									target : target
								},
								preventFail : true
							}).done(function() {
								$('#'+fm.navHash2Id(cmd === 'tree'? target : fm.root(target))).addClass(loaded);
							}).always(function() {
								if (spinner) {
									spinner.remove();
									link.addClass(collapsed+' '+expanded).next('.'+subtree).show();
								}
							}));
						}
					},
					setReqs = function(target) {
						var proot = fm.root(target),
							phash, cmd, reqTarget;
						
						while (proot) {
							if (proot && (proot = fm.file(proot)) && (phash = proot.phash) && phash.indexOf(proot.volumeid) !== 0) {
								cmd = getCmd(phash);
								if (cmd === 'parents') {
									reqPush('tree', phash);
								}
								reqPush(cmd, phash);
								proot = fm.root(phash);
							} else {
								proot = null;
							}
						}
					},
					registed = {},
					rootNode, dir, link, subs, subsLen, cnt;
				
				if (openRoot) {
					rootNode = $('#'+fm.navHash2Id(fm.root()));
					rootNode.hasClass(loaded) && rootNode.addClass(expanded).next('.'+subtree).show();
					openRoot = false;
				}
				
				if (!current.hasClass(active)) {
					tree.find(selNavdir+'.'+active).removeClass(active);
					current.addClass(active);
				}

				if (opts.syncTree || !current.length) {
					if (current.length && (noCwd || ! init || ! cwd.isroot)) {
						if (!noCwd || init) {
							current.addClass(loaded);
							if (openCwd && current.hasClass(collapsed)) {
								current.addClass(expanded).next('.'+subtree).slideDown();
							}
						}
						if (open || !noCwd) {
							subs = current.parentsUntil('.'+root).filter('.'+subtree);
							subsLen = subs.length;
							cnt = 1;
							subs.show().prev(selNavdir).addClass(expanded, function(){
								!noCwd && subsLen == cnt++ && autoScroll();
							});
							!subsLen && !noCwd && autoScroll();
						}
						return;
					}
					if (fm.newAPI) {
						dir = fm.file(cwdhash);
						if (dir && dir.phash && ! dir.isroot) {
							link = $('#'+fm.navHash2Id(dir.phash));
							if (link.length && link.hasClass(loaded)) {
								fm.lazy(function() {
									updateTree([dir]);
									sync(noCwd, [], false, open);
								});
								return;
							}
						}
						if (! noCwd) {
							if (cwd.isroot && cwd.phash) {
								if (getCmd(cwd.phash) === 'tree') {
									reqCmd = 'tree';
								} else {
									reqCmd = 'parents';
								}
								setReqs(cwdhash);
								cwdhash = cwd.phash;
							} else {
								if (cwd.phash) {
									setReqs(cwd.phash);
								} else {
									reqCmd = null;
								}
							}
						}

						reqCmd && reqPush(reqCmd, cwdhash);

						link  = cwd.root? $('#'+fm.navHash2Id(cwd.root)) : null;
						if (link) {
							spinner.insertBefore(link.children('.'+arrow));
							link.removeClass(collapsed);
						}
						$.when.apply($, reqs)
						.done(function(data) {
							var treeDirs, argLen, i;
							if (! data) {
								data = { tree : [] };
							}
							if (fm.api < 2.1) {
								data.tree.push(cwd);
							}
							argLen = arguments.length;
							if (argLen > 1) {
								for(i = 1; i < argLen; i++) {
									if (arguments[i].tree && arguments[i].tree.length) {
										data.tree.push.apply(data.tree, arguments[i].tree);
									}
								}
							}
							
							treeDirs = filter(data.tree);
							if (cwd.isroot && cwd.hash === cwdhash && ! treeDirs.length) {
								// root's phash was not found
								delete cwd.isroot;
								delete cwd.phash;
							}
							dirs = JSON.parse(JSON.stringify($.merge(dirs, treeDirs)));
							updateTree(dirs);
							updateArrows(dirs, loaded);
							
							// leaf root sync
							if (!noCwd && cwd.isroot && $('#'+fm.navHash2Id(cwd.hash).length)) {
								sync(true, [], init, open);
							}
							
							cwdhash == cwd.hash && fm.visible() && sync(noCwd, [], false, open);
						})
						.always(function() {
							if (link) {
								spinner.remove();
								link.addClass(collapsed+' '+loaded);
							}
						});
					}
					
				}
			},
			
			/**
			 * Make writable and not root dirs droppable
			 *
			 * @return void
			 */
			updateDroppable = function(target, node) {
				var limit = 100,
					next;
				
				if (!target) {
					if (!node || node.closest('div.'+wrapperRoot).hasClass(uploadable)) {
						(node || tree.find('div.'+uploadable)).find(selNavdir+':not(.elfinder-ro,.elfinder-na)').addClass('native-droppable');
					}
					if (!node || node.closest('div.'+wrapperRoot).hasClass(pastable)) {
						//target = (node || tree.find('div.'+pastable)).find(selNavdir+':not(.'+droppable+',.elfinder-ro,.elfinder-na)');
						target = (node || tree.find('div.'+pastable)).find(selNavdir+':not(.'+droppable+')');
					} else {
						target = $();
					}
				}
				
				if (target.length > limit) {
					next = target.slice(limit);
					target = target.slice(0, limit);
				}
				
				target.droppable(droppableopts);
				
				if (next) {
					fm.lazy(function() {
						updateDroppable(next);
					}, 20);
				}
			},
			
			/**
			 * Check required folders for subfolders and update arrow classes
			 *
			 * @param  Array  folders to check
			 * @param  String css class 
			 * @return void
			 */
			updateArrows = function(dirs, cls) {
				var sel = cls == loaded
						? '.'+collapsed+':not(.'+loaded+')'
						: ':not(.'+collapsed+')';
				
						
				//tree.find('.'+subtree+':has(*)').prev(':not(.'+collapsed+')').addClass(collapsed)

				$.each(dirs, function(i, dir) {
					$('#'+fm.navHash2Id(dir.phash)+sel)
						.filter(function() { return $.map($(this).next('.'+subtree).children(), function(n) {
							return ($(n).children().hasClass(root))? null : n;
						}).length > 0 })
						.addClass(cls);
				})
			},
			
			
			
			/**
			 * Navigation tree
			 *
			 * @type JQuery
			 */
			tree = $(this).addClass(treeclass)
				// make dirs draggable and toggle hover class
				.on('mouseenter mouseleave', selNavdir, function(e) {
					var link  = $(this), 
						enter = e.type == 'mouseenter';
					
					if (!link.hasClass(dropover+' '+disabled)) {
						!mobile && enter && !link.hasClass(root+' '+draggable+' elfinder-na elfinder-wo') && link.draggable(fm.draggable);
						link.toggleClass(hover, enter);
					}
				})
				// native drag enter
				.on('dragenter', selNavdir, function(e) {
					if (e.originalEvent.dataTransfer) {
						var dst = $(this);
						dst.addClass(hover);
						if (dst.is('.'+collapsed+':not(.'+expanded+')')) {
							dst.data('expandTimer', setTimeout(function() {
								dst.is('.'+collapsed+'.'+hover) && dst.children('.'+arrow).click();
							}, 500));
						}
					}
				})
				// native drag leave
				.on('dragleave', selNavdir, function(e) {
					if (e.originalEvent.dataTransfer) {
						var dst = $(this);
						dst.data('expandTimer') && clearTimeout(dst.data('expandTimer'));
						dst.removeClass(hover);
					}
				})
				// open dir or open subfolders in tree
				.on('click', selNavdir, function(e) {
					var link = $(this),
						hash = fm.navId2Hash(link.attr('id')),
						file = fm.file(hash);
					
						if (link.data('longtap')) {
							e.stopPropagation();
						return;
					}
					
					if (hash != fm.cwd().hash && !link.hasClass(disabled)) {
						fm.exec('open', hash).done(function() {
							fm.select({selected: [hash], origin: 'tree'});
						});
					} else {
						if (link.hasClass(collapsed)) {
							link.children('.'+arrow).click();
						}
						fm.select({selected: [hash], origin: 'tree'});
					}
				})
				// for touch device
				.on('touchstart', selNavdir, function(e) {
					if (e.originalEvent.touches.length > 1) {
						return;
					}
					var evt = e.originalEvent,
					p = $(this)
					.addClass(hover)
					.data('longtap', null)
					.data('tmlongtap', setTimeout(function(e){
						// long tap
						p.data('longtap', true);
						fm.trigger('contextmenu', {
							'type'    : 'navbar',
							'targets' : [fm.navId2Hash(p.attr('id'))],
							'x'       : evt.touches[0].pageX,
							'y'       : evt.touches[0].pageY
						});
					}, 500));
				})
				.on('touchmove touchend', selNavdir, function(e) {
					clearTimeout($(this).data('tmlongtap'));
					if (e.type == 'touchmove') {
						$(this).removeClass(hover);
					}
				})
				// toggle subfolders in tree
				.on('click', selNavdir+'.'+collapsed+' .'+arrow, function(e) {
					var arrow = $(this),
						link  = arrow.parent(selNavdir),
						stree = link.next('.'+subtree),
						dfrd  = $.Deferred(),
						slideTH = 30, cnt;

					e.stopPropagation();

					if (link.hasClass(loaded)) {
						link.toggleClass(expanded);
						fm.lazy(function() {
							cnt = link.hasClass(expanded)? stree.children().length + stree.find('div.elfinder-navbar-subtree[style*=block]').children().length : stree.find('div:visible').length;
							if (cnt > slideTH) {
								stree.toggle();
								fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
							} else {
								stree.stop(true, true).slideToggle('normal', function(){
									fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
								});
							}
						}).always(function() {
							dfrd.resolve();
						});
					} else {
						spinner.insertBefore(arrow);
						link.removeClass(collapsed);

						fm.request({cmd : 'tree', target : fm.navId2Hash(link.attr('id'))})
							.done(function(data) { 
								updateTree(JSON.parse(JSON.stringify(filter(data.tree)))); 
								
								if (stree.children().length) {
									link.addClass(collapsed+' '+expanded);
									if (stree.children().length > slideTH) {
										stree.show();
										fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
									} else {
										stree.stop(true, true).slideDown('normal', function(){
											fm.draggingUiHelper && fm.draggingUiHelper.data('refreshPositions', 1);
										});
									}
								} 
								sync(true);
							})
							.always(function(data) {
								spinner.remove();
								link.addClass(loaded);
								fm.one('treedone', function() {
									dfrd.resolve();
								});
							});
					}
					arrow.data('dfrd', dfrd);
				})
				.on('contextmenu', selNavdir, function(e) {
					var self = $(this);
					e.preventDefault();

					fm.trigger('contextmenu', {
						'type'    : 'navbar',
						'targets' : [fm.navId2Hash($(this).attr('id'))],
						'x'       : e.pageX,
						'y'       : e.pageY
					});
					
					self.addClass('ui-state-hover');
					
					fm.getUI('contextmenu').children().on('mouseenter', function() {
						self.addClass('ui-state-hover');
					});
					
					fm.bind('closecontextmenu', function() {
						self.removeClass('ui-state-hover');
					});
				})
				.on('scrolltoview', selNavdir, function() {
					var self = $(this);
					autoScroll(self.attr('id')).done(function() {
						fm.resources.blink(self, 'lookme');
					});
				})
				// prepend fake dir
				.on('create.'+fm.namespace, function(e, item) {
					var pdir = findSubtree(item.phash),
						lock = item.move || false,
						dir  = $(itemhtml(item)).addClass('elfinder-navbar-wrapper-tmp'),
						selected = fm.selected();
						
					lock && selected.length && fm.trigger('lockfiles', {files: selected});
					pdir.prepend(dir);
				}),
			// move tree into navbar
			navbar = fm.getUI('navbar').append(tree).show(),
			
			prevSortTreeview = fm.sortAlsoTreeview,
			
			// is in open event procedure
			inOpen = false;

		fm.open(function(e) {
			var data = e.data,
				dirs = filter(data.files),
				contextmenu = fm.getUI('contextmenu');

			data.init && tree.empty();

			if (fm.UA.iOS) {
				navbar.removeClass('overflow-scrolling-touch').addClass('overflow-scrolling-touch');
			}

			inOpen = true;
			if (dirs.length) {
				fm.lazy(function() {
					if (!contextmenu.data('cmdMaps')) {
						contextmenu.data('cmdMaps', {});
					}
					updateTree(dirs);
					updateArrows(dirs, loaded);
					// support volume driver option `uiCmdMap`
					$.each(dirs, function(k, v){
						if (v.volumeid) {
							if (v.uiCmdMap && Object.keys(v.uiCmdMap).length && !contextmenu.data('cmdMaps')[v.volumeid]) {
								contextmenu.data('cmdMaps')[v.volumeid] = v.uiCmdMap;
							}
						}
					});
					sync(false, dirs, data.init);
					inOpen = false;
				});
			} else {
				sync(false, dirs, data.init);
				inOpen = false;
			}
		})
		// add new dirs
		.add(function(e) {
			var dirs = filter(e.data.added);

			if (dirs.length) {
				updateTree(dirs);
				updateArrows(dirs, collapsed);
			}
		})
		// update changed dirs
		.change(function(e) {
			var dirs = filter(e.data.changed),
				length = dirs.length,
				l    = length,
				tgts = $(),
				dir, node, tmp, realParent, reqParent, realSibling, reqSibling, isExpanded, isLoaded, parent;
			
			while (l--) {
				dir = dirs[l];
				if ((node = $('#'+fm.navHash2Id(dir.hash))).length) {
					parent = node.parent();
					if (dir.phash) {
						realParent  = node.closest('.'+subtree);
						reqParent   = findSubtree(dir.phash);
						realSibling = node.parent().next();
						reqSibling  = findSibling(reqParent, dir);
						
						if (!reqParent.length) {
							continue;
						}
						
						if (reqParent[0] !== realParent[0] || realSibling.get(0) !== reqSibling.get(0)) {
							reqSibling.length ? reqSibling.before(parent) : reqParent.append(parent);
						}
					}
					isExpanded = node.hasClass(expanded);
					isLoaded   = node.hasClass(loaded);
					tmp        = $(itemhtml(dir));
					node.replaceWith(tmp.children(selNavdir));
					! mobile && updateDroppable(null, parent);
					
					if (dir.dirs 
					&& (isExpanded || isLoaded) 
					&& (node = $('#'+fm.navHash2Id(dir.hash))) 
					&& node.next('.'+subtree).children().length) {
						isExpanded && node.addClass(expanded);
						isLoaded && node.addClass(loaded);
					}
					
				}
			}

			// fm.cwd() became empty object when cwd removed
			fm.cwd().hash && sync(true);
		})
		// remove dirs
		.remove(function(e) {
			var dirs = e.data.removed,
				l    = dirs.length,
				node, stree;
			
			while (l--) {
				if ((node = $('#'+fm.navHash2Id(dirs[l]))).length) {
					stree = node.closest('.'+subtree);
					node.parent().detach();
					if (!stree.children().length) {
						stree.hide().prev(selNavdir).removeClass(collapsed+' '+expanded+' '+loaded);
					}
				}
			}
		})
		// lock/unlock dirs while moving
		.bind('lockfiles unlockfiles', function(e) {
			var lock = e.type == 'lockfiles',
				helperLocked = e.data.helper? e.data.helper.data('locked') : false,
				act  = (lock && !helperLocked) ? 'disable' : 'enable',
				dirs = $.map(e.data.files||[], function(h) {  
					var dir = fm.file(h);
					return dir && dir.mime == 'directory' ? h : null;
				});
				
			$.each(dirs, function(i, hash) {
				var dir = $('#'+fm.navHash2Id(hash));
				
				if (dir.length && !helperLocked) {
					dir.hasClass(draggable) && dir.draggable(act);
					dir.hasClass(droppable) && dir.droppable(act);
					dir[lock ? 'addClass' : 'removeClass'](disabled);
				}
			});
		})
		.bind('sortchange', function() {
			if (fm.sortAlsoTreeview || prevSortTreeview !== fm.sortAlsoTreeview) {
				var dirs = filter(fm.files());
				
				prevSortTreeview = fm.sortAlsoTreeview;
				
				tree.empty();
				updateTree(dirs);
				sync();
			}
		});

	});
	
	return this;
};


/*
 * File: /js/ui/uploadButton.js
 */

/**
 * @class  elFinder toolbar's button tor upload file
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderuploadbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd)
				.off('click'), 
			form = $('<form></form>').appendTo(button),
			input = $('<input type="file" multiple="true" title="'+cmd.fm.i18n('selectForUpload')+'">')
				.change(function() {
					var _input = $(this);
					if (_input.val()) {
						cmd.exec({input : _input.remove()[0]});
						input.clone(true).appendTo(form);
					} 
				})
				.on('dragover', function(e) {
					e.originalEvent.dataTransfer.dropEffect = 'copy';
				});

		form.append(input.clone(true));
				
		cmd.change(function() {
			form[cmd.disabled() ? 'hide' : 'show']();
		})
		.change();
	});
};


/*
 * File: /js/ui/viewbutton.js
 */

/**
 * @class  elFinder toolbar button to switch current directory view.
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderviewbutton = function(cmd) {
	return this.each(function() {
		var button = $(this).elfinderbutton(cmd),
			icon   = button.children('.elfinder-button-icon');

		cmd.change(function() {
			var icons = cmd.value == 'icons';

			icon.toggleClass('elfinder-button-icon-view-list', icons);
			cmd.className = icons? 'view-list' : '';
			cmd.title = cmd.fm.i18n(icons ? 'viewlist' : 'viewicons');
			button.attr('title', cmd.title);
		});
	});
};


/*
 * File: /js/ui/workzone.js
 */

/**
 * @class elfinderworkzone - elFinder container for nav and current directory
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderworkzone = function(fm) {
	var cl = 'elfinder-workzone';
	
	this.not('.'+cl).each(function() {
		var wz     = $(this).addClass(cl),
			wdelta = wz.outerHeight(true) - wz.height(),
			prevH  = Math.round(wz.height()),
			parent = wz.parent(),
			fitsize = function() {
				var height = parent.height() - wdelta,
					style  = parent.attr('style'),
					curH   = Math.round(wz.height());
	
				parent.css('overflow', 'hidden')
					.children(':visible:not(.'+cl+')').each(function() {
						var ch = $(this);
		
						if (ch.css('position') != 'absolute' && ch.css('position') != 'fixed') {
							height -= ch.outerHeight(true);
						}
					});
				parent.attr('style', style || '');
				
				height = Math.max(0, Math.round(height));
				if (prevH !== height || curH !== height) {
					prevH  = Math.round(wz.height());
					wz.height(height);
					fm.trigger('wzresize');
				}
			};
			
		parent.add(window).on('resize.' + fm.namespace, fitsize);
		fm.one('cssloaded', function() {
			var old = wdelta;
			wdelta = wz.outerHeight(true) - wz.height();
			if (old !== wdelta) {
				fm.trigger('uiresize');
			}
		}).bind('uiresize', fitsize);
	});
	return this;
};


/*
 * File: /js/commands/back.js
 */

/**
 * @class  elFinder command "back"
 * Open last visited folder
 *
 * @author Dmitry (dio) Levashov
 **/
(elFinder.prototype.commands.back = function() {
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.shortcuts      = [{
		pattern     : 'ctrl+left backspace'
	}];
	
	this.getstate = function() {
		return this.fm.history.canBack() ? 0 : -1;
	}
	
	this.exec = function() {
		return this.fm.history.back();
	}

}).prototype = { forceLoad : true }; // this is required command

/*
 * File: /js/commands/colwidth.js
 */

/**
 * @class  elFinder command "colwidth"
 * CWD list table columns width to auto
 *
 * @author Naoki Sawada
 **/
elFinder.prototype.commands.colwidth = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = false;
	
	this.getstate = function() {
		return this.fm.getUI('cwd').find('table').css('table-layout') === 'fixed' ? 0 : -1;
	}
	
	this.exec = function() {
		this.fm.getUI('cwd').trigger('colwidth');
	}
	
};

/*
 * File: /js/commands/copy.js
 */

/**
 * @class elFinder command "copy".
 * Put files in filemanager clipboard.
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.copy = function() {
	
	this.shortcuts = [{
		pattern     : 'ctrl+c ctrl+insert'
	}];
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;

		return !this._disabled && cnt && $.map(sel, function(f) { return f.read ? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm   = this.fm,
			dfrd = $.Deferred()
				.fail(function(error) {
					fm.error(error);
				});

		$.each(this.files(hashes), function(i, file) {
			if (! file.read) {
				return !dfrd.reject(['errCopy', file.name, 'errPerm']);
			}
		});
		
		return dfrd.state() == 'rejected' ? dfrd : dfrd.resolve(fm.clipboard(this.hashes(hashes)));
	}

};


/*
 * File: /js/commands/cut.js
 */

/**
 * @class elFinder command "copy".
 * Put files in filemanager clipboard.
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.cut = function() {
	var fm = this.fm;
	
	this.shortcuts = [{
		pattern     : 'ctrl+x shift+insert'
	}];
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
		
		return !this._disabled && cnt && $.map(sel, function(f) { return f.read && ! f.locked && ! fm.isRoot(f) ? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var dfrd = $.Deferred()
				.fail(function(error) {
					fm.error(error);
				});

		$.each(this.files(hashes), function(i, file) {
			if (!(file.read && ! file.locked && ! fm.isRoot(file)) ) {
				return !dfrd.reject(['errCopy', file.name, 'errPerm']);
			}
			if (file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
		});
		
		return dfrd.state() == 'rejected' ? dfrd : dfrd.resolve(fm.clipboard(this.hashes(hashes), true));
	}

};


/*
 * File: /js/commands/download.js
 */

/**
 * @class elFinder command "download". 
 * Download selected files.
 * Only for new api
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elFinder.prototype.commands.zipdl = function() {};
elFinder.prototype.commands.download = function() {
	var self   = this,
		fm     = this.fm,
		zipOn  = false,
		mixed  = false,
		filter = function(hashes, inExec) {
			var czipdl = (fm.api > 2)? fm.getCommand('zipdl') : null,
				volumeid, mixedCmd;
			
			if (czipdl !== null) {
				if (fm.searchStatus.state > 1) {
					mixed = fm.searchStatus.mixed;
				} else if (fm.leafRoots[fm.cwd().hash]) {
					volumeid = fm.cwd().volumeid;
					$.each(hashes, function(i, h) {
						if (h.indexOf(volumeid) !== 0) {
							mixed = true;
							return false;
						}
					});
				}
				zipOn = (fm.isCommandEnabled('zipdl', hashes[0]));
			}

			if (mixed) {
				mixedCmd = czipdl? 'zipdl' : 'download';
				hashes = $.map(hashes, function(h) {
					var f = fm.file(h),
						res = (! f || (! czipdl && f.mime === 'directory') || ! fm.isCommandEnabled(mixedCmd, h))? null : h;
					if (f && inExec && ! res) {
						$('#' + fm.cwdHash2Id(f.hash)).trigger('unselect');
					}
					return res;
				});
				if (! hashes.length) {
					return [];
				}
			} else {
				if (!fm.isCommandEnabled('download', hashes[0])) {
					return [];
				}
			}
			
			return $.map(self.files(hashes), function(f) { 
				var res = (! f.read || (! zipOn && f.mime == 'directory')) ? null : f;
				if (inExec && ! res) {
					$('#' + fm.cwdHash2Id(f.hash)).trigger('unselect');
				}
				return res;
			});
		};
	
	this.linkedCmds = ['zipdl'];
	
	this.shortcuts = [{
		pattern     : 'shift+enter'
	}];
	
	this.getstate = function(sel) {
		var sel    = this.hashes(sel),
			cnt    = sel.length,
			maxReq = this.options.maxRequests || 10,
			czipdl = (fm.api > 2)? fm.getCommand('zipdl') : null,
			mixed  = false,
			croot  = '';
		
		if (cnt < 1) {
			return -1;
		}
		cnt = filter(sel).length;
		
		return  (cnt && (zipOn || (cnt <= maxReq && ((!fm.UA.IE && !fm.UA.Mobile) || cnt == 1))) ? 0 : -1);
	};
	
	fm.bind('contextmenu', function(e){
		var fm = self.fm,
			helper = null,
			targets, file, link,
			getExtra = function(file) {
				var link = file.url || fm.url(file.hash);
				return {
					icon: 'link',
					node: $('<a></a>')
						.attr({href: link, target: '_blank', title: fm.i18n('link')})
						.text(file.name)
						.on('mousedown click touchstart touchmove touchend contextmenu', function(e){
							e.stopPropagation();
						})
						.on('dragstart', function(e) {
							var dt = e.dataTransfer || e.originalEvent.dataTransfer || null;
							helper = null;
							if (dt) {
								var icon  = function(f) {
										var mime = f.mime, i, tmb = fm.tmb(f);
										i = '<div class="elfinder-cwd-icon '+fm.mime2class(mime)+' ui-corner-all"></div>';
										if (tmb) {
											i = $(i).addClass(tmb.className).css('background-image', "url('"+tmb.url+"')").get(0).outerHTML;
										}
										return i;
									};
								dt.effectAllowed = 'copyLink';
								if (dt.setDragImage) {
									helper = $('<div class="elfinder-drag-helper html5-native">').append(icon(file)).appendTo($(document.body));
									dt.setDragImage(helper.get(0), 50, 47);
								}
								if (!fm.UA.IE) {
									dt.setData('elfinderfrom', window.location.href + file.phash);
									dt.setData('elfinderfrom:' + dt.getData('elfinderfrom'), '');
								}
							}
						})
						.on('dragend', function(e) {
							helper && helper.remove();
						})
				};
			};
		self.extra = null;
		if (e.data) {
			targets = e.data.targets || [];
			if (targets.length === 1 && (file = fm.file(targets[0])) && file.mime !== 'directory') {
				if (file.url != '1') {
					self.extra = getExtra(file);
				} else {
					// Get URL ondemand
					var node;
					self.extra = {
						icon: 'link',
						node: $('<a></a>')
							.attr({href: '#', title: fm.i18n('getLink'), draggable: 'false'})
							.text(file.name)
							.on('click touchstart', function(e){
								if (e.type === 'touchstart' && e.originalEvent.touches.length > 1) {
									return;
								}
								var parent = node.parent();
								e.stopPropagation();
								e.preventDefault();
								parent.removeClass('ui-state-disabled').addClass('elfinder-button-icon-spinner');
								fm.request({
									data : {cmd : 'url', target : file.hash},
									preventDefault : true
								})
								.always(function(data) {
									parent.removeClass('elfinder-button-icon-spinner');
									if (data.url) {
										var rfile = fm.file(file.hash);
										rfile.url = data.url;
										node.replaceWith(getExtra(file).node);
									} else {
										parent.addClass('ui-state-disabled');
									}
								});

							})
					};
					node = self.extra.node;
					node.ready(function(){
						setTimeout(function(){
							node.parent().addClass('ui-state-disabled').css('pointer-events', 'auto');
						}, 10);
					});
				}
			}
		}
	});
	
	this.exec = function(hashes) {
		Efw("elfinder_download",{
			"cmd":"download",
			"home":fm.options.customData.home,
			"isAbs":fm.options.customData.isAbs,
			"readonly":fm.options.customData.readonly,
			"id":fm.options.customData.id,
			"targets":hashes
			},
			fm.options.customData.appurl
		);
	};

};


/*
 * File: /js/commands/duplicate.js
 */

/**
 * @class elFinder command "duplicate"
 * Create file/folder copy with suffix "copy Number"
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.duplicate = function() {
	var fm = this.fm;
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;

		return !this._disabled && cnt && fm.cwd().write && $.map(sel, function(f) { return f.read && f.phash === fm.cwd().hash && ! fm.isRoot(f)? f : null  }).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm     = this.fm,
			files  = this.files(hashes),
			cnt    = files.length,
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				}), 
			args = [];
			
		if (! cnt) {
			return dfrd.reject();
		}
		
		$.each(files, function(i, file) {
			if (!file.read || !fm.file(file.phash).write) {
				return !dfrd.reject(['errCopy', file.name, 'errPerm']);
			}
		});
		
		if (dfrd.state() == 'rejected') {
			return dfrd;
		}
		
		return fm.request({
			data   : {cmd : 'duplicate', targets : this.hashes(hashes)},
			notify : {type : 'copy', cnt : cnt}
		}).done(function(data) {
			var newItem;
			if (data && data.added && data.added[0]) {
				fm.one('duplicatedone', function() {
					newItem = fm.findCwdNodes(data.added);
					if (newItem.length) {
						newItem.trigger('scrolltoview');
					} else {
						fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
						fm.toast({msg: fm.i18n(['complete', fm.i18n('cmdduplicate')])});
					}
				});
			}
		});
		
	}

};

//Efw does not edit================
//=================================

/*
 * File: /js/commands/forward.js
 */

/**
 * @class  elFinder command "forward"
 * Open next visited folder
 *
 * @author Dmitry (dio) Levashov
 **/
(elFinder.prototype.commands.forward = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = true;
	this.shortcuts = [{
		pattern     : 'ctrl+right'
	}];
	
	this.getstate = function() {
		return this.fm.history.canForward() ? 0 : -1;
	}
	
	this.exec = function() {
		return this.fm.history.forward();
	}
	
}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/fullscreen.js
 */

/**
 * @class  elFinder command "fullscreen"
 * elFinder node to full scrren mode
 *
 * @author Naoki Sawada
 **/

elFinder.prototype.commands.fullscreen = function() {
	var self   = this,
		fm     = this.fm,
		update = function(e, data) {
			if (data && data.fullscreen) {
				self.update(void(0), (data.fullscreen === 'on'));
			}
		};

	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.value = false;

	this.options = {
		ui : 'fullscreenbutton',
	};

	this.getstate = function() {
		return 0;
	}
	
	this.exec = function() {
		var node = fm.getUI().get(0),
			fullNode = fm.toggleFullscreen(node);
		self.update(void(0), (fullNode === node));
	};
	
	fm.bind('init', function() {
		fm.getUI().off('resize.' + fm.namespace, update).on('resize.' + fm.namespace, update);
	});
};


/*
 * File: /js/commands/getfile.js
 */

/**
 * @class elFinder command "getfile". 
 * Return selected files info into outer callback.
 * For use elFinder with wysiwyg editors etc.
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
(elFinder.prototype.commands.getfile = function() {
	var self   = this,
		fm     = this.fm,
		filter = function(files) {
			var o = self.options;

			files = $.map(files, function(file) {
				return (file.mime != 'directory' || o.folders) && file.read ? file : null;
			});

			return o.multiple || files.length == 1 ? files : [];
		};
	
	this.alwaysEnabled = true;
	this.callback      = fm.options.getFileCallback;
	this._disabled     = typeof(this.callback) == 'function';
	
	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
			
		return this.callback && cnt && filter(sel).length == cnt ? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm    = this.fm,
			opts  = this.options,
			files = this.files(hashes),
			cnt   = files.length,
			url   = fm.option('url'),
			tmb   = fm.option('tmbUrl'),
			dfrd  = $.Deferred()
				.done(function(data) {
					var res,
						done = function() {
							if (opts.oncomplete == 'close') {
								fm.hide();
							} else if (opts.oncomplete == 'destroy') {
								fm.destroy();
							}
						};
					
					fm.trigger('getfile', {files : data});
					
					res = self.callback(data, fm);
					
					if (typeof res === 'object' && typeof res.done === 'function') {
						res.done(done)
						.fail(function(error) {
							error && fm.error(error);
						});
					} else {
						done();
					}
				}),
			result = function(file) {
				return opts.onlyURL
					? opts.multiple ? $.map(files, function(f) { return f.url; }) : files[0].url
					: opts.multiple ? files : files[0];
			},
			req = [], 
			i, file, dim;

		for (i = 0; i < cnt; i++) {
			file = files[i];
			if (file.mime == 'directory' && !opts.folders) {
				return dfrd.reject();
			}
			file.baseUrl = url;
			if (file.url == '1') {
				req.push(fm.request({
					data : {cmd : 'url', target : file.hash},
					notify : {type : 'url', cnt : 1, hideCnt : true},
					preventDefault : true
				})
				.done(function(data) {
					if (data.url) {
						var rfile = fm.file(this.hash);
						rfile.url = this.url = data.url;
					}
				}.bind(file)));
			} else {
				file.url = fm.url(file.hash);
			}
			if (! opts.onlyURL) {
				if (opts.getPath) {
					file.path = fm.path(file.hash);
					if (file.path === '' && file.phash) {
						// get parents
						(function() {
							var dfd  = $.Deferred();
							req.push(dfd);
							fm.path(file.hash, false, {})
								.done(function(path) {
									file.path = path;
								})
								.fail(function() {
									file.path = '';
								})
								.always(function() {
									dfd.resolve();
								});
						})();
					}
				}
				if (file.tmb && file.tmb != 1) {
					file.tmb = tmb + file.tmb;
				}
				if (!file.width && !file.height) {
					if (file.dim) {
						dim = file.dim.split('x');
						file.width = dim[0];
						file.height = dim[1];
					} else if (opts.getImgSize && file.mime.indexOf('image') !== -1) {
						req.push(fm.request({
							data : {cmd : 'dim', target : file.hash},
							notify : {type : 'dim', cnt : 1, hideCnt : true},
							preventDefault : true
						})
						.done(function(data) {
							if (data.dim) {
								var dim = data.dim.split('x');
								var rfile = fm.file(this.hash);
								rfile.width = this.width = dim[0];
								rfile.height = this.height = dim[1];
							}
						}.bind(file)));
					}
				}
			}
		}
		
		if (req.length) {
			$.when.apply(null, req).always(function() {
				dfrd.resolve(result(files));
			})
			return dfrd;
		}
		
		return dfrd.resolve(result(files));
	}

}).prototype = { forceLoad : true }; // this is required command



/*
 * File: /js/commands/home.js
 */


(elFinder.prototype.commands.home = function() {
	this.title = 'Home';
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;
	this.shortcuts = [{
		pattern     : 'ctrl+home ctrl+shift+up',
		description : 'Home'
	}];
	
	this.getstate = function() {
		var root = this.fm.root(),
			cwd  = this.fm.cwd().hash;
			
		return root && cwd && root != cwd ? 0: -1;
	}
	
	this.exec = function() {
		return this.fm.exec('open', this.fm.root());
	}
	

}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/info.js
 */

/**
 * @class elFinder command "info". 
 * Display dialog with file properties.
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
(elFinder.prototype.commands.info = function() {
	var m   = 'msg',
		fm  = this.fm,
		spclass = 'elfinder-info-spinner',
		btnclass = 'elfinder-info-button',
		msg = {
			calc     : fm.i18n('calc'),
			size     : fm.i18n('size'),
			unknown  : fm.i18n('unknown'),
			path     : fm.i18n('path'),
			aliasfor : fm.i18n('aliasfor'),
			modify   : fm.i18n('modify'),
			perms    : fm.i18n('perms'),
			locked   : fm.i18n('locked'),
			dim      : fm.i18n('dim'),
			kind     : fm.i18n('kind'),
			files    : fm.i18n('files'),
			folders  : fm.i18n('folders'),
			roots    : fm.i18n('volumeRoots'),
			items    : fm.i18n('items'),
			yes      : fm.i18n('yes'),
			no       : fm.i18n('no'),
			link     : fm.i18n('link'),
			owner    : fm.i18n('owner'),
			group    : fm.i18n('group'),
			perm     : fm.i18n('perm'),
			getlink  : fm.i18n('getLink')
		};
		
	this.tpl = {
		main       : '<div class="ui-helper-clearfix elfinder-info-title {dirclass}"><span class="elfinder-cwd-icon {class} ui-corner-all"></span>{title}</div><table class="elfinder-info-tb">{content}</table>',
		itemTitle  : '<strong>{name}</strong><span class="elfinder-info-kind">{kind}</span>',
		groupTitle : '<strong>{items}: {num}</strong>',
		row        : '<tr><td>{label} : </td><td>{value}</td></tr>',
		spinner    : '<span>{text}</span> <span class="'+spclass+' '+spclass+'-{name}"></span>'
	};
	
	this.alwaysEnabled = true;
	this.updateOnSelect = false;
	this.shortcuts = [{
		pattern     : 'ctrl+i'
	}];
	
	this.init = function() {
		$.each(msg, function(k, v) {
			msg[k] = fm.i18n(v);
		});
	};
	
	this.getstate = function() {
		return 0;
	};
	
	this.exec = function(hashes) {
		var files   = this.files(hashes);
		if (! files.length) {
			files   = this.files([ this.fm.cwd().hash ]);
		}
		var self    = this,
			fm      = this.fm,
			o       = this.options,
			tpl     = this.tpl,
			row     = tpl.row,
			cnt     = files.length,
			content = [],
			view    = tpl.main,
			l       = '{label}',
			v       = '{value}',
			reqs    = [],
			opts    = {
				title : this.title,
				width : 'auto',
				close : function() {
					$(this).elfinderdialog('destroy');
					$.each(reqs, function(i, req) {
						var xhr = (req && req.xhr)? req.xhr : null;
						if (xhr && xhr.state() == 'pending') {
							xhr.quiet = true;
							xhr.abort();
						}
					});
				}
			},
			count = [],
			replSpinner = function(msg, name) { dialog.find('.'+spclass+'-'+name).parent().html(msg); },
			id = fm.namespace+'-info-'+$.map(files, function(f) { return f.hash; }).join('-'),
			dialog = fm.getUI().find('#'+id),
			customActions = [],
			getSize = function(targets) {
				var getLeafRoots = function(file) {
						var targets = [];
						if (file.mime === 'directory') {
							$.each(fm.leafRoots, function(hash, roots) {
								var phash;
								if (hash === file.hash) {
									targets.push.apply(targets, roots);
								} else {
									phash = (fm.file(hash) || {}).phash;
									while(phash) {
										if (phash === file.hash) {
											targets.push.apply(targets, roots);
										}
										phash = (fm.file(phash) || {}).phash;
									}
								}
							});
						}
						return targets;
					},
					checkPhash = function(hash) {
						var dfd = $.Deferred(),
							dir = fm.file(hash),
							target = dir? dir.phash : hash;
						if (target && ! fm.file(target)) {
							fm.request({
								data : {
									cmd    : 'parents',
									target : target
								},
								preventFail : true
							}).done(function() {
								fm.one('parentsdone', function() {
									dfd.resolve();
								});
							}).fail(function() {
								dfd.resolve();
							});
						} else {
							dfd.resolve();
						}
						return dfd;
					},
					cache = function() {
						var dfd = $.Deferred(),
							cnt = Object.keys(fm.leafRoots).length;
						
						if (cnt > 0) {
							$.each(fm.leafRoots, function(hash) {
								checkPhash(hash).done(function() {
									--cnt;
									if (cnt < 1) {
										dfd.resolve();
									}
								});
							});
						} else {
							dfd.resolve();
						}
						return dfd;
					};
				
				fm.autoSync('stop');
				cache().done(function() {
					var files = [], grps = {}, dfds = [];
					
					$.each(targets, function() {
						files.push.apply(files, getLeafRoots(fm.file(this)));
					});
					targets.push.apply(targets, files);
					
					$.each(targets, function() {
						var root = fm.root(this);
						if (! grps[root]) {
							grps[root] = [ this ];
						} else {
							grps[root].push(this);
						}
					});
					
					$.each(grps, function() {
						dfds.push(fm.request({
							data : {cmd : 'size', targets : this},
							preventDefault : true
						}));
					});
					reqs.push.apply(reqs, dfds);
					
					$.when.apply($, dfds).fail(function() {
						replSpinner(msg.unknown, 'size');
					}).done(function() {
						var size = 0,
							argLen = arguments.length,
							i;
						
						for (i = 0; i < argLen; i++) {
							size += parseInt(arguments[i].size);
						}
						replSpinner(size >= 0 ? fm.formatSize(size) : msg.unknown, 'size');
					});
					
					fm.autoSync();
				});
			},
			size, tmb, file, title, dcnt, rdcnt, path;
			
		if (!cnt) {
			return $.Deferred().reject();
		}
			
		if (dialog.length) {
			dialog.elfinderdialog('toTop');
			return $.Deferred().resolve();
		}
		
			
		if (cnt == 1) {
			file  = files[0];
			
			view  = view.replace('{dirclass}', file.csscls? fm.escape(file.csscls) : '').replace('{class}', fm.mime2class(file.mime));
			title = tpl.itemTitle.replace('{name}', fm.escape(file.i18 || file.name)).replace('{kind}', '<span title="'+fm.escape(file.mime)+'">'+fm.mime2kind(file)+'</span>');

			tmb = fm.tmb(file);
			
			if (!file.read) {
				size = msg.unknown;
			} else if (file.mime != 'directory' || file.alias) {
				size = fm.formatSize(file.size);
			} else {
				size = tpl.spinner.replace('{text}', msg.calc).replace('{name}', 'size');
				count.push(file.hash);
			}
			
			content.push(row.replace(l, msg.size).replace(v, size));
			file.alias && content.push(row.replace(l, msg.aliasfor).replace(v, file.alias));
			if (path = fm.path(file.hash, true)) {
				content.push(row.replace(l, msg.path).replace(v, fm.escape(path)));
			} else {
				content.push(row.replace(l, msg.path).replace(v, tpl.spinner.replace('{text}', msg.calc).replace('{name}', 'path')));
				reqs.push(fm.path(file.hash, true, {notify: null})
				.fail(function() {
					replSpinner(msg.unknown, 'path');
				})
				.done(function(path) {
					replSpinner(path, 'path');
				}));
			}
			//efw do not show link and pic size===
			//====================================
			
			content.push(row.replace(l, msg.modify).replace(v, fm.formatDate(file)));
			content.push(row.replace(l, msg.perms).replace(v, fm.formatPermissions(file)));
			content.push(row.replace(l, msg.locked).replace(v, file.locked ? msg.yes : msg.no));
			file.owner && content.push(row.replace(l, msg.owner).replace(v, file.owner));
			file.group && content.push(row.replace(l, msg.group).replace(v, file.group));
			file.perm && content.push(row.replace(l, msg.perm).replace(v, fm.formatFileMode(file.perm)));
			
			// Add custom info fields
			if (o.custom) {
				$.each(o.custom, function(name, details) {
					if (
					  (!details.mimes || $.map(details.mimes, function(m){return (file.mime === m || file.mime.indexOf(m+'/') === 0)? true : null;}).length)
					    &&
					  (!details.hashRegex || file.hash.match(details.hashRegex))
					) {
						// Add to the content
						content.push(row.replace(l, fm.i18n(details.label)).replace(v , details.tpl.replace('{id}', id)));
						// Register the action
						if (details.action && (typeof details.action == 'function')) {
							customActions.push(details.action);
						}
					}
				});
			}
		} else {
			view  = view.replace('{class}', 'elfinder-cwd-icon-group');
			title = tpl.groupTitle.replace('{items}', msg.items).replace('{num}', cnt);
			dcnt  = $.map(files, function(f) { return f.mime == 'directory' ? 1 : null ; }).length;
			if (!dcnt) {
				size = 0;
				$.each(files, function(h, f) { 
					var s = parseInt(f.size);
					
					if (s >= 0 && size >= 0) {
						size += s;
					} else {
						size = 'unknown';
					}
				});
				content.push(row.replace(l, msg.kind).replace(v, msg.files));
				content.push(row.replace(l, msg.size).replace(v, fm.formatSize(size)));
			} else {
				rdcnt = $.map(files, function(f) { return f.mime === 'directory' && (! f.phash || f.isroot)? 1 : null ; }).length;
				dcnt -= rdcnt;
				content.push(row.replace(l, msg.kind).replace(v, (rdcnt === cnt || dcnt === cnt)? msg[rdcnt? 'roots' : 'folders'] : $.map({roots: rdcnt, folders: dcnt, files: cnt - rdcnt - dcnt}, function(c, t) { return c? msg[t]+' '+c : null}).join(', ')));
				content.push(row.replace(l, msg.size).replace(v, tpl.spinner.replace('{text}', msg.calc).replace('{name}', 'size')));
				count = $.map(files, function(f) { return f.hash; });
				
			}
		}
		
		view = view.replace('{title}', title).replace('{content}', content.join(''));
		
		dialog = fm.dialog(view, opts);
		dialog.attr('id', id);

		if (file && file.url == '1') {
			dialog.on('click', '.'+spclass+'-url', function(){
				$(this).parent().html(tpl.spinner.replace('{text}', fm.i18n('ntfurl')).replace('{name}', 'url'));
				fm.request({
					data : {cmd : 'url', target : file.hash},
					preventDefault : true
				})
				.fail(function() {
					replSpinner(name_esc, 'url');
				})
				.done(function(data) {
					if (data.url) {
						replSpinner('<a href="'+data.url+'" target="_blank">'+name_esc+'</a>' || name_esc, 'url');
						var rfile = fm.file(file.hash);
						rfile.url = data.url;
					} else {
						replSpinner(name_esc, 'url');
					}
				});
			});
		}

		// load thumbnail
		if (tmb) {
			$('<img>')
				.on('load', function() { dialog.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
				.attr('src', tmb.url);
		}
		
		// send request to count total size
		if (count.length) {
			getSize(count);
		}
		
		// call custom actions
		if (customActions.length) {
			$.each(customActions, function(i, action) {
				try {
					action(file, fm, dialog);
				} catch(e) {
					fm.debug('error', e);
				}
			});
		}

	};
	
}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/mkdir.js
 */

/**
 * @class  elFinder command "mkdir"
 * Create new folder
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.mkdir = function() {
	var fm   = this.fm,
		self = this,
		curOrg;
	
	this.value           = '';
	this.disableOnSearch = true;
	this.updateOnSelect  = false;
	this.mime            = 'directory';
	this.prefix          = 'untitled folder';
	this.exec            = function(contextSel) {
		this.origin = curOrg? curOrg : 'cwd';
		if (! contextSel && ! this.options.intoNewFolderToolbtn) {
			fm.getUI('cwd').trigger('unselectall');
		}
		this.move = (this.origin !== 'navbar' && fm.selected().length)? true : false;
		return $.proxy(fm.res('mixin', 'make'), self)();
	}
	
	this.shortcuts = [{
		pattern     : 'ctrl+shift+n'
	}];

	this.init = function() {
		if (this.options.intoNewFolderToolbtn) {
			this.options.ui = 'mkdirbutton';
		}
	}
	
	fm.bind('select', function(e) {
		var sel = (e.data && e.data.selected)? e.data.selected : [];
			
		curOrg = sel.length? (e.data.origin || '') : '';
		self.title = (sel.length && (curOrg !== 'navbar'))? fm.i18n('cmdmkdirin') : fm.i18n('cmdmkdir');
		self.update(void(0), self.title);
	});
	
	this.getstate = function(sel) {
		var cwd = fm.cwd(),
			sel = (curOrg === 'navbar' || (sel && sel[0] != cwd.hash))? this.files(sel || fm.selected()) : [],
			cnt = sel.length;

		if (curOrg === 'navbar') {
			return !this._disabled && cnt && sel[0].write && sel[0].read? 0 : -1;  
		} else {
			return !this._disabled && cwd.write && (!cnt || $.map(sel, function(f) { return f.read && ! f.locked? f : null  }).length == cnt)? 0 : -1;
		}
	}

};


/*
 * File: /js/commands/mkfile.js
 */

/**
 * @class  elFinder command "mkfile"
 * Create new empty file
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.mkfile = function() {
	this.disableOnSearch = true;
	this.updateOnSelect  = false;
	this.mime            = 'text/plain';
	this.prefix          = 'untitled file.txt';
	this.exec            = $.proxy(this.fm.res('mixin', 'make'), this);
	
	this.getstate = function() {
		return !this._disabled && this.fm.cwd().write ? 0 : -1;
	}

};

/*
 * File: /js/commands/open.js
 */

/**
 * @class  elFinder command "open"
 * Enter folder or open files in new windows
 *
 * @author Dmitry (dio) Levashov
 **/  
(elFinder.prototype.commands.open = function() {
	this.alwaysEnabled = true;
	
	this._handlers = {
		dblclick : function(e) { e.preventDefault(); this.exec() },
		'select enable disable reload' : function(e) { this.update(e.type == 'disable' ? -1 : void(0));  }
	}
	
	this.shortcuts = [{
		pattern     : 'ctrl+down numpad_enter'+(this.fm.OS != 'mac' && ' enter')
	}];

	this.getstate = function(sel) {
		var sel = this.files(sel),
			cnt = sel.length;
		
		return cnt == 1 
			? (sel[0].read? 0 : -1) 
			: (cnt && !this.fm.UA.Mobile) ? ($.map(sel, function(file) { return file.mime == 'directory' || ! file.read ? null : file}).length == cnt ? 0 : -1) : -1
	}
	
	this.exec = function(hashes, opts) {
		var fm    = this.fm, 
			dfrd  = $.Deferred().fail(function(error) { error && fm.error(error); }),
			files = this.files(hashes),
			cnt   = files.length,
			thash = (typeof opts == 'object')? opts.thash : false,
			opts  = this.options,
			file, url, s, w, imgW, imgH, winW, winH, reg, link, html5dl, inline;

		if (!cnt && !thash) {
			{
				return dfrd.reject();
			}
		}

		// open folder
		if (thash || (cnt == 1 && (file = files[0]) && file.mime == 'directory')) {
			return !thash && file && !file.read
				? dfrd.reject(['errOpen', file.name, 'errPerm'])
				: fm.request({
						data   : {cmd  : 'open', target : thash || file.hash},
						notify : {type : 'open', cnt : 1, hideCnt : true},
						syncOnFail : true,
						lazy : false
					});
		}
		
		files = $.map(files, function(file) { return file.mime != 'directory' ? file : null });
		
		// nothing to open or files and folders selected - do nothing
		if (cnt != files.length) {
			return dfrd.reject();
		}
		
		var doOpen = function() {
			try {
				reg = new RegExp(fm.option('dispInlineRegex'));
			} catch(e) {
				reg = false;
			}
	
			// open files
			cnt = files.length;
			while (cnt--) {
				file = files[cnt];
				//-------------Use Efw to download one file
				Efw("elfinder_file",{
					"cmd":"file",
					"home":fm.options.customData.home,
					"isAbs":fm.options.customData.isAbs,
					"readonly":fm.options.customData.readonly,
					"id":fm.options.customData.id,
					"target":file.hash
					},
					fm.options.customData.appurl
				);
			}
			return dfrd.resolve(hashes);
		}
		
		if (cnt > 1) {
			fm.confirm({
				title: 'openMulti',
				text : ['openMultiConfirm', cnt + ''],
				accept : {
					label : 'cmdopen',
					callback : function() { doOpen(); }
				},
				cancel : {
					label : 'btnCancel',
					callback : function() { 
						dfrd.reject();
					}
				},
				buttons : (fm.getCommand('zipdl') && fm.isCommandEnabled('zipdl', fm.cwd().hash))? [
					{
						label : 'cmddownload',
						callback : function() {
							fm.exec('download', hashes);
							dfrd.reject();
						}
					}
				] : []
			});
		} else {
			doOpen();
		}
		
		return dfrd;
	}

}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/opendir.js
 */

/**
 * @class  elFinder command "opendir"
 * Enter parent folder
 *
 * @author Naoki Sawada
 **/  
elFinder.prototype.commands.opendir = function() {
	this.alwaysEnabled = true;
	
	this.getstate = function() {
		var sel = this.fm.selected(),
			cnt = sel.length,
			wz;
		if (cnt !== 1) {
			return -1;
		}
		wz = this.fm.getUI('workzone');
		return wz.hasClass('elfinder-search-result')? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var fm    = this.fm,
			dfrd  = $.Deferred(),
			files = this.files(hashes),
			cnt   = files.length,
			hash, pcheck = null;

		if (!cnt || !files[0].phash) {
			return dfrd.reject();
		}

		hash = files[0].phash;
		fm.trigger('searchend', { noupdate: true });
		fm.request({
			data   : {cmd  : 'open', target : hash},
			notify : {type : 'open', cnt : 1, hideCnt : true},
			syncOnFail : false
		});
		
		return dfrd;
	}

};


/*
 * File: /js/commands/paste.js
 */

/**
 * @class  elFinder command "paste"
 * Paste filesfrom clipboard into directory.
 * If files pasted in its parent directory - files duplicates will created
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.paste = function() {
	
	this.updateOnSelect  = false;
	
	this.handlers = {
		changeclipboard : function() { this.update(); }
	}

	this.shortcuts = [{
		pattern     : 'ctrl+v shift+insert'
	}];
	
	this.getstate = function(dst) {
		if (this._disabled) {
			return -1;
		}
		if (dst) {
			if ($.isArray(dst)) {
				if (dst.length != 1) {
					return -1;
				}
				dst = this.fm.file(dst[0]);
			}
		} else {
			dst = this.fm.cwd();
		}

		return this.fm.clipboard().length && dst.mime == 'directory' && dst.write ? 0 : -1;
	}
	
	this.exec = function(dst) {
		var self   = this,
			fm     = self.fm,
			dst    = dst ? this.files(dst)[0] : fm.cwd(),
			files  = fm.clipboard(),
			cnt    = files.length,
			cut    = cnt ? files[0].cut : false,
			error  = cut ? 'errMove' : 'errCopy',
			fpaste = [],
			fcopy  = [],
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				})
				.always(function() {
					fm.unlockfiles({files : $.map(files, function(f) { return f.hash})});
				}),
			copy  = function(files) {
				return files.length && fm._commands.duplicate
					? fm.exec('duplicate', files)
					: $.Deferred().resolve();
			},
			paste = function(files) {
				var dfrd      = $.Deferred(),
					existed   = [],
					hashes  = {},
					intersect = function(files, names) {
						var ret = [], 
							i   = files.length;

						while (i--) {
							$.inArray(files[i].name, names) !== -1 && ret.unshift(i);
						}
						return ret;
					},
					confirm   = function(ndx) {
						var i    = existed[ndx],
							file = files[i],
							last = ndx == existed.length-1;

						if (!file) {
							return;
						}

						fm.confirm({
							title  : fm.i18n(cut ? 'moveFiles' : 'copyFiles'),
							text   : ['errExists', file.name, 'confirmRepl'], 
							all    : !last,
							accept : {
								label    : 'btnYes',
								callback : function(all) {
									!last && !all
										? confirm(++ndx)
										: paste(files);
								}
							},
							reject : {
								label    : 'btnNo',
								callback : function(all) {
									var i;

									if (all) {
										i = existed.length;
										while (ndx < i--) {
											files[existed[i]].remove = true
										}
									} else {
										files[existed[ndx]].remove = true;
									}

									!last && !all
										? confirm(++ndx)
										: paste(files);
								}
							},
							cancel : {
								label    : 'btnCancel',
								callback : function() {
									dfrd.resolve();
								}
							},
							buttons : [
							    //-------------Efw not do backup---------------
							    //---------------------------------------------
							]
						})
					},
					valid     = function(names) {
						var exists = {}, existedArr;
						if (names) {
							if ($.isArray(names)) {
								if (names.length) {
									if (typeof names[0] == 'string') {
										// elFinder <= 2.1.6 command `is` results
										existed = intersect(files, names);
									} else {
										$.each(names, function(i, v) {
											exists[v.name] = v.hash;
										});
										existed = intersect(files, $.map(exists, function(h, n) { return n; }));
										$.each(files, function(i, file) {
											if (exists[file.name]) {
												hashes[exists[file.name]] = file.name;
											}
										});
									}
								}
							} else {
								existedArr = [];
								existed = $.map(names, function(n) {
									if (typeof n === 'string') {
										return n;
									} else {
										// support to >=2.1.11 plugin Normalizer, Sanitizer
										existedArr = existedArr.concat(n);
										return null;
									}
								});
								if (existedArr.length) {
									existed = existed.concat(existedArr);
								}
								existed = intersect(files, existed);
								hashes = names;
							}
						}
						existed.length ? confirm(0) : paste(files);
					},
					paste     = function(files) {
						var renames = [],
							files  = $.map(files, function(file) { 
								if (file.rename) {
									renames.push(file.name);
								}
								return !file.remove ? file : null;
							}),
							cnt    = files.length,
							groups = {},
							args   = [],
							src;

						if (!cnt) {
							return dfrd.resolve();
						}

						src = files[0].phash;
						files = $.map(files, function(f) { return f.hash; });
						
						fm.request({
								data   : {cmd : 'paste', dst : dst.hash, targets : files, cut : cut ? 1 : 0, src : src, renames : renames, hashes : hashes, suffix : fm.options.backupSuffix},
								notify : {type : cut ? 'move' : 'copy', cnt : cnt}
							})
							.done(function(data) {
								var newItem, node;
								dfrd.resolve(data);
								if (data && data.added && data.added[0]) {
									fm.one('pastedone', function() {
										newItem = fm.findCwdNodes(data.added);
										if (newItem.length) {
											newItem.trigger('scrolltoview');
										} else {
											if (dst.hash !== fm.cwd().hash) {
												node = $('<div></div>').append(
													$('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all"><span class="ui-button-text">'+fm.i18n('cmdopendir')+'</span></button>')
													.on('mouseenter mouseleave', function(e) { 
														$(this).toggleClass('ui-state-hover', e.type == 'mouseenter');
													}).on('click', function() {
														fm.exec('open', dst.hash).done(function() {
															fm.one('opendone', function() {
																fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
															});
														});
													})
												);
											} else {
												fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
											}
											fm.toast({msg: fm.i18n(['complete', fm.i18n('cmd' + (cut ? 'move' : 'copy'))]), extNode: node});
										}
									});
								}
							})
							.always(function() {
								fm.unlockfiles({files : files});
							});
					},
					internames;

				if (!fm.isCommandEnabled(self.name, dst.hash) || !files.length) {
					return dfrd.resolve();
				}
				
				if (fm.oldAPI) {
					paste(files);
				} else {
					
					if (!fm.option('copyOverwrite')) {
						paste(files);
					} else {
						internames = $.map(files, function(f) { return f.name});
						dst.hash == fm.cwd().hash
							? valid($.map(fm.files(), function(file) { return file.phash == dst.hash ? {hash: file.hash, name: file.name} : null }))
							: fm.request({
								data : {cmd : 'ls', target : dst.hash, intersect : internames},
								notify : {type : 'prepare', cnt : 1, hideCnt : true},
								preventFail : true
							})
							.always(function(data) {
								valid(data.list);
							});
					}
				}
				
				return dfrd;
			},
			parents, fparents;


		if (!cnt || !dst || dst.mime != 'directory') {
			return dfrd.reject();
		}
			
		if (!dst.write)	{
			return dfrd.reject([error, files[0].name, 'errPerm']);
		}
		
		parents = fm.parents(dst.hash);
		
		$.each(files, function(i, file) {
			if (!file.read) {
				return !dfrd.reject([error, file.name, 'errPerm']);
			}
			
			if (cut && file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
			
			if ($.inArray(file.hash, parents) !== -1) {
				return !dfrd.reject(['errCopyInItself', file.name]);
			}
			
			if (file.mime && file.mime !== 'directory' && ! fm.uploadMimeCheck(file.mime, dst.hash)) {
				return !dfrd.reject([error, file.name, 'errUploadMime']);
			}
			
			fparents = fm.parents(file.hash);
			fparents.pop();
			if ($.inArray(dst.hash, fparents) !== -1) {
				
				if ($.map(fparents, function(h) { var d = fm.file(h); return d.phash == dst.hash && d.name == file.name ? d : null }).length) {
					return !dfrd.reject(['errReplByChild', file.name]);
				}
			}
			
			if (file.phash == dst.hash) {
				fcopy.push(file.hash);
			} else {
				fpaste.push({
					hash  : file.hash,
					phash : file.phash,
					name  : file.name
				});
			}
		});

		if (dfrd.state() == 'rejected') {
			return dfrd;
		}

		return $.when(
			copy(fcopy),
			paste(fpaste)
		).always(function() {
			cut && fm.clipboard([]);
		});
	}

};


/*
 * File: /js/commands/reload.js
 */

/**
 * @class  elFinder command "reload"
 * Sync files and folders
 *
 * @author Dmitry (dio) Levashov
 **/
(elFinder.prototype.commands.reload = function() {
	var self   = this,
		search = false;
	
	this.alwaysEnabled = true;
	this.updateOnSelect = true;
	
	this.shortcuts = [{
		pattern     : 'ctrl+shift+r f5'
	}];
	
	this.getstate = function() {
		return 0;
	};
	
	this.init = function() {
		this.fm.bind('search searchend', function(e) {
			search = e.type == 'search';
		});
	};
	
	this.fm.bind('contextmenu', function(e){
		var fm = self.fm;
		if (fm.options.sync >= 1000) {
			self.extra = {
				icon: 'accept',
				node: $('<span></span>')
					.attr({title: fm.i18n('autoSync')})
					.on('click touchstart', function(e){
						if (e.type === 'touchstart' && e.originalEvent.touches.length > 1) {
							return;
						}
						e.stopPropagation();
						e.preventDefault();
						$(this).parent()
							.toggleClass('ui-state-disabled', fm.options.syncStart)
							.parent().removeClass('ui-state-hover');
						fm.options.syncStart = !fm.options.syncStart;
						fm.autoSync(fm.options.syncStart? null : 'stop');
					}).on('ready', function(){
						$(this).parent().toggleClass('ui-state-disabled', !fm.options.syncStart).css('pointer-events', 'auto');
					})
			};
		}
	});
	
	this.exec = function() {
		var fm = this.fm;
		if (!search) {
			var dfrd    = fm.sync(),
				timeout = setTimeout(function() {
					fm.notify({type : 'reload', cnt : 1, hideCnt : true});
					dfrd.always(function() { fm.notify({type : 'reload', cnt  : -1}); });
				}, fm.notifyDelay);
				
			return dfrd.always(function() { 
				clearTimeout(timeout); 
				fm.trigger('reload');
			});
		} else {
			$('div.elfinder-toolbar > div.'+fm.res('class', 'searchbtn') + ' > span.ui-icon-search').click();
		}
	};

}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/rename.js
 */

/**
 * @class elFinder command "rename". 
 * Rename selected file.
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 **/
elFinder.prototype.commands.rename = function() {
	
	this.shortcuts = [{
		pattern     : 'f2'+(this.fm.OS == 'mac' ? ' enter' : '')
	}];
	
	this.getstate = function(sel) {
		var sel = this.files(sel);

		return !this._disabled && sel.length == 1 && sel[0].phash && !sel[0].locked  ? 0 : -1;
	};
	
	this.exec = function(hashes, opts) {
		var fm       = this.fm,
			cwd      = fm.getUI('cwd'),
			sel      = hashes || (fm.selected().length? fm.selected() : false) || [fm.cwd().hash],
			cnt      = sel.length,
			file     = fm.file(sel.shift()),
			filename = '.elfinder-cwd-filename',
			opts     = opts || {},
			incwd    = (fm.cwd().hash == file.hash),
			type     = opts._currentType? opts._currentType : (incwd? 'navbar' : 'files'),
			navbar   = (type === 'navbar'),
			target   = $('#'+fm[navbar? 'navHash2Id' : 'cwdHash2Id'](file.hash)),
			tarea    = (type === 'files' && fm.storage('view') != 'list'),
			unselect = function() {
				setTimeout(function() {
					input && input.blur();
				}, 50);
			},
			rest     = function(){
				if (!overlay.is(':hidden')) {
					overlay.addClass('ui-front')
						.elfinderoverlay('hide')
						.off('click', cancel);
				}
				pnode.removeClass('ui-front')
					.css('position', '')
					.off('unselect.'+fm.namespace, unselect);
				if (tarea) {
					node.css('max-height', '');
				} else if (!navbar) {
					pnode.css('width', '')
						.parent('td').css('overflow', '');
				}
			}, colwidth,
			dfrd     = $.Deferred()
				.done(function(data){
					incwd && fm.exec('open', data.added[0].hash);
				})
				.fail(function(error) {
					var parent = input.parent(),
						name   = fm.escape(file.i18 || file.name);

					if (tarea) {
						name = name.replace(/([_.])/g, '&#8203;$1');
					}
					if (navbar) {
						input.replaceWith(name);
					} else {
						if (parent.length) {
							input.remove();
							parent.html(name);
						} else {
							//cwd.find('#'+fm.cwdHash2Id(file.hash)).find(filename).html(name);
							target.find(filename).html(name);
							setTimeout(function() {
								cwd.find('#'+fm.cwdHash2Id(file.hash)).click();
							}, 50);
						}
					}
					
					error && fm.error(error);
				})
				.always(function() {
					rest();
					fm.unbind('resize', resize);
					fm.enable();
				}),
			blur = function() {
				var name   = $.trim(input.val()),
				parent = input.parent(),
				valid  = true;

				if (!inError && pnode.length) {
					
					input.off('blur');
					
					if (input[0].setSelectionRange) {
						input[0].setSelectionRange(0, 0)
					}
					if (name == file.name) {
						return dfrd.reject();
					}
					if (fm.options.validName && fm.options.validName.test) {
						try {
							valid = fm.options.validName.test(name);
						} catch(e) {
							valid = false;
						}
					}
					if (!name || name === '..' || !valid) {
						inError = true;
						fm.error('errInvName', {modal: true, close: select});
						return false;
					}
					if (fm.fileByName(name, file.phash)) {
						inError = true;
						fm.error(['errExists', name], {modal: true, close: select});
						return false;
					}
					
					rest();
					
					(navbar? input : node).html(fm.escape(name));
					fm.lockfiles({files : [file.hash]});
					fm.request({
							data   : {cmd : 'rename', target : file.hash, name : name},
							notify : {type : 'rename', cnt : 1}
						})
						.fail(function(error) {
							dfrd.reject();
							if (! error || ! $.isArray(error) || error[0] !== 'errRename') {
								fm.sync();
							}
						})
						.done(function(data) {
							dfrd.resolve(data);
							if (!navbar && data && data.added && data.added[0]) {
								var newItem = fm.findCwdNodes(data.added);
								if (newItem.length) {
									newItem.trigger('scrolltoview');
								}
							}
						})
						.always(function() {
							fm.unlockfiles({files : [file.hash]})
						});
				}
			},
			input = $(tarea? '<textarea></textarea>' : '<input type="text">')
				.on('keyup text', function(){
					if (tarea) {
						this.style.height = '1px';
						this.style.height = this.scrollHeight + 'px';
					} else if (colwidth) {
						this.style.width = colwidth + 'px';
						if (this.scrollWidth > colwidth) {
							this.style.width = this.scrollWidth + 10 + 'px';
						}
					}
				})
				.on('keydown', function(e) {
					e.stopImmediatePropagation();
					if (e.keyCode == $.ui.keyCode.ESCAPE) {
						dfrd.reject();
					} else if (e.keyCode == $.ui.keyCode.ENTER) {
						e.preventDefault();
						input.blur();
					}
				})
				.on('mousedown click dblclick', function(e) {
					// click for touch device
					e.stopPropagation();
					if (e.type === 'dblclick') {
						e.preventDefault();
					}
				})
				.on('blur', blur),
			select = function() {
				var name = input.val().replace(/\.((tar\.(gz|bz|bz2|z|lzo))|cpio\.gz|ps\.gz|xcf\.(gz|bz2)|[a-z0-9]{1,4})$/ig, '');
				if (inError) {
					inError = false;
					input.on('blur', blur);
				}
				if (fm.UA.Mobile) {
					overlay.on('click', cancel)
						.removeClass('ui-front').elfinderoverlay('show');
				}
				input.select().focus();
				input[0].setSelectionRange && input[0].setSelectionRange(0, name.length);
			},
			node = navbar? target.contents().filter(function(){ return this.nodeType==3 && $(this).parent().attr('id') === fm.navHash2Id(file.hash); })
					: target.find(filename),
			pnode = node.parent(),
			overlay = fm.getUI('overlay'),
			cancel = function(e) { 
				if (! inError) {
					e.stopPropagation();
					dfrd.reject();
				}
			},
			resize = function() {
				target.trigger('scrolltoview');
			},
			inError = false;
		
		pnode.addClass('ui-front')
			.css('position', 'relative')
			.on('unselect.'+fm.namespace, unselect);
		fm.bind('resize', resize);
		if (navbar) {
			node.replaceWith(input.val(file.name));
		} else {
			if (tarea) {
				node.css('max-height', 'none');
			} else if (!navbar) {
				colwidth = pnode.width();
				pnode.width(colwidth - 15)
					.parent('td').css('overflow', 'visible');
			}
			node.empty().append(input.val(file.name));
		}
		
		if (cnt > 1) {
			return dfrd.reject();
		}
		
		if (!file || !node.length) {
			return dfrd.reject('errCmdParams', this.title);
		}
		
		if (file.locked) {
			return dfrd.reject(['errLocked', file.name]);
		}
		
		fm.one('select', function() {
			input.parent().length && file && $.inArray(file.hash, fm.selected()) === -1 && input.blur();
		})
		
		input.trigger('keyup');
		
		select();
		
		return dfrd;
	};

};


/*
 * File: /js/commands/rm.js
 */

/**
 * @class  elFinder command "rm"
 * Delete files
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.rm = function() {
	
	this.shortcuts = [{
		pattern     : 'delete ctrl+backspace'
	}];
	
	this.getstate = function(sel) {
		var fm = this.fm;
		sel = sel || fm.selected();
		return !this._disabled && sel.length && $.map(sel, function(h) { var f = fm.file(h); return f && ! f.locked && ! fm.isRoot(f)? h : null }).length == sel.length
			? 0 : -1;
	}
	
	this.exec = function(hashes) {
		var self   = this,
			fm     = this.fm,
			dfrd   = $.Deferred()
				.fail(function(error) {
					error && fm.error(error);
				}),
			files  = this.files(hashes),
			cnt    = files.length,
			cwd    = fm.cwd().hash,
			tpl    = '<div class="ui-helper-clearfix elfinder-rm-title"><span class="elfinder-cwd-icon {class} ui-corner-all"></span>{title}<div class="elfinder-rm-desc">{desc}</div></div>',
			targets, text, f, fname, size, tmb, descs, dialog;

		if (! cnt) {
			return dfrd.reject();
		}
		
		$.each(files, function(i, file) {
			if (fm.isRoot(file)) {
				return !dfrd.reject(['errRm', file.name, 'errPerm']);
			}
			if (file.locked) {
				return !dfrd.reject(['errLocked', file.name]);
			}
		});

		if (dfrd.state() == 'pending') {
			targets = this.hashes(hashes);
			cnt     = files.length;
			descs   = [];
			
			if (cnt > 1) {
				if (!$.map(files, function(f) { return f.mime == 'directory' ? 1 : null ; }).length) {
					size = 0;
					$.each(files, function(h, f) { 
						if (f.size && f.size != 'unknown') {
							var s = parseInt(f.size);
							if (s >= 0 && size >= 0) {
								size += s;
							}
						} else {
							size = 'unknown';
							return false;
						}
					});
					descs.push(fm.i18n('size')+': '+fm.formatSize(size));
				}
				text = [$(tpl.replace('{class}', 'elfinder-cwd-icon-group').replace('{title}', '<strong>' + fm.i18n('items')+ ': ' + cnt + '</strong>').replace('{desc}', descs.join('<br>')))];
			} else {
				f = files[0];
				tmb = fm.tmb(f);
				if (f.size) {
					descs.push(fm.i18n('size')+': '+fm.formatSize(f.size));
				}
				descs.push(fm.i18n('modify')+': '+fm.formatDate(f));
				fname = fm.escape(f.i18 || f.name).replace(/([_.])/g, '&#8203;$1');
				text = [$(tpl.replace('{class}', fm.mime2class(f.mime)).replace('{title}', '<strong>' + fname + '</strong>').replace('{desc}', descs.join('<br>')))];
				
			}
			
			text.push('confirmRm');
			
			fm.lockfiles({files : targets});
			dialog = fm.confirm({
				title  : self.title,
				text   : text,
				accept : {
					label    : 'btnRm',
					callback : function() {  
						fm.request({
							data   : {cmd  : 'rm', targets : targets}, 
							notify : {type : 'rm', cnt : cnt},
							preventFail : true
						})
						.fail(function(error) {
							dfrd.reject(error);
						})
						.done(function(data) {
							dfrd.done(data);
						})
						.always(function() {
							fm.unlockfiles({files : targets});
						});
					}
				},
				cancel : {
					label    : 'btnCancel',
					callback : function() {
						fm.unlockfiles({files : targets});
						if (targets.length === 1 && fm.file(targets[0]).phash !== cwd) {
							fm.select({selected : targets});
						} else {
							fm.selectfiles({files : targets});
						}
						dfrd.reject();
					}
				}
			});
			// load thumbnail
			if (tmb) {
				$('<img>')
					.on('load', function() { dialog.find('.elfinder-cwd-icon').addClass(tmb.className).css('background-image', "url('"+tmb.url+"')"); })
					.attr('src', tmb.url);
			}
		}
			
		return dfrd;
	}

};


/*
 * File: /js/commands/sort.js
 */

/**
 * @class  elFinder command "sort"
 * Change sort files rule
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.sort = function() {
	var self  = this,
		fm    = self.fm,
		setVar = function() {
			self.variants = [];
			$.each(fm.sortRules, function(name, value) {
				var sort = {
						type  : name,
						order : name == fm.sortType ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder
					};
				if ($.inArray(name, fm.sorters) !== -1) {
					var arr = name == fm.sortType ? (sort.order == 'asc'? 's' : 'n') : '';
					self.variants.push([sort, (arr? '<span class="ui-icon ui-icon-arrowthick-1-'+arr+'"></span>' : '') + '&nbsp;' + fm.i18n('sort'+name)]);			}
			});
			self.variants.push('|');
			self.variants.push([
				{
					type  : fm.sortType,
					order : fm.sortOrder,
					stick : !fm.sortStickFolders,
					tree  : fm.sortAlsoTreeview
				},
				(fm.sortStickFolders? '<span class="ui-icon ui-icon-check"></span>' : '') + '&nbsp;' + fm.i18n('sortFoldersFirst')
			]);
			if (fm.ui.tree) {
				self.variants.push('|');
				self.variants.push([
					{
						type  : fm.sortType,
						order : fm.sortOrder,
						stick : fm.sortStickFolders,
						tree  : !fm.sortAlsoTreeview
					},
					(fm.sortAlsoTreeview? '<span class="ui-icon ui-icon-check"></span>' : '') + '&nbsp;' + fm.i18n('sortAlsoTreeview')
				]);
			}
		};
	
	/**
	 * Command options
	 *
	 * @type  Object
	 */
	this.options = {ui : 'sortbutton'};
	
	fm.bind('open sortchange', setVar)
	.bind('open', function() {
		fm.unbind('add', setVar).one('add', setVar)
		fm.getUI('toolbar').find('.elfiner-button-sort .elfinder-button-menu .elfinder-button-menu-item').each(function() {
			var tgt = $(this),
				rel = tgt.attr('rel');
			tgt.toggle(! rel || $.inArray(rel, fm.sorters) !== -1);
		});
	})
	.bind('cwdrender', function() {
		var cols = $(fm.cwd).find('div.elfinder-cwd-wrapper-list table');
		if (cols.length) {
			$.each(fm.sortRules, function(name, value) {
				var td = cols.find('thead tr td.elfinder-cwd-view-th-'+name);
				if (td.length) {
					var current = ( name == fm.sortType),
					sort = {
						type  : name,
						order : current ? fm.sortOrder == 'asc' ? 'desc' : 'asc' : fm.sortOrder
					},arr;
					if (current) {
						td.addClass('ui-state-active');
						arr = fm.sortOrder == 'asc' ? 'n' : 's';
						$('<span class="ui-icon ui-icon-triangle-1-'+arr+'"></span>').appendTo(td);
					}
					$(td).on('click', function(e){
						if (! $(this).data('dragging')) {
							e.stopPropagation();
							if (! fm.getUI('cwd').data('longtap')) {
								self.exec([], sort);
							}
						}
					})
					.hover(function() {
						$(this).addClass('ui-state-hover');
					},function() {
						$(this).removeClass('ui-state-hover');
					});
				}
				
			});
		}
	});
	
	this.getstate = function() {
		return 0;
	};
	
	this.exec = function(hashes, sortopt) {
		var fm = this.fm,
			sort = $.extend({
				type  : fm.sortType,
				order : fm.sortOrder,
				stick : fm.sortStickFolders,
				tree  : fm.sortAlsoTreeview
			}, sortopt);

		return fm.lazy(function() {
			fm.setSort(sort.type, sort.order, sort.stick, sort.tree);
			this.resolve();
		});
	};

};


/*
 * File: /js/commands/up.js
 */

/**
 * @class  elFinder command "up"
 * Go into parent directory
 *
 * @author Dmitry (dio) Levashov
 **/
(elFinder.prototype.commands.up = function() {
	this.alwaysEnabled = true;
	this.updateOnSelect = false;
	
	this.shortcuts = [{
		pattern     : 'ctrl+up'
	}];
	
	this.getstate = function() {
		return this.fm.cwd().phash ? 0 : -1;
	}
	
	this.exec = function() {
		var fm = this.fm,
			cwdhash = fm.cwd().hash;
		return this.fm.cwd().phash ? this.fm.exec('open', this.fm.cwd().phash).done(function() {
			fm.one('opendone', function() {
				fm.selectfiles({files : [cwdhash]});
			});
		}) : $.Deferred().reject();
	}

}).prototype = { forceLoad : true }; // this is required command


/*
 * File: /js/commands/upload.js
 */

/**
 * @class elFinder command "upload"
 * Upload files using iframe or XMLHttpRequest & FormData.
 * Dialog allow to send files using drag and drop
 *
 * @type  elFinder.command
 * @author  Dmitry (dio) Levashov
 */
elFinder.prototype.commands.upload = function() {
	var hover = this.fm.res('class', 'hover');
	
	this.disableOnSearch = true;
	this.updateOnSelect  = false;
	
	// Shortcut opens dialog
	this.shortcuts = [{
		pattern     : 'ctrl+u'
	}];
	
	/**
	 * Return command state
	 *
	 * @return Number
	 **/
	this.getstate = function(sel) {
		var fm = this.fm, f,
		sel = (sel || [fm.cwd().hash]);
		if (!this._disabled && sel.length == 1) {
			f = fm.file(sel[0]);
		}
		return (f && f.mime == 'directory' && f.write)? 0 : -1;
	};
	
	
	this.exec = function(data) {
		var fm = this.fm,
			cwdHash = fm.cwd().hash,
			getTargets = function() {
				var tgts = data && (data instanceof Array)? data : null,
					sel;
				if (! data) {
					if (! tgts && (sel = fm.selected()).length === 1 && fm.file(sel[0]).mime === 'directory') {
						tgts = sel;
					} else {
						tgts = [ cwdHash ];
					}
				}
				return tgts;
			},
			targets = getTargets(),
			check = !targets && data && data.target? data.target : targets[0],
			targetDir = check? fm.file(check) : fm.cwd(),
			fmUpload = function(data) {
				fm.upload(data)
					.fail(function(error) {
						dfrd.reject(error);
					})
					.done(function(data) {
						var cwd = fm.getUI('cwd'),
							node;
						dfrd.resolve(data);
						if (data && data.added && data.added[0] && ! fm.ui.notify.children('.elfinder-notify-upload').length) {
							var newItem = fm.findCwdNodes(data.added);
							if (newItem.length) {
								newItem.trigger('scrolltoview');
							} else {
								if (targetDir.hash !== cwdHash) {
									node = $('<div></div>').append(
										$('<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all elfinder-tabstop"><span class="ui-button-text">'+fm.i18n('cmdopendir')+'</span></button>')
										.on('mouseenter mouseleave', function(e) { 
											$(this).toggleClass('ui-state-hover', e.type == 'mouseenter');
										}).on('click', function() {
											fm.exec('open', check).done(function() {
												fm.one('opendone', function() {
													fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
												});
											});
										})
									);
								} else {
									fm.trigger('selectfiles', {files : $.map(data.added, function(f) {return f.hash;})});
								}
								fm.toast({msg: fm.i18n(['complete', fm.i18n('cmdupload')]), extNode: node});
							}
						}
					});
			},
			upload = function(data) {
				data.type !== 'files' && dialog.elfinderdialog('close');
				if (targets) {
					data.target = targets[0];
				}
				fmUpload(data);
			},
			getSelector = function() {
				var hash = targetDir.hash,
					dirs = $.map(fm.files(), function(f) {
						return (f.mime === 'directory' && f.write && f.phash && f.phash === hash)? f : null; 
					});
				
				if (! dirs.length) {
					return $();
				}
				
				return $('<div class="elfinder-upload-dirselect elfinder-tabstop" title="' + fm.i18n('folders') + '"></div>')
				.on('click', function(e) {
					e.stopPropagation();
					e.preventDefault();
					dirs = fm.sortFiles(dirs);
					var $this  = $(this),
						cwd    = fm.cwd(),
						base   = dialog.closest('div.ui-dialog'),
						getRaw = function(f, icon) {
							return {
								label    : fm.escape(f.i18 || f.name),
								icon     : icon,
								remain   : false,
								callback : function() {
									var title = base.children('.ui-dialog-titlebar:first').find('span.elfinder-upload-target');
									targets = [ f.hash ];
									title.html(' - ' + fm.escape(f.i18 || f.name));
									$this.focus();
								},
								options  : {
									className : (targets && targets.length && f.hash === targets[0])? 'ui-state-active' : '',
									iconClass : f.csscls || '',
									iconImg   : f.icon   || ''
								}
							}
						},
						raw = [ getRaw(targetDir, 'opendir'), '|' ];
					$.each(dirs, function(i, f) {
						raw.push(getRaw(f, 'dir'));
					});
					$this.blur();
					fm.trigger('contextmenu', {
						raw: raw,
						x: e.pageX || $(this).offset().left,
						y: e.pageY || $(this).offset().top,
						prevNode: base,
						fitHeight: true
					});
				}).append('<span class="elfinder-button-icon elfinder-button-icon-dir"></span>');
			},
			inputButton = function(type, caption) {
				var button,
					input = $('<input type="file" ' + type + '>')
					.change(function() {
						upload({input : input.get(0), type : 'files'});
					})
					.on('dragover', function(e) {
						e.originalEvent.dataTransfer.dropEffect = 'copy';
					});

				return $('<div class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only elfinder-tabstop elfinder-focus"><span class="ui-button-text">'+fm.i18n(caption)+'</span></div>')
					.append($('<form></form>').append(input))
					.on('click', function(e) {
						if (e.target === this) {
							e.stopPropagation();
							e.preventDefault();
							input.click();
						}
					})
					.hover(function() {
						$(this).toggleClass(hover)
					});
			},
			dfrd = $.Deferred(),
			dialog, dropbox, pastebox, dropUpload, paste, dirs, spinner, uidialog;
		
		dropUpload = function(e) {
			e.stopPropagation();
			e.preventDefault();
			var file = false,
				type = '',
				elfFrom = null,
				mycwd = '',
				data = null,
				target = e._target || null,
				trf = e.dataTransfer || null,
				kind = (trf.items && trf.items.length && trf.items[0].kind)? trf.items[0].kind : '',
				errors;
			
			if (trf) {
				try {
					elfFrom = trf.getData('elfinderfrom');
					if (elfFrom) {
						mycwd = window.location.href + fm.cwd().hash;
						if ((!target && elfFrom === mycwd) || target === mycwd) {
							dfrd.reject();
							return;
						}
					}
				} catch(e) {}
				
				if (kind === 'file' && (trf.items[0].getAsEntry || trf.items[0].webkitGetAsEntry)) {
					file = trf;
					type = 'data';
				} else if (kind !== 'string' && trf.files && trf.files.length && $.inArray('Text', trf.types) === -1) {
					file = trf.files;
					type = 'files';
				} else {
					try {
						if ((data = trf.getData('text/html')) && data.match(/<(?:img|a)/i)) {
							file = [ data ];
							type = 'html';
						}
					} catch(e) {}
					if (! file && (data = trf.getData('text'))) {
						file = [ data ];
						type = 'text';
					}
				}
			}
			if (file) {
				fmUpload({files : file, type : type, target : target, dropEvt : e});
			} else {
				errors = ['errUploadNoFiles'];
				if (kind === 'file') {
					errors.push('errFolderUpload');
				}
				fm.error(errors);
				dfrd.reject();
			}
		};
		
		if (!targets && data) {
			if (data.input || data.files) {
				data.type = 'files';
				fmUpload(data);
			} else if (data.dropEvt) {
				dropUpload(data.dropEvt);
			}
			return dfrd;
		}
		
		paste = function(e) {
			var e = e.originalEvent || e;
			var files = [], items = [];
			var file;
			if (e.clipboardData) {
				if (e.clipboardData.items && e.clipboardData.items.length){
					items = e.clipboardData.items;
					for (var i=0; i < items.length; i++) {
						if (e.clipboardData.items[i].kind == 'file') {
							file = e.clipboardData.items[i].getAsFile();
							files.push(file);
						}
					}
				} else if (e.clipboardData.files && e.clipboardData.files.length) {
					files = e.clipboardData.files;
				}
				if (files.length) {
					upload({files : files, type : 'files'});
					return;
				}
			}
			var my = e.target || e.srcElement;
			setTimeout(function () {
				if (my.innerHTML) {
					$(my).find('img').each(function(i, v){
						if (v.src.match(/^webkit-fake-url:\/\//)) {
							// For Safari's bug.
							// ref. https://bugs.webkit.org/show_bug.cgi?id=49141
							//      https://dev.ckeditor.com/ticket/13029
							$(v).remove();
						}
					});
					var src = my.innerHTML.replace(/<br[^>]*>/gi, ' ');
					var type = src.match(/<[^>]+>/)? 'html' : 'text';
					my.innerHTML = '';
					upload({files : [ src ], type : type});
				}
			}, 1);
		};
		
		dialog = $('<div class="elfinder-upload-dialog-wrapper"></div>')
			.append(inputButton('multiple', 'selectForUpload'));
		
		if (! fm.UA.Mobile && (function(input) {
			return (typeof input.webkitdirectory !== 'undefined' || typeof input.directory !== 'undefined');})(document.createElement('input'))) {
			dialog.append(inputButton('multiple webkitdirectory directory', 'selectFolder'));
		}
		
		if (targetDir.dirs) {
			if (targetDir.hash === cwdHash || $('#'+fm.navHash2Id(targetDir.hash)).hasClass('elfinder-subtree-loaded')) {
				getSelector().appendTo(dialog);
			} else {
				spinner = $('<div class="elfinder-upload-dirselect" title="' + fm.i18n('nowLoading') + '"></div>')
					.append('<span class="elfinder-button-icon elfinder-button-icon-spinner"></span>')
					.appendTo(dialog);
				fm.request({cmd : 'tree', target : targetDir.hash})
					.done(function() { 
						fm.one('treedone', function() {
							spinner.replaceWith(getSelector());
							uidialog.elfinderdialog('tabstopsInit');
						});
					})
					.fail(function() {
						spinner.remove();
					});
			}
		}
		
		if (fm.dragUpload) {
			dropbox = $('<div class="ui-corner-all elfinder-upload-dropbox elfinder-tabstop" contenteditable="true" data-ph="'+fm.i18n('dropPasteFiles')+'"></div>')
				.on('paste', function(e){
					paste(e);
				})
				.on('mousedown click', function(){
					$(this).focus();
				})
				.on('focus', function(){
					this.innerHTML = '';
				})
				.on('mouseover', function(){
					$(this).addClass(hover);
				})
				.on('mouseout', function(){
					$(this).removeClass(hover);
				})
				.on('dragenter', function(e) {
					e.stopPropagation();
				  	e.preventDefault();
				  	$(this).addClass(hover);
				})
				.on('dragleave', function(e) {
					e.stopPropagation();
				  	e.preventDefault();
				  	$(this).removeClass(hover);
				})
				.on('dragover', function(e) {
					e.stopPropagation();
				  	e.preventDefault();
					e.originalEvent.dataTransfer.dropEffect = 'copy';
					$(this).addClass(hover);
				})
				.on('drop', function(e) {
					dialog.elfinderdialog('close');
					targets && (e.originalEvent._target = targets[0]);
					dropUpload(e.originalEvent);
				})
				.prependTo(dialog)
				.after('<div class="elfinder-upload-dialog-or">'+fm.i18n('or')+'</div>')[0];
			
		} else {
			pastebox = $('<div class="ui-corner-all elfinder-upload-dropbox" contenteditable="true">'+fm.i18n('dropFilesBrowser')+'</div>')
				.on('paste drop', function(e){
					paste(e);
				})
				.on('mousedown click', function(){
					$(this).focus();
				})
				.on('focus', function(){
					this.innerHTML = '';
				})
				.on('dragenter mouseover', function(){
					$(this).addClass(hover);
				})
				.on('dragleave mouseout', function(){
					$(this).removeClass(hover);
				})
				.prependTo(dialog)
				.after('<div class="elfinder-upload-dialog-or">'+fm.i18n('or')+'</div>')[0];
			
		}
		
		uidialog = fm.dialog(dialog, {
			title          : this.title + '<span class="elfinder-upload-target">' + (targetDir? ' - ' + fm.escape(targetDir.i18 || targetDir.name) : '') + '</span>',
			modal          : true,
			resizable      : false,
			destroyOnClose : true
		});
		
		return dfrd;
	};

};


/*
 * File: /js/commands/view.js
 */

/**
 * @class  elFinder command "view"
 * Change current directory view (icons/list)
 *
 * @author Dmitry (dio) Levashov
 **/
elFinder.prototype.commands.view = function() {
	var fm = this.fm;
	this.value          = fm.viewType;
	this.alwaysEnabled  = true;
	this.updateOnSelect = false;

	this.options = { ui : 'viewbutton'};
	
	this.getstate = function() {
		return 0;
	}
	
	this.exec = function() {
		var self  = this,
			value = fm.storage('view', this.value == 'list' ? 'icons' : 'list');
		return fm.lazy(function() {
			fm.viewchange();
			self.update(void(0), value);
			this.resolve();
		});
	}

};

return elFinder;
}));