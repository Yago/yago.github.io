import $ from 'jquery';
import FlexImages from './libs/fleximages';
import gallery from './gallery';

/* globals imagesLoaded */

export default () => {
  if ($('#photo-container').length > 0) {
    const url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6c1edc6213f0698886236acd144702e7&photoset_id=72157675595372551&user_id=76137733%40N06&format=json&nojsoncallback=1&extras=url_m,url_o';

    const $container = $('#photo-container');
    const limit = $container.hasClass('photo-container-teaser') ? 4 : Math.pow(10,6);
    let index = -1;

    const initGrid = () => {
      return new FlexImages({
        selector: '#photo-container',
        container: '.gallery-item',
        object: 'img',
        rowHeight: 300,
        truncate: false
      });
    };

    $.ajax({
      url,
      success: (res) => {
        const containerMarkup = res.photoset.photo.reduceRight((acc, photo) => {
          index += 1;
          if (index >= limit) return acc;
          return `${acc}<a href="${photo.url_o}" data-w="${photo.width_m}" data-h="${photo.height_m}" data-ow="${photo.width_o}" data-oh="${photo.height_o}" class="gallery-item" data-index="0"><img src="${photo.url_m}" alt="©Yann Gouffon, All Rights Reserved"></a>`;
        }, '');

        $container.append(containerMarkup);
        initGrid();
        gallery();
      },
    });
  }
};
