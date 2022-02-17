/* Knex configuation */
/* Thanh LE */
/* Last update: 2022/02/15 */

module.exports = {
  development: {
    client: 'mysql',
    debug: true,
    connection: {
      host: '172.19.0.2',
      user: 'root',
      password: 'sa214',
      database: 'objection_test'
    },
    pool: { min: 0, max: 7 }
  },

  test: {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      filename: './example.db',
    },
    pool: {
      // @ts-ignore
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      },
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'example',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
}
