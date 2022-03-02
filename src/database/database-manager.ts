import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile.js';
import { logger } from '../core/logger/index.js';

export default class DatabaseManager {
  public static _knex;

  private constructor() {
    console.log('private');
  }

  public static init() {
    if (!DatabaseManager._knex) {
      // Initialize knex.
      const env = process.env.NODE_ENV;
      logger.info(`Database initializing with env: [${env}/${process.env.ENV_TEST}]`)

      if (env) {
        DatabaseManager._knex = Knex(knexConfig[env]);
        // Bind all Models to a knex instance. If you only have one database in
        // your server this is all you have to do. For multi database systems, see
        // the Model.bindKnex() method.
        Model.knex(DatabaseManager._knex);

        return DatabaseManager._knex;
      } else {
        console.error(
          '[CRITICAL] [EXIST] You must define the right NODE_ENV: test / development / production',
        );
        process.exit(1);
      }
    }
  }

  /**
   * Destroy the instance and close all connections.
   */
  public static close() {
    if (DatabaseManager._knex) {
      DatabaseManager._knex.destroy()
      DatabaseManager._knex = null;
    }
  }

  public static getKnext(): any {
    return DatabaseManager._knex;
  }
}
