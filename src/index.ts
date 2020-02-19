import { curry } from 'ramda'
import { v4 } from 'uuid'
import { resolve as resolvePath } from 'path'
import _addImage, { AddImageConfig } from './addImage'
import _addRect, { AddRectConfig } from './addRect'
import _addText, { AddTextConfig } from './addText'
import _bufferToFile from './bufferToFile'
import _countPages from './countPages'
import _extractText from './extractText'
import _keepPages from './keepPages'
import _merge from './merge'
import _purgeTemp from './purgeTemp'
import _removePages from './removePages'
import _render from './render'
import _replaceText, { ReplaceTextConfig } from './replaceText'
import { writeBuffer, run } from './utils'

type PathOrBuffer = string | Buffer

const isBuffer = (d: PathOrBuffer): d is Buffer => Buffer.isBuffer(d)

type Func<T> = (tempFolder: string, config: T, path: string) => Promise<Buffer>

const maybeFromBuffer = <T>(func: Func<T>) => async(
  tempFolder: string,
  config: T,
  pdf: PathOrBuffer
) => {
  if (isBuffer(pdf)) {
    const path = resolvePath(tempFolder, `${v4()}.pdf`)
    await writeBuffer(path, pdf)
    const buffer = await func(tempFolder, config, path)
    await run(`rm ${path}`)
    return buffer
  }
  return await func(tempFolder, config, pdf)
}

export const addImage = maybeFromBuffer<AddImageConfig>(_addImage)
export const addRect = maybeFromBuffer<AddRectConfig>(_addRect)
export const addText = maybeFromBuffer<AddTextConfig>(_addText)
export const bufferToFile = _bufferToFile
export const countPages = _countPages
export const extractText = _extractText
export const keepPages = maybeFromBuffer<number[]>(_keepPages)
export const merge = _merge
export const purgeTemp = _purgeTemp
export const removePages = maybeFromBuffer<number[]>(_removePages)
export const render = _render
export const replaceText = maybeFromBuffer<ReplaceTextConfig>(_replaceText)

export const init = (pathToTempFolder: string) => {
  const tempFolder = pathToTempFolder
  return {
    addImage: curry(addImage)(tempFolder),
    addRect: curry(addRect)(tempFolder),
    addText: curry(addText)(tempFolder),
    bufferToFile: curry((path: string, buffer: Buffer) => bufferToFile(path, buffer)),
    countPages,
    extractText,
    keepPages: curry(keepPages)(tempFolder),
    merge: (filePaths: string[]) => merge(filePaths, tempFolder),
    purgeTemp: () => purgeTemp(tempFolder),
    removePages: curry(removePages)(tempFolder),
    render,
    replaceText: curry(replaceText)(tempFolder),
  }
}

export default {
  addImage,
  addRect,
  addText,
  bufferToFile,
  countPages,
  extractText,
  keepPages,
  merge,
  purgeTemp,
  removePages,
  render,
  replaceText,
  init,
}
