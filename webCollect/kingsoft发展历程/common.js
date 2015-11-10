//reday 加载
function ready(fn) {
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function () { fn && fn(); });
	} else {
		function loading() {
			try {
				document.documentElement.doScroll('left');
				fn && fn();
			} catch (e) {
				setTimeout(loading, 1);
			}
		}
		setTimeout(loading, 1);
	}
}	
//事件绑定	
function addEvent(obj, sEv, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(sEv, fn, false);
	} else {
		obj.attachEvent('on' + sEv, fn);
	}
}	
//获取className;
function getByClass(oParent, sClass)
{
	if(oParent.getElementsByClassName)
	{
		//性能
		return oParent.getElementsByClassName(sClass);
	}
	
	var aEle=oParent.getElementsByTagName('*');
	var result=[];
	
	var re=new RegExp('([^\\w\\-]|^)'+sClass+'([^\\w\\-]|$)');
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i]);
		}
	}
	
	return result;
}

//添加className;
function addClass(obj, className) {
	var reg = new RegExp('\\b' + className + '\\b');
	if (!reg.test(obj.className)) {
		if (obj.className == '') {
			obj.className = className;
		} else {
			obj.className += ' ' + className;
		}
	}
}
//删除ClassName;
function removeClass(obj, className) {
	var reg = new RegExp('\\b' + className + '\\b');
	obj.className = obj.className.replace(reg, '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
}
//获取样式
function getStyle(obj, name) {
	return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
}
//事件源	
function isChild(oParent, obj) {
	while (obj) {
		if (obj == oParent) return true;
		obj = obj.parentNode;
	}
	return false;
}
//缓冲
function startMove(obj, json, fnEnd, speed) {
	speed = speed || 3
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var icur = 0, sec = true;
		for (var name in json) {
			if (name == 'opacity') {
				icur = Math.round(parseFloat(getStyle(obj, name)) * 100);
			} else {
				icur = Math.round(parseInt(getStyle(obj, name)));
			}
			var ispeed = (json[name] - icur) / speed;
			ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
			if (json[name] != icur) sec = false;
			if (name == 'opacity') {
				obj.style.opacity = (ispeed + icur) / 100;
				obj.style.filter = 'alpha(opacity=' + (ispeed + icur) + ')';
			} else {
				obj.style[name] = (ispeed + icur) + 'px';
			}

			if (sec) {
				clearInterval(obj.timer);
				fnEnd && fnEnd();
			}
		}
	}, 30);
}
//滚轮
function addMouseWheel(obj, fn) {
	function fnWheel(ev) {
		var oEvent = ev || event;
		var bDown = false;
		bDown = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;
		fn(bDown, oEvent);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
		obj.addEventListener('DOMMouseScroll', fnWheel, false);
	} else {
		addEvent(obj, 'mousewheel', fnWheel);
	}
}

//缓冲

function startMove(obj, json, fnEnd, speed) {
	speed = speed || 3
	clearInterval(obj.timer);
	obj.timer = setInterval(function () {
		var icur = 0, sec = true;
		for (var name in json) {
			if (name == 'opacity') {
				icur = Math.round(parseFloat(getStyle(obj, name)) * 100);
			} else {
				icur = Math.round(parseInt(getStyle(obj, name)));
			}
			var ispeed = (json[name] - icur) / speed;
			ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
			if (json[name] != icur) sec = false;
			if (name == 'opacity') {
				obj.style.opacity = (ispeed + icur) / 100;
				obj.style.filter = 'alpha(opacity=' + (ispeed + icur) + ')';
			} else {
				obj.style[name] = (ispeed + icur) + 'px';
			}

			if (sec) {
				clearInterval(obj.timer);
				fnEnd && fnEnd();
			}
		}
	}, 30);
}


//AJAX
function json2url(json){
        json.t=Math.random();
        var arr=[];

        for(var name in json){
            arr.push(name+'='+json[name]);
        }
	
        var str=arr.join('&');
	
        return str;	
    }

function ajax(url, data, fnSucc, type, time, fnFail) {
	var timer = null;
	type = type || 'get';
	time = time || 3;
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	switch(type.toUpperCase()){
		case 'GET':
			oAjax.open('GET', url + '?' + json2url(data), true);
			oAjax.send()
			break;
		case 'POST':
			oAjax.open('POST', url, true);
			oAjax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			oAjax.send(data);
			break;
	}

	oAjax.onreadystatechange = function () {
		if (oAjax.readyState == 4) {
			if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
				clearTimeout(time);
				fnSucc && fnSucc(oAjax.responseText);
			} else {
				clearTimeout(time);
				fnFail && fnFail(oAjax, status);
			}
		}
	}

	time = setTimeout(function () {
		oAjax.onreadystatechange = null;
	}, time * 1000);
}

//判断浏览器宽度

ready(function(){
	
	var oHTML=document.getElementsByTagName('html')[0];
	function Rsize()
	{
		var oClientWidth=document.documentElement.clientWidth || document.body.clientWidth;
		oHTML.style.cssText='overflow-x:'+(oClientWidth<1280?'visible':'hidden');
	}

	window.onresize=function()
	{
		Rsize();

	};
	Rsize();
	
	
	
})