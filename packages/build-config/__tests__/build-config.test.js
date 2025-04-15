'use strict';

const buildConfig = require('..');
const assert = require('assert').strict;

assert.strictEqual(buildConfig(), 'Hello from buildConfig');
console.info('buildConfig tests passed');
