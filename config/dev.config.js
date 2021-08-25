/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

var { DefaultConfig } = require('tsrx/tools');

module.exports = DefaultConfig({
  sourcePath: 'playground',
  outputPath: 'dist',
  publicFolder: 'playground/public',
  port: 8080,
  devServer: {
    open: true,
    hot: true,
  },
  skipConfigFile: true,
});
