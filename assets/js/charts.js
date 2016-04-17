'use strict';

/* global jQuery, Highcharts */

(function($){
  $(document).ready(function () {
    if ($('#pie-chart').length > 0) {
      var $pieChart = $('#pie-chart'),
          data = 'http://codeivate.com/users/yago.json',
          shade = function (color, percent){
            var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
            return '#'+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
          },
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
          languagesFormatted.push({'name': 'Other','level':1,'y':otherPoints});
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
                    mouseOver: function () {
                      this.options.oldColor = this.color;
                      this.graphic.attr('fill', shade(this.color, -0.1));
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
