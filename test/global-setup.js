import Knex from 'knex'

const knexConfig = {
  client: 'mysql',
  connection: {
    host: '172.19.0.2',
    user: 'root',
    password: 'sa214',
    database: 'objection_test'
  },
  pool: { min: 0, max: 7 }
}

process.env.NODE_ENV = 'test'
const kTestingEnvConfig = knexConfig
const testDatabaseName = kTestingEnvConfig.connection.database

console.log('TEST DATABASE: ' + kTestingEnvConfig.connection.database)

// Create the database
async function createTestDatabase() {
  const knex = Knex(kTestingEnvConfig)
  // not working
  // global.knex = knex

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
async function seedTestDatabase() {
  const knex = Knex(kTestingEnvConfig)

  try {
    await knex.migrate.latest()
    await knex.seed.run()
  } catch (error) {
    throw new Error(error)
  } finally {
    await knex.destroy()
  }
}

export default async () => {
  try {
    await createTestDatabase()
    await seedTestDatabase()
    console.log('Test database created successfully')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
