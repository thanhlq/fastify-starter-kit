import MainServer from '../src/server.js'


let app;

describe('This is main test', () => {

  beforeAll(async () => {
    app = await MainServer.start()
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


