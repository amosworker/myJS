


/*
 * ECMAScript 5 ������һ���·���Array.isArray()���ú����ڲ���Ϊ�����Ƿ���true��
 * �ڲ�֧�ֵ�����¿��������·������
 */
if(typeof Array.isArray === "undefined"){
	Array.isArray = function(arg){
		return Object.prototype.toString().call(arg) === "[object Array]";
	};
}