import User from '../src/database/models/User';
import { DbHelper, TestDB } from '../test/db/db-helper'

const users = TestDB.users


beforeAll(async () => {
  return await DbHelper.setupDb()
});

// afterAll(async () => {

// });

it("Users data instantiated", (done) => {
  expect(users).not.toBeNull()
  expect(users.length).toEqual(5)
  done()
})

it("CREATE user", async () => {
  // const result = await request(app).get("/health");
  const u = users[0];
  const result = await User.forge(u).save();
  expect(result).not.toBeNull()
  return true;
});
