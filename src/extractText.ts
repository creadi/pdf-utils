import { run } from './utils'

const initState = () => {
  let p = 0
  let size: number[]
  let pages: { page: number, text: string, size: number[] }[] = []
  let words: string[] = []
  return {
    newPage: (s: number[]) => {
      if (p !== 0) {
        pages = [...pages, { page: p, text: words.join(' '), size }]
      }
      p = p + 1
      words = []
      size = s
    },
    addWord: (word: string) => {
      if (word !== '') { words = [...words, word] }
    },
    getPages: () => pages
  }
}

interface State {
  newPage: (size: number[]) => void
  addWord: (word: string) => void
  getPages: () => {
    page: number
    text: string
    size: number[]
  }[]
}

const getWord = (line: string) =>
  ((line.split('>')[1] || '').split('<')[0] || '').trim()

const getSizePart = (part: 'width' | 'height') => (line: string) =>
  Number((line.split(`${part}="`)[1] || '').split('"')[0])

const getSize = (line: string) => ([
  getSizePart('width')(line),
  getSizePart('height')(line),
])

const readLine = (state: State) => (line: string) => {
  const l = line.trim()
  if (l.startsWith('<page')) {
    state.newPage(getSize(l))
  }
  if (l.startsWith('<word')) {
    state.addWord(getWord(l))
  }
}

const parseHtml = (html: string) => {
  const state: State = initState()
  const lines = html.split('\n')
  lines.forEach(readLine(state))
  state.newPage([0, 0])
  return state.getPages()
}

export default async (path: string) => {
  try {
    const html = await run(`pdftotext -bbox ${path} -`)
    return parseHtml(html)
  } catch (e) {
    throw e
  }
}