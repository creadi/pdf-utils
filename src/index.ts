import _bufferToFile from './bufferToFile'
import _extractText from './extractText'
import _keepPages from './keepPages'
import _merge from './merge'
import _removePages from './removePages'
import _render from './render'

export const bufferToFile = _bufferToFile
export const extractText = _extractText
export const keepPages = _keepPages
export const merge = _merge
export const removePages = _removePages
export const render = _render

export default {
  bufferToFile,
  extractText,
  keepPages,
  merge,
  removePages,
  render,
}