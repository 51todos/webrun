/*
 * marquee module
 */
(function() {
var marquee = function(container) {
	this.container = container;
	this.run();
};

web.extend(marquee.prototype, {
	constructor: marquee,
	run: function() {
		var container = $(this.container);
		
		alert(this.container+" is ok.");
	}
});

var _marquee = function(container) {
	return new marquee(container);
};

web.module('marquee', _marquee);
})()