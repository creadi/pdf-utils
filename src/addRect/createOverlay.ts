import render from '../render'

export default async (
  color: string = 'white',
  width: number,
  height: number,
  x: number,
  y: number,
): Promise<Buffer> => {
  const dd = {
    content: [{
      svg: `<svg viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${color}" /></svg>`,
      width,
      height,
      absolutPosition: { x, y }
    }]
  }
  return await render(dd)
}
