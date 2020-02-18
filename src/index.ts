import _addImage from './addImage'
import _addRect from './addRect'
import _addText from './addText'
import _bufferToFile from './bufferToFile'
import _countPages from './countPages'
import _extractText from './extractText'
import _keepPages from './keepPages'
import _merge from './merge'
import _purgeTemp from './purgeTemp'
import _removePages from './removePages'
import _render from './render'
import _replaceText from './replaceText'

export const addImage = _addImage
export const addRect = _addRect
export const addText = _addText
export const bufferToFile = _bufferToFile
export const countPages = _countPages
export const extractText = _extractText
export const keepPages = _keepPages
export const merge = _merge
export const purgeTemp = _purgeTemp
export const removePages = _removePages
export const render = _render
export const replaceText = _replaceText

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
}
