import { run, read } from './utils'
import { resolve as resolvePath } from 'path'
import { v4 } from 'uuid'

const getPagesToKeep = (pages: number[]) =>
  Array.from(Array(Math.max(...pages) + 1))
    .map((d, i) => i + 1)
    .filter(d => !pages.includes(d))
    .join(' ') + '-end'

export default async (path: string, pagesToRemove: number[], tempFolder: string) => {
  const resultName = v4()
  const pathToResult = resolvePath(tempFolder, `${resultName}.pdf`)
  await run(`pdftk ${path} cat ${getPagesToKeep(pagesToRemove)} output ${pathToResult}`)
  const buffer = await read(pathToResult)
  await run(`rm ${pathToResult}`)
  return buffer
}