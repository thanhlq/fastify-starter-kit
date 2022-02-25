"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const FastifyCors = (fastify) => {
    fastify.register(fastify_cors_1.default, () => {
        return (req, cb) => {
            let corsOptions;
            const origin = req.headers.origin || '';
            if (/localhost/.test(origin)) {
                corsOptions = { origin: false };
            }
            else {
                corsOptions = { origin: true };
            }
            cb(null, corsOptions);
        };
    });
};
exports.default = FastifyCors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFzdGlmeS1jb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFzdGlmeS1jb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsZ0VBQXVDO0FBTXZDLE1BQU0sV0FBVyxHQUFHLENBQUMsT0FBd0IsRUFBRSxFQUFFO0lBQy9DLE9BQU8sQ0FBQyxRQUFRLENBQUMsc0JBQVcsRUFBRSxHQUFHLEVBQUU7UUFDakMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNqQixJQUFJLFdBQVcsQ0FBQztZQUNoQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFFeEMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM1QixXQUFXLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsV0FBVyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLGtCQUFlLFdBQVcsQ0FBQyJ9