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
  const before = pageNumber === 1 ? [] : pages.filter(d => d < pageNumber)
  const after = pageNumber === numberOfPages ? [] : pages.filter(d => d > pageNumber)

  const pageSelected = resolvePath(tempFolder, `page_${id}.pdf`)
  const pagesBefore = pageNumber === 1 ? undefined : resolvePath(tempFolder, `before_${id}.pdf`)
  const pagesAfter = pageNumber === numberOfPages ? undefined : resolvePath(tempFolder, `after_${id}.pdf`)

  const extract = async (pages: number[], file?: string) =>
    pages.length === 0 && Boolean(file)
      ? null
      : run(`pdftk ${path} cat ${pages.join(' ')} output ${file}`)

  await Promise.all([
    extract(before, pagesBefore),
    extract([pageNumber], pageSelected),
    extract(after, pagesAfter),
  ])

  return {
    pageSelected,
    pagesAfter,
    pagesBefore,
  }
}
