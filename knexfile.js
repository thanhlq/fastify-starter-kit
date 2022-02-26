// Update with your config settings.

const config = process.env

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },
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
      user:     'root',
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
    client: 'mysql',
    connection: {
      host: config.DB_HOST,
      database: 'objection_prod',
      user:     'root',
      password: 'sa214'
    },
    pool: {
      min: 3,
      max: 300
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
