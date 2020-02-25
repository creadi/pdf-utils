"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PdfPrinter = require('pdfmake/src/printer');
exports.fonts = ['Courier', 'Helvetica'];
var printer = function (font) {
    if (font === void 0) { font = 'Helvetica'; }
    return new PdfPrinter({
        Roboto: {
            normal: font,
            bold: font + "-Bold",
            italics: font + "-Oblique",
            bolditalics: font + "-BoldOblique",
        },
    });
};
var createPdf = function (dd, font) { return new Promise(function (resolve, reject) {
    var doc = printer(font).createPdfKitDocument(dd);
    var chunks = [];
    doc.on('data', function (chunk) { return chunks.push(chunk); });
    doc.on('error', reject);
    doc.on('end', function () { return resolve(Buffer.concat(chunks)); });
    doc.end();
}); };
exports.default = (function (dd, font) {
    return createPdf(dd, font);
});
