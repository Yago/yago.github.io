import Highcharts from 'highcharts';
import $ from 'jquery';

export default () => {
  if ($('#pie-chart').length > 0) {
    const $pieChart = $('#pie-chart');
    const url = 'http://api.yago.io/stats/';

    /* eslint-disable */
    const shade = (color, percent) => {
      const f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return '#'+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    };
    /* eslint-enable */

    const sortLevel = (a, b) => {
      if (a.level > b.level) {
        return -1;
      } else if (a.level < b.level) {
        return 1;
      }

      return 0;
    };

    // Get Wakatime data
    $.ajax({
      url,
      success: (res) => {
        const languages = [];
        let otherPoints = 0.0;
        const languagesFormatted = [];

        // Process Data
        Object.keys(res.data.languages).forEach((key) => {
          const language = {
            name: res.data.languages[key].name,
            time: res.data.languages[key].total_seconds,
            y: res.data.languages[key].percent,
          };

          languages.push(language);
        });

        Object.keys(languages).forEach((lang) => {
          if (languages[lang].y < 1 || languages[lang].name === 'Other') {
            otherPoints += languages[lang].y;
          } else {
            languagesFormatted.push(languages[lang]);
          }
        });
        languagesFormatted.push({
          name: 'Other',
          'Time spending': 1,
          y: otherPoints,
        });
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
        const chart = Highcharts.chart({ // eslint-disable-line no-unused-vars
          chart: {
            type: 'pie',
            renderTo: $pieChart[0],
          },
          title: '',
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>Usage : </b>{point.percentage:.1f}%',
          },
          plotOptions: {
            series: {
              states: {
                hover: {
                  enabled: false,
                },
              },
              point: {
                events: {
                  mouseOver: function mouseOver() {
                    this.options.oldColor = this.color;
                    this.graphic.attr('fill', shade(this.color, -0.1));
                  },
                  mouseOut: function mouseOut() {
                    this.graphic.attr('fill', this.options.oldColor);
                  },
                },
              },
            },
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                },
              },
            },
          },
          series: [{
            name: 'Languages',
            colorByPoint: true,
            data: languagesFormatted,
          }],
        });
      },

    });
  }
};
