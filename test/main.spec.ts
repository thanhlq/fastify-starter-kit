import exp from 'constants';
import Main from '../src/main'

test('the data is peanut butter', () => {
  expect(1).toBe(1)
});


test('main', async () => {

  // Normally, I don't advocate for console output during a test.
  // However, this visually shows that the test is correctly loading an ESM module
  // WARNING: The ora module requires a node version that supports the node:process syntax ( v16 or higher )

  const app = await Main.getHttpServer()
  expect(app).not.toBeNull()
  expect(app.server).not.toBeNull()
});
