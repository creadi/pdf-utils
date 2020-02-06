import _bufferToFile from './bufferToFile'
import _extractText from './extractText'
import _keepPages from './keepPages'
import _merge from './merge'
import _removePages from './removePages'

export const bufferToFile = _bufferToFile
export const extractText = _extractText
export const keepPages = _keepPages
export const merge = _merge
export const removePages = _removePages

export default {
  bufferToFile,
  extractText,
  keepPages,
  merge,
  removePages,
}