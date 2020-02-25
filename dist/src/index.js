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
var uuid_1 = require("uuid");
var path_1 = require("path");
var addImage_1 = __importDefault(require("./addImage"));
var addRect_1 = __importDefault(require("./addRect"));
var addText_1 = __importDefault(require("./addText"));
var bufferToFile_1 = __importDefault(require("./bufferToFile"));
var countPages_1 = __importDefault(require("./countPages"));
var extractText_1 = __importDefault(require("./extractText"));
var keepPages_1 = __importDefault(require("./keepPages"));
var merge_1 = __importDefault(require("./merge"));
var purgeTemp_1 = __importDefault(require("./purgeTemp"));
var removePages_1 = __importDefault(require("./removePages"));
var render_1 = __importDefault(require("./render"));
var replaceText_1 = __importDefault(require("./replaceText"));
var utils_1 = require("./utils");
var isBuffer = function (d) { return Buffer.isBuffer(d); };
var maybeFromBufferWithConfig = function (func) { return function (tempFolder, config, pdf) { return __awaiter(void 0, void 0, void 0, function () {
    var path, buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isBuffer(pdf)) return [3 /*break*/, 4];
                path = path_1.resolve(tempFolder, uuid_1.v4() + ".pdf");
                return [4 /*yield*/, utils_1.writeBuffer(path, pdf)];
            case 1:
                _a.sent();
                return [4 /*yield*/, func(tempFolder, config, path)];
            case 2:
                buffer = _a.sent();
                return [4 /*yield*/, utils_1.run("rm " + path)];
            case 3:
                _a.sent();
                return [2 /*return*/, buffer];
            case 4: return [4 /*yield*/, func(tempFolder, config, pdf)];
            case 5: return [2 /*return*/, _a.sent()];
        }
    });
}); }; };
var maybeFromBuffer = function (func) { return function (pdf, tempFolder) { return __awaiter(void 0, void 0, void 0, function () {
    var path, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isBuffer(pdf)) return [3 /*break*/, 5];
                if (!tempFolder) return [3 /*break*/, 4];
                path = path_1.resolve(tempFolder, uuid_1.v4() + ".pdf");
                return [4 /*yield*/, utils_1.writeBuffer(path, pdf)];
            case 1:
                _a.sent();
                return [4 /*yield*/, func(path)];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, utils_1.run("rm " + path)];
            case 3:
                _a.sent();
                return [2 /*return*/, result];
            case 4: throw new Error('tempFolder needs to be defined if passing a buffer');
            case 5: return [4 /*yield*/, func(pdf)];
            case 6: return [2 /*return*/, _a.sent()];
        }
    });
}); }; };
exports.addImage = maybeFromBufferWithConfig(addImage_1.default);
exports.addRect = maybeFromBufferWithConfig(addRect_1.default);
exports.addText = maybeFromBufferWithConfig(addText_1.default);
exports.bufferToFile = bufferToFile_1.default;
exports.countPages = maybeFromBuffer(countPages_1.default);
exports.extractText = maybeFromBuffer(extractText_1.default);
exports.keepPages = maybeFromBufferWithConfig(keepPages_1.default);
exports.merge = merge_1.default;
exports.purgeTemp = purgeTemp_1.default;
exports.removePages = maybeFromBufferWithConfig(removePages_1.default);
exports.render = render_1.default;
exports.replaceText = maybeFromBufferWithConfig(replaceText_1.default);
exports.init = function (pathToTempFolder) {
    var tempFolder = pathToTempFolder;
    return {
        addImage: ramda_1.curry(exports.addImage)(tempFolder),
        addRect: ramda_1.curry(exports.addRect)(tempFolder),
        addText: ramda_1.curry(exports.addText)(tempFolder),
        bufferToFile: ramda_1.curry(function (path, buffer) { return exports.bufferToFile(path, buffer); }),
        countPages: function (pdf) { return exports.countPages(pdf, tempFolder); },
        extractText: function (pdf) { return exports.extractText(pdf, tempFolder); },
        keepPages: ramda_1.curry(exports.keepPages)(tempFolder),
        merge: function (filePaths) { return exports.merge(filePaths, tempFolder); },
        purgeTemp: function () { return exports.purgeTemp(tempFolder); },
        removePages: ramda_1.curry(exports.removePages)(tempFolder),
        render: exports.render,
        replaceText: ramda_1.curry(exports.replaceText)(tempFolder),
    };
};
exports.default = {
    addImage: exports.addImage,
    addRect: exports.addRect,
    addText: exports.addText,
    bufferToFile: exports.bufferToFile,
    countPages: exports.countPages,
    extractText: exports.extractText,
    keepPages: exports.keepPages,
    merge: exports.merge,
    purgeTemp: exports.purgeTemp,
    removePages: exports.removePages,
    render: exports.render,
    replaceText: exports.replaceText,
    init: exports.init,
};
