import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile.js';

export default class DatabaseManager {
  public static _knex: any;

  public static init() {
    // Initialize knex.
    const env = process.env.NODE_ENV;

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

  public static getKnext(): any {
    return DatabaseManager._knex;
  }
}
