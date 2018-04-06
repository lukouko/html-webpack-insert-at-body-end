const xtend = require("xtend");

const OPEN_BODY_TAG = '<body';
const CLOSE_BODY_TAG = '</body>';

function InsertAtBodyEnd(options) {
  const defaultOptions = {
    filename: 'index.html'
  };

  this.options = xtend(defaultOptions, options);

  if (!this.options.scriptSrc) throw new Error('html-webpack-insert-at-body-end-plugin requires a scriptSrc property to be set in the options');
}
 
InsertAtBodyEnd.prototype.apply = function(compiler) {
  const that = this;
  compiler.hooks.compilation.tap('InsertAtBodyEnd', compilation => { 
    compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('InsertAtBodyEnd', (htmlPluginData, callback) => {
      if (htmlPluginData.plugin.options.filename !== that.options.filename) return callback(null, htmlPluginData);

      const scriptTag = '  <script src="' + that.options.scriptSrc + '" type="text/javascript"></script>\n'
      htmlPluginData.html = htmlPluginData.html.replace(CLOSE_BODY_TAG, scriptTag + CLOSE_BODY_TAG);

      callback(null, htmlPluginData);
    });
  });
};
 
module.exports = InsertAtBodyEnd;