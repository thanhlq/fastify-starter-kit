import Knex from 'knex';
import knexConfig from './knexfile';
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';

export default class DatabaseManager {
  public static init() {
    // Initialize knex.
    const knex = Knex(knexConfig.development);

    // Bind all Models to a knex instance. If you only have one database in
    // your server this is all you have to do. For multi database systems, see
    // the Model.bindKnex() method.
    Model.knex(knex);
  }
}
