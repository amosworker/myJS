
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

/**
 * drawGrid »­Íø¸ñ
 * @param context
 * @param color
 * @param stepx
 * @param stepy
 */
canvasTools.prototype.drawGrid = function(context,color,stepx,stepy){
	context.save();

	context.strokeStyle = color;
	context.fillStyle = '#ffffff';
	context.lineWidth = 0.5;
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	for(var i= stepx + 0.5; i < context.canvas.width; i += stepx){
		context.beginPath();
		context.moveTo(i,0);
		context.lineTo(i,context.canvas.height);
		context.stroke();
	}

	for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(context.canvas.width, i);
		context.stroke();
	}

	context.restore();
}

/**
 * »æÖÆÐéÏß drawDashedLine
 * @param context
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param dashLength
 */
canvasTools.prototype.drawDashedLine = function(context, x1, y1, x2, y2, dashLength) {
	dashLength = dashLength === undefined ? 5 : dashLength;

	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	var numDashes = Math.floor(
		Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength);

	for (var i=0; i < numDashes; ++i) {
		context[ i % 2 === 0 ? 'moveTo' : 'lineTo' ]
		(x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
	}

	context.stroke();
};

//get printable keycode
document.addEventListener('keypress',function(e){
	var key = String.fromCharCode(e.which);
	console.log(key);
});