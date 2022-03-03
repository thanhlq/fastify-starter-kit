import DatabaseManager from '../../src/database/database-manager.js'
// import knex from
import * as TestDB from './db.json'

console.log('json out 1')
console.log(JSON.stringify(TestDB.users))
console.log('json out 2')

export class DbHelper {
  // 1. erase data
  static knex

  public static async setupDb() {
    console.log('INITIALIZING DB CONNECTION....')
    DbHelper.knex = DatabaseManager.init()
    await this.eraseAllData();
  }

  public static async eraseAllData() {
    console.log('ERASING ALL DB DATA....')
    const knex = DbHelper.knex

    await knex('users_groups').del()
    await knex('groups').del()
    await knex('users').del()
    await knex('organizations').del()
  }

  // 2. insert sample data
}

export {TestDB}
