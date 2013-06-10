// Use 'page.injectJs()' to load the script itself in the Page context


var page = require('webpage').create();


page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onAlert = function(msg) {
    console.log(msg);
};
page.open("http://99manga.com/", function(status) {

    phantom.exit();
});
