import { Model, Modifiers } from 'objection';
import Organization from './Organization';
import Address from './Address';
import Group from './Group';

export default class User extends Model {
  id?: number;
  firstName?: string;
  lastName?: string;
  age?: number;

  organization?: Organization;
  organizations?: Organization[];
  groups?: Group[];

  // Table name is the only required property.
  static tableName = 'users';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName'],

    properties: {
      id: { type: 'string', maxLength: 36 },
      orgId: { type: 'string', minLength: 1, maxLength: 36 },
      firstName: { type: 'string', minLength: 1, maxLength: 255 },
      lastName: { type: 'string', minLength: 1, maxLength: 255 },
      age: { type: 'number' },

      address: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          zipCode: { type: 'string' },
        },
      },
    },
  };

  // Modifiers are reusable query snippets that can be used in various places.
  static modifiers: Modifiers = {
    // Our example modifier is a a semi-dumb fuzzy name match. We split the
    // name into pieces using whitespace and then try to partially match
    // each of those pieces to both the `firstName` and the `lastName`
    // fields.
    searchByName(query, name) {
      // This `where` simply creates parentheses so that other `where`
      // statements don't get mixed with the these.
      query.where(query => {
        for (const namePart of name.trim().split(/\s+/)) {
          for (const column of ['firstName', 'lastName']) {
            query.orWhereRaw('lower(??) like ?', [
              column,
              namePart.toLowerCase() + '%',
            ]);
          }
        }
      });
    },
  };

  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  static relationMappings = () => ({
    organization: {
      relation: Model.BelongsToOneRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: Organization,
      join: {
        from: 'users.orgId',
        to: 'organizations.id',
      },
    },

    groups: {
      relation: Model.ManyToManyRelation,
      modelClass: Group,
      join: {
        from: 'users.id',
        // ManyToMany relation needs the `through` object to describe the join table.
        through: {
          from: 'users_groups.userId',
          to: 'users_groups.groupId',
        },
        to: 'groups.id',
      },
    },

    addresses: {
      relation: Model.HasManyRelation,
      modelClass: Address,
      join: {
        from: 'users.id',
        to: 'addresses.ownerId',
      },
    },
  });
}
