var Ginitobj;


//接口
function Initobj () {
	this.getwinW = function(){
		return this.windowWH().wWidth;
	},
	
	this.getwinH = function(){
		return this.windowWH().wHeight;
	},
	
	this.getScrollbarTop = function(){
		return this.ScollPostion().top;
	}
};

Initobj.prototype={
	addListener: (function(){
		if(window.addEventListener){
			return  function (el,type,fn){
						el.addEventListener(type,fn,false);
					};
		} else if(document.attachEvent){
			return  function (el,type,fn){
						el.attachEvent('on' + type,fn);
					};
		}else{
			return  function (el,type,fn){
						el['on' + type] = fn;
					};
		}
	}()),

	removeListener:(function(){
		if(window.addEventListener){
			return  function (el,type,fn){
						el.removeEventListener(type,fn,false);
					};
		} else if(document.attachEvent){
			return  function (el,type,fn){
						el.detachEvent('on' + type,fn);
					};
		}else{
			return  function (el,type,fn){
						el['on' + type] = null;
					};
		}
	}()),
	
	windowWH:function(){
		var h=window.innerHeight;
		var w=window.innerWidth;
		
		if (typeof h != "number"){
			if (document.compatMode == "CSS1Compat"){
				h= document.documentElement.clientHeight;
				w= document.documentElement.clientWidth;
			} else{
				h=document.body.clientHeight;
				w=document.body.clientWidth;
			}
		}
		
		return {wWidth:w,wHeight:h};
	},

	ScrollPostion:function() {//滚动条位置
        var t, l, w, h;
        if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
        return { top: t, left: l, width: w, height: h };
    },

    //获取元素的位置
	offsetLT: function (element){
		var left = element.offsetLeft;
		var top = element.offsetTop;
		var parent = element.offsetParent;

		while(parent != null){
			left += parent.offsetLeft;
			top += parent.offsetTop;
			parent = parent.offsetParent;
		};

		return {
			Left: left,
			Top: top
		};
	},

	//元素各边与浏览器窗口上边和左边的距离
	getRect: function (element) {
		var rect = element.getBoundingClientRect();
		var top = document.documentElement.clientTop;
		var left = document.documentElement.clientLeft;

		return {
			top : rect.top - top,//元素上边距离浏览器窗口上边的距离
			bottom : rect.bottom - top,//元素右边距离浏览器窗口左边的距离
			left : rect.left - left,//元素下边距离浏览器窗口上边的距离
			right : rect.right - left//元素左边距离浏览器窗口左边的距离
		}
	}

}

Ginitobj = new Initobj(); //初始化Initobj对象




//动态加载脚本
function loadScript(url,callback) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	
	if(!!callback){
		if(script.readyState){ //IE
			script.onreadystatechange = function(){
				if(script.readyState == "loaded" || script.readyState == "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		}else{ //not IE
			script.onload = function(){
				callback();
			};
		}
	}
	
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}

//动态加载样式表
function loadStyles(url) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	document.getElementsByTagName('head')[0].appendChild(link);
}


//获取鼠标点击事件的按键
function getButton(evt) { //跨浏览器左中右键单击相应
	var e = evt || window.event;
	if (evt) { //Chrome 浏览器支持W3C 和IE
		return e.button; //要注意判断顺序
	} else if (window.event) {
		switch(e.button) {
			case 1 :
				return 0; //按下了左键！
			case 4 :
				return 1; //按下了中键！
			case 2 :
				return 2; //按下了右键！
		}
	}
}

//可视区及屏幕坐标
//事件对象提供了两组来获取浏览器坐标的属性，一组是页面可视区左边，另一组是屏幕坐标。
function getEventLoaction(evt){
	var e = evt || window.event;
	return {
		clientX: e.clientX,//可视区X 坐标，距离左边框的位置
		clientY: e.clientY,//可视区Y 坐标，距离上边框的位置
		screenX: e.screenX,//屏幕区X 坐标，距离左屏幕的位置
		screenY: e.screenY //屏幕区Y 坐标，距离上屏幕的位置
	};
}

//键盘字符ASCII 编码  只发生在keypress事件中
function getCharCode(evt) {
	var e = evt || window.event;
	if (typeof e.charCode == 'number') {
		return e.charCode;
	} else {
		return e.keyCode;
	}
}

//获取事件的目标
function getTarget(evt) {
	var e = evt || window.event;
	return e.target || e.srcElement; //兼容得到事件目标DOM 对象
}

//阻止冒泡
function stopBubble(evt) {
	var e = evt || window.event;
	window.event ? e.cancelBubble = true : e.stopPropagation();
}

//阻止默认事件
function preDef(evt) {
	var e = evt || window.event;
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}


//获取鼠标上下滚轮的距离
/*
addEvent(document, 'mousewheel', function (evt) { //非火狐
	alert(getWD(evt));
});
addEvent(document, 'DOMMouseScroll', function (evt) { //火狐
	alert(getWD(evt));
});
*/
function getMWS(evt) {
	var e = evt || window.event;
	if (e.wheelDelta) {
		return e.wheelDelta;
	} else if (e.detail) {
		return -evt.detail * 40; //保持计算的统一
	}
}



/** 
 * @brief 获取元素的计算样式（最终的样式） 
 * @author kenshinlin 2011/11/30 
 * @param elem 要计算样式的元素,dom对象或字符串（id号） 
 * @pro 要获取的样式属性,这个字符串是骆驼型的，如marginLeft而不是margin-left 
 */  
