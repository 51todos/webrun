/*
* Project	Web Run
* Version	1.0.0
* Depend	jQuery
* Author	Richard
* Email		cn.richard.he@gmail.com
*/
(function(window, undefined){
var webRoot = '',
	moduleRoot = '',
	extend = $.extend,
	modules = {};

var config = function(opts) {
	webRoot = opts.webRoot;
	moduleRoot = opts.moduleRoot;
};

var WEB = {
	version:	'1.0.0',
	module:		module,
	config:		config,
	extend:		$.extend,
	run:		run
};

/*
 * Install module
 */
function module(name, fn) {
	modules[name] = fn;
};

/*
 * Load module
 */
function loadModule(arr) {
	var HTMLhead = $("head");
	var HTMLjs = $('<script type="text/javascript"></script>');
	for(var item in arr) {
		var moduleName = arr[item].module;
		var _HTMLjs = HTMLjs.clone();
			_HTMLjs.attr("src", moduleRoot + moduleName + ".js");
		HTMLhead.append(_HTMLjs);
	}
};

/*
 * Run module
 */
function runModule(arr) {
	for(var item in arr) {
		var container = arr[item].container;
		var moduleName = arr[item].module;
		modules[moduleName](container);
	}
}

/*
 * Web run
 */
function run(CMarray) {
	loadModule(CMarray);
	runModule(CMarray);
};

/*
 * Provide external interface
 */
window.web = WEB;
})(window);