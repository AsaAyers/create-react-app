// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end
'use strict';

process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');
const path = require('path');
const chalk = require('chalk');
const paths = require('../config/paths');

const onlyRegex = /\.(js|jsx)$/;
require('babel-register')({
  babelrc: false,
  ignore: function(filename) {
    // This is trying to match how webpack is configured
    return (
      // Ignore files with the wrong extension
      !onlyRegex.test(filename) ||
        // Ignore files that aren't in src
        filename.indexOf(paths.appSrc) !== 0
    );
  },
  presets: [require.resolve('babel-preset-react-app')],
  plugins: ['transform-es2015-modules-commonjs'],
});

const script = process.argv[2];
if (process.argv.length < 3 || script === '--help') {
  console.log(chalk.red(`usage: script [script.js]`));
  process.exit(1);
}

const resolvedScript = path.normalize(
  path.resolve(process.cwd(), process.argv[2])
);

if (resolvedScript.indexOf(paths.appSrc) !== 0) {
  console.log(chalk.red(`script will only execute files in ${paths.appSrc}`));
  process.exit(1);
}

require(resolvedScript);
