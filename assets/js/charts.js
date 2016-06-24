'use strict';

/* global jQuery, Highcharts */

var charts = function ($) {

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
          },
          pad = function (str) {
            return ("0"+str).slice(-2);
          },
          hhmmss = function (secs) {
            var minutes = Math.floor(secs / 60);
            secs = secs%60;
            var hours = Math.floor(minutes/60)
            minutes = minutes%60;
            return pad(hours)+"h"+pad(minutes)
          };

      // Get Codeivate data
      $.ajax({
        url: data,
        success: function (res) {
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
          languagesFormatted.push({'name': 'Other','Time spending':1,'y':otherPoints});
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
};

charts(jQuery);
