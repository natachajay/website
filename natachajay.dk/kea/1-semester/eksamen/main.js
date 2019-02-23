document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    prepareLinks();
});

function prepareLinks() {
    "use strict";
    var links = document.getElementsByClassName('portfolio_content');
    for (var i=0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            var url = this.dataset.target;
            var iframe = document.getElementById('assignments_iframe');
            if (iframe.src == url) {
                iframe.style.display = "none";
                iframe.src = "";
            }
            else {
                iframe.src = url;
                iframe.style.display = "inline";
            }
        });
    }
}