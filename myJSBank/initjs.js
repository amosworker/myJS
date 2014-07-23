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
		var h=window.innnerHeight;
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

//动态加载脚本
function loadScript(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
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
	example:
		preloadimages(["1.jpg","2.jpg"]).done(function(imgarr){
			alert(imgarr.length);
			alert(imgarr[0].width);
		});
*/
function preloadimages(arr){   
	var newimages=[], loadedimages=0;
	var postaction=function(){};  //此处增加了一个postaction函数
	var arr=(typeof arr!="object")? [arr] : arr;
	function imageloadpost(){
		loadedimages++;
		if (loadedimages==arr.length){
			postaction(newimages); 
			//加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
		}
	}
	for (var i=0; i<arr.length; i++){
		newimages[i]=new Image();
		newimages[i].src=arr[i];
		newimages[i].onload=function(){
			imageloadpost();
		};
		newimages[i].onerror=function(){
			imageloadpost();
		};
	}
	
	return { //此处返回一个空白对象的done方法
		done:function(f){
			postaction=f || postaction;
		}
	}
}