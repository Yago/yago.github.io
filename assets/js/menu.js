'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $menuToggle = $('#menu-toggle');

    $menuToggle.click(function () {
      $menuWrapper.toggleClass('open');
      $contentWrapper.toggleClass('right-open');
    });

  });
}(jQuery));
