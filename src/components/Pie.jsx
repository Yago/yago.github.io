import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import highchartsTheme from '../config/highcharts-themes.json';

const Pie = ({ stats }) => {
  Highcharts.setOptions(highchartsTheme);

  /* eslint-disable */
  const shade = (color, percent) => {
    const f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      '#' +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  };
  /* eslint-enable */

  const sortLevel = (a, b) => {
    if (a.level > b.level) {
      return -1;
    }
    if (a.level < b.level) {
      return 1;
    }

    return 0;
  };

  let otherPoints = 0.0;

  // Process Data
  const languages = stats.data.languages
    .map(lang => ({
      name: lang.name,
      time: lang.total_seconds,
      y: lang.percent,
    }))
    .filter((lang) => {
      const test = lang.y < 1 || lang.name === 'Other';
      if (test) otherPoints += lang.y;
      return !test;
    });

  languages.push({
    name: 'Other',
    'Time spending': 1,
    y: otherPoints,
  });
  languages.sort(sortLevel);

  const options = {
    // eslint-disable-line no-unused-vars
    chart: {
      type: 'pie',
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
        borderWidth: 2,
        borderColor: '#1d1f21',
        slicedOffset: 0,
        innerSize: 100,
        depth: 20,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>',
          style: {
            color: '#fff',
          },
        },
      },
    },
    series: [
      {
        name: 'Languages',
        colorByPoint: true,
        data: languages,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

Pie.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default Pie;
