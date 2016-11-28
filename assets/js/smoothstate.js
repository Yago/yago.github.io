import jQuery from 'jquery';
import Prism from 'prismjs';

import chartTheme from './charts-themes';
import charts from './charts';
import contributions from './contributions';
import gallery from './gallery';
import photo from './photo';
import jqConsole from './console';
import menu from './menu';

/* global smoothState, init, router */

export default () => {
  const $main = jQuery('#main');
  const options = {
    prefetch: true,
    cacheLength: 2,
    hrefRegex: '^\/', // eslint-disable-line no-useless-escape
    blacklist: '.gallery-item',
    onStart: {
      duration: 300,
      render: ($container) => {
        $container.addClass('onchange');
        router.restartCSSAnimations();
      },
    },
    onReady: {
      duration: 0,
      render: ($container, $newContent) => {
        $container.html($newContent);
      },
    },
    onAfter: ($container) => {
      $container.removeClass('onchange');

      init();
      chartTheme();
      charts();
      contributions();
      jqConsole();
      gallery();
      photo();
      menu();
      Prism.highlightAll();
    },
  };

  router = $main.smoothState(options).data('smoothState'); // eslint-disable-line no-global-assign
};
