import Knex from 'knex'

// Description: the purpose of this script is to initialize (then destroy) test database.

const testDatabaseName = 'objection_test'

// Create the database
async function createTestDatabase() {
  const knex = Knex({
    client: 'mysql',
    connection: {
      host: '172.19.0.2',
      user: 'root',
      password: 'sa214',
      database: testDatabaseName
    },
  })

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
  const knex = Knex({
    client: 'mysql',
    connection: {
      host: '172.19.0.2',
      user: 'root',
      password: 'sa214',
      database: testDatabaseName
    },
  })

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
