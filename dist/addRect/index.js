"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var path_1 = require("path");
var utils_1 = require("../utils");
var createOverlay_1 = __importDefault(require("./createOverlay"));
var merge_1 = __importDefault(require("../merge"));
exports.default = (function (tempFolder, _a, path) {
    var height = _a.height, color = _a.color, page = _a.page, width = _a.width, x = _a.x, y = _a.y;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, overlayBuffer, overlay, resultFile, result, _b, pageSelected, pagesAfter, pagesBefore, fixed, buffer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = uuid_1.v4();
                    return [4 /*yield*/, createOverlay_1.default(color, width, height, x, y)];
                case 1:
                    overlayBuffer = _c.sent();
                    overlay = path_1.resolve(tempFolder, "overlay_" + id + ".pdf");
                    resultFile = path_1.resolve(tempFolder, id + ".pdf");
                    return [4 /*yield*/, utils_1.writeBuffer(overlay, overlayBuffer)];
                case 2:
                    _c.sent();
                    if (!!page) return [3 /*break*/, 6];
                    return [4 /*yield*/, utils_1.run("pdftk " + path + " multistamp " + overlay + " output " + resultFile)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, utils_1.read(resultFile)];
                case 4:
                    result = _c.sent();
                    return [4 /*yield*/, Promise.all([
                            overlay,
                            resultFile,
                        ].map(function (d) { return utils_1.run("rm " + d); }))];
                case 5:
                    _c.sent();
                    return [2 /*return*/, result];
                case 6: return [4 /*yield*/, utils_1.extractPage(path, page, tempFolder)];
                case 7:
                    _b = _c.sent(), pageSelected = _b.pageSelected, pagesAfter = _b.pagesAfter, pagesBefore = _b.pagesBefore;
                    fixed = path_1.resolve(tempFolder, "fixed_" + id + ".pdf");
                    return [4 /*yield*/, utils_1.run("pdftk " + pageSelected + " stamp " + overlay + " output " + fixed)];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, merge_1.default([
                            pagesBefore,
                            fixed,
                            pagesAfter,
                        ], tempFolder)];
                case 9:
                    buffer = _c.sent();
                    return [4 /*yield*/, Promise.all([
                            pageSelected,
                            pagesAfter,
                            pagesBefore,
                            fixed,
                            overlay,
                        ].map(function (d) { return utils_1.run("rm " + d); }))];
                case 10:
                    _c.sent();
                    return [2 /*return*/, buffer];
            }
        });
    });
});
