import { Font } from '../render'

export interface AddTextStyle {
  font?: Font
  fontSize?: number
}

export interface AddTextData {
  style?: AddTextStyle
  texts: {
    coordinates: number[]
    page: number
    fontSize?: number
    text: string
  }[]
}

export interface PageDefinition {
  page: number
  filePath: string
  documentDefinition: any
}
