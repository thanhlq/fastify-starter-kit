// Update with your config settings.

const config = process.env

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'mysql',
    connection: {
      host: config.DB_HOST,
      user: 'root',
      password: 'sa214',
      database: 'objection_dev'
    },
    pool: { min: 0, max: 7 }
  },

  test: {
    client: 'mysql',
    connection: {
      host: config.DB_HOST,
      user: 'root',
      password: 'sa214',
      database: 'objection_test'
    },
    pool: { min: 0, max: 7 }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: config.DB_HOST,
      database: 'objection_staging',
      user: 'root',
      password: 'sa214'
    },
    pool: {
      min: 3,
      max: 30
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: config.DB_CLIENT || 'mysql',
    connection: {
      host: config.DB_HOST,
      port: config.DB_PORT || 3306,
      database: config.DB_NAME,
      user: config.DB_USER,
      password: config.DB_PASSWORD
    },
    pool: {
      min: 3,
      max: 300
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
