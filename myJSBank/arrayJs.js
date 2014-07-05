


/*
 * ECMAScript 5 定义了一个新方法Array.isArray()，该函数在参数为数组是返回true，
 * 在不支持的情况下可以用以下方法检测
 */
if(typeof Array.isArray === "undefined"){
	Array.isArray = function(arg){
		return Object.prototype.toString().call(arg) === "[object Array]";
	};
}