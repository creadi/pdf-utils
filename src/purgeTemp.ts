import { run } from './utils'

export default async (tempFolder: string) => {
  await run(`rm -rf ${tempFolder}`)
  await run(`mkdir ${tempFolder}`)
  return
}