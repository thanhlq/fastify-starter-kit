"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class Organization extends objection_1.Model {
}
exports.default = Organization;
Organization.tableName = 'organizations';
Organization.jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        code: { type: 'string', maxLength: 64 },
    },
};
Organization.relationMappings = () => ({
    master: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: Organization,
        join: {
            from: 'organizations.masterId',
            to: 'organizations.id',
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnYW5pemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3JnYW5pemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQWtDO0FBRWxDLE1BQXFCLFlBQWEsU0FBUSxpQkFBSzs7QUFBL0MsK0JBcUNDO0FBekJRLHNCQUFTLEdBQUcsZUFBZSxDQUFDO0FBRTVCLHVCQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFFbEIsVUFBVSxFQUFFO1FBQ1YsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtRQUN0QixJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRTtRQUN0RCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7S0FDeEM7Q0FDRixDQUFDO0FBRUssNkJBQWdCLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMvQixNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsaUJBQUssQ0FBQyxvQkFBb0I7UUFFcEMsVUFBVSxFQUFFLFlBQVk7UUFFeEIsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixFQUFFLEVBQUUsa0JBQWtCO1NBQ3ZCO0tBQ0Y7Q0FDRixDQUFDLENBQUMifQ==