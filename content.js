var imgs = [];

window.setInterval(function(){
  $('img').each(function(){
    if (!imgs.contains(this.src)){
      var sibling = $(this).closest('div').siblings('div');
      sibling.attr("href", this.src);
      sibling.unbind('click');
      sibling.mousedown(function(event) {
        if (event.ctrlKey || event.metaKey){
          window.open(sibling.attr("href"));
        }
        if (event.which == 3) {
          console.log("asdf");
          event.preventDefault();

          var menu = $(".menu");
          //hide menu if already shown
          menu.hide();
          //get x and y values of the click event
          var pageX = event.pageX;
          var pageY = event.pageY;
          //position menu div near mouse cliked area
          menu.css({top: pageY , left: pageX});
          var mwidth = menu.width();
          var mheight = menu.height();
          var screenWidth = $(window).width();
          var screenHeight = $(window).height();
          //if window is scrolled
          var scrTop = $(window).scrollTop();
          //if the menu is close to right edge of the window
          if(pageX+mwidth > screenWidth){
           menu.css({left:pageX-mwidth});
          }
          //if the menu is close to bottom edge of the window
          if(pageY+mheight > screenHeight+scrTop){
           menu.css({top:pageY-mheight});
          }
          //finally show the menu
          menu.show();
        }
      });
      imgs.push(this.src);
    }
  });
}, 1000);


Array.prototype.contains = function (val) {
  for (i in this) {
       if (this[i] == val) return true;
   }
   return false;
};


$(document).ready(function () {
    $("<div class='menu'><ul><a href='#'><li>Open in new tab</li></a><a href='#'><li>Copy link to clipboard</li></a><a href='#'><li>Save as</li></a></ul></div>").appendTo("body");
    var css = chrome.extension.getURL('contextmenu.css');
    $('head').append('<link rel="stylesheet" href="' + css + '" type="text/css" />');
		$("html").on("contextmenu", function(e){
		  e.preventDefault();
		});
    $("html").on("click", function(){
			$(".menu").hide();
		});
});
