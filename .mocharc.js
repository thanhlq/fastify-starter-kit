export default {
  "extension": ["js"],
  "timeout": 5000,
  "exit": true,
  // "require": "ts-node/register",
  mochaHooks: {
    beforeAll: function() {
      // require('reflect-metadata');
    }
  }
};
