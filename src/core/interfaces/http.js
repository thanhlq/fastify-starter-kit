"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRoute = exports.HttpHandlerFnNull = void 0;
async function HttpHandlerFnNull(req, res) {
    return Promise.resolve(true);
}
exports.HttpHandlerFnNull = HttpHandlerFnNull;
class HttpRoute {
    constructor(method, path, handler, opts) {
        this.method = method || 'all';
        this.path = path || '/';
        this.handler = handler;
        this.opts = opts;
    }
}
exports.HttpRoute = HttpRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBc1FPLEtBQUssVUFBVSxpQkFBaUIsQ0FDckMsR0FBaUIsRUFDakIsR0FBa0I7SUFFbEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFMRCw4Q0FLQztBQWFELE1BQWEsU0FBUztJQU1wQixZQUNFLE1BQWUsRUFDZixJQUFhLEVBQ2IsT0FBdUIsRUFDdkIsSUFBVTtRQUVWLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBakJELDhCQWlCQyJ9