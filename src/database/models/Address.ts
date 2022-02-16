import { Model } from 'objection';
import Organization from './Organization';
import User from './User';

export default class Address extends Model {
  id!: number;
  line1!: string;
  line2?: string;
  state?: string;
  zipCode?: string;
  city?: string;
  countryCode?: string;
  /* home, work, .. */
  addressType?: string;
  owner?: User;
  organization?: Organization;
  tenantId?: string;

  // Table name is the only required property.
  static tableName = 'addresses';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['line1'],

    properties: {
      id: { type: 'integer' },
      orgId: { type: 'string', minLength: 1, maxLength: 36 },
      ownerId: { type: ['integer', 'null'] },
      line1: { type: 'string', minLength: 1, maxLength: 255 },
      addressLine2: { type: 'string', maxLength: 255 },
      zipCode: { type: 'string', minLength: 3, maxLength: 10 },
      state: { type: 'string', maxLength: 128 },
      city: { type: 'string', maxLength: 128 },
      countryCode: { type: 'string', minLength: 2, maxLength: 128 },
    },
  };

  static relationMappings = () => ({
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,

      join: {
        from: 'addresses.ownerId',
        to: 'users.id',
      },
    },
    Organization: {
      relation: Model.BelongsToOneRelation,
      // The related model.
      modelClass: Organization,

      join: {
        from: 'addresses.orgId',
        to: `organizations.id'`,
      },
    },
  });
}
