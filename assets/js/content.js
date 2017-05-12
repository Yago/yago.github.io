import $ from 'jquery';

export default () => {
  if ($('#article-container').length > 0) {
    $('#article-container').find('a').each(function () {
      $(this).attr('target', '_blank');
    });
  }
};
