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
const httpCoreFramework = process.env.CORE_FRAMEWORK || 'fastify';
class HttpServerFactory {
    static async CreateServerInstance(opts) {
        try {
            const frameworkImplImportPath = `./platform-${httpCoreFramework}/index.js`;
            const adapterImport = await Promise.resolve().then(() => __importStar(require(frameworkImplImportPath)));
            const appFactory = adapterImport.HttpServerFactory;
            const app = appFactory.createServer(opts);
            return app;
        }
        catch (e) {
            console.error('Error when creating server instance by factory!', e);
            throw e;
        }
    }
}
exports.default = HttpServerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1zZXJ2ZXItZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAtc2VydmVyLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxTQUFTLENBQUM7QUFFbEUsTUFBcUIsaUJBQWlCO0lBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsSUFBUztRQUN6QyxJQUFJO1lBQ0YsTUFBTSx1QkFBdUIsR0FBRyxjQUFjLGlCQUFpQixXQUFXLENBQUM7WUFDM0UsTUFBTSxhQUFhLEdBQUcsd0RBQWEsdUJBQXVCLEdBQUMsQ0FBQztZQUM1RCxNQUFNLFVBQVUsR0FBdUIsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1lBQ3ZFLE1BQU0sR0FBRyxHQUFnQixVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEUsTUFBTSxDQUFDLENBQUM7U0FDVDtJQUNILENBQUM7Q0FDRjtBQWJELG9DQWFDIn0=