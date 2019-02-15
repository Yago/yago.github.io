/* globals jQuery, document */

// You will use that file to import all your scripts
// Ex: import gallery from './gallery'
import svgIcons from '../icons/svg-icons';

svgIcons(); // Must run as soon as possible

const init = () => {
  $('#menu-toggle').click(function () {
    $(this).toggleClass('open');
    $('#main-wrapper').toggleClass('open');
  });

  $('#terminal-toggle').click(function () {
    $(this).toggleClass('open');
    $('#main-wrapper').toggleClass('open');
  });
};

(function ($) {
  $(document).ready(() => init());
}(jQuery));
document.addEventListener('ToolboxReady', () => init());
