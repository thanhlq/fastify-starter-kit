import { Model } from 'objection';

export default class Organization extends Model {
  id!: string;
  name!: string;
  code!: string;
  parentId!: string;
  /* Root organization */
  master?: Organization;
  /* unit, master, subsidairy */
  organizationType?: string;
  website?: string;
  phone?: string;

  static tableName = 'organizations';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: { type: 'string' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      code: { type: 'string', maxLength: 64 },
    },
  };

  static relationMappings = () => ({
    master: {
      relation: Model.BelongsToOneRelation,
      // The related model.
      modelClass: Organization,

      join: {
        from: 'organizations.masterId',
        to: 'organizations.id',
      },
    },
  });
}
