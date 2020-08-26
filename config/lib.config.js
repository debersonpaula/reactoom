/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

var DefaultConfig = require('tsrx/tools').DefaultConfig;

module.exports = DefaultConfig({
  sourcePath: 'src',
  sourceFile: 'index.ts',
  outputPath: 'bin',
  skipConfigFile: true,
  library: true,
});
