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
exports.setupMiddlewares = void 0;
const constants = __importStar(require("../../constants.js"));
const config = process.env;
async function setupMiddlewares(fastify) {
    const enableSwaggerDocs = config[constants.MIDDLEWARE_SWAGGER_DOC_CK] ==
        constants.MIDDLEWARE_SWAGGER_DOC_ON;
    if (enableSwaggerDocs) {
        const mSwagger = await (await Promise.resolve().then(() => __importStar(require('./fastify-swagger')))).default;
        mSwagger(fastify);
    }
}
exports.setupMiddlewares = setupMiddlewares;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtaWRkbGV3YXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsOERBQWdEO0FBRWhELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFM0IsS0FBSyxVQUFVLGdCQUFnQixDQUFDLE9BQXdCO0lBQ3RELE1BQU0saUJBQWlCLEdBQ3JCLE1BQU0sQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUM7UUFDM0MsU0FBUyxDQUFDLHlCQUF5QixDQUFDO0lBRXRDLElBQUksaUJBQWlCLEVBQUU7UUFDckIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLHdEQUFhLG1CQUFtQixHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDbkUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ25CO0FBQ0gsQ0FBQztBQUVRLDRDQUFnQiJ9