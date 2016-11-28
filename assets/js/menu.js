import $ from 'jquery';

export default () => {
  const $contentWrapper = $('#content-wrapper');
  const $menuWrapper = $('#menu-wrapper');
  const $menuToggle = $('#menu-toggle');
  const $consoleWrapper = $('#console-wrapper');

  $menuToggle.click(function ($event) { // eslint-disable-line prefer-arrow-callback
    $event.stopPropagation();
    $menuToggle.toggleClass('open');
    $menuWrapper.toggleClass('open');
    $contentWrapper.toggleClass('right-open');
  });

  $contentWrapper.click(function () { // eslint-disable-line prefer-arrow-callback
    $menuToggle.removeClass('open');
    $menuWrapper.removeClass('open');
    $contentWrapper.removeClass('right-open');
  });

  $menuWrapper.find('a').click(function () { // eslint-disable-line prefer-arrow-callback
    $menuToggle.toggleClass('open');
    $menuWrapper.toggleClass('open');
    $contentWrapper.toggleClass('right-open');
  });

  $(document).keyup(function (e) { // eslint-disable-line prefer-arrow-callback
    if (e.altKey && e.keyCode === 77) {
      $menuToggle.toggleClass('open');
      $menuWrapper.toggleClass('open');
      $contentWrapper.toggleClass('right-open');
      $contentWrapper.removeClass('left-open');
      $consoleWrapper.removeClass('open');
    }

    if (e.keyCode === 27) {
      $menuToggle.removeClass('open');
      $menuWrapper.removeClass('open');
      $contentWrapper.removeClass('right-open');
    }
  });
};
