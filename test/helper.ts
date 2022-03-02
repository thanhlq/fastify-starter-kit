// This file contains code that we reuse between our tests.
import * as tap from 'tap';
import buildApp from '../src/app.js';

export type Test = typeof tap['Test']['prototype'];

// Fill in this config with all the configurations
// needed for testing the application
async function config () {
  return {}
}

// Automatically build and tear down our instance
async function build (t?: Test) {
  const app = (await buildApp()).server
  // await app.listen({port: Number(process.env.PORT) || 3000})
  // await app.ready();

  // Tear down our app after we are done
  if (t) {
    t.teardown(() => void app.close())
  }

  return app
}

export {
  config,
  build
};

