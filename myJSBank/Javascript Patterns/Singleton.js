/*
 * 对象字面量（object literal）创建一个简单的对象就是一个单体
 * */
var obj = {
	myprop:'my value'
};



/*
	静态属性中缓存单个实例的方法
*/

function Universe(){
	
	if(typeof Universe.instance === "object"){
		return Universe.instance;
	}

	//正常进行
	this.start_time = 0;
	this.bang = "Big";

	//缓存
	Universe.instance = this;

	// 隐式返回
	return this;
	
}


/*
	闭包实现保护单个实例
*/
function Universe(){ 
	var instance = this;
	
	this.start_time = 0;
	this.bang = "big";
	
	Universe = function (){// Universe 重定义以后实例的constructor将不等于Universe
		return instance;
	};
	
}


//修正后的闭包单体方法可以解决实例不等于Universe的问题
function Universe(){ 
	var instance = this;

	Universe = function (){
		return instance;
	};
	
	Universe.prototype = this;

	instance = new Universe();

	instance.constructor = Universe;

	this.start_time = 0;
	this.bang = "big";
	
	return instance;
}

