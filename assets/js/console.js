'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $consoleWrapper = $('#console-wrapper'),
        $consoleToggle = $('#console-toggle'),
        $console = $('#console'),
        jqconsole = $console.jqconsole('Hi\n', '> ', 'coucou', true);

    var startPrompt = function () {
      jqconsole.Prompt(true, function (input) {
        if (input === 'help') {
          jqconsole.Write('Some help\n text here\n', 'jqconsole-output');
        } else {
          jqconsole.Write(input + '\n', 'jqconsole-output');
        }
        startPrompt();
      });
    };

    startPrompt();

    $consoleToggle.click(function () {
      $consoleWrapper.toggleClass('open');
      $contentWrapper.toggleClass('left-open');
      startPrompt();
      jqconsole.Focus();
    });

    $(document).keyup(function(e) {
      if (e.altKey && e.keyCode === 67) {
        $consoleWrapper.toggleClass('open');
        $contentWrapper.toggleClass('left-open');
        $contentWrapper.removeClass('right-open');
        $menuWrapper.removeClass('open');
        startPrompt();
        jqconsole.Focus();
      }
    });
  });
}(jQuery));
