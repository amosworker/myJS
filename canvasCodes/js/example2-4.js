var canvas =  document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	image = new Image();

function fillCanvasWithPattern(repeatString){
	var pattern = context.createPattern(image,repeatString);
	context.clearRect(0,0,canvas.width,canvas.height);
	context.fillStyle = pattern;
	context.fillRect(0,0,canvas.width,canvas.height);
	context.fill();
}

var inputs = document.getElementById('radios').getElementsByTagName('input');

for(var i=0; i<inputs.length; i++){
	inputs[i].addEventListener('click',function(e){
		fillCanvasWithPattern(this.value);
	});
}

image.src = 'img/water.jpg';
image.onload = function(){
	fillCanvasWithPattern('repeat');
};

