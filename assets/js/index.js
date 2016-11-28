import $ from 'jquery';
import Prism from 'prismjs';
import LineNumber from 'prismjs/plugins/line-numbers/prism-line-numbers'; // eslint-disable-line no-unused-vars

import chartTheme from './charts-themes';
import charts from './charts';
import contributions from './contributions';
import gallery from './gallery';
import jqConsole from './console';
import menu from './menu';
import smoothstate from './smoothstate';

smoothstate();

$(document).ready(() => {
  Prism.highlightAll();
  chartTheme();
  charts();
  contributions();
  gallery();
  jqConsole();
  menu();
});
