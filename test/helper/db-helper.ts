import DatabaseManager from '../../src/database/database-manager'
// import knex from
import * as TestData from './db.json'

export default class DbHelper {
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

export {TestData}
