'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {

    var jqconsole = $('#console').jqconsole('Hi\n', '> ', 'coucou', true);
    console.log(jqconsole);
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

  });
}(jQuery));
