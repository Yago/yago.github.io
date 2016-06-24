'use strict';

/* global Highcharts */

var chartTheme = function chartTheme() {
  Highcharts.theme = {
    colors: ['#d5ab32', '#d9b143', '#dcb853', '#dfbf63', '#e3c574', '#e6cc84', '#e9d394', '#eddaa4', '#f0e0b5', '#f3e7c5', '#f7eed5', '#faf5e6', '#fdfbf6'],
    chart: {
      backgroundColor: null,
      style: {
        fontFamily: '"Ratio", Helvetica Neue, Helvetica, Arial, sans-serif;'
      }
    },
    title: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      }
    },
    tooltip: {
      borderWidth: 0,
      backgroundColor: 'rgba(0,0,0,1)',
      shadow: false,
      style: {
        color: 'rgba(255,255,255,1)'
      }
    },
    legend: {
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '13px'
      }
    },
    xAxis: {
      gridLineWidth: 1,
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yAxis: {
      minorTickInterval: 'auto',
      title: {
        style: {
          textTransform: 'uppercase'
        }
      },
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    plotOptions: {
      candlestick: {
        lineColor: '#404048'
      }
    },
    background2: '#F0F0EA'
  };

  // Apply the theme
  Highcharts.setOptions(Highcharts.theme);
};

chartTheme();
'use strict';

/* global jQuery, Highcharts */

var charts = function charts($) {

  $(document).ready(function () {
    if ($('#pie-chart').length > 0) {
      var $pieChart = $('#pie-chart'),
          data = 'http://api.yago.io/stats/',
          shade = function shade(color, percent) {
        var f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
      },
          sortLevel = function sortLevel(a, b) {
        if (a.level > b.level) {
          return -1;
        } else if (a.level < b.level) {
          return 1;
        } else {
          return 0;
        }
      },
          pad = function pad(str) {
        return ("0" + str).slice(-2);
      },
          hhmmss = function hhmmss(secs) {
        var minutes = Math.floor(secs / 60);
        secs = secs % 60;
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        return pad(hours) + "h" + pad(minutes);
      };

      // Get Codeivate data
      $.ajax({
        url: data,
        success: function success(res) {
          var languages = [],
              otherPoints = 0.0,
              languagesFormatted = [];

          // Process Data
          for (var item in res.data.languages) {
            if (res.data.languages.hasOwnProperty(item)) {
              var language = {
                'name': res.data.languages[item].name,
                'time': res.data.languages[item].total_seconds,
                'y': res.data.languages[item].percent
              };

              languages.push(language);
            }
          }

          for (var lang in languages) {
            if (languages[lang].y < 1 || languages[lang].name === 'Other') {
              otherPoints += languages[lang].y;
            } else {
              languagesFormatted.push(languages[lang]);
            }
          }
          languagesFormatted.push({ 'name': 'Other', 'Time spending': 1, 'y': otherPoints });
          languagesFormatted.sort(sortLevel);

          // Populate data pre
          $('#skills-name').html(res.data.username);
          $('#skills-time').html(res.data.human_readable_total);
          // if (res.programming_now) {
          //   $('#skills-coding').html(res.programming_now);
          //   $('#skills-language').html(res.current_language.replace('.sublime-syntax', ''));
          // } else {
          //   $('#skills-coding').html('false');
          //   $('#skills-language-wrapper').addClass('hide');
          // }

          // Create Pie chart
          $pieChart.highcharts({
            chart: {
              type: 'pie'
            },
            title: '',
            tooltip: {
              headerFormat: '',
              pointFormat: '<b>Usage : </b>{point.percentage:.1f}%'
            },
            plotOptions: {
              series: {
                states: {
                  hover: {
                    enabled: false
                  }
                },
                point: {
                  events: {
                    mouseOver: function mouseOver() {
                      this.options.oldColor = this.color;
                      this.graphic.attr('fill', shade(this.color, -0.1));
                    },
                    mouseOut: function mouseOut() {
                      this.graphic.attr('fill', this.options.oldColor);
                    }
                  }
                }
              },
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>',
                  style: {
                    color: Highcharts.theme && Highcharts.theme.contrastTextColor || 'black'
                  }
                }
              }
            },
            series: [{
              name: 'Languages',
              colorByPoint: true,
              data: languagesFormatted
            }]
          });
        }

      });
    }
  });
};

charts(jQuery);
'use strict';

/* global jQuery, sitemap, scope, router */

