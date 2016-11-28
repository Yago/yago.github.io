import $ from 'jquery';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default () => {
  const counterUpdate = (gallery) => {
    const current = parseInt(gallery.getCurrentIndex(), 10) + 1;
    const total = gallery.options.getNumItemsFn();

    $('.pswp__counter').html(`
      <span class="counter-big">
        <sup>${current}</sup>
      </span>/<span class="counter-small">
        <sub>${total}</sub>
      </span>
    `);
  };

  let index = 0;
  const container = [];

  // Create gallery container
  $('#article, #photo-container').find('a').each(function () { // eslint-disable-line prefer-arrow-callback
    const $that = $(this);
    const target = $that.attr('href');
    const $thumb = $that.find('img');
    const coef = 1900 / $thumb.width();
    const width = $that.attr('data-ow') || 1900;
    const height = $that.attr('data-oh') ||  $thumb.height() * coef;

    if (target.indexOf('/img/') > -1 || target.indexOf('staticflickr') > -1) {
      $that.addClass('gallery-item');
      $that.attr('data-index', index);

      const item = {
        src: target,
        w: width,
        h: height,
        title: $thumb.attr('alt'),
      };

      container.push(item);
      index += 1;
    }
  });

  // Enable photoswipe instance on thumb's click
  $('.gallery-item').click(function (event) { // eslint-disable-line prefer-arrow-callback
    event.preventDefault();

    const $pswp = $('.pswp')[0];
    const options = {
      index: $(this).data('index'),
      bgOpacity: 1,
      showHideOpacity: true,
    };

    const gallery = new PhotoSwipe($pswp, PhotoSwipeUI_Default, container, options);
    gallery.init();

    counterUpdate(gallery);
    gallery.listen('afterChange', function () { // eslint-disable-line prefer-arrow-callback
      counterUpdate(gallery);
    });
  });
};
