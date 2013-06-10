// Use 'page.injectJs()' to load the script itself in the Page context

if ( typeof(phantom) !== "undefined" ) {
    var page = require('webpage').create();

 
    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };
    
    page.onAlert = function(msg) {
        console.log(msg);
    };
    page.open("http://99manga.com/manga/168/110433.htm?s=9", function(status) {
        
        phantom.exit();
    });
} else {
    alert("* Script running in the Page context.");
}