"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestData = void 0;
const database_manager_1 = __importDefault(require("../../src/database/database-manager"));
const TestData = __importStar(require("./db.json"));
exports.TestData = TestData;
class DbHelper {
    static async setupDb() {
        console.log('INITIALIZING DB CONNECTION....');
        DbHelper.knex = database_manager_1.default.init();
        await this.eraseAllData();
    }
    static async eraseAllData() {
        console.log('ERASING ALL DB DATA....');
        const knex = DbHelper.knex;
        await knex('users_groups').del();
        await knex('groups').del();
        await knex('users').del();
        await knex('organizations').del();
    }
}
exports.default = DbHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGItaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRkFBaUU7QUFFakUsb0RBQXFDO0FBeUI3Qiw0QkFBUTtBQXZCaEIsTUFBcUIsUUFBUTtJQUlwQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU87UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1FBQzdDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsMEJBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUN0QyxNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUN0QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO1FBRTFCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQzFCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ3pCLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ25DLENBQUM7Q0FHRjtBQXJCRCwyQkFxQkMifQ==