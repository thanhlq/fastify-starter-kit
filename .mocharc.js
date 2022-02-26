export default {
  "extension": ["ts"],
  "timeout": 5000,
  "exit": true,
  // "require": "ts-node/register",
  mochaHooks: {
    beforeAll: async function() {
      await (await import('reflect-metadata')).default;
    }
  },
  // https://github.com/mochajs/mocha-examples/issues/47
  "node-option": [
		"experimental-specifier-resolution=node",
		"loader=ts-node/esm"
	]
};
