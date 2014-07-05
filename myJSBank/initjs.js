//�ӿ�
var initobj = {
	addListener:null,
	removeListener:null
};

// ��ʼ��ʱ��֧  �ĺô��ǲ���ÿ�ε���ʱ��Ҫִ�ж�Ӧ�ĺ���
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