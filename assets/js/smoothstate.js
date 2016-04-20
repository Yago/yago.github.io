// 'use strict';

/* global jQuery */

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
            console.log('ready');
          }
        },
        onAfter: function($container, $newContent) {
          console.log('after');
          $container.removeClass('onchange');
        }
      };

  var smoothState = $main.smoothState(options).data('smoothState');
}(jQuery));
