import render from '../render'

export default async (
  imageBase64: string,
  width: number,
  height: number,
  x: number,
  y: number,
): Promise<Buffer> => {
  const dd = {
    content: [{
      image: imageBase64,
      fit: [width, height],
      absolutePosition: { x, y },
    }]
  }
  return await render(dd)
}
