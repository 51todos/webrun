/*
 * demo module
 */
(function() {
var demo = function(container) {
	this.container = container;
	this.run();
};

web.extend(demo.prototype, {
	constructor: demo,
	run: function() {
		alert(this.container + " is ok.");
	}
});

var _demo = function(container) {
	return new demo(container);
};

web.module('demo', _demo);
})()