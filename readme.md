# pdf-utils

Node bindings for [`pdftk`](https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/) and [`xpdf`](https://www.xpdfreader.com/). It is assumed these libraries are installed and that there is a file system.

## Docker

If using docker, install the above libraries by adding this to the `Dockerfile`:

```
## install pdftk
RUN apt update -y
RUN apt-get install software-properties-common -y
RUN add-apt-repository ppa:malteworld/ppa
RUN apt-get install pdftk -y

## install xpdf
RUN apt-get install xpdf -y

## install node
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install nodejs -y
```

## Initialize to avoid repeating `tempFolder`

`init()` takes the path to the temporary folder as argument and returns all the functions as below but curried and with `tempFolder` already set.

### Example use

```ts
import { init } from './index'

const tempFolder = `${__dirname}/temp`


const fixPolicy = await (inputPath: string, outputPath: string) => {

  const { removePages, addRect, addImage, replaceText, bufferToFile } = init(tempFolder)

  const removePage10 = removePages([10])

  const hidePaxLogo = addRect({
    width: 100,
    height: 40,
    x: 470,
    y: 25,
  })

  const addCreadiLogo = addImage({
    imagePath: image,
    width: 100,
    height: 40,
    x: 470,
    y: 25,
  })

  const replacePaxWithCreadi = replaceText({
    textToReplace: 'Pax, Schweizerische Lebensversicherungs-Gesellschaft AG',
    newText: 'Creadi AG',
  })

  const buffer = await pipeP(
    removePage10,
    hidePaxLogo,
    addCreadiLogo,
    replacePaxWithCreadi,
  )(inputPath)

  await bufferToFile(outputPath, buffer)

}

fixPolicy(
  `${__dirname}/pax_policy.pdf`,
  `${__dirname}/creadi_policy.pdf`
)
```

## Functions

For most of the following functions the input `pdf` can be the path to a pdf file or a buffer.

```ts
type PathOrBuffer = string | Buffer
```

### `addImage`

```ts
export interface AddImageConfig {
  height: number
  imagePath: string
  page?: number
  width: number
  x: number
  y: number
}

addImage: (tempFolder: string, config: AddImageConfig, pdf: PathOrBuffer) => Promise<Buffer>
```

If `config.page` is defined, the image will only be added to that page. Otherwise it will be added to all pages.

### `addRect`

Add a rectangle to hide previous content.

```ts
export interface AddRectConfig {
  color?: string
  height: number
  page?: number
  width: number
  x: number
  y: number
}

addRect: (tempFolder: string, config: AddRectConfig, pdf: PathOrBuffer) => Promise<Buffer>
```

If `config.color` is not defined, defaults to `white`.

If `config.page` is defined, the image will only be added to that page. Otherwise it will be added to all pages.

### `addText`

```ts
export interface AddTextStyle {
  font?: Font
  fontSize?: number
}

export interface AddTextConfig {
  style?: AddTextStyle
  texts: {
    coordinates: number[]
    page: number
    fontSize?: number
    text: string
  }[]
}

addText: (tempFolder: string, config: AddTextConfig, pdf: PathOrBuffer) => Promise<Buffer>
```

### `bufferToFile`

Save a buffer to a file

```ts
bufferToFile: (outputPath: string, buffer: Buffer) => Promise<void>
```

### `countPages`

```ts
(pdf: PathOrBuffer, tempFolder?: string | undefined) => Promise<number>
```

`tempFolder` only needs to be passed if `pdf` is a buffer. It will throw an error if `pdf` is a buffer and `tempFolder` is undefined.

### `extractText`

```ts
interface Text {
  page: number
  text: string
  size: number[]
}

extractText: (pdf: PathOrBuffer, tempFolder?: string | undefined) => Promise<Text[]>
```

`tempFolder` only needs to be passed if `pdf` is a buffer. It will throw an error if `pdf` is a buffer and `tempFolder` is undefined.

### `keepPages`

```ts
keepPages: (tempFolder: string, pagesToKeep: number[], pdf: PathOrBuffer) => Promise<Buffer>
```

### `merge`

```ts
merge: (filePaths: string[], tempFolder: string) => Promise<Buffer>
```

### `purgeTemp`

All functions clean up temporary files if they run successfully. This should be used in `catch` to clean up if something goes wrong

```ts
purgeTemp: (tempFolder: string) => Promise<void>
```

### `removePages`

```ts
removePages: (tempFolder: string, pagesToRemove: number[], pdf: PathOrBuffer) => Promise<Buffer>
```

### `render`

```ts
render: (dd: any, font?: "Courier" | "Helvetica" | undefined) => Promise<Buffer>
```

Where `dd` is a [pdfmake document definition](https://pdfmake.github.io/docs/document-definition-object/). There are no usable types for it but an excellent typed library to generate them with JSX: [pdfmakejsx](https://www.npmjs.com/package/pdfmakejsx) :-D

### `replaceText`

```ts
export interface ReplaceTextConfig {
  newText: string
  page?: number
  textToReplace: string
}


replaceText: (tempFolder: string, config: ReplaceTextConfig, pdf: PathOrBuffer) => Promise<Buffer>
```