function getStyle(elem,pro){    
    elem = ('string'==typeof elem)?document.getElementById('elem'):elem;  
    if(!elem) return null;  
      if(elem.style[pro])  //内联  
          return elem.style[pro];    
      else if(elem.currentStyle)  //IE  
      {    
          return elem.currentStyle[pro];      
      }   
      else if(window.getComputedStyle){  //W3C标准  
          var s=window.getComputedStyle(elem,null);  
          return s[pro];  
      }  
      else if(document.defaultView&&document.defaultView.getComputedStyle) //FF,CHROME等  
      {    
          pro=pro.replace(/([A-Z])/g,"-$1"); //如marginLeft转为margin-Left  
          pro=pro.toLowerCase();   //再转为小写margin-left  
          var s=document.defaultView.getComputedStyle(elem,"");    
          return s&&s.getPropertyValue(pro);    
      }    
      else return null;  
} 

/**
	Javascript实现图片的预加载的完整实现
	preloadimages(url, ready, load, error)
	example:
		preloadimages(imgsrc,function(){
			iw=this.width;
			ih=this.height;
			itop = Math.floor(lis.eq(0).offset().top);
			resizeImg();
		});
*/
function preloadimages() {
    var list = [], intervalId = null,
 
    // 用来执行队列
    tick = function () {
        var i = 0;
        for (; i < list.length; i++) {
            list[i].end ? list.splice(i--, 1) : list[i]();
        };
        !list.length && stop();
    },
 
    // 停止所有定时器队列
    stop = function () {
        clearInterval(intervalId);
        intervalId = null;
    };
 
    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();
 
        img.src = url;
 
        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };
 
        width = img.width;
        height = img.height;
 
        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };
 
        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();
 
        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();
 
            load && load.call(img);
 
            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };
 
        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
};

//点击回到顶部 为obj对象赋予点击回到顶部事件
function returnToTop(obj)
{
	var bSys=true; //用于区分是否是定时器触发的onscroll事件，true为定时器触发，false为用户触发
	var timer=null;
	
	//如何检测用户拖动了滚动条
	window.onscroll=function (){
		if(!bSys) clearInterval(timer);
		bSys=false;
	};
	
	Initobj.addListener(obj,"click",function(){
		timer=setInterval(function (){
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			var iSpeed=Math.floor(-scrollTop/8);
			
			if(scrollTop==0) clearInterval(timer);
			
			bSys=true;
			document.documentElement.scrollTop=document.body.scrollTop=scrollTop+iSpeed;
		}, 30);
	});
};

//取得host
function getHost (url) {
    var host = "null";
    if (typeof url == "undefined"
            || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/|:]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined"
            && null != match) {
        host = match[1];
    }
    if (typeof host != "undefined"
            && null != host) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
            host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
    }
    return host;
}


//检查浏览器是否支持input的类型
/*
	example:
		if(!inputSupport("data")){
			alert("the data input type is not supported");
		}
*/
function inputSupport(inputType){
	var input = document.createElement('input');
	input.setAttribute("type",inputType);
	var val= (input.type !== "text");
	delete input;
	return val;
}

//为window对象添加contains方法 
;(function(exports){
    exports.contains = function(pel, cel){ //验证cel节点被pel节点包含
        // ie
        if (pel.contains){
            return pel.contains(cel);
        }
        else if(pel.compareDocumentPosition){
            return !!pel.compareDocumentPosition(cel) & 16;
        }
        else{
            var p;
            while ((p = cel.parentNode) && p.nodeType === 1){
                if (pel === p) return true;
            }
            return true;
        }
    };
}(window));


//检测系统、浏览器版本、引擎、是否为移动端
var browser = (function(){
  var userAgent = navigator.userAgent,
  ua = userAgent.toLowerCase(),
  browserList = {
    msie : /(?:msie\s|trident.*rv:)([\w.]+)/i,
    firefox : /Firefox\/([\w.]+)/i,
    chrome : /Chrome\/([\w.]+)/i,
    safari : /version\/([\w.]+).*Safari/i,
    opera : /(?:OPR\/|Opera.+version\/)([\w.]+)/i
  },
  kernels = {
    MSIE: /(compatible;\smsie\s|Trident\/)[\w.]+/i,
    Camino: /Camino/i,
    KHTML: /KHTML/i,
    Presto: /Presto\/[\w.]+/i,
    Gecko : /Gecko\/[\w.]+/i,
    WebKit: /AppleWebKit\/[\w.]+/i
  },
  browser = {
    kernel : 'unknow',
    version : 'unknow'
  };

  // 检测浏览器
  for(var i in browserList){
    var matchs = ua.match(browserList[i]);
    browser[i] = matchs ? true : false;
    if(matchs){
      browser.version = matchs[1];
    }
  }

  // 检测引擎
  for(var i in kernels){
    var matchs = ua.match(kernels[i]);
    if(matchs){
      browser.kernel = matchs[0];
    }
  }

  // 系统
  var os = ua.match(/(Windows\sNT\s|Mac\sOS\sX\s|Android\s|ipad.*\sos\s|iphone\sos\s)([\d._-]+)/i);
  browser.os = os!==null ? os[0] : false;

  // 是否移动端
  browser.mobile = ua.match(/Mobile/i)!==null ? true : false;

  return browser;
}());



/**
 * 特性检查浏览器是否支持css3等属性
 * @method isSupport
 * @param {property} 需要检查的css属性
 * @return {true or false} 真或假
 */
function isSupport (property) {
    var prefix = ["", "webkit", "Moz", "ms", "o"],
        i = prefix.length,
        style = document.createElement("div").style;

    while (i--) {
        if (!prefix[i]) {
            if ((prefix[i] + property) in style) return true;
        } else {
            if ((prefix[i] + property.substr(0, 1).toUpperCase() + property.substr(1)) in style) return true;
        }
    }

    return false;
}