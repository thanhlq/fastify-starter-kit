"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const knexfile_js_1 = __importDefault(require("../../knexfile.js"));
class DatabaseManager {
    static init() {
        const env = process.env.NODE_ENV;
        if (env) {
            DatabaseManager._knex = (0, knex_1.default)(knexfile_js_1.default[env]);
            objection_1.Model.knex(DatabaseManager._knex);
            return DatabaseManager._knex;
        }
        else {
            console.error('You must define the right NODE_ENV: test / development / production');
            process.exit(1);
        }
    }
    static getKnext() {
        return DatabaseManager._knex;
    }
}
exports.default = DatabaseManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFiYXNlLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBd0I7QUFDeEIseUNBQWtDO0FBQ2xDLG9FQUEyQztBQUUzQyxNQUFxQixlQUFlO0lBRzNCLE1BQU0sQ0FBQyxJQUFJO1FBRWhCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBRWpDLElBQUksR0FBRyxFQUFFO1lBQ1AsZUFBZSxDQUFDLEtBQUssR0FBRyxJQUFBLGNBQUksRUFBQyxxQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFJOUMsaUJBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWxDLE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQztTQUM5QjthQUFNO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQyxDQUFBO1lBQ3BGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDaEI7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVE7UUFDcEIsT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFBO0lBQzlCLENBQUM7Q0FFRjtBQXpCRCxrQ0F5QkMifQ==