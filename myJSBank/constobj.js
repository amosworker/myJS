//���Զ��峣��
var constant = (function(){
	var constants = {},
	ownProp = Object.prototype.hasOwnProperty,
	allowed = {
		string:1,
		number:1,
		boolean:1
	},
	prefix = (Math.random()+ "_").slice(2);
	
	return {
		set: function(name,value){
			if(this.isDefined(name)){
				return false;
			}
			if(!ownProp.call(allowed, typeof value)){
				return false;
			}
			constants[prefix + name] = value;
			return true;
		},
		isDefined: function(name){
			return ownProp.call(constants,prefix + name);
		},
		get: function(name){
			if(this.isDefined(name)){
				return constants[prefix + name];
			}
			return null;
		}
	};
})();

/*
 * example 
 */
//����Ƿ��Ѷ���
constant.isDefined('maxwidth'); //false

constant.set('maxwidth',480); //true

constant.isDefined('maxwidth'); //true

constant.set('maxwidth',310); //false

constant.get('maxwidth'); //480