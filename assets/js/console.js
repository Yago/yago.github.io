'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {

    var jqconsole = $('#console').jqconsole('Hi\n', '> ', 'coucou', true);

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

    $('#console-button').click(function () {
      $('#console-wrapper').toggleClass('open');
      $('#content-wrapper').toggleClass('left-open');
      startPrompt();
    });

  });
}(jQuery));
