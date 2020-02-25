import test from 'ava'
import { resolve } from 'path'
import { init, purgeTemp } from '../src'
import { extractPage } from '../src/utils'

const temp = resolve(__dirname, '..', 'temp')
const original = resolve(__dirname, '..', 'assets', 'original.pdf')
const logo = resolve(__dirname, '..', 'assets', 'Creadi.png')

test.after(async () => {
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
})

test('addimage', async t => {
  const { countPages, addImage } = init(temp)
  const pagesBefore = await countPages(original)
  const withImage = await addImage(
    { height: 50, width: 100, imagePath: logo, x: 200, y: 50, page: 1 },
    original
  )
  const pagesAfter = await countPages(withImage)
  t.is(pagesAfter, pagesBefore)
})
