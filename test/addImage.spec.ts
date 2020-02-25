import test from 'ava'
import { resolve } from 'path'
import { init } from '../src'

const temp = resolve(__dirname, '..', 'temp')
const original = resolve(__dirname, '..', 'assets', 'original.pdf')
const logo = resolve(__dirname, '..', 'assets', 'Creadi.png')

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