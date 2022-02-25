"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const { readFile } = fs_1.promises;
async function indexController(fastify) {
    fastify.get('/', async function (_request, reply) {
        const indexHtmlPath = (0, path_1.resolve)(__dirname, '../../static/index.html');
        const indexHtmlContent = await readFile(indexHtmlPath);
        reply
            .header('Content-Type', 'text/html; charset=utf-8')
            .send(indexHtmlContent);
    });
}
exports.default = indexController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LWNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQkFBOEI7QUFDOUIsK0JBQStCO0FBRS9CLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxhQUFRLENBQUM7QUFFZixLQUFLLFVBQVUsZUFBZSxDQUFDLE9BQXdCO0lBRXBFLE9BQU8sQ0FBQyxHQUFHLENBQ1QsR0FBRyxFQUNILEtBQUssV0FBVyxRQUF3QixFQUFFLEtBQW1CO1FBQzNELE1BQU0sYUFBYSxHQUFHLElBQUEsY0FBTyxFQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsS0FBSzthQUNGLE1BQU0sQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUM7YUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUNGLENBQUM7QUFDSixDQUFDO0FBWkQsa0NBWUMifQ==