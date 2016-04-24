'use strict';

/* global jQuery, init, router, chartTheme, charts, jconsole, contributions, articleGallery, menu, Prism */

(function($){
  var $main = $('#main'),
      options = {
        prefetch: true,
        cacheLength: 2,
        hrefRegex: '^\/',
        blacklist: '.gallery-item',
        onStart: {
          duration: 300,
          render: function ($container) {
            $container.addClass('onchange');
            router.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            $container.html($newContent);
          }
        },
        onAfter: function($container) {
          $container.removeClass('onchange');

          init();
          chartTheme();
          charts(jQuery);
          jconsole(jQuery);
          contributions(jQuery);
          articleGallery(jQuery);
          menu(jQuery);
          Prism.highlightAll();
        }
      };

  router = $main.smoothState(options).data('smoothState');
}(jQuery));
