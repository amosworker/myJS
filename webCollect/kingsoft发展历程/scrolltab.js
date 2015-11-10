// JavaScript Document
ready(function(){

function nav(id) {
        var $box = document.getElementById(id);
        if (!$box) return;
        var height = $box.offsetHeight;
        var boxwidth = $box.offsetWidth;
        var maxwidth = document.documentElement.clientWidth || document.body.clientWidth;
        function change() {
            var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
            var $top_box1 = document.getElementById('top_box1');
            if (scrollT >= $top_box1.offsetHeight) {
                $box.style.cssText = 'position:fixed;top:0;width: 100%; z-index:100;';
                $top_box1.style.display = 'block';
            } else {
                $box.style.cssText = '';
                $top_box1.style.display = 'none';
                $box.style.display = 'block';
            }
        }

        window.onscroll = function () {
            change();

        }

        $top_box = document.createElement('div');
        $top_box.setAttribute('id', 'top_box1');
        $top_box.style.cssText = 'display:none';
        $top_box.style.display = 'none';
        var next = $box.nextSibling || $box.nextElementSibling;
        $box.parentNode.insertBefore($top_box, next);
        
    }
	nav('top_box');
});