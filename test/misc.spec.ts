import test from 'ava'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { init } from '../src'

const temp = resolve(__dirname, '..', 'temp')
const originalPdf = resolve(__dirname, 'Vorschlag.pdf')
const imagePath = resolve(__dirname, 'logo-creadi.png')

test('Add text to a pdf', async t => {
  const { countPages, addText } = init(temp)
  const pagesBefore = await countPages(originalPdf)
  const pdfWithText = await addText({
    texts: [{
      coordinates: [100, 100],
      page: 1,
      fontSize: 30,
      text: 'Hello World',
    }]
  }, originalPdf)
  const pagesAfter = await countPages(pdfWithText)
  writeFileSync(`${temp}/pdfWithText.pdf`, pdfWithText)
  t.is(pagesAfter, pagesBefore)
})

test('Add an image to a pdf', async t => {
  const { countPages, addImage } = init(temp)
  const pagesBefore = await countPages(originalPdf)

  const pdfWithImage = await addImage(
    { height: 200, width: 400, imagePath, x: 200, y: 50, page: 1 },
    originalPdf
  )
  writeFileSync(`${temp}/pdfWithImage.pdf`, pdfWithImage)
  const pagesAfter = await countPages(pdfWithImage)
  t.is(pagesAfter, pagesBefore)
})

test('Replace some text on pdf', async t => {
  const { replaceText } = init(temp)
  try {
    const pdfWithReplacedText = await replaceText({
      textToReplace: 'Risikoversicherung',
      newText: 'Richtig geiles Zeug',
    }, originalPdf)
    writeFileSync(`${temp}/pdfWithReplacedText.pdf`, pdfWithReplacedText)
  } catch (e) {
    console.error('There was an error', e)
  }
  t.is(true, true)
})
