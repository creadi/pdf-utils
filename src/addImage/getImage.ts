import { readFile } from 'fs'
import mime from 'mime-types'

export default (imagePath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    readFile(imagePath, 'base64', (err, file) =>
      err ? reject(err) : resolve(`data:${mime.lookup(imagePath)};base64,${file}`)
    )
  })