document.addEventListener("DOMContentLoaded", start);

function start() {
    TweenMax.staggerFrom(".chart_slice", .5, {
        scaleY: 0,
        svgOrigin: "133 247"
    }, 0.5);
    
    TweenMax.staggerFrom(".chart_dot", .5, {
        scaleY: 0,
        svgOrigin: "133 247"
    }, 0.5);
}