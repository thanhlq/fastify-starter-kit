import Main from '../src/main.js'


let app;

describe('This is main test', () => {

  beforeAll(async () => {
    app = await Main.getHttpServerReady()
  });

  afterAll(async () => {
    await app.close()
  })

  test('Test jest working', () => {
    expect(1).toBe(1)
  });

  test('main', () => {
    expect(app).not.toBeNull()
    expect(app.server).not.toBeNull()
  });

})


