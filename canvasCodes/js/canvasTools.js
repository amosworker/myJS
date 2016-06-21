
function canvasTools(){

};

canvasTools.prototype.windowToCanvas =  function (canvas,x,y){
	var bbox =  canvas.getBoundingClientRect();
	return {
		x: Math.round((x - bbox.left)*(canvas.width/bbox.width)),
		y: Math.round((y - bbox.top)*(canvas.height/bbox.height))
	};
}

canvasTools.prototype.clearCanvas = function(context){
	context.clearRect(0,0,context.canvas.width,context.canvas.height);
}

//get printable keycode
document.addEventListener('keypress',function(e){
	var key = String.fromCharCode(e.which);
	console.log(key);
});