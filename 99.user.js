

var PG_emb_main = '(' +  function()
{
	// hide the ad or something hateful.
	$j("#p1").css("display","none");
	$j("#p2").css("display","none");
	$j("#p3").css("display","none");
	$j("#p4").css("display","none");
	$j("#spMsg").css("display","none");
	$j(".cFooter").css("background-color","transparent");

	// for Pictures url
	if (typeof PicListUrl == "undefined" && typeof PicListUrls == "undefined")
		var target_files = sFiles.split('|');
	else if (typeof PicListUrl == "undefined" && typeof sFiles == "undefined")
		var target_files = PicListUrls.split('|');
	else
		var target_files = PicListUrl.split('|');


	// for servers url, and some default setting for each site

	if (document.domain.search(/www\.99comic\.com/) == 0) 	// for www.99comic.com
	{
		var site_url = getSLUrl(cuD);
	}
	else if (document.domain.search(/99comic\.com/) == 0 || document.domain.search(/99manga\.com/) == 0)  	// for 99comic.com  & 99manga.com
	{
		// The lay out of "show all" for 99comic.com
		$j(".c").css("height","auto");
		$j(".c").append("<br /><div class = \"PG_DIV\" style='text-align:center;'></div>");

		var site_url = ServerList[server-1];
	}
	else							// for 99mh & dm.99manga
	{
		var site_url = getSLUrl(cuD)+sPath;
	}


	window.comic_list = [];
	window.add_src = "";
	for (i = 0; i < target_files.length; i++)
		comic_list.push(site_url + target_files[i]);



	window.PG_page_size = comic_list.length;
	window.PG_called_page = [];
	window.PG_loading_count = 0;



	// The lay out of "show all".

	$j(".cH2").append("<br /><div class = \"PG_DIV\" style='text-align:center;'></div>");	// for text-align
	for (i = 0; i < PG_page_size; i++)
	{
		$j(".PG_DIV").append("<span id=\"PG_bar_" + i + "\" style='color:red;'>#</span>")
	}
	$j(".PG_DIV").append("<br /><span id=\"PG_bar\" style='font-size:20px;'><a id=\"PG_show_all\">show all</a></span>");



	window.PG_preload_img = function(img_no)
	{
		if (img_no >= PG_page_size) return;
		//if (PG_loading_count > 3) return;


		if (PG_called_page[img_no]) return;

		PG_called_page[img_no] = true;
		$j("#PG_bar_" + img_no).css("color", "yellow");

		var tmp = document.createElement('img');
		tmp.src = comic_list[img_no];
		tmp.onload = function()
		{
			$j("#PG_bar_" + img_no).css("color", "green");

			//$j("#PG_bar").html(img_no + " / " + (PG_page_size-1));
			PG_preload_img(img_no+1);
			PG_preload_img(img_no+2);
			PG_preload_img(img_no+3);
		}
	}
	PG_preload_img(0);
	PG_preload_img(1);
	PG_preload_img(2);

	$j("#PG_show_all").click(function()
	{
		var add_src = "";
		for (i = 0; i < comic_list.length; i++)
		{
			add_src += "<img src=" + comic_list[i] + " /><br />";
		}
		$j("body").html(add_src);
	});


}
+ ')();';

/*
	Insert a script into dom, execute it, then remove it.
	@script: can be an url string, a code string, or a function.
	@callback: is a function. Will be called after the script is inserted or executed.
*/
function emb_script(script, callback) {
	var script_body = document.createElement('script');

	function insert_script() {
		(document.head||document.documentElement).appendChild(script_body);
	}

	function remove_script() {
		script_body.parentNode.removeChild(script_body);
	}

	if (_.isString(script) && script.match(/\.js$/)) {
		script_body.src = script;
		script_body.onload = function() {
			if (_.isFunction(callback)) {
				callback.call();
			}
			remove_script();
		};
		insert_script();
	} else {
		if (_.isFunction(script)) {
			script_body.textContent = '(' + script + ')();';
		} else {
			script_body.textContent = script;
		}
		insert_script();
		callback.call();
		remove_script();
	}

}

emb_script('http://code.jquery.com/jquery-1.8.1.min.js', function() {
	emb_script("$j = window.jQuery.noConflict();" + PG_emb_main, function() {
		console.log('done');
	});
});


