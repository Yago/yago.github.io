/*
  JavaScript flexImages v1.0.2
  Copyright (c) 2014 Simon Steinberger / Pixabay
  GitHub: https://github.com/Pixabay/JavaScript-flexImages
  License: http://www.opensource.org/licenses/mit-license.php

  -> https://raw.githubusercontent.com/Pixabay/JavaScript-flexImages/master/flex-images.js
*/

function flexImages(options) {
  if (!document.querySelector) {
    return;
  }

  function makeGrid(grid, items, o, noresize) {
    var x;
    var new_w;
    var exact_w;
    var ratio = 1;
    var rows = 1;
    var max_w = grid.clientWidth - 2;
    var row = [];
    var row_width = 0;
    var h;
    var row_h = o.rowHeight;

    // define inside makeGrid to access variables in scope
    function _helper(lastRow) {
      if (o.maxRows && rows > o.maxRows || o.truncate && lastRow && rows > 1) {
        row[x][0].style.display = 'none';
      } else {

        if (row[x][4]) {
          row[x][3].setAttribute('src', row[x][4]);
          row[x][4] = '';
        }

        row[x][0].style.width = new_w + 'px';
        row[x][0].style.height = row_h + 'px';
        row[x][0].style.display = 'block';
      }
    };

    for (var i = 0; i < items.length; i++) {
      row.push(items[i]);
      row_width += items[i][2] + o.margin;
      if (row_width >= max_w) {
        var margins_in_row = row.length * o.margin;
        var ratio = (max_w - margins_in_row) / (row_width - margins_in_row);
        var row_h = Math.ceil(o.rowHeight * ratio);
        var exact_w = 0;
        var new_w;
        for (x = 0; x < row.length; x++) {
          new_w = Math.ceil(row[x][2] * ratio);
          exact_w += new_w + o.margin;
          if (exact_w > max_w) {
            new_w -= exact_w - max_w;
          }
          _helper();
        }
        // reset for next row
        row = [], row_width = 0;
        rows++;
      }
    }
    // layout last row - match height of last row to previous row
    for (x = 0; x < row.length; x++) {
      new_w = Math.floor(row[x][2] * ratio);
      h = Math.floor(o.rowHeight * ratio);
      _helper(true);
    }

    // scroll bars added or removed during rendering new layout?
    if (!noresize && max_w != grid.clientWidth) {
      makeGrid(grid, items, o, true);
    }
  }

  var o = { selector: 0, container: '.item', object: 'img', rowHeight: 180, maxRows: 0, truncate: 0 };

  for (var k in options) {
    if (options.hasOwnProperty(k)) {
      o[k] = options[k];
    }
  }

  var grids = typeof o.selector == 'object' ? [o.selector] : document.querySelectorAll(o.selector);

  for (var i = 0; i < grids.length; i++) {
    var grid = grids[i];
    var containers = grid.querySelectorAll(o.container);
    var items = [];
    var t = new Date().getTime();

    if (!containers.length) {
      continue;
    }

    var s = window.getComputedStyle ? getComputedStyle(containers[0], null) : containers[0].currentStyle;
    o.margin = (parseInt(s.marginLeft) || 0) + (parseInt(s.marginRight) || 0) + (Math.round(parseFloat(s.borderLeftWidth)) || 0) + (Math.round(parseFloat(s.borderRightWidth)) || 0);
    for (var j = 0; j < containers.length; j++) {
      var c = containers[j];
      var w = parseInt(c.getAttribute('data-w'));
      var norm_w = w * (o.rowHeight / parseInt(c.getAttribute('data-h'))); // normalized width
      var obj = c.querySelector(o.object);
      var a = [c, w, norm_w, obj];
      if (obj != null) {
        a.push(obj.getAttribute('data-src'));
      }
      items.push(a);
    }
    makeGrid(grid, items, o);
    var tempf = function() {
      makeGrid(grid, items, o);
    };
    if (document.addEventListener) {
      window['flexImages_listener' + t] = tempf;
      window.removeEventListener('resize', window['flexImages_listener' + grid.getAttribute('data-flex-t')]);
      delete window['flexImages_listener' + grid.getAttribute('data-flex-t')];
      window.addEventListener('resize', window['flexImages_listener' + t]);
    } else {
      grid.onresize = tempf;
    }
    grid.setAttribute('data-flex-t', t);
  }
};

export default flexImages;
