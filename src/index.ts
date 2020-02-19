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

type FuncWithConfig<T> = (tempFolder: string, config: T, path: string) => Promise<Buffer>

const maybeFromBufferWithConfig = <T>(func: FuncWithConfig<T>) => async(
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

type Func<T> = (path: string) => Promise<T>

const maybeFromBuffer = <T>(func: Func<T>) => async (pdf: PathOrBuffer, tempFolder?: string): Promise<T> => {
  if (isBuffer(pdf)) {
    if (tempFolder) {
      const path = resolvePath(tempFolder, `${v4()}.pdf`)
      await writeBuffer(path, pdf)
      const result = await func(path)
      await run(`rm ${path}`)
      return result
    }
    throw new Error('tempFolder needs to be defined if passing a buffer')
  }
  return await func(pdf)
}

export const addImage = maybeFromBufferWithConfig<AddImageConfig>(_addImage)
export const addRect = maybeFromBufferWithConfig<AddRectConfig>(_addRect)
export const addText = maybeFromBufferWithConfig<AddTextConfig>(_addText)
export const bufferToFile = _bufferToFile
export const countPages = maybeFromBuffer(_countPages)
export const extractText = maybeFromBuffer(_extractText)
export const keepPages = maybeFromBufferWithConfig<number[]>(_keepPages)
export const merge = _merge
export const purgeTemp = _purgeTemp
export const removePages = maybeFromBufferWithConfig<number[]>(_removePages)
export const render = _render
export const replaceText = maybeFromBufferWithConfig<ReplaceTextConfig>(_replaceText)

export const init = (pathToTempFolder: string) => {
  const tempFolder = pathToTempFolder
  return {
    addImage: curry(addImage)(tempFolder),
    addRect: curry(addRect)(tempFolder),
    addText: curry(addText)(tempFolder),
    bufferToFile: curry((path: string, buffer: Buffer) => bufferToFile(path, buffer)),
    countPages: (pdf: PathOrBuffer) => countPages(pdf, tempFolder),
    extractText: (pdf: PathOrBuffer) => extractText(pdf, tempFolder),
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
