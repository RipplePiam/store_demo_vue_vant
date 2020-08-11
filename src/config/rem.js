(function (doc, win) {
    const docEl = doc.documentElement,//var->const
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            const clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 15 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);