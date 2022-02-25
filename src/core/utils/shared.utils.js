"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = exports.nanoId = exports.isSymbol = exports.isEmpty = exports.isNil = exports.isConstructor = exports.isNumber = exports.isString = exports.isFunction = exports.stripEndSlash = exports.normalizePath = exports.validatePath = exports.addLeadingSlash = exports.isPlainObject = exports.isObject = exports.isUndefined = void 0;
const nanoid_1 = require("nanoid");
const uuid_1 = require("uuid");
const isUndefined = (obj) => typeof obj === 'undefined';
exports.isUndefined = isUndefined;
const isObject = (fn) => !(0, exports.isNil)(fn) && typeof fn === 'object';
exports.isObject = isObject;
const isPlainObject = (fn) => {
    if (!(0, exports.isObject)(fn)) {
        return false;
    }
    const proto = Object.getPrototypeOf(fn);
    if (proto === null) {
        return true;
    }
    const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
        proto.constructor;
    return (typeof ctor === 'function' &&
        ctor instanceof ctor &&
        Function.prototype.toString.call(ctor) ===
            Function.prototype.toString.call(Object));
};
exports.isPlainObject = isPlainObject;
const addLeadingSlash = (path) => path && typeof path === 'string'
    ? path.charAt(0) !== '/'
        ? '/' + path
        : path
    : '';
exports.addLeadingSlash = addLeadingSlash;
exports.validatePath = exports.addLeadingSlash;
const normalizePath = (path) => path
    ? path.startsWith('/')
        ? ('/' + path.replace(/\/+$/, '')).replace(/\/+/g, '/')
        : '/' + path.replace(/\/+$/, '')
    : '/';
exports.normalizePath = normalizePath;
const stripEndSlash = (path) => path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;
exports.stripEndSlash = stripEndSlash;
const isFunction = (val) => typeof val === 'function';
exports.isFunction = isFunction;
const isString = (val) => typeof val === 'string';
exports.isString = isString;
const isNumber = (val) => typeof val === 'number';
exports.isNumber = isNumber;
const isConstructor = (val) => val === 'constructor';
exports.isConstructor = isConstructor;
const isNil = (val) => (0, exports.isUndefined)(val) || val === null;
exports.isNil = isNil;
const isEmpty = (array) => !(array && array.length > 0);
exports.isEmpty = isEmpty;
const isSymbol = (val) => typeof val === 'symbol';
exports.isSymbol = isSymbol;
const nanoId = () => { return (0, nanoid_1.nanoid)(); };
exports.nanoId = nanoId;
const uuid = () => { return (0, uuid_1.v4)(); };
exports.uuid = uuid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmVkLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUErQjtBQUMvQiwrQkFBaUM7QUFHMUIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxHQUFRLEVBQW9CLEVBQUUsQ0FDeEQsT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFDO0FBRGhCLFFBQUEsV0FBVyxlQUNLO0FBRXRCLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBTyxFQUFnQixFQUFFLENBQ2hELENBQUMsSUFBQSxhQUFLLEVBQUMsRUFBRSxDQUFDLElBQUksT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDO0FBRDFCLFFBQUEsUUFBUSxZQUNrQjtBQUVoQyxNQUFNLGFBQWEsR0FBRyxDQUFDLEVBQU8sRUFBZ0IsRUFBRTtJQUNyRCxJQUFJLENBQUMsSUFBQSxnQkFBUSxFQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtRQUNsQixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsTUFBTSxJQUFJLEdBQ1IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUM7UUFDMUQsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUNwQixPQUFPLENBQ0wsT0FBTyxJQUFJLEtBQUssVUFBVTtRQUMxQixJQUFJLFlBQVksSUFBSTtRQUNwQixRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDekMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQWpCVyxRQUFBLGFB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