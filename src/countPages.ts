import { run } from './utils'

export default async (path: string): Promise<number> => {
  const d = await run(`pdftk ${path} dump_data | grep NumberOfPages`)
  const parts = d.split(':')
  return parts[1] ? Number(parts[1].trim()) : 0
}