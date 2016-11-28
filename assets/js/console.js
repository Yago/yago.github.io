import $ from 'jquery';
import jqconsole from 'jq-console'; // eslint-disable-line no-unused-vars

/* global scope, sitemap, router */

export default () => {
  const $contentWrapper = $('#content-wrapper');
  const $menuWrapper = $('#menu-wrapper');
  const $consoleWrapper = $('#console-wrapper');
  const $consoleToggle = $('#console-toggle');
  const $console = $('#console');
  const yagoConsole = $console.jqconsole(
    'Hi !\n',
    `guest@yago.io:~${window.location.pathname}$ `,
    '',
    true,
  );

  const cmdHelp = new RegExp('^(help)');
  const cmdPwd = new RegExp('^(pwd)');
  const cmdLs = new RegExp('^(ls)');
  const cmdCd = new RegExp('^(cd)');
  const cmdContact = new RegExp('^(contact)');
  const cmdPs = new RegExp('^(ps)');
  const cmdGif = new RegExp('^(gif)');
  const cmdRm = new RegExp('^(rm)');
  const cmdNano = new RegExp('^(nano)');
  const cmdVim = new RegExp('^(vim)');
  const cmdGit = new RegExp('^(git)');
  const cmdMkdir = new RegExp('^(mkdir)');
  const cmdTouch = new RegExp('^(touch)');

  const startPrompt = () => {
    yagoConsole.RegisterMatching('{', '}', 'brackets');
    yagoConsole.Prompt(true, (input) => {
      if (cmdHelp.test(input)) {
        yagoConsole.Write('You need some help, no problem ;)\nYou can use some of the following bash commands:\n\n  ls       list available directories\n  cd       go to directory\n  pwd      return your current location\n  contact  send me an email\n\nand other secret commands to discover !\n\n', 'jqconsole-output');
      } else if (cmdPwd.test(input)) {
        yagoConsole.Write(`/home/yago${window.location.pathname}`, 'jqconsole-output');
      } else if (cmdLs.test(input)) {
        switch (scope) {
          case 'home':
            yagoConsole.Write(sitemap.base.join('\n'), 'jqconsole-output');
            break;
          case 'parent-blog':
            yagoConsole.Write(sitemap.posts.join('\n'), 'jqconsole-output');
            break;
          case 'parent-projects':
            yagoConsole.Write(sitemap.projects.join('\n'), 'jqconsole-output');
            break;
          case 'parent-oldies':
            yagoConsole.Write(sitemap.oldies.join('\n'), 'jqconsole-output');
            break;
          default:
            yagoConsole.Write('index.html\n', 'jqconsole-output');
            break;
        }
      } else if (cmdCd.test(input)) {
        // Parent direction
        if (input.replace('cd ', '') === '../' || input.replace('cd ', '') === '..') {
          switch (scope) {
            case 'home':
              yagoConsole.Write(sitemap.base.join('\n'), 'jqconsole-output');
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
                  router.load(`/${input.replace('cd ', '')}`);
                }
              } else {
                yagoConsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            case 'parent-blog':
              if ($.inArray(input.replace('cd ', ''), sitemap.posts) > -1) {
                router.load(`/blog/${input.replace('cd ', '')}`);
              } else {
                yagoConsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            case 'parent-projects':
              if ($.inArray(input.replace('cd ', ''), sitemap.projects) > -1) {
                router.load(`/projects/${input.replace('cd ', '')}`);
              } else {
                yagoConsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            case 'parent-oldies':
              if ($.inArray(input.replace('cd ', ''), sitemap.oldies) > -1) {
                router.load(`/projects/old/${input.replace('cd ', '')}`);
              } else {
                yagoConsole.Write('Wrong path...\n', 'jqconsole-output');
              }
              break;
            default:
              yagoConsole.Write('You cannot go deeper...\n', 'jqconsole-output');
              break;
          }
        }
      } else if (cmdContact.test(input)) {
        window.location.href = 'mailto:hello@yago.io';
      } else if (cmdPs.test(input)) {
        yagoConsole.Write('Someone here is a bit too curius !', 'jqconsole-output');
      } else if (cmdGif.test(input)) {
        yagoConsole.Append($('<img></img>').attr('src', 'https://media.giphy.com/media/XE7kcG4fMEDqU/giphy.gif'));
      } else if (cmdRm.test(input)) {
        yagoConsole.Write('You wanna destroy my work ? :\'(', 'jqconsole-output');
      } else if (cmdVim.test(input) || cmdNano.test(input)) {
        yagoConsole.Write('Edition not permitted. You only have read access.', 'jqconsole-output');
      } else if (cmdGit.test(input)) {
        yagoConsole.Write('Yeah! I love Git too. Feel free to check origin ;)', 'jqconsole-output');
        yagoConsole.Append($('<a>yago/yago.github.io</a>').attr('href', 'https://github.com/Yago/yago.github.io').attr('target', '_blank'));
      } else if (cmdMkdir.test(input)) {
        yagoConsole.Write('Really ?\n', 'jqconsole-output');
      } else if (cmdTouch.test(input)) {
        yagoConsole.Write('File successfully created !\n\n\n   No, I\'m just kidding XD', 'jqconsole-output');
      } else {
        yagoConsole.Write(`Command not found: ${input}\n`, 'jqconsole-output');
      }

      startPrompt();
    });
  };

  $consoleToggle.click(function ($event) { // eslint-disable-line prefer-arrow-callback
    $event.stopPropagation();
    $consoleToggle.toggleClass('open');
    $consoleWrapper.toggleClass('open');
    $contentWrapper.toggleClass('left-open');
    startPrompt();
    yagoConsole.Focus();
  });

  $contentWrapper.click(function () { // eslint-disable-line prefer-arrow-callback
    $consoleToggle.removeClass('open');
    $consoleWrapper.removeClass('open');
    $contentWrapper.removeClass('left-open');
  });

  $(document).keyup(function (e) { // eslint-disable-line prefer-arrow-callback
    if (e.altKey && e.keyCode === 67) {
      $consoleToggle.toggleClass('open');
      $consoleWrapper.toggleClass('open');
      $contentWrapper.toggleClass('left-open');
      $contentWrapper.removeClass('right-open');
      $menuWrapper.removeClass('open');
      startPrompt();
      yagoConsole.Focus();
    }

    if (e.keyCode === 27) {
      $consoleToggle.removeClass('open');
      $consoleWrapper.removeClass('open');
      $contentWrapper.removeClass('left-open');
    }
  });
};
