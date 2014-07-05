
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