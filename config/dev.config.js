/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

var DefaultConfig = require('tsrx/tools').DefaultConfig;

module.exports = DefaultConfig({
  sourcePath: 'playground',
  outputPath: 'dist',
  // configFile: 'config/index.ts',
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
