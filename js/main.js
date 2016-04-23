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
          data = 'http://codeivate.com/users/yago.json',
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
      };

      // Get Codeivate data
      $.ajax({
        url: data,
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {
          format: 'json'
        },
        success: function success(res) {
          var languages = [],
              otherPoints = 0.0,
              languagesFormatted = [];

          // Process Data
          for (var item in res.languages) {
            if (res.languages.hasOwnProperty(item)) {
              var language = {
                'name': item,
                'level': res.languages[item].level,
                'y': res.languages[item].points
              };

              languages.push(language);
            }
          }

          for (var lang in languages) {
            if (languages[lang].y < 50) {
              otherPoints += languages[lang].y;
            } else {
              languagesFormatted.push(languages[lang]);
            }
          }
          languagesFormatted.push({ 'name': 'Other', 'level': 1, 'y': otherPoints });
          languagesFormatted.sort(sortLevel);

          // Populate data pre
          $('#skills-name').html(res.name);
          $('#skills-level').html(res.level);
          if (res.programming_now) {
            $('#skills-coding').html(res.programming_now);
            $('#skills-language').html(res.current_language.replace('.sublime-syntax', ''));
          } else {
            $('#skills-coding').html('false');
            $('#skills-language-wrapper').addClass('hide');
          }

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

/* global jQuery */

var jconsole = function jconsole($) {
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $consoleWrapper = $('#console-wrapper'),
        $consoleToggle = $('#console-toggle'),
        $console = $('#console'),
        jqconsole = $console.jqconsole('Hi !\n', 'root@yago.io:~' + window.location.pathname + '$ ', '', true);

    var startPrompt = function startPrompt() {
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
          coef = 2800 / $thumb.width(),
          width = 2800,
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

    $menuToggle.click(function () {
      $menuToggle.toggleClass('open');
      $menuWrapper.toggleClass('open');
      $contentWrapper.toggleClass('right-open');
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

/* global jQuery, chartTheme, charts, jconsole, contributions, articleGallery, menu, Prism */

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
        smoothState.restartCSSAnimations();
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

      chartTheme();
      charts(jQuery);
      jconsole(jQuery);
      contributions(jQuery);
      articleGallery(jQuery);
      menu(jQuery);
      Prism.highlightAll();
    }
  };

  var smoothState = $main.smoothState(options).data('smoothState');
})(jQuery);