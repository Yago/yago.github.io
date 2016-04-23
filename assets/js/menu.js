'use strict';

/* global jQuery */

var menu = function ($) {
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $menuToggle = $('#menu-toggle'),
        $consoleWrapper = $('#console-wrapper');

    $menuToggle.click(function ($event) {
      $event.stopPropagation();
      $menuToggle.toggleClass('open');
      $menuWrapper.toggleClass('open');
      $contentWrapper.toggleClass('right-open');
    });

    $contentWrapper.click(function () {
      $menuToggle.removeClass('open');
      $menuWrapper.removeClass('open');
      $contentWrapper.removeClass('right-open');
    });

    $menuWrapper.find('a').click(function () {
      $menuToggle.toggleClass('open');
      $menuWrapper.toggleClass('open');
      $contentWrapper.toggleClass('right-open');
    });

    $(document).keyup(function(e) {
      if (e.altKey && e.keyCode === 77) {
        $menuToggle.toggleClass('open');
        $menuWrapper.toggleClass('open');
        $contentWrapper.toggleClass('right-open');
        $contentWrapper.removeClass('left-open');
        $consoleWrapper.removeClass('open');
      }

      if (e.keyCode == 27) {
        $menuToggle.removeClass('open');
        $menuWrapper.removeClass('open');
        $contentWrapper.removeClass('right-open');
      }
    });
  });
};

menu(jQuery);
