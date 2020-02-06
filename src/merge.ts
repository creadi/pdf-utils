import { run, read } from './utils'
import { v4 } from 'uuid'

export default async (filePaths: string[], tempFolder: string) => {
  const fileName = `${v4()}.pdf`
  const result = `${tempFolder}/${fileName}`
  await run(`pdftk ${filePaths.join(' ')} cat output ${result}`)
  const buffer = await read(result)
  await run(`rm ${result}`)
  return buffer
}
