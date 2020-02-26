import { pathOr, uniq, propEq, prop, propOr } from 'ramda'
import { parse as parsePath } from 'path'
import { AddTextData, AddTextStyle, PageDefinition } from './'
import render from '../render'
import extractText from '../extractText'
import { writeBuffer } from '../utils'

const renderPage = (style: AddTextStyle) => async ({ filePath, documentDefinition }: PageDefinition) =>
  writeBuffer(filePath, await render(documentDefinition, style.font))

export default async (dir: string, path: string, data: AddTextData) => {

  const defaultStyle: AddTextStyle = {
    font: pathOr('Helvetica', ['style', 'font'], data),
    fontSize: pathOr(12, ['style', 'fontSize'], data),
  }

  const pageContent = await extractText(path)
  const totalPages = pageContent.length
  const getSize = (pageNumber: number): { width: number, height: number } | {} => {
    const size: number[] | undefined = propOr(undefined, 'size', pageContent.find(propEq('page', pageNumber)))
    if (size) { return { width: size[0], height: size[1] } }
    return {}
  }

  const pageNumbers = uniq(data.texts.map(prop('page')))
  const pages: PageDefinition[] = pageNumbers.map(page => ({
    page,
    filePath: `${dir}/overlay-${page}.pdf`,
    documentDefinition: {
      pageSize: getSize(page),
      content: data.texts
      .filter(propEq('page', page))
      .map(({ text, coordinates, fontSize }) => ({
        text,
        absolutePosition: { x: coordinates[0], y: coordinates[1] },
        fontSize: fontSize || defaultStyle.fontSize,
      })),
    },
  }))

  await Promise.all(pages.map(renderPage(defaultStyle)))
  return {
    totalPages,
    overlays: pages.map(({ page, filePath }) => ({ page, filePath })),
  }
}
