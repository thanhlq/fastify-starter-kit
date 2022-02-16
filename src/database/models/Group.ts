import { Model } from 'objection';
import Organization from './Organization';
import User from './User';

export default class Group extends Model {
  id!: string;
  name!: string;
  code?: string;
  parent?: Group;
  children?: Group[];
  /* dept, ext, whatever by the business's customization */
  groupType?: string;
  organization?: string;
  users?: User[];

  // Table name is the only required property.
  static tableName = 'organizations';

  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: { type: 'string' },
      orgId: { type: 'string', minLength: 1, maxLength: 36 },
      parentId: { type: 'string', minLength: 1, maxLength: 36 },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      code: { type: 'string', maxLength: 64 },
      groupType: { type: 'string', maxLength: 64 },
    },
  };

  static relationMappings = () => ({
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'groups.id',

        // ManyToMany relation needs the `through` object to describe the join table.
        through: {
          from: 'users_groups.groupId',
          to: 'users_groups.userId',
        },

        to: 'users.id',
      },
    },

    master: {
      relation: Model.BelongsToOneRelation,
      // The related model.
      modelClass: Organization,

      join: {
        from: 'organizations.masterId',
        to: 'organizations.id',
      },
    },

    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: Group,
      join: {
        from: 'groups.parentId',
        to: 'groups.id',
      },
    },

    children: {
      relation: Model.HasManyRelation,
      modelClass: Group,
      join: {
        from: 'groups.id',
        to: 'groups.parentId',
      },
    },
  });
}
