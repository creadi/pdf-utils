import { exec } from 'child_process'
import { readFile, writeFile } from 'fs'
import { v4 } from 'uuid'
import { resolve as resolvePath } from 'path'
import countPages from './countPages'

export const run = (cmd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) { return reject(err) }
      if (stderr) { return reject(stderr) }
      return resolve(stdout)
    })
  })

export const read = (path: string): Promise<Buffer> =>
  new Promise((resolve, reject) =>
    readFile(path, (err, buffer) => err ? reject(err) : resolve(buffer)))

export const writeBuffer = (path: string, buffer: Buffer): Promise<void> =>
  new Promise((resolve, reject) =>
    writeFile(path, buffer, err => err ? reject(err) : resolve()))

export const extractPage = async (path: string, pageNumber: number, tempFolder: string) => {
  const id = v4()
  const numberOfPages = await countPages(path)
  const pages = Array.from(Array(numberOfPages)).map((d, i) => i + 1)
  const before = pages.filter(d => d < pageNumber)
  const after = pages.filter(d => d > pageNumber)
  const pageSelected = resolvePath(tempFolder, `page_${id}.pdf`)
  const pagesBefore = resolvePath(tempFolder, `before_${id}.pdf`)
  const pagesAfter = resolvePath(tempFolder, `after_${id}.pdf`)
  await Promise.all([
    run(`pdftk ${path} cat ${before.join(' ')} output ${pagesBefore}`),
    run(`pdftk ${path} cat ${pageNumber} output ${pageSelected}`),
    run(`pdftk ${path} cat ${after.join(' ')} output ${pagesAfter}`),
  ])
  return {
    pageSelected,
    pagesAfter,
    pagesBefore,
  }
}
