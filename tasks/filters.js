'use strict';

var swig          = require('swig');

module.exports = function() {

  swig.setFilter('slug', function (path) {
    var splited = path.split('/');
    return splited[splited.length-1];
  });


};
