var fs = require('fs')
  , path = require('path')
  , util = require('util')
  // -- npm modules
  , ncp = require('ncp').ncp
  // -- project requires
  , libutil = require('./utils')

  // -- vars
  , docdoc = null
  , theme = null
  ;

ncp.limit = 3;

function init(_docdoc) {
  docdoc = _docdoc;
}
module.exports.init = init;

var theme = {
  /**
  * Theme
  * {
    render: function(file, vars, fn)
    options: {
      theme: 'path/to/theme'
      ext: '.ejs'
    }
  }
  */
  init: function(_theme) {
    console.log('THEME START');
    console.log(_theme);
    console.log('THEME END');

    theme = _theme;
  }
};
module.exports.themeFunctions = theme;

module.exports.prepare = function(cb) {
  // draft:
  // docdoc will copy all templates in the folder docdoc/theme
  // to let people manipulate them easily
  // not sure, when this should happen
  console.log('copying theme');
  ncp(theme.options.theme, docdoc.docdocroot + 'theme', function (err) {
    if (err) { return console.error(err); }
    console.log('copying theme .. done');
    cb();
  });
}

module.exports.render = function(filename, vars, cb) {
  theme.render(docdoc.docdocroot + 'theme/' + filename + theme.options.ext, vars, cb);
}