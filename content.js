var imgs = [];

window.setInterval(function(){
  $('img').each(function(){
    var img = $(this);
    if (!imgs.contains(this.src)){
      var sibling = $(this).closest('div').siblings('div');

      var source = this.src;
      sibling.css('z-index', 500);

      var headers = $('header').find('*');
      var nav = $('nav').find('*');
      var comments = sibling.parents('article').children('div').eq(1).find('*');
      var images = $('img');
      //Pressure changing
      Pressure.set(sibling, {
        change: function (force, event){
          $('header').each(function(){
            diff = (force/20);
            var color = 255-diff;
            var result = 'rgb('+color+','+color+','+color+')';
            console.log(result);
            $(this).css('background-color', result);
          });
          images.not(img).each(function(){
            blur($(this), force);
          });
          nav.each(function(){
            blur($(this), force);
          })
          headers.each(function(){
            blur($(this), force);
          });
          comments.each(function(){
            blur($(this), force);
          });
        },
        end: function(){
          $('header').each(function(){
            $(this).css('background-color', '#FFFFFF');
          });
          images.each(function(){
            restore($(this));
          });
          nav.each(function(){
            restore($(this));
          });
          headers.each(function(){
            restore($(this));
          });
          comments.each(function(){
            restore($(this));
          });
        }
      }, {polyFillSpeed: 9999999999});

      sibling.attr("href", this.src);
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
          document.getElementById("a-context-menu-3").setAttribute("href", source.split('?')[0]);
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

// Helper functions to blur and unblur the image
function blur(element, pressure){
  var blurVal = 'blur(' + 15*pressure + 'px)';
  element.css({
    'filter'        : blurVal,
   '-webkit-filter' : blurVal,
   '-moz-filter'    : blurVal,
   '-o-filter'      : blurVal,
   '-ms-filter'     : blurVal,
   'opacity'        : 1-(pressure)
  });
}

function restore(element){
  element.css({
    'filter'        : 'blur(0px)',
   '-webkit-filter' : 'blur(0px)',
   '-moz-filter'    : 'blur(0px)',
   '-o-filter'      : 'blur(0px)',
   '-ms-filter'     : 'blur(0px)',
   'opacity'        : 1
  });
}

$(document).ready(function () {
    console.log('document ready');
    $("<div class='menu'><ul><a href='javascript:void(0);'><li id='context-menu-1'>Open in new tab</li></a><a href='javascript:void(0);'><li id='context-menu-2'  data-clipboard-text='d'>Copy link to clipboard</li></a><a id='a-context-menu-3' download href='';'><li id='context-menu-3'>Save as</li></a></ul></div>").appendTo("body");

    var css = chrome.extension.getURL('contextmenu.css');
    $('head').append('<link rel="stylesheet" href="' + css + '" type="text/css" />');
    var clipboard = chrome.extension.getURL('lib/clipboard.min.js');
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
