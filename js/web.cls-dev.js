/*
* Project	Web Run - class
* Version	1.0.0
* Depend	jQuery
* Author	Richard
* Email		cn.richard.he@gmail.com
*/
////////////////////////////////////////////
/*
 * Tab module
 * <div id="tab" class="tab-box">
 *   <div class="tab-hd">
 *     <span><a href="#">tab1</a></span>
 *     <span><a href="#">tab2</a></span>
 *   </div>
 *   <div class="tab-sub">
 *     <div class="tab-con" style="display: block;">
 *         Your code at here. //tab1
 *     </div>
 *     <div class="tab-con" style="display: none;">
 *         Your code at here. //tab2
 *     </div>
 *   </div>
 * </div>
 */
(function() {
var Tab = function(container) {
	this.container = container;
	this.run();
};
web.extend(Tab.prototype, {
	constructor: Tab,
	tab: function() {
		var container = $(this.container);
		$.each(container, function() {
			var $this = $(this);
			var handler = $this.children().first();
			var showArea = $this.children().last();
			var tabCon = showArea.children();
			var tabHds = handler.children().not("strong");
			
			tabHds.bind("mouseover", function(){
				var index = tabHds.index(this);
				tabHds.removeClass("current");
				$(this).addClass("current");
				tabCon.removeClass("dom-display");
				tabCon.eq(index).addClass("dom-display");
			});
			
			//tabHds = null;
		});
	},
	run: function() {
		this.tab();
	}
});
var _Tab = function(container) {
	return new Tab(container);
};
web.module('Tab', _Tab);
})();

/*
 * ImageSlide module
 * <div id="demo" class="demo">
 *   <ul>
 *     <li>
 *       <div><a href="#"><img src="../demo.jpg" /></a><div>
 *     </li>
 *   </ul>
 * </div>
 */
(function() {
var ImageSlide = function(container) {
	this.container = container;
	this.run();
};
web.extend(ImageSlide.prototype, {
	constructor: ImageSlide,
	run: function() {
		var self = this;
		var container = $(this.container);
		var sWidth = this.sWidth = container.width();
		var len = this.len = container.find("ul>li").length;
		var index = this.index = 0;
		var picTimer;
		
		var btn = "<div class='btnBg'></div><div class='btn'>";
		for(var i=0; i < len; i++) {
			btn += "<span>" + (i+1) + "</span>";
		}
		btn += "</div>"
		
		container.append(btn);
		container.find(".btnBg").css("opacity",0);
		
		container.find(".btn>span").mouseenter(function() {
			index = container.find(".btn>span").index(this);
			self.showPics(index);
		}).eq(0).trigger("mouseenter");
		
		container.find("ul").css("width",sWidth * (len + 1));
		
		container.hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				if(index == len) {
					self.showFirPic();
					index = 0;
				} else {
					self.showPics(index);
				}
				index++;
			},5000);
		}).trigger("mouseleave");
	},
	showPics: function(index) {
		var container = $(this.container);
		var left = -index*this.sWidth;
		container.find("ul").stop(true,false).animate({"left":left},500);
		container.find(".btn>span").removeClass("on").eq(index).addClass("on");
	},
	showFirPic: function() {
		var container = $(this.container);
		var ct_ul = container.find("ul");
			ct_ul.append(container.find("ul>li:first").clone());
		var left = -(this.len*this.sWidth);
		
		ct_ul.stop(true,false).animate({"left":left},500,function() {
			ct_ul.css("left","0");
			ct_ul.find("li:last").remove();
		}); 
		container.find(".btn>span").removeClass("on").eq(0).addClass("on");
	}
});
var _ImageSlide = function(container) {
	return new ImageSlide(container);
}
web.module('ImageSlide', _ImageSlide);
})();

/*
 * DateFormat module
 * Date: YY-MM-DD hh-mm-ss
 */
(function() {
var DateFormat = function(container) {
	this.container = container;
	this.run();
}
web.extend(DateFormat.prototype, {
	constructor: DateFormat,
	run: function() {
		var date = new Date();
		var format = "YYYY/MM/DD";
		var dateStr = this.dateFormat(date, format);
		var container = $(this.container);
		container.text(dateStr);
	},
	dateFormat: function(d, f) {
		var z = {
			Y:d.getFullYear(),
			M:d.getMonth()+1,
			D:d.getDate(),
			h:d.getHours(),
			m:d.getMinutes(),
			s:d.getSeconds()
		};
		return f.replace(/(Y+|M+|D+|h+|m+|s+)/g, 
			function(v) {
				return ((v.length>1?"0":"")+z[v.slice(-1)]).slice(-(v.length>2?v.length:2))
			}
		);
	}
});
var _DateFormat = function(container) {
	return new DateFormat(container);
};
web.module("DateFormat", _DateFormat);
})();

/*
 * Transparent module
 * <div class="transparent">
 * 	<div id='A'><img src='../res/demo.jpg' /></div>
 *  <div id='B'><img src='../res/demo2.jpg' /></div>
 * </div>
 */
(function() {
var Transparent = function(container) {
	this.container = container;
	this.run();
};
web.extend(Transparent.prototype, {
	run: function() {
		var container = $(this.container);
		var handler = container.find("div");
		handler.hover(function() {
			$(this).siblings().stop().animate({
				opacity: 0.5
			}, 500);
		},function() {
			handler.stop().animate({
				opacity: 1
			}, 500);
		});
	}
});
var _Transparent = function(container) {
	return new Transparent(container);
};
web.module("Transparent", _Transparent);
})();

/*
 * TextSlide module
 * <div class="textSlide">
 * 	<ul>
 * 	  <li> ... </li>
 *  </ul>
 * </div>
 */
(function() {
var TextSlide = function(container) {
	this.container = container;
	this.run();
};
web.extend(TextSlide.prototype, {
	run: function() {
		var container = $(this.container);
		var lis = container.find("ul>li");
		lis.mouseover(function(){
			var _this = $(this);
			lis.removeClass();
			_this.addClass("current");
		});
	}
});
var _TextSlide = function(container) {
	return new TextSlide(container);
};
web.module("TextSlide", _TextSlide);
})();

/*
 * Web Run
 */
$(function() {
try {
	web.config({
		webRoot:	"./",
		moduleRoot:	"./js/"
	});
	web.run([
		//{container:".tab-box", module:"Tab"}, //针对批量切换行为，且拥有相同的布局就采用"."这种形式
		{container:"#focus", module:"ImageSlide"}, //如果只是针对某个区块进行动画，则传递相应的id并采用"#"的形式
		{container:"#date", module:"DateFormat"},
		{container:"#transparent", module:"Transparent"},
		{container:"#textSlide", module:"TextSlide"}
	]);
} catch(e) {
	console.log(e.message);
}
});
