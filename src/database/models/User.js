"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Address_js_1 = __importDefault(require("./Address.js"));
const BaseModel_js_1 = __importDefault(require("./BaseModel.js"));
const Group_js_1 = __importDefault(require("./Group.js"));
const Organization_js_1 = __importDefault(require("./Organization.js"));
class User extends BaseModel_js_1.default {
    static forge() {
        return User.query();
    }
}
exports.default = User;
User.tableName = 'users';
User.jsonSchema = {
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
User.modifiers = {
    searchByName(query, name) {
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
User.relationMappings = () => ({
    organization: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Organization_js_1.default,
        join: {
            from: 'users.orgId',
            to: 'organizations.id',
        },
    },
    groups: {
        relation: objection_1.Model.ManyToManyRelation,
        modelClass: Group_js_1.default,
        join: {
            from: 'users.id',
            through: {
                from: 'users_groups.userId',
                to: 'users_groups.groupId',
            },
            to: 'groups.id',
        },
    },
    addresses: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: Address_js_1.default,
        join: {
            from: 'users.id',
            to: 'addresses.ownerId',
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBK0Q7QUFDL0QsOERBQW1DO0FBQ25DLGtFQUF1QztBQUN2QywwREFBK0I7QUFDL0Isd0VBQTZDO0FBRTdDLE1BQXFCLElBQUssU0FBUSxzQkFBUztJQWlHekMsTUFBTSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNyQixDQUFDOztBQW5HSCx1QkFvR0M7QUExRlEsY0FBUyxHQUFHLE9BQU8sQ0FBQztBQUtwQixlQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO0lBRW5DLFVBQVUsRUFBRTtRQUNWLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtRQUNyQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtRQUN0RCxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUMzRCxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUMxRCxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBRXZCLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0JBQzFCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7Z0JBQ3hCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7YUFDNUI7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUdLLGNBQVMsR0FBYztJQUs1QixZQUFZLENBQUMsS0FBSyxFQUFFLElBQUk7UUFHdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQixLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQy9DLEtBQUssTUFBTSxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUU7b0JBQzlDLEtBQUssQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUU7d0JBQ25DLE1BQU07d0JBQ04sUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUc7cUJBQzdCLENBQUMsQ0FBQztpQkFDSjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQztBQUlLLHFCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDL0IsWUFBWSxFQUFFO1FBQ1osUUFBUSxFQUFFLGlCQUFLLENBQUMsb0JBQW9CO1FBR3BDLFVBQVUsRUFBRSx5QkFBWTtRQUN4QixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsYUFBYTtZQUNuQixFQUFFLEVBQUUsa0JBQWtCO1NBQ3ZCO0tBQ0Y7SUFFRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsaUJBQUssQ0FBQyxrQkFBa0I7UUFDbEMsVUFBVSxFQUFFLGtCQUFLO1FBQ2pCLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxVQUFVO1lBRWhCLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUscUJBQXFCO2dCQUMzQixFQUFFLEVBQUUsc0JBQXNCO2FBQzNCO1lBQ0QsRUFBRSxFQUFFLFdBQVc7U0FDaEI7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULFFBQVEsRUFBRSxpQkFBSyxDQUFDLGVBQWU7UUFDL0IsVUFBVSxFQUFFLG9CQUFPO1FBQ25CLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxVQUFVO1lBQ2hCLEVBQUUsRUFBRSxtQkFBbUI7U0FDeEI7S0FDRjtDQUNGLENBQUMsQ0FBQyJ9