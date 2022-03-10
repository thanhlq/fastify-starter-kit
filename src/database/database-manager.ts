// Thanh LE

import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile.js';
import { logger } from '../core/logger/index.js';
import { COCKROACH_DB, MS_SQL_SERVER_DB, MYSQL_DB, POSTGRESQL_DB } from './db-contants.js';
import { IDbConfigugration } from './index.js';

export default class DatabaseManager {
  private static _instance: DatabaseManager;
  private _dbConfig: IDbConfigugration;
  public _knex;

  private constructor() {
    console.log('private');
  }

  public getDbConfig(): IDbConfigugration {
    return this._dbConfig;
  }

  private setupDBConnection(): DatabaseManager {
    if (!this._knex) {
      // Initialize knex.
      const env = process.env.NODE_ENV;
      logger.info(`Database initializing with env: [${env}/${process.env.ENV_TEST}]`)

      if (env) {
        this._dbConfig = knexConfig[env] as IDbConfigugration;
        logger.info(this._dbConfig, 'Db configurations')
        this._knex = Knex(this._dbConfig);
        // Bind all Models to a knex instance. If you only have one database in
        // your server this is all you have to do. For multi database systems, see
        // the Model.bindKnex() method.
        Model.knex(this._knex);
      } else {
        console.error(
          '[CRITICAL] [EXIST] You must define the right NODE_ENV: test / development / production',
        );
        process.exit(1);
      }
    }
    return this;
  }

  public static getInstance(): DatabaseManager {
    return DatabaseManager.init()
  }

  /**
   * Single instance for now.
   */
  public static init(): DatabaseManager {
    if (!DatabaseManager._instance) {
      DatabaseManager._instance = new DatabaseManager()
        .setupDBConnection()
    }

    return DatabaseManager._instance;
  }

  /**
   * Destroy the instance and close all connections.
   */
  public static close() {
    if (DatabaseManager._instance._knex) {
      DatabaseManager._instance._knex.destroy()
      DatabaseManager._instance._knex = null;
    }
  }

  public static getKnext() {
    return DatabaseManager._instance._knex;
  }

  public isPostgres() {
    return POSTGRESQL_DB === this._dbConfig?.client
  }

  public isMysql() {
    return MYSQL_DB === this._dbConfig?.client
  }

  public isSqlServer() {
    return MS_SQL_SERVER_DB === this._dbConfig?.client
  }

  public isCockroachDb() {
    return COCKROACH_DB === this._dbConfig?.client
  }

}
