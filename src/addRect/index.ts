import { v4 } from 'uuid'
import { resolve as resolvePath } from 'path'
import { run, read, writeBuffer, extractPage } from '../utils'
import createOverlay from './createOverlay'
import merge from '../merge'

export interface AddRectConfig {
  color?: string
  height: number
  page?: number
  width: number
  x: number
  y: number
}

const isString = (d: string | undefined): d is string => Boolean(d)

export default async (
  tempFolder: string,
  {
    height,
    color,
    page,
    width,
    x,
    y,
  }: AddRectConfig,
  path: string,
) => {

  const id = v4()
  const overlayBuffer = await createOverlay(color, width, height, x, y)
  const overlay = resolvePath(tempFolder, `overlay_${id}.pdf`)
  const resultFile = resolvePath(tempFolder, `${id}.pdf`)
  await writeBuffer(overlay, overlayBuffer)

  if (!page) {
    await run(`pdftk ${path} multistamp ${overlay} output ${resultFile}`)
    const result = await read(resultFile)
    await Promise.all([
      overlay,
      resultFile,
    ].map(d => run(`rm ${d}`)))
    return result
  }

  const {
    pageSelected,
    pagesAfter,
    pagesBefore,
  } = await extractPage(path, page, tempFolder)
  const fixed = resolvePath(tempFolder, `fixed_${id}.pdf`)
  await run(`pdftk ${pageSelected} stamp ${overlay} output ${fixed}`)
  const buffer = await merge([
    pagesBefore,
    fixed,
    pagesAfter,
  ].filter(isString), tempFolder)
  await Promise.all([
    pageSelected,
    pagesAfter,
    pagesBefore,
    fixed,
    overlay,
  ].map(d => run(`rm ${d}`)))

  return buffer
}
