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
var ramda_1 = require("ramda");
var path_1 = require("path");
var render_1 = __importDefault(require("../render"));
var extractText_1 = __importDefault(require("../extractText"));
var utils_1 = require("../utils");
var renderPage = function (style) { return function (_a) {
    var filePath = _a.filePath, documentDefinition = _a.documentDefinition;
    return __awaiter(void 0, void 0, void 0, function () { var _b, _c; return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _b = utils_1.writeBuffer;
                _c = [filePath];
                return [4 /*yield*/, render_1.default(documentDefinition, style.font)];
            case 1: return [2 /*return*/, _b.apply(void 0, _c.concat([_d.sent()]))];
        }
    }); });
}; };
exports.default = (function (path, data) { return __awaiter(void 0, void 0, void 0, function () {
    var dir, defaultStyle, pageContent, totalPages, getSize, pageNumbers, pages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dir = path_1.parse(path).dir;
                defaultStyle = {
                    font: ramda_1.pathOr('Helvetica', ['style', 'font'], data),
                    fontSize: ramda_1.pathOr(12, ['style', 'fontSize'], data),
                };
                return [4 /*yield*/, extractText_1.default(path)];
            case 1:
                pageContent = _a.sent();
                totalPages = pageContent.length;
                getSize = function (pageNumber) {
                    var size = ramda_1.propOr(undefined, 'size', pageContent.find(ramda_1.propEq('page', pageNumber)));
                    if (size) {
                        return { width: size[0], height: size[1] };
                    }
                    return {};
                };
                pageNumbers = ramda_1.uniq(data.texts.map(ramda_1.prop('page')));
                pages = pageNumbers.map(function (page) { return ({
                    page: page,
                    filePath: dir + "/overlay-" + page + ".pdf",
                    documentDefinition: {
                        pageSize: getSize(page),
                        content: data.texts
                            .filter(ramda_1.propEq('page', page))
                            .map(function (_a) {
                            var text = _a.text, coordinates = _a.coordinates, fontSize = _a.fontSize;
                            return ({
                                text: text,
                                absolutePosition: { x: coordinates[0], y: coordinates[1] },
                                fontSize: fontSize || defaultStyle.fontSize,
                            });
                        }),
                    },
                }); });
                return [4 /*yield*/, Promise.all(pages.map(renderPage(defaultStyle)))];
            case 2:
                _a.sent();
                return [2 /*return*/, {
                        totalPages: totalPages,
                        overlays: pages.map(function (_a) {
                            var page = _a.page, filePath = _a.filePath;
                            return ({ page: page, filePath: filePath });
                        }),
                    }];
        }
    });
}); });
