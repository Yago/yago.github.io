'use strict';

/* global jQuery, sitemap, scope, router */

var jconsole = function ($) {
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $consoleWrapper = $('#console-wrapper'),
        $consoleToggle = $('#console-toggle'),
        $console = $('#console'),
        jqconsole = $console.jqconsole(
          'Hi !\n',
          'guest@yago.io:~'+window.location.pathname+'$ ',
          '',
          true);

    var cmdHelp = new RegExp('^(help)'),
        cmdPwd = new RegExp('^(pwd)'),
        cmdLs = new RegExp('^(ls)'),
        cmdCd = new RegExp('^(cd)'),
        cmdContact = new RegExp('^(contact)'),
        cmdPs = new RegExp('^(ps)'),
        cmdGif = new RegExp('^(gif)'),
        cmdRm = new RegExp('^(rm)'),
        cmdNano = new RegExp('^(nano)'),
        cmdVim = new RegExp('^(vim)'),
        cmdGit = new RegExp('^(git)'),
        cmdMkdir = new RegExp('^(mkdir)'),
        cmdTouch = new RegExp('^(touch)');

    var startPrompt = function () {
      jqconsole.RegisterMatching('{', '}', 'brackets');
      jqconsole.Prompt(true, function (input) {

        if(cmdHelp.test(input)) {
          jqconsole.Write('You need some help, no problem ;)\nYou can use some of the following bash commands:\n\n  ls       list available directories\n  cd       go to directory\n  pwd      return your current location\n  contact  send me an email\n\nand other secret commands to discover !\n\n', 'jqconsole-output');
        }

        else if (cmdPwd.test(input)) {
          jqconsole.Write('/home/yago' + window.location.pathname, 'jqconsole-output');
        }

        else if (cmdLs.test(input)) {
          switch (scope) {
          case 'home':
            jqconsole.Write(sitemap.base.join('\n'), 'jqconsole-output');
            break;
          case 'parent-blog':
            jqconsole.Write(sitemap.posts.join('\n'), 'jqconsole-output');
            break;
          case 'parent-projects':
            jqconsole.Write(sitemap.projects.join('\n'), 'jqconsole-output');
            break;
          case 'parent-oldies':
            jqconsole.Write(sitemap.oldies.join('\n'), 'jqconsole-output');
            break;
          default:
            jqconsole.Write('index.html\n', 'jqconsole-output');
            break;
          }
        }

        else if (cmdCd.test(input)) {

          // Parent direction
          if (input.replace('cd ', '') === '../' || input.replace('cd ', '') === '..') {
            switch (scope) {
            case 'home':
              jqconsole.Write(sitemap.base.join('\n'), 'jqconsole-output');
              break;
            case 'parent-blog':
              router.load('/');
              break;
            case 'parent-projects':
              router.load('/');
              break;
            case 'parent-oldies':
              router.load('/');
              break;
            case 'oldies':
              router.load('/projects/old');
              break;
            case 'projects':
              router.load('/projects');
              break;
            case 'posts':
              router.load('/blog/1');
              break;
            default:
              router.load('/');
              break;
            }

          // CHild direction
          } else {
            switch (scope) {
            case 'home':
              if ($.inArray(input.replace('cd ', ''), sitemap.base) > -1) {
                if (input.replace('cd ', '').indexOf('blog') > -1) {
                  router.load('/blog/1');
                } else {
                  router.load('/' + input.replace('cd ', ''));
                }
              } else {
                jqconsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            case 'parent-blog':
              if ($.inArray(input.replace('cd ', ''), sitemap.posts) > -1) {
                router.load('/blog/' + input.replace('cd ', ''));
              } else {
                jqconsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            case 'parent-projects':
              if ($.inArray(input.replace('cd ', ''), sitemap.projects) > -1) {
                router.load('/projects/' + input.replace('cd ', ''));
              } else {
                jqconsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            case 'parent-oldies':
              if ($.inArray(input.replace('cd ', ''), sitemap.oldies) > -1) {
                router.load('/projects/old/' + input.replace('cd ', ''));
              } else {
                jqconsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            default:
              jqconsole.Write('You cannot go deeper...\n', 'jqconsole-output');
              break;
            }
          }
        }

        else if (cmdContact.test(input)) {
          window.location.href = 'mailto:hello@yago.io';
        }

        else if (cmdPs.test(input)) {
          jqconsole.Write('Someone here is a bit too curius !', 'jqconsole-output');
        }

        else if (cmdGif.test(input)) {
          jqconsole.Append($('<img></img>').attr('src', 'https://media.giphy.com/media/XE7kcG4fMEDqU/giphy.gif'));
        }

        else if (cmdRm.test(input)) {
          jqconsole.Write('You wanna destroy my work ? :\'(', 'jqconsole-output');
        }

        else if (cmdVim.test(input) || cmdNano.test(input)) {
          jqconsole.Write('Edition not permitted. You only have read access.', 'jqconsole-output');
        }

        else if (cmdGit.test(input)) {
          jqconsole.Write('Yeah! I love Git too. Feel free to check origin ;)', 'jqconsole-output');
          jqconsole.Append($('<a>yago/yago.github.io</a>').attr('href', 'https://github.com/Yago/yago.github.io').attr('target', '_blank'));
        }

        else if (cmdMkdir.test(input)) {
          jqconsole.Write('Really ?\n', 'jqconsole-output');
        }

        else if (cmdTouch.test(input)) {
          jqconsole.Write('File successfully created !\n\n\n   No, I\'m just kidding XD', 'jqconsole-output');
        }

        else {
          jqconsole.Write('Command not found: ' + input + '\n', 'jqconsole-output');
        }

        startPrompt();
      });
    };

    $consoleToggle.click(function ($event) {
      $event.stopPropagation();
      $consoleToggle.toggleClass('open');
      $consoleWrapper.toggleClass('open');
      $contentWrapper.toggleClass('left-open');
      startPrompt();
      jqconsole.Focus();
    });

    $contentWrapper.click(function () {
      $consoleToggle.removeClass('open');
      $consoleWrapper.removeClass('open');
      $contentWrapper.removeClass('left-open');
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

      if (e.keyCode == 27) {
        $consoleToggle.removeClass('open');
        $consoleWrapper.removeClass('open');
        $contentWrapper.removeClass('left-open');
      }
    });
  });
};

jconsole(jQuery);
