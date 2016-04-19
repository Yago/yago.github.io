'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $consoleWrapper = $('#console-wrapper'),
        $consoleToggle = $('#console-toggle'),
        $console = $('#console'),
        jqconsole = $console.jqconsole(
          'Hi !\n',
          'root@yago.io:~'+window.location.pathname+'$ ',
          '',
          true);

    var startPrompt = function () {
      jqconsole.RegisterMatching('{', '}', 'brackets');
      jqconsole.Prompt(true, function (input) {
        switch (input) {
        case 'help':
          jqconsole.Write('Some help\ntext here\n', 'jqconsole-output');
          break;
        case 'pwd':
          jqconsole.Write('/home/yago' + window.location.pathname, 'jqconsole-output');
          break;
        default:
          jqconsole.Write(input + '\n', 'jqconsole-output');
          break;
        }
        startPrompt();
      });
    };

    startPrompt();
    jqconsole.Focus();

    $consoleToggle.click(function () {
      $consoleToggle.toggleClass('open');
      $consoleWrapper.toggleClass('open');
      $contentWrapper.toggleClass('left-open');
      startPrompt();
      jqconsole.Focus();
    });

    $(document).keyup(function(e) {
      if (e.altKey && e.keyCode === 67) {
        $consoleToggle.toggleClass('open');
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
