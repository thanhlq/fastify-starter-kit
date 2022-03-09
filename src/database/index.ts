export * from './database-manager.js';
export * from './db-helper.js';
export * from './models';

export interface IDbConnectionPool {
  min?: number;
  max?: number;
}

export interface IDbConnection {
  host?: string;
  port?: number
  user?: string;
  password?: string;
  database?: string;
}

export interface IDbConfigugration {
  client?: string,
  version?: string,
  connection?: IDbConnection,
  pool?: IDbConnectionPool
}
