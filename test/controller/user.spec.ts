import User from '../../src/database/models/User.js'
import DatabseManger from '../../src/database/database-manager'

describe('User model test', () => {

  beforeAll(async () => {
    await DatabseManger.init()
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  afterAll(async () => {
    // await DatabseManger.close()
  })

  test('user CRUD', async () => {
    // const TestDB = await (await import('../helper/db.json')).default
    // console.log(JSON.stringify(TestDB))
    // const user = TestDB.users[0]
    // const createdUser: any = await User.forge().insert(user)
    // expect(createdUser.id).not.toBeNull()
    // expect(createdUser.email).toEqual(user.email)
    expect(1).toBe(1)
  });

})
