import { resolve as resolvePath } from 'path'
import { v4 } from 'uuid'
import merge from './merge'
import { extractPage, read, run } from './utils'

export interface ReplaceTextConfig {
  newText: string
  page?: number
  textToReplace: string
}

const isString = (d: string | undefined): d is string => Boolean(d)

function isRunningOnMac() {
  return process.platform === 'darwin'
}

const replaceText =  async (path: string, textToReplace: string, newText: string, tempFolder: string) => {
  const id = v4()
  const getFilePath = (prefix: string) => resolvePath(tempFolder, `${prefix}_${id}.pdf`)
  const uncompressed = getFilePath(`uncompressed`)
  const fixed = getFilePath(`fixed`)
  const result = getFilePath(`result`)

  // uncompress
  await run(`pdftk ${path} output ${uncompressed} uncompress`)
  // replace
  let sedCommand = `sed -e "s/${textToReplace}/${newText}/g" < ${uncompressed} > ${fixed}`
  if (isRunningOnMac()) {
    console.debug('Runninc on a Mac. Prefixing sed command with "LC_ALL=C"')
    sedCommand = `LC_ALL=C ${sedCommand}`
  }
  await run(sedCommand)
  // compress
  await run(`pdftk ${fixed} output ${result} compress`)

  // clean up
  await Promise.all([
    await run(`rm ${uncompressed}`),
    await run(`rm ${fixed}`),
  ])

  return result
}

export default async (
  tempFolder: string,
  { textToReplace, newText, page }: ReplaceTextConfig,
  path: string
) => {

  if (!page) {
    const result = await replaceText(path, textToReplace, newText, tempFolder)
    const buffer = await read(result)
    await run(`rm ${result}`)
    return buffer
  }

  const {
    pageSelected,
    pagesAfter,
    pagesBefore,
  } = await extractPage(path, page, tempFolder)

  const fixed = await replaceText(pageSelected, textToReplace, newText, tempFolder)
  const buffer = await merge([
    pagesBefore,
    fixed,
    pagesAfter,
  ].filter(isString), tempFolder)
  await Promise.all([
    pageSelected,
    pagesAfter,
    pagesBefore,
  ].map(d => run(`rm ${d}`)))

  return buffer

}