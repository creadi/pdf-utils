import { run, read } from './utils'
import { resolve as resolvePath } from 'path'
import { v4 } from 'uuid'

export default async (tempFolder: string, pagesToKeep: number[], path: string) => {
  const resultName = v4()
  const pathToResult = resolvePath(tempFolder, `${resultName}.pdf`)
  await run(`pdftk ${path} cat ${pagesToKeep.join(' ')} output ${pathToResult}`)
  const buffer = await read(pathToResult)
  await run(`rm ${pathToResult}`)
  return buffer
}
