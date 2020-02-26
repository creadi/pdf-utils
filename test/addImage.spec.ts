import test from 'ava'
import { readdir } from 'fs'
import { promisify } from 'util'
import { resolve } from 'path'
import { init, purgeTemp } from '../src'
import { extractPage, run } from '../src/utils'

const temp = resolve(__dirname, '..', 'temp')
const original = resolve(__dirname, '..', 'assets', 'original.pdf')
const logo = resolve(__dirname, '..', 'assets', 'Creadi.png')

test.after(async t => {
  const filesInTemp = await promisify(readdir)(temp)
  t.is(filesInTemp.length, 0)
  await purgeTemp(temp)
})

test('extractPage', async t => {
  const { countPages } = init(temp)
  const totalPages = await countPages(original)
  const { pageSelected, pagesAfter, pagesBefore } = await extractPage(original, 1, temp)
  const extractedPages = await countPages(pageSelected)
    + (pagesAfter ? await countPages(pagesAfter) : 0)
    + (pagesBefore ? await countPages(pagesBefore) : 0)
  t.is(totalPages, extractedPages)
  await Promise.all([
    pageSelected,
    pagesAfter,
    pagesBefore,
  ].filter(Boolean).map(d => run(`rm ${d}`)))
})

test('addImage', async t => {
  const { countPages, addImage } = init(temp)
  const pagesBefore = await countPages(original)
  const withImage = await addImage(
    { height: 50, width: 100, imagePath: logo, x: 200, y: 50, page: 1 },
    original
  )
  const pagesAfter = await countPages(withImage)
  t.is(pagesAfter, pagesBefore)
})

test('addText', async t => {
  const { addText, addRect } = init(temp)
  await addText({ texts: [{ coordinates: [100, 100], text: 'Hello', page: 3 }, { coordinates: [100, 100], text: 'world', page: 4 }] }, original)
  await addRect({ height: 100, width: 20, x: 100, y: 100 }, original)
  t.true(true)
})