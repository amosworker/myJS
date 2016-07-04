var canvas =  document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	eraseAllBtn = document.getElementById('eraseAllBtn'),
	strokeStyleSelect = document.getElementById('strokeStyleSelect'),
	fillStyleSelect = document.getElementById('fillStyleSelect'),
	guidewireCheckbox = document.getElementById('guidewireCheckbox'),
	fillCheckbox = document.getElementById('fillColor'),
	drawingSurfaceImageData,
	mousedown = {},
	rubberbandRect = {},
	dragging = false,
	guidewires = guidewireCheckbox.checked,
	isOnCanvas = false;


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

function windowToCanvas(x,y){
	var bbox = canvas.getBoundingClientRect();
	return {
		x: Math.round((x - bbox.left)*(canvas.width/bbox.width)),
		y: Math.round((y - bbox.top)*(canvas.height/bbox.height))
	};
}

function saveDrawingSurface(){
	drawingSurfaceImageData = context.getImageData(0,0,canvas.width,canvas.height);
}

function restoreDrawingSurface(){
	context.putImageData(drawingSurfaceImageData,0,0);
}

function updateRubberbandRectangle(loc){
	rubberbandRect.width = Math.abs(loc.x - mousedown.x);
	rubberbandRect.height = Math.abs(loc.y - mousedown.y);

	if(loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
	else 					rubberbandRect.left = loc.x;

	if(loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
	else                    rubberbandRect.top = loc.y;
}

function drawRubberbandShape(loc){
	var angle,radius;

	if(mousedown.y === loc.y){
		radius = Math.abs(loc.x - mousedown.x);
	}else{
		angle = Math.atan(rubberbandRect.height/rubberbandRect.width);
		radius = rubberbandRect.height / Math.sin(angle);
	} 

	context.beginPath();
	context.arc(mousedown.x, mousedown.y,radius,0,Math.PI*2,false);
	context.stroke();
	if (fillCheckbox.checked) {
		context.fill();
	}
}

function updateRubberband(loc){
	updateRubberbandRectangle(loc);
	drawRubberbandShape(loc);
}

function drawHorizontalLine(y){
	context.beginPath();
	context.moveTo(0,y+0.5);
	context.lineTo(context.canvas.width,y+0.5);
	context.stroke();
}

function drawVerticalLine(x){
	context.beginPath();
	context.moveTo(x+0.5,0);
	context.lineTo(x+0.5,context.canvas.height);
	context.stroke();
}

function drawGuidewires(x,y){
	context.save();
	context.strokeStyle = 'rgba(0,0,230,0.4)';
	context.lineWidth = 0.5;
	drawVerticalLine(x);
	drawHorizontalLine(y);
	context.restore();
}

canvas.addEventListener('mouseenter',function(e){
	isOnCanvas = true;
});

canvas.addEventListener('mouseleave',function(e){
	isOnCanvas = false;
});


document.addEventListener('mousedown',function(e){
	if(isOnCanvas){
		dragging = 1;

		var loc = windowToCanvas(e.clientX, e.clientY);
		e.preventDefault();
		saveDrawingSurface();
		mousedown.x = loc.x;
		mousedown.y = loc.y;
		dragging = true;
	}
});

document.addEventListener('mousemove',function(e){
	var loc;
	if(dragging){
		e.preventDefault();
		loc = windowToCanvas(e.clientX, e.clientY);
		restoreDrawingSurface();
		updateRubberband(loc);

		if(guidewires){
			drawGuidewires(loc.x,loc.y);
		}
	}
});

document.addEventListener('mouseup',function(e){
	if(dragging){
		loc = windowToCanvas(e.clientX, e.clientY);
		restoreDrawingSurface();
		updateRubberband(loc);
		dragging = false;
	}
});

eraseAllBtn.addEventListener('click',function(e){
	context.clearRect(0,0,canvas.width,canvas.height);
	drawGrid('lightgray',10,10);
	saveDrawingSurface();
});

strokeStyleSelect.addEventListener('change',function(e){
	context.strokeStyle = strokeStyleSelect.value;
});

fillStyleSelect.addEventListener('change',function(e){
	context.fillStyle = fillStyleSelect.value;
});

guidewireCheckbox.addEventListener('change',function(e){
	guidewires = guidewireCheckbox.checked;
});

context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;
drawGrid('lightgray',10,10);