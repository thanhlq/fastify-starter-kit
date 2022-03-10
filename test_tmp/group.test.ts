import Group from "../src/database/models/Group";
import { DbHelper } from '../test/db/db-helper';

// const host = process.env.HOST || 'http://localhost:3000'

let knex;

describe('groups', () => {

  beforeAll(async () => {
    knex = await DbHelper.setupDb()
  })

  afterAll(async () => {
    await DbHelper.close()
  })

  describe('Group tests', () => {
    it('Test create group', async () => {
      // const group = await Group.forge({ name: 'A Game of Thrones', author: 'George R. R. Martin' }).save()
      //   .returning('*')
      const group = await knex('group')
        .insert([{ name: 'A Game of Thrones', author: 'George R. R. Martin' }])
        .returning('*')
      console.log(JSON.stringify(group))
      expect(group).not.toBeNull()
    })
  })
})