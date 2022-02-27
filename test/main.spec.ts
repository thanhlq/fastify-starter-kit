import MainServer from '../src/server.js'

let app;

describe('This is main test', () => {

  beforeAll(async () => {
    console.log('before server started')
    app = await MainServer.start()
    console.log('after server started')
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


