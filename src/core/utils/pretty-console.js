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
exports.PrettyConsoleChalk = void 0;
const chalk = __importStar(require("chalk"));
let log = console.log;
log(chalk.blue('chalk enabled'));
class PrettyConsoleChalk {
    constructor() {
        this.c = chalk;
    }
    blue(message) {
        if (this.c) {
            console.log(this.c.blue(message));
        }
        return this;
    }
    red(message) {
        if (this.c) {
            log(this.c.red(message));
        }
        return this;
    }
    green(message) {
        if (this.c) {
            log(this.c.green(message));
        }
        return this;
    }
    bgRed() {
        if (this.c) {
            this.c.bgRed();
        }
        return this;
    }
    bgGreen() {
        if (this.c) {
            this.c.bgGreen();
        }
        return this;
    }
    bgBlue() {
        if (this.c) {
            this.c.bgBlue();
        }
        return this;
    }
}
exports.PrettyConsoleChalk = PrettyConsoleChalk;
exports.default = { CreatePrettyConsoleLog: new PrettyConsoleChalk() };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldHR5LWNvbnNvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmV0dHktY29uc29sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQThCO0FBaUI5QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBR3JCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7QUFFaEMsTUFBYSxrQkFBa0I7SUFJN0I7UUFDRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWU7UUFDbEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ2xDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsR0FBRyxDQUFDLE9BQWU7UUFDakIsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxLQUFLLENBQUMsT0FBZTtRQUNuQixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDVixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNqQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFBO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBRUY7QUE3Q0QsZ0RBNkNDO0FBRUQsa0JBQWUsRUFBQyxzQkFBc0IsRUFBRSxJQUFJLGtCQUFrQixFQUFFLEVBQUMsQ0FBQSJ9