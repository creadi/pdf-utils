const PdfPrinter = require('pdfmake/src/printer')

export type Font = 'Courier' | 'Helvetica'
export const fonts: Font[] = ['Courier', 'Helvetica']

const printer = (font: Font = 'Helvetica') => new PdfPrinter({
  Roboto: {
    normal: font,
    bold: `${font}-Bold`,
    italics: `${font}-Oblique`,
    bolditalics: `${font}-BoldOblique`,
  },
})

const createPdf = (dd: any, font?: Font): Promise<Buffer> => new Promise((resolve, reject) => {
  const doc = printer(font).createPdfKitDocument(dd)
  let chunks: any[] = []
  doc.on('data', (chunk: any) => chunks.push(chunk))
  doc.on('error', reject)
  doc.on('end', () => resolve(Buffer.concat(chunks)))
  doc.end()
})

export default (dd: any, font?: Font) =>
  createPdf(dd, font)
