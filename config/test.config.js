/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const tsconfig = require(require('path').resolve(process.cwd(), 'tsconfig.json'));

const paths = tsconfig.compilerOptions.paths;
const moduleNameMapper = {};
for (var key in paths) {
  moduleNameMapper[key.replace('*', '(.*)')] = '<rootDir>/' + paths[key][0].replace('*', '$1');
}

config = require('./dev.config');
config.sourcePath = 'tests';
config.jest = {
  coverageThreshold: JSON.stringify({
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  }),
  verbose: true,
  moduleNameMapper,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', 'playground/**/*.{ts,tsx}', '!src/index.tsx', '!playground/index.tsx', '!test/**/*'],
  
};

module.exports = config;
