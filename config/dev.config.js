/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

var { DefaultConfig } = require('tsrx/tools');

module.exports = DefaultConfig({
  sourcePath: 'playground',
  outputPath: 'dist',
  htmlTemplate: 'playground/index.html',
  port: 8080,
  host: 'localhost',
  env: {},
  reactHotLoader: true,
  devServer: {
    open: true,
    hot: true,
  },
  skipConfigFile: true,
});
