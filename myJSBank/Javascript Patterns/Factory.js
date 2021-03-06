//父构造函数
function CarMaker(){}

CarMaker.prototype.drive = function(){
	return "Vroom, I have " + this.doors + " doors";
};

//CarMaker.factory为公有静态方法，CarMaker的实例是访问不到的
CarMaker.factory =  function (type){
	var constr = type,
		newcar;

	if (typeof CarMaker[constr] !== "function") {
		throw {
			name: "Error",
			message: constr + " doesn't exist"
		};
	};

	if (typeof CarMaker[constr].prototype.drive !== "function") {
		CarMaker[constr].prototype = new CarMaker();
	};

	newcar = new CarMaker[constr]();

	return newcar;
}

CarMaker.Compact = function(){
	this.doors = 4;
};

CarMaker.Convertible = function(){
	this.doors = 2;
};

CarMaker.SUV = function(){
	this.doors = 24;
};