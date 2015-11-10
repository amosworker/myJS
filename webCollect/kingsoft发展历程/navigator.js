ready(function () {
    var oBox = document.getElementById('top_box');
    var oNav = getByClass(oBox, 'nav')[0];
    var oUl = oNav.getElementsByTagName('ul')[0];
    var aLi = oUl.children;
    var aUl2 = getByClass(oUl, 'ul2');
    var timer = null;
    var temp = null;
    var oWrap = document.getElementById('wrap');
    var oAlpha = getByClass(oWrap, 'alpha_bg')[0];

    function getBackgroundPositionXY(elem) {
        var backgroundPosition = '';
        if (elem.currentStyle) {
            if (elem.currentStyle.backgroundPositionX && elem.currentStyle.backgroundPositionY) {
                backgroundPosition = elem.currentStyle.backgroundPositionX + " " + elem.currentStyle.backgroundPositionY;
            } else {
                backgroundPosition = document.defaultView.getComputedStyle(elem, null).backgroundPosition
            }
        } else if (document.defaultView) {
            backgroundPosition = document.defaultView.getComputedStyle(elem, null).backgroundPosition;
        }
        return backgroundPosition;
    }

    for (var i = 0; i < aUl2.length; i++) {
        var aA = aUl2[i].getElementsByTagName('a');

        for (var j = 0; j < aA.length; j++) {
            (function (index) {

                aA[index].onmouseover = function () {
                    var oPosX = getBackgroundPositionXY(this.children[0]);
                    var arr = oPosX.split('px').join('').split(' ');
                    var x = arr[0];
                    var y = arr[1] - 52;

                    this.children[0].style.cssText = "background-position:" + x + "px " + y + "px";

                };

                aA[index].onmouseout = function () {
                    var oPosX = getBackgroundPositionXY(this.children[0]);
                    var arr = oPosX.split('px').join('').split(' ');
                    var x = arr[0];
                    var y = parseInt(arr[1]) + 52;

                    this.children[0].style.cssText = "background-position:" + x + "px " + y + "px";

                };
            })(j)
        }


    }


    for (var i = 0; i < aLi.length; i++) {

        (function (index) {

            if (aLi[index].children[0].className == 'active1') {
                var oldIndex = index;

            };
            aLi[index].onmouseover = function (ev) {
                clearTimeout(timer);
                var oEvent = ev || event;
                var from = oEvent.fromElement || oEvent.relatedTarget;

                if (isChild(aLi[index], from)) return;

                this.children[0].className = 'active1';

                var ofUl = this.getElementsByTagName('ul')[0];

                oAlpha.style.display = 'block';
                startMove(oAlpha, { opacity: 90 }, function () { }, 10);

                (index == 2) ? (oAlpha.style.height = 150 + 'px') : (oAlpha.style.height = 80 + 'px');

                temp && (temp.style.display = 'none');

                if (ofUl) {
                    ofUl.style.display = 'block';
                    startMove(ofUl, { opacity: 100 }, function () { }, 10);
                    temp = ofUl;
                }


            }
            aLi[index].onmouseout = function (ev) {
                var oEvent = ev || event;

                var to = oEvent.toElement || oEvent.relatedTarget;

                if (isChild(aLi[index], to)) return;

                if (index == oldIndex) {
                    this.children[0].className = 'active1';
                }
                else {
                    this.children[0].className = '';
                }

                var ofUl = this.getElementsByTagName('ul')[0];
                startMove(ofUl, { opacity: 0 }, function () { }, 10);



                timer = setTimeout(function () {
                    if (ofUl) {
                        startMove(ofUl, { opacity: 0 }, function () { }, 10);
                        ofUl.style.display = 'none';

                        startMove(oAlpha, { opacity: 0 }, function () { }, 10);
                        oAlpha.style.display = 'none';
                    }
                }, 300);



            }


        })(i)

    }

});