import { parse as parsePath, resolve as resolvePath } from 'path'
import { v4 } from 'uuid'
import { run, read } from '../utils'
import createOverlays from './createOverlays'
import { AddTextData } from './types'

interface P {page: number, overlayPage?: string}

const fixPage = (pdfPath: string, dir: string) => async ({ page, overlayPage }: P) => {
  const pagePath = `${dir}/page-${page}.pdf`
  await run(`pdftk ${pdfPath} cat ${page} output ${pagePath}`)
  if (!overlayPage) { return }
  const tmpFile = `${dir}/${v4()}.pdf`
  await run(`pdftk ${pagePath} stamp ${overlayPage} output ${tmpFile}`)
  await run(`mv ${tmpFile} ${pagePath}`)
  return
}

const stitchPages = async (dir: string, allPages: number[]) => {
  const result = `${dir}/${v4()}.pdf`
  const pages = allPages.sort((a, b) => a > b ? 1 : -1).map(d => `${dir}/page-${d}.pdf`)
  await run(`pdftk ${pages.join(' ')} cat output ${result}`)
  return await read(result)
}

export default async (path: string, body: AddTextData, tempFolder: string) => {
  const dir = resolvePath(tempFolder, v4())
  await run(`mkdir ${dir}`)
  const { totalPages, overlays } = await createOverlays(path, body)
  const allPages = Array.from(Array(totalPages)).map((d, i) => i + 1)
  const allPagesWithOverlay: P[] = allPages
    .map(page => ({ page, overlayPage: overlays.find(d => d.page === page)?.filePath }))
  await Promise.all(allPagesWithOverlay.map(fixPage(path, dir)))
  const buffer = await stitchPages(dir, allPages)
  await run(`rm -rf ${dir}`)
  return buffer
}

