"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Organization_js_1 = __importDefault(require("./Organization.js"));
const User_js_1 = __importDefault(require("./User.js"));
class Address extends objection_1.Model {
}
exports.default = Address;
Address.tableName = 'addresses';
Address.jsonSchema = {
    type: 'object',
    required: ['line1'],
    properties: {
        id: { type: 'string' },
        orgId: { type: 'string', minLength: 1, maxLength: 36 },
        ownerId: { type: ['string', 'null'] },
        line1: { type: 'string', minLength: 1, maxLength: 255 },
        addressLine2: { type: 'string', maxLength: 255 },
        zipCode: { type: 'string', minLength: 3, maxLength: 10 },
        state: { type: 'string', maxLength: 128 },
        city: { type: 'string', maxLength: 128 },
        countryCode: { type: 'string', minLength: 2, maxLength: 128 },
    },
};
Address.relationMappings = () => ({
    owner: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: User_js_1.default,
        join: {
            from: 'addresses.ownerId',
            to: 'users.id',
        },
    },
    Organization: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Organization_js_1.default,
        join: {
            from: 'addresses.orgId',
            to: `organizations.id'`,
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBa0M7QUFFbEMsd0VBQTZDO0FBQzdDLHdEQUE2QjtBQUU3QixNQUFxQixPQUFRLFNBQVEsaUJBQUs7O0FBQTFDLDBCQTBEQztBQTNDUSxpQkFBUyxHQUFHLFdBQVcsQ0FBQztBQUt4QixrQkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRSxRQUFRO0lBQ2QsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBRW5CLFVBQVUsRUFBRTtRQUNWLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDdEIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7UUFDdEQsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ3JDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3ZELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUNoRCxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtRQUN4RCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDekMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3hDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFO0tBQzlEO0NBQ0YsQ0FBQztBQUVLLHdCQUFnQixHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDL0IsS0FBSyxFQUFFO1FBQ0wsUUFBUSxFQUFFLGlCQUFLLENBQUMsb0JBQW9CO1FBQ3BDLFVBQVUsRUFBRSxpQkFBSTtRQUVoQixJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLEVBQUUsRUFBRSxVQUFVO1NBQ2Y7S0FDRjtJQUNELFlBQVksRUFBRTtRQUNaLFFBQVEsRUFBRSxpQkFBSyxDQUFDLG9CQUFvQjtRQUVwQyxVQUFVLEVBQUUseUJBQVk7UUFFeEIsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixFQUFFLEVBQUUsbUJBQW1CO1NBQ3hCO0tBQ0Y7Q0FDRixDQUFDLENBQUMifQ==