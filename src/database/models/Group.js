"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Organization_js_1 = __importDefault(require("./Organization.js"));
const User_js_1 = __importDefault(require("./User.js"));
class Group extends objection_1.Model {
}
exports.default = Group;
Group.tableName = 'organizations';
Group.jsonSchema = {
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
Group.relationMappings = () => ({
    users: {
        relation: objection_1.Model.ManyToManyRelation,
        modelClass: User_js_1.default,
        join: {
            from: 'groups.id',
            through: {
                from: 'users_groups.groupId',
                to: 'users_groups.userId',
            },
            to: 'users.id',
        },
    },
    master: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Organization_js_1.default,
        join: {
            from: 'organizations.masterId',
            to: 'organizations.id',
        },
    },
    parent: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
            from: 'groups.parentId',
            to: 'groups.id',
        },
    },
    children: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Group,
        join: {
            from: 'groups.id',
            to: 'groups.parentId',
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFrQztBQUNsQyx3RUFBNkM7QUFDN0Msd0RBQTZCO0FBRTdCLE1BQXFCLEtBQU0sU0FBUSxpQkFBSzs7QUFBeEMsd0JBMEVDO0FBOURRLGVBQVMsR0FBRyxlQUFlLENBQUM7QUFFNUIsZ0JBQVUsR0FBRztJQUNsQixJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUVsQixVQUFVLEVBQUU7UUFDVixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ3RCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1FBQ3RELFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1FBQ3pELElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3RELElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtRQUN2QyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7S0FDN0M7Q0FDRixDQUFDO0FBRUssc0JBQWdCLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMvQixLQUFLLEVBQUU7UUFDTCxRQUFRLEVBQUUsaUJBQUssQ0FBQyxrQkFBa0I7UUFDbEMsVUFBVSxFQUFFLGlCQUFJO1FBQ2hCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxXQUFXO1lBR2pCLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixFQUFFLEVBQUUscUJBQXFCO2FBQzFCO1lBRUQsRUFBRSxFQUFFLFVBQVU7U0FDZjtLQUNGO0lBRUQsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLGlCQUFLLENBQUMsb0JBQW9CO1FBRXBDLFVBQVUsRUFBRSx5QkFBWTtRQUV4QixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsd0JBQXdCO1lBQzlCLEVBQUUsRUFBRSxrQkFBa0I7U0FDdkI7S0FDRjtJQUVELE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxpQkFBSyxDQUFDLG9CQUFvQjtRQUNwQyxVQUFVLEVBQUUsS0FBSztRQUNqQixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLEVBQUUsRUFBRSxXQUFXO1NBQ2hCO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUixRQUFRLEVBQUUsaUJBQUssQ0FBQyxlQUFlO1FBQy9CLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxXQUFXO1lBQ2pCLEVBQUUsRUFBRSxpQkFBaUI7U0FDdEI7S0FDRjtDQUNGLENBQUMsQ0FBQyJ9