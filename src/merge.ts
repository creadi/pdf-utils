import { run } from './utils'
import { v4 } from 'uuid'

export default async (filePaths: string[], tempFolder: string) => {
  const fileName = `${v4()}.pdf`
  const result = `${tempFolder}/${fileName}`
  const buffer = await run(`pdftk ${filePaths.join(' ')} cat output ${result}`)
  await run(`rm ${result}`)
  return buffer
}
