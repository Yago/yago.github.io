import $ from 'jquery';

export default () => {
  if ($('#contributions').length > 0) {
    const $contributions = $('#contributions');
    const data = 'http://api.yago.io/contributions/';

    // Get contributions data
    $.ajax({
      url: data,
      success: (res) => {
        $contributions.html(res);
      },
    });
  }
};
