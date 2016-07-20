module.exports = function (wallaby) {
  return {
    files: [
      'bot/**/*.ts',
    ],

    tests: [
      'tests/**/*.ts'
    ],

    env: {
      type: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    testFramework: 'ava',

    setup: function () {
      require('babel-polyfill');
    },

    debug: true
  };
};
