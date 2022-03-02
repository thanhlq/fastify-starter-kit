import buildApp from '../src/app.js'

let app;

beforeAll(async () => {
  console.log('BEFORE ALL 0 (INVOKED)')
  app = await buildApp();
  await app.server.ready()
  console.log('BEFORE ALL 1 (INVOKED)')
});

afterAll(async () => {
  console.log('AFTER ALL 0 (INVOKED)')
  return await app.close()
  console.log('AFTER ALL 1 (INVOKED)')
})

test('Test jest working', () => {
  expect(1).toBe(1)
});

test('main', () => {
  expect(app).not.toBeNull()
  expect(app.server).not.toBeNull()
});
