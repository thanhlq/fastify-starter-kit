import DatabaseManager from '../../src/database/database-manager.js'
// import knex from
import * as TestDB from './db.json'

console.log('json out 1')
console.log(JSON.stringify(TestDB.users))
console.log('json out 2')

export class DbHelper {
  static knex

  public static async setupDb() {
    console.log('INITIALIZING DB CONNECTION....')
    DbHelper.knex = DatabaseManager.init()
    await this.eraseAllData(DbHelper.knex);
  }

  public static async eraseAllData(knex) {
    console.log('ERASING ALL DB DATA....')

    await knex('users_groups').del()
    await knex('groups').del()
    await knex('users').del()
    await knex('organizations').del()
  }

  public static async createTestDatabase() {
    const knex = DbHelper.knex

    try {
      const dbConfig = DatabaseManager.getInstance().getDbConfig();
      await knex.raw(`DROP DATABASE IF EXISTS ${dbConfig.connection.database}`)
      await knex.raw(`CREATE DATABASE ${dbConfig.connection.database}`)
    } catch (error) {
      throw new Error(error)
    } finally {
      await knex.destroy()
    }
  }

  // Seed the database with schema and data
  public static async seedTestDatabase() {
    const knex = DbHelper.knex
    try {
      await knex.migrate.latest()
      await knex.seed.run()
    } catch (error) {
      throw new Error(error)
    } finally {
      await knex.destroy()
    }
  }
}

export { TestDB }
