'use strict';

/* global jQuery, chartTheme, charts, jconsole, contributions, emojis, menu */

(function($){
  var $main = $('#main'),
      options = {
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 300,
          render: function ($container) {
            $container.addClass('onchange');
            smoothState.restartCSSAnimations();
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

          chartTheme();
          charts(jQuery);
          jconsole(jQuery);
          contributions(jQuery);
          emojis(jQuery);
          menu(jQuery);
        }
      };

  var smoothState = $main.smoothState(options).data('smoothState');
}(jQuery));
