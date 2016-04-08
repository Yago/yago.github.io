'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
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

    $consoleToggle.click(function () {
      $consoleWrapper.toggleClass('open');
      $contentWrapper.toggleClass('left-open');
      startPrompt();
    });

  });
}(jQuery));
