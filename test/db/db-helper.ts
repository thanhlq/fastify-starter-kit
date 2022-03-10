import Knex from 'knex'
import { Model } from 'objection'
// import knex from
import * as TestDB from './db.json'

console.log('json out 1')
console.log(JSON.stringify(TestDB.users))
console.log('json out 2')

const testDatabaseName = 'objection_test'

export class DbHelper {
  static knex

  public static async setupDb() {
    console.log('INITIALIZING DB CONNECTION....')
    DbHelper.knex = Knex({
      client: 'mysql',
      connection: {
        host: '172.19.0.2',
        user: 'root',
        password: 'sa214',
        database: testDatabaseName
      }
    })
    Model.knex(DbHelper.knex)
    // await this.eraseAllData(DbHelper.knex);
    return DbHelper.knex;
  }

  public static async close() {
    await DbHelper.knex.destroy()
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
      await knex.raw(`DROP DATABASE IF EXISTS ${testDatabaseName}`)
      await knex.raw(`CREATE DATABASE ${testDatabaseName}`)
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
