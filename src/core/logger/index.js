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
exports.LoggerFactory = exports.logger = exports.InitLogger = void 0;
const pino_1 = require("pino");
const constants = __importStar(require("../constants.js"));
const env = process.env;
const InitLogger = () => {
    let logger;
    if (!constants.isProduction) {
        const transport = pino_1.pino.transport({
            target: 'pino-pretty',
            options: { colorize: true },
        });
        logger = (0, pino_1.pino)({
            level: env.LOG_LEVEL || 'debug',
            translateTime: 'HH:MM:ss Z',
        }, transport);
    }
    else {
        logger = (0, pino_1.pino)({
            level: env.LOG_LEVEL || 'info',
        });
    }
    return logger;
};
exports.InitLogger = InitLogger;
const logger = (0, exports.InitLogger)();
exports.logger = logger;
class LoggerFactory {
    static createLogger() {
        return logger;
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsK0JBQTRCO0FBQzVCLDJEQUE2QztBQUU3QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRWpCLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUM3QixJQUFJLE1BQU0sQ0FBQztJQUVYLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFO1FBQzNCLE1BQU0sU0FBUyxHQUFHLFdBQUksQ0FBQyxTQUFTLENBQUM7WUFDL0IsTUFBTSxFQUFFLGFBQWE7WUFDckIsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtTQUM1QixDQUFDLENBQUM7UUFDSCxNQUFNLEdBQUcsSUFBQSxXQUFJLEVBQ1g7WUFDRSxLQUFLLEVBQUUsR0FBRyxDQUFDLFNBQVMsSUFBSSxPQUFPO1lBQy9CLGFBQWEsRUFBRSxZQUFZO1NBRTVCLEVBQ0QsU0FBUyxDQUNWLENBQUM7S0FDSDtTQUFNO1FBQ0wsTUFBTSxHQUFHLElBQUEsV0FBSSxFQUFDO1lBQ1osS0FBSyxFQUFFLEdBQUcsQ0FBQyxTQUFTLElBQUksTUFBTTtTQUMvQixDQUFDLENBQUM7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQXZCVyxRQUFBLFVBQVUsY0F1QnJCO0FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBQSxrQkFBVSxHQUFFLENBQUM7QUFDbkIsd0JBQU07QUFFZixNQUFhLGFBQWE7SUFDakIsTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0NBQ0Y7QUFKRCxzQ0FJQyJ9