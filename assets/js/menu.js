'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $menuToggle = $('#menu-toggle'),
        $consoleWrapper = $('#console-wrapper');

    $menuToggle.click(function () {
      $menuWrapper.toggleClass('open');
      $contentWrapper.toggleClass('right-open');
    });

    $(document).keyup(function(e) {
      if (e.altKey && e.keyCode === 77) {
        $menuWrapper.toggleClass('open');
        $contentWrapper.toggleClass('right-open');
        $contentWrapper.removeClass('left-open');
        $consoleWrapper.removeClass('open');
      }
    });
  });
}(jQuery));
