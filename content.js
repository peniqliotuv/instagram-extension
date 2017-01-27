var imgs = [];

window.setInterval(function(){
  $('img').each(function(){
    if (!imgs.contains(this.src)){
      var sibling = $(this).closest('div').siblings('div');
      var source = this.src;
      //sibling.attr("href", this.src);
      sibling.unbind('click');
      sibling.mousedown(function(event) {
        if (event.ctrlKey || event.metaKey){
          window.open(sibling.attr("href"));
        }
        if (event.which == 3) {

          event.preventDefault();

          var menu = $(".menu");
          //hide menu if already shown
          menu.hide();
          //get x and y values of the click event
          var pageX = event.pageX;
          var pageY = event.pageY;
          //position menu div near mouse clicked area
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
          menu.data("source", source);
          document.getElementById("context-menu-2").setAttribute("data-clipboard-text", source);
    //      console.log("added data-value: " + document.getElementById("context-menu-2").getAttribute("data-clipboard-text"));
          menu.show();

        }
      });
      imgs.push(this.src);
    }
  });
}, 1000);

//Helper function
Array.prototype.contains = function (val) {
  for (i in this) {
       if (this[i] == val) return true;
   }
   return false;
};

$(document).ready(function () {
    console.log('document ready');
    $("<div class='menu'><ul><a href='javascript:void();'><li id='context-menu-1'>Open in new tab</li></a><a href='javascript:void();'><li id='context-menu-2'  data-clipboard-text='d'>Copy link to clipboard</li></a><a href='javascript:void();'><li id='context-menu-3'>Save as</li></a></ul></div>").appendTo("body");

    var css = chrome.extension.getURL('contextmenu.css');
    $('head').append('<link rel="stylesheet" href="' + css + '" type="text/css" />');
    var clipboard = chrome.extension.getURL('clipboard.min.js');
    $('head').append('<script src="' + clipboard + '"></script>');
		$("html").on("contextmenu", function(e){
		  e.preventDefault();
		});

    var clipboard = new Clipboard('#context-menu-2');
    clipboard.on('success', function(e) {
      console.log("text: " + e.text);
    });


    $("html").on("click", function(){
			$(".menu").hide();
		});

    $('#context-menu-1').click(function(){
      window.open($(".menu").data('source'));
    });

});
