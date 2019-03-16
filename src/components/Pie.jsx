import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import stats from '../config/stats.json';

const Pie = () => {
  // Highcharts.setOptions(highchartsTheme);

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

  // Process Data
  const languages = stats;

  const options = {
    // eslint-disable-line no-unused-vars
    colors: [
      '#F8E71C',
      '#EADA1A',
      '#DBCC19',
      '#CDBE17',
      '#BEB115',
      '#AFA314',
      '#A19612',
      '#928811',
      '#847B0F',
      '#756D0D',
    ],
    chart: {
      type: 'pie',
      backgroundColor: null,
      style: {
        fontFamily:
          "'Runda', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';",
      },
    },
    title: '',
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>Usage : </b>{point.percentage:.1f}%',
      borderWidth: 0,
      backgroundColor: 'rgba(0,0,0,1)',
      shadow: false,
      style: {
        color: 'rgba(255,255,255,1)',
      },
    },
    legend: {
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '13px',
      },
    },
    xAxis: {
      gridLineWidth: 1,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yAxis: {
      minorTickInterval: 'auto',
      title: {
        style: {
          textTransform: 'uppercase',
        },
      },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    plotOptions: {
      candlestick: {
        lineColor: '#404048',
      },
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

export default Pie;
