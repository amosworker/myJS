
/*
 * ��ʽ�̳к���
 * �μ�Javascriptģʽ page130
 * uber ���Է��ʵ�ԭʼ�������ԭ��
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