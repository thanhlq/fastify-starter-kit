"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchUser = exports.CreateUser = exports.GetUserConfig = exports.GetUser = exports.ListUsers = void 0;
const index_js_1 = require("../../core/logger/index.js");
const User_js_1 = __importDefault(require("../../database/models/User.js"));
async function CreateUser(req, res) {
    const payload = req.body;
    const createdUser = await User_js_1.default.query().insert({
        ...payload,
    });
    res.send(createdUser);
}
exports.CreateUser = CreateUser;
async function GetUser(req, res) {
    const userId = req.params.userId;
    const user = await User_js_1.default.query().findById(userId);
    if (user) {
        res.send(user);
    }
    else {
        res.notFound('User is not found!');
    }
}
exports.GetUser = GetUser;
async function ListUsers(req, res) {
    const params = req.params;
    const users = await User_js_1.default.query();
    res.send(users);
}
exports.ListUsers = ListUsers;
async function PatchUser(req, res) {
    const partialPayload = req.body;
    const userId = req.params.userId;
    try {
        const dbResult = await User_js_1.default.forge().patch({
            ...partialPayload,
            updated_at: new Date()
        }).findById(userId);
        res.send(dbResult);
    }
    catch (e) {
        index_js_1.logger.error('Error happened when updating user');
        index_js_1.logger.error(e);
        res.badRequest();
    }
}
exports.PatchUser = PatchUser;
async function GetUserConfig(req, res) {
    res.send({
        role: 'admin',
    });
}
exports.GetUserConfig = GetUserConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLHlEQUFvRDtBQUNwRCw0RUFBaUQ7QUFLakQsS0FBSyxVQUFVLFVBQVUsQ0FBQyxHQUFnQixFQUFFLEdBQWlCO0lBQzNELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFFeEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxpQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxHQUFHLE9BQU87S0FDWCxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ3ZCLENBQUM7QUFYMkMsZ0NBQVU7QUFhdEQsS0FBSyxVQUFVLE9BQU8sQ0FBQyxHQUFnQixFQUFFLEdBQWlCO0lBQ3hELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBRWhDLE1BQU0sSUFBSSxHQUFHLE1BQU0saUJBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFakQsSUFBSSxJQUFJLEVBQUU7UUFDUixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hCO1NBQU07UUFDTCxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUE7S0FDbkM7QUFDSCxDQUFDO0FBdkJtQiwwQkFBTztBQXlCM0IsS0FBSyxVQUFVLFNBQVMsQ0FBQyxHQUFnQixFQUFFLEdBQWlCO0lBQzFELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7SUFDekIsTUFBTSxLQUFLLEdBQUcsTUFBTSxpQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQTdCUSw4QkFBUztBQStCbEIsS0FBSyxVQUFVLFNBQVMsQ0FBQyxHQUFnQixFQUFFLEdBQWlCO0lBQzFELE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7SUFDL0IsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFFaEMsSUFBSTtRQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0saUJBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDeEMsR0FBRyxjQUFjO1lBRWpCLFVBQVUsRUFBRSxJQUFJLElBQUksRUFBRTtTQUN2QixDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRW5CLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDbkI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLGlCQUFNLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUE7UUFDakQsaUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZixHQUFHLENBQUMsVUFBVSxFQUFFLENBQUE7S0FDakI7QUFDSCxDQUFDO0FBaER1RCw4QkFBUztBQWtEakUsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFnQixFQUFFLEdBQWlCO0lBQzlELEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDUCxJQUFJLEVBQUUsT0FBTztLQUNkLENBQUMsQ0FBQztBQUNMLENBQUM7QUF0RDRCLHNDQUFhIn0=