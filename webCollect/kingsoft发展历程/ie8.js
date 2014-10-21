ready(function () {
    function createHtml() {
        var oBox = document.getElementById('top_box');
        var oNav = getByClass(oBox, 'nav')[0];
        var rootUl = oNav.getElementsByTagName('ul')[0];
        var oUl = rootUl.getElementsByTagName('ul');
        for (var n = 0; n < oUl.length; n++) {
            for (var i = 0; i < oUl[n].children.length; i++) {
                var oli = oUl[n].children[0];
                var oi = document.createElement('i');
                oi.className = 'ibk';
                oUl[n].children[i].appendChild(oi);
            }
        }
    }
    if (window.navigator.userAgent.toLowerCase().indexOf('msie 8.0') != -1 || window.navigator.userAgent.toLowerCase().indexOf('msie 7.0') != -1) {
        createHtml();
    }
})