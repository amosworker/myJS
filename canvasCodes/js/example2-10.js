var canvas =  document.getElementById('canvas'),
	context = canvas.getContext('2d');

//非零环绕规则 参考《HTML5 Canvas核心技术 图形、动画与游戏开发》第64页


function drawGrid(color,stepx,stepy){
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

function drawTwoArcs(){
	context.beginPath();
	context.arc(300,190,150,0,Math.PI*2,false); // Outer: CCW (counterclockwise)
	context.arc(300,190,100,0,Math.PI*2,true); // Inner: CW(clockwise)

	context.fill();
	context.shadowColor = undefined;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.stroke();
}

function draw(){
	context.clearRect(0,0,canvas.width,canvas.height);
	drawGrid('lightgray',10,10);

	context.save();

	context.shadowColor = 'rgba(0,0,0,0.8)';
	context.shadowOffsetX = 12;
	context.shadowOffsetY = 12;
	context.shadowBlur = 15;

	drawTwoArcs();

	context.restore();
}

context.fillStyle = 'rgba(100,140,230,0.5)';
context.strokeStyle = context.fillStyle;
draw();
