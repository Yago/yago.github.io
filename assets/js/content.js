import $ from 'jquery';

export default () => {
  if ($('#article-container').length > 0) {
    $('#article-container').find('pre + blockquote a').each(function () {
      $(this).attr('target', '_blank');
    });
  }
};
