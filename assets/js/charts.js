'use strict';

/* global jQuery, Highcharts */

(function($){
  $(document).ready(function () {
    if ($('#pie-chart').length > 0) {
      var $personnalInfos = $('#personnal-infos'),
          $pieChart = $('#pie-chart'),
          data = 'http://codeivate.com/users/yago.json',
          sortLevel = function (a,b) {
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
        success: function (res) {
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
          languagesFormatted.push({'name': 'Other','level':0,'y':otherPoints});
          languagesFormatted.sort(sortLevel);

          $personnalInfos.html(''+
            '<table>'+
            '<tr><th>User</th><td><a href="https://github.com/yago">'+ res.name +'</a></td></tr>'+
              '<tr><th>Level</th><td>'+ res.level +'</td></tr>'+
              '<tr><th>Platform</th><td>OSX</td></tr>'+
              '<tr><th>Coding now</th><td>'+ res.programming_now +'</td></tr>'+
              '<tr><th>Current language</th><td>'+ res.current_language.replace('.sublime-syntax', '') +'</td></tr>'+
            '');

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
                    mouseOver: function () {
                      this.options.oldColor = this.color;
                      this.graphic.attr('fill', 'black');
                    },
                    mouseOut: function () {
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
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
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
}(jQuery));
