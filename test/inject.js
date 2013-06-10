// Use 'page.injectJs()' to load the script itself in the Page context

if ( typeof(phantom) !== "undefined" ) {
    var page = require('webpage').create();

    // Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };
    
    page.onAlert = function(msg) {
        console.log(msg);
    };

    page.onLoadFinished = function(status) {
    console.log('Status: ' + status);
    // Do other things here...
};
    
    page.open("http://99manga.com/manga/168/110433.htm?s=9", function(status) {

        if ( status === "success" ) {
            console.log(page.injectJs("inphantom.js") ? "... done inphantomjs!" : "... fail! Check the $PWD?!");
            console.log(page.injectJs("../99.user.js") ? "... done injecting 99!" : "... 99 fail! Check the $PWD?!");
        }
        page.render('debug.png');
        phantom.exit();
    });
} else {
    alert("* Script running in the Page context.");
}