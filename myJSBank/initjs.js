//接口
var initobj = {
	addListener:null,
	removeListener:null
};

// 初始化时分支  的好处是不必每次调用时都要执行对应的函数
if(typeof window.addEventListener === 'function'){
	initobj.addListener = function (el,type,fn){
		el.addEventListener(type,fn,false);
	};
	initobj.removeListener = function (el,type,fn){
		el.removeEventListener(type,fn,false);
	};
} else if(typeof document.attachEvent === 'function'){
	initobj.addListener = function (el,type,fn){
		el.attachEvent('on' + type,fn);
	};
	initobj.removeListener = function (el,type,fn){
		el.detachEvent('on' + type,fn);
	};
} else{
	initobj.addListener = function (el,type,fn){
		el['on' + type] = fn;
	};
	initobj.removeListener = function (el,type,fn){
		el['on' + type] = null;
	};
}