"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var mime_types_1 = __importDefault(require("mime-types"));
exports.default = (function (imagePath) {
    return new Promise(function (resolve, reject) {
        fs_1.readFile(imagePath, 'base64', function (err, file) {
            return err ? reject(err) : resolve("data:" + mime_types_1.default.lookup(imagePath) + ";base64," + file);
        });
    });
});
