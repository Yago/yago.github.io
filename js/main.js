'use strict';

/* global Highcharts */

(function () {
  Highcharts.theme = {
    colors: ['#d5ab32', '#d9b143', '#dcb853', '#dfbf63', '#e3c574', '#e6cc84', '#e9d394', '#eddaa4', '#f0e0b5', '#f3e7c5', '#f7eed5', '#faf5e6', '#fdfbf6'],
    chart: {
      backgroundColor: null,
      style: {
        fontFamily: 'Dosis, sans-serif'
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
      backgroundColor: 'rgba(219,219,216,0.8)',
      shadow: false
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
})();
'use strict';

/* global jQuery, Highcharts */

(function ($) {
  $(document).ready(function () {
    if ($('#pie-chart').length > 0) {
      var $personnalInfos = $('#personnal-infos'),
          $pieChart = $('#pie-chart'),
          data = 'http://codeivate.com/users/yago.json',
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
          languagesFormatted.push({ 'name': 'Other', 'level': 0, 'y': otherPoints });
          languagesFormatted.sort(sortLevel);

          $personnalInfos.html('' + '<table>' + '<tr><th>User</th><td><a href="https://github.com/yago">' + res.name + '</a></td></tr>' + '<tr><th>Level</th><td>' + res.level + '</td></tr>' + '<tr><th>Platform</th><td>OSX</td></tr>' + '<tr><th>Coding now</th><td>' + res.programming_now + '</td></tr>' + '<tr><th>Current language</th><td>' + res.current_language.replace('.sublime-syntax', '') + '</td></tr>' + '');

          // Create Pie chart
          $pieChart.highcharts({
            chart: {
              type: 'pie'
            },
            title: '',
            tooltip: {
              pointFormat: '<b>{point.percentage:.1f}%</b>'
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
                      this.graphic.attr('fill', 'black');
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
})(jQuery);
'use strict';

/* global jQuery */

(function ($) {
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
      $consoleWrapper.toggleClass('open');
      $contentWrapper.toggleClass('left-open');
      startPrompt();
      jqconsole.Focus();
    });

    $(document).keyup(function (e) {
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
})(jQuery);
'use strict';

/* global jQuery */

(function ($) {
  // $.ajax({
  //   url: 'https://github.com/users/yago/contributions',
  //   jsonp: 'callback',
  //   dataType: 'jsonp',
  //   data: {
  //     format: 'json'
  //   },
  //   success: function (res) {
  //     console.log(res);
  //   }
  // });
})(jQuery);
'use strict';

/* global jQuery */

(function ($) {
  $(document).ready(function () {
    var $contentWrapper = $('#content-wrapper'),
        $menuWrapper = $('#menu-wrapper'),
        $menuToggle = $('#menu-toggle'),
        $consoleWrapper = $('#console-wrapper');

    $menuToggle.click(function () {
      $menuWrapper.toggleClass('open');
      $contentWrapper.toggleClass('right-open');
    });

    $(document).keyup(function (e) {
      if (e.altKey && e.keyCode === 77) {
        $menuWrapper.toggleClass('open');
        $contentWrapper.toggleClass('right-open');
        $contentWrapper.removeClass('left-open');
        $consoleWrapper.removeClass('open');
      }
    });
  });
})(jQuery);