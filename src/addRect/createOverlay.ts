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
      canvas: [{
        type: 'rect',
        x,
        y,
        w: width,
        h: height,
        color,
      }],
      absolutePosition: { x: 0, y: 0 },

    }],
  }
  return await render(dd)
}
