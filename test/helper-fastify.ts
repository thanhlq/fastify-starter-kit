// This file contains code that we reuse between our tests.

// TODO: to investigate: why this blocks the tests.
// import { appPath } from '../config.js';

import buildApp from '../src/app.js';

console.log('ENV_TEST: ' + process.env.ENV_TEST)

// Automatically build and tear down our instance
async function build() {
  const app = (await buildApp()).server
  await app.listen({ port: Number(process.env.PORT) || 3000 })
  await app.ready();
  // console.log('ROOT APP PATH: ' + appPath)
  return app
}

export {
  build
};

