"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const http_js_1 = require("../core/interfaces/http.js");
const user_controller_js_1 = require("./controller/user-controller.js");
const { readFile } = fs_1.promises;
async function ServeFile(req, res) {
    const indexHtmlPath = (0, path_1.resolve)(__dirname, '../static/index.html');
    const indexHtmlContent = await readFile(indexHtmlPath);
    res.header('Content-Type', 'text/html; charset=utf-8').send(indexHtmlContent);
}
const userRoutes = [
    new http_js_1.HttpRoute('get', '/', user_controller_js_1.ListUsers),
    new http_js_1.HttpRoute('get', '/:userId', user_controller_js_1.GetUser),
    new http_js_1.HttpRoute('post', '/', user_controller_js_1.CreateUser),
    new http_js_1.HttpRoute('patch', '/:userId', user_controller_js_1.PatchUser),
    new http_js_1.HttpRoute('get', '/config', user_controller_js_1.GetUserConfig),
];
const staticFile = [new http_js_1.HttpRoute('get', '/', ServeFile)];
function RegisterRoute(app) {
    app.registerRoutes(userRoutes, { prefix: '/api/v1/users' });
    app.registerRoutes(staticFile, { prefix: '/' });
}
exports.default = RegisterRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGUtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQThCO0FBQzlCLCtCQUErQjtBQUMvQix3REFLb0M7QUFDcEMsd0VBQTJHO0FBRTNHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFRLENBQUM7QUFFOUIsS0FBSyxVQUFVLFNBQVMsQ0FBQyxHQUFpQixFQUFFLEdBQWtCO0lBQzVELE1BQU0sYUFBYSxHQUFHLElBQUEsY0FBTyxFQUFDLFNBQVMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNoRixDQUFDO0FBTUQsTUFBTSxVQUFVLEdBQUc7SUFDakIsSUFBSSxtQkFBUyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsOEJBQVMsQ0FBQztJQUNwQyxJQUFJLG1CQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSw0QkFBTyxDQUFDO0lBQ3pDLElBQUksbUJBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLCtCQUFVLENBQUM7SUFDdEMsSUFBSSxtQkFBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsOEJBQVMsQ0FBQztJQUM3QyxJQUFJLG1CQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxrQ0FBYSxDQUFDO0NBQy9DLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksbUJBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFMUQsU0FBUyxhQUFhLENBQUMsR0FBZ0I7SUFDckMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUM1RCxHQUFHLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxrQkFBZSxhQUFhLENBQUMifQ==