var jconsole = function jconsole($) {
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $consoleWrapper = $('#console-wrapper'),
        $consoleToggle = $('#console-toggle'),
        $console = $('#console'),
        jqconsole = $console.jqconsole('Hi !\n', 'guest@yago.io:~' + window.location.pathname + '$ ', '', true);

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

    var startPrompt = function startPrompt() {
      jqconsole.RegisterMatching('{', '}', 'brackets');
      jqconsole.Prompt(true, function (input) {

        if (cmdHelp.test(input)) {
          jqconsole.Write('You need some help, no problem ;)\nYou can use some of the following bash commands:\n\n  ls       list available directories\n  cd       go to directory\n  pwd      return your current location\n  contact  send me an email\n\nand other secret commands to discover !\n\n', 'jqconsole-output');
        } else if (cmdPwd.test(input)) {
          jqconsole.Write('/home/yago' + window.location.pathname, 'jqconsole-output');
        } else if (cmdLs.test(input)) {
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
        } else if (cmdCd.test(input)) {

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
        } else if (cmdContact.test(input)) {
          window.location.href = 'mailto:hello@yago.io';
        } else if (cmdPs.test(input)) {
          jqconsole.Write('Someone here is a bit too curius !', 'jqconsole-output');
        } else if (cmdGif.test(input)) {
          jqconsole.Append($('<img></img>').attr('src', 'https://media.giphy.com/media/XE7kcG4fMEDqU/giphy.gif'));
        } else if (cmdRm.test(input)) {
          jqconsole.Write('You wanna destroy my work ? :\'(', 'jqconsole-output');
        } else if (cmdVim.test(input) || cmdNano.test(input)) {
          jqconsole.Write('Edition not permitted. You only have read access.', 'jqconsole-output');
        } else if (cmdGit.test(input)) {
          jqconsole.Write('Yeah! I love Git too. Feel free to check origin ;)', 'jqconsole-output');
          jqconsole.Append($('<a>yago/yago.github.io</a>').attr('href', 'https://github.com/Yago/yago.github.io').attr('target', '_blank'));
        } else if (cmdMkdir.test(input)) {
          jqconsole.Write('Really ?\n', 'jqconsole-output');
        } else if (cmdTouch.test(input)) {
          jqconsole.Write('File successfully created !\n\n\n   No, I\'m just kidding XD', 'jqconsole-output');
        } else {
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

    $(document).keyup(function (e) {
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
'use strict';

/* global jQuery */

var contributions = function contributions($) {
  $(document).ready(function () {
    if ($('#contributions').length > 0) {
      var $contributions = $('#contributions'),
          data = 'http://api.yago.io/contributions/';

      // Get contributions data
      $.ajax({
        url: data,
        success: function success(res) {
          $contributions.html(res);
        }
      });
    }
  });
};

contributions(jQuery);
'use strict';

/* global jQuery, PhotoSwipe, PhotoSwipeUI_Default */

var articleGallery = function articleGallery($) {
  var counterUpdate = function counterUpdate(gallery) {
    var current = parseInt(gallery.getCurrentIndex(), 10) + 1,
        total = gallery.options.getNumItemsFn();

    $('.pswp__counter').html('<span class="counter-big"><sup>' + current + '</sup></span>/<span class="counter-small"><sub>' + total + '</sub></span>');
  };

  $(document).ready(function () {
    var index = 0,
        container = [];

    // Create gallery container
    $('#article').find('a').each(function () {
      var $that = $(this),
          target = $that.attr('href'),
          $thumb = $that.find('img'),
          coef = 1900 / $thumb.width(),
          width = 1900,
          height = $thumb.height() * coef;

      if (target.indexOf('/img/') > -1) {
        $that.addClass('gallery-item');
        $that.attr('data-index', index);

        var item = {
          src: target,
          w: width,
          h: height,
          title: $thumb.attr('alt')
        };
        container.push(item);
        index++;
      }
    });

    // Enable photoswipe instance on thumb's click
    $('.gallery-item').click(function (event) {
      event.preventDefault();

      var $pswp = $('.pswp')[0],
          options = {
        index: $(this).data('index'),
        bgOpacity: 1,
        showHideOpacity: true
      };

      var gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
      gallery.init();

      counterUpdate(gallery);
      gallery.listen('afterChange', function () {
        counterUpdate(gallery);
      });
    });
  });
};

articleGallery(jQuery);
'use strict';

/* global jQuery */

var menu = function menu($) {
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

    $(document).keyup(function (e) {
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
'use strict';

/* global jQuery, init, router, chartTheme, charts, jconsole, contributions, articleGallery, menu, Prism */

(function ($) {
  var $main = $('#main'),
      options = {
    prefetch: true,
    cacheLength: 2,
    hrefRegex: '^\/',
    blacklist: '.gallery-item',
    onStart: {
      duration: 300,
      render: function render($container) {
        $container.addClass('onchange');
        router.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function render($container, $newContent) {
        $container.html($newContent);
      }
    },
    onAfter: function onAfter($container) {
      $container.removeClass('onchange');

      init();
      chartTheme();
      charts(jQuery);
      jconsole(jQuery);
      contributions(jQuery);
      articleGallery(jQuery);
      menu(jQuery);
      Prism.highlightAll();
    }
  };

  router = $main.smoothState(options).data('smoothState');
})(jQuery);