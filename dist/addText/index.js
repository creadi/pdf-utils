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
var path_1 = require("path");
var uuid_1 = require("uuid");
var utils_1 = require("../utils");
var createOverlays_1 = __importDefault(require("./createOverlays"));
var fixPage = function (pdfPath, dir) { return function (_a) {
    var page = _a.page, overlayPage = _a.overlayPage;
    return __awaiter(void 0, void 0, void 0, function () {
        var pagePath, tmpFile;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pagePath = dir + "/page-" + page + ".pdf";
                    return [4 /*yield*/, utils_1.run("pdftk " + pdfPath + " cat " + page + " output " + pagePath)];
                case 1:
                    _b.sent();
                    if (!overlayPage) {
                        return [2 /*return*/];
                    }
                    tmpFile = dir + "/" + uuid_1.v4() + ".pdf";
                    return [4 /*yield*/, utils_1.run("pdftk " + pagePath + " stamp " + overlayPage + " output " + tmpFile)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, utils_1.run("mv " + tmpFile + " " + pagePath)];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}; };
var stitchPages = function (dir, allPages) { return __awaiter(void 0, void 0, void 0, function () {
    var result, pages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = dir + "/" + uuid_1.v4() + ".pdf";
                pages = allPages.sort(function (a, b) { return a > b ? 1 : -1; }).map(function (d) { return dir + "/page-" + d + ".pdf"; });
                return [4 /*yield*/, utils_1.run("pdftk " + pages.join(' ') + " cat output " + result)];
            case 1:
                _a.sent();
                return [4 /*yield*/, utils_1.read(result)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.default = (function (tempFolder, body, path) { return __awaiter(void 0, void 0, void 0, function () {
    var dir, _a, totalPages, overlays, allPages, allPagesWithOverlay, buffer;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dir = path_1.resolve(tempFolder, uuid_1.v4());
                return [4 /*yield*/, utils_1.run("mkdir " + dir)];
            case 1:
                _b.sent();
                return [4 /*yield*/, createOverlays_1.default(dir, path, body)];
            case 2:
                _a = _b.sent(), totalPages = _a.totalPages, overlays = _a.overlays;
                allPages = Array.from(Array(totalPages)).map(function (d, i) { return i + 1; });
                allPagesWithOverlay = allPages
                    .map(function (page) { var _a; return ({ page: page, overlayPage: (_a = overlays.find(function (d) { return d.page === page; })) === null || _a === void 0 ? void 0 : _a.filePath }); });
                return [4 /*yield*/, Promise.all(allPagesWithOverlay.map(fixPage(path, dir)))];
            case 3:
                _b.sent();
                return [4 /*yield*/, stitchPages(dir, allPages)];
            case 4:
                buffer = _b.sent();
                return [4 /*yield*/, utils_1.run("rm -rf " + dir)];
            case 5:
                _b.sent();
                return [2 /*return*/, buffer];
        }
    });
}); });
