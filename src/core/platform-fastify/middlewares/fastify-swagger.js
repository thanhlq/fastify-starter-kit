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
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_swagger_1 = require("fastify-swagger");
const path = __importStar(require("path"));
const index_js_1 = require("../../logger/index.js");
const config = process.env;
const docPath = path.join(global.appRoot, 'documents/openapi-full.yaml');
const docBaseDir = path.join(global.appRoot, 'documents');
index_js_1.logger.debug('Document path: ' + docPath);
index_js_1.logger.debug('Document base dir: ' + docBaseDir);
const FastifySwagger = (fastify) => {
    fastify.register(fastify_swagger_1.fastifySwagger, {
        mode: 'static',
        routePrefix: '/documentation',
        specification: {
            path: docPath,
            postProcessor: function (swaggerObject) {
                return swaggerObject;
            },
            baseDir: docBaseDir
        },
        exposeRoute: true,
    });
    index_js_1.logger.info('Openapi documents registered!');
};
exports.default = FastifySwagger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFzdGlmeS1zd2FnZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFzdGlmeS1zd2FnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLHFEQUFpRDtBQUNqRCwyQ0FBNEI7QUFFNUIsb0RBQStDO0FBRS9DLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDM0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDZCQUE2QixDQUFDLENBQUE7QUFDeEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBQ3pELGlCQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxDQUFBO0FBQ3pDLGlCQUFNLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLFVBQVUsQ0FBQyxDQUFBO0FBRWhELE1BQU0sY0FBYyxHQUFHLENBQUMsT0FBd0IsRUFBRSxFQUFFO0lBRWxELE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0NBQWMsRUFBRTtRQUMvQixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFBRSxnQkFBZ0I7UUFDN0IsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLE9BQU87WUFDYixhQUFhLEVBQUUsVUFBVSxhQUFhO2dCQUNwQyxPQUFPLGFBQWEsQ0FBQTtZQUN0QixDQUFDO1lBQ0QsT0FBTyxFQUFFLFVBQVU7U0FDcEI7UUFDRCxXQUFXLEVBQUUsSUFBSTtLQUNsQixDQUFDLENBQUE7SUFFRixpQkFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0FBRTlDLENBQUMsQ0FBQztBQUVGLGtCQUFlLGNBQWMsQ0FBQyJ9