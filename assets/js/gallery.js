'use strict';

/* global jQuery, PhotoSwipe, PhotoSwipeUI_Default */

var articleGallery = function ($) {
  var counterUpdate = function (gallery) {
    var current = parseInt(gallery.getCurrentIndex(), 10) + 1,
        total = gallery.options.getNumItemsFn();

        $('.pswp__counter').html('<span class="counter-big"><sup>'+current+'</sup></span>/<span class="counter-small"><sub>'+total+'</sub></span>');
  };

  $(document).ready(function () {
    var index = 0,
        container = [];

    // Create gallery container
    $('#article').find('a').each(function(){
      var $that = $(this),
          target = $that.attr('href'),
          $thumb = $that.find('img'),
          coef = 2800 / $thumb.width(),
          width = 2800,
          height = $thumb.height() * coef;

      if (target.indexOf('/img/') > -1) {
        $that.addClass('gallery-item');
        $that.attr('data-index', index);

        var item = {
          src: target,
          w: width,
          h: height,
          title: $thumb.attr('alt')
        };
        console.log(item);
        container.push(item);
        index++;
      }
    });

    // Enable photoswipe instance on thumb's click
    $('.gallery-item').click(function(event){
      event.preventDefault();

      var $pswp = $('.pswp')[0],
          options = {
            index: $(this).data('index'),
            bgOpacity: 1,
            showHideOpacity: true
          };

      var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
      gallery.init();

      counterUpdate(gallery);
      gallery.listen('afterChange', function() {
        counterUpdate(gallery);
      });
    });

    $('.gallery-item:first-child').trigger('click');
  });
};

articleGallery(jQuery);
