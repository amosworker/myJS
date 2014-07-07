
/*
 * 类式继承函数
 * 参见Javascript模式 page130
 * uber 可以访问到原始父对象的原型
 * */
var inherit = (function(){
	var F = function(){};
	return function(C,P){
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	};	
}());

/*--------------------------------------------------------------------*/
/*
 * 通过复制属性实现继承
 * 参见Javascript模式 page136
 * */
//浅属性复制
function extend(parent,child){
	var i;
	child = child || {};
	for(i in parent){
		if(parent.hasOwnProperty(i)){
			child[i] = parent[i];
		}
	}
	return child;
}



//深度属性复制
function extendDeep(parent,child){
	var i,
		toStr = Object.prototype.toString,
		astr = "[object Array]";
		
	child = child || {};
	
	for(i in parent){
		if(parent.hasOwnProperty(i)){
			if(typeof parent[i] === "object"){
				child[i] = (toStr.call(parent[i] === astr) ? [] : {});
				extendDeep(parent[i],child[i]);
			}else{
				child[i] = parent[i];
			}
		}
	}
	return child;
}


/*
 * 在ECMAScript 5中bind()方法加到了Function.prototype,使得bind()就像apply()和call()一样简单易用。
 * example： var newFunc = obj.someFunc.bind(myobj,1,2,3);
 * */

if(typeof Function.prototype.bind === "undefined"){
	Function.prototype.bind = function (thisArg){
		var fn = this,
			slice = Array.prototype.slice,
			args = slice.call(arguments,1);
		return function(){
			return fn.apply(thisArg,args.concat(slice.call(arguments)));
		};
	};
}
