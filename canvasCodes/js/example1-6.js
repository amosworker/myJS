var canvas =  document.getElementById('canvas'),
	context = canvas.getContext('2d');

var canvasUtil = new canvasTools();
var consolebox = document.getElementById('consolebox');

canvas.addEventListener('mousemove',function(e){
	canvasUtil.clearCanvas(context);
	var loc = canvasUtil.windowToCanvas(canvas,e.clientX,e.clientY);
	drawHorizontalLine(loc.y);
	drawVertialLine(loc.x);
	consolebox.innerHTML = "x:"+loc.x+'  y:'+loc.y;
});
canvas.addEventListener('mouseleave',function(e){
	canvasUtil.clearCanvas(context);
});

function drawHorizontalLine(y){
	context.beginPath();
	context.moveTo(0,y+0.5);
	context.lineTo(context.canvas.width,y+0.5);
	context.stroke();
}

function drawVertialLine(x){
	context.beginPath();
	context.moveTo(x+0.5,0);
	context.lineTo(x+0.5,context.canvas.height);
	context.stroke();
}