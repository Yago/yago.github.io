'use strict';

/* global Highcharts */

var chartTheme = function () {
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
