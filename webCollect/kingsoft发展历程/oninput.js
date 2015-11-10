function inputFocus(id) {
	  var $input = document.getElementById(id);
	  if (!$input) return;
	
	  var next = $input.nextElementSibling || $input.nextSibling;
	
	  if (next.tagName.toLowerCase() == 'span') {
		  $input.onfocus = function () {
			  next.style.display = 'none';
		  }
	
		  $input.onblur = function () {
			  if (this.value == '') {
				  next.style.display = 'block';
			  }
		  }
	
		  next.onclick = function () {
			  $input.focus();
			  next.style.display = 'none';
		  };
              next.style.display = $input.value == '' ? 'block' : 'none';
	  }
	}

ready(function () {
	
	inputFocus('search')
});