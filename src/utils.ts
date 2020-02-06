import { exec } from 'child_process'
import { readFile, writeFile } from 'fs'

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