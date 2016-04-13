'use strict';

/* global jQuery */

(function($){
  $(document).ready(function () {
    if ($('#contributions').length > 0) {
      var $contributions = $('#contributions'),
          data = 'http://api.yago.io/contributions/';

      // Get contributions data
      $.ajax({
        url: data,
        success: function (res) {
          $contributions.html(res);
        }
      });

    }
  });
}(jQuery));
