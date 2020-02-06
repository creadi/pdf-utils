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

## Functions

### `extractText`

```ts
(path: string) => Promise<{
  page: number;
  text: string;
  size: number[];
}[]>
```

Where `path` is the path to the pdf we want to extract data from.

### `bufferToFile`

```ts
(path: string, buffer: Buffer) => Promise<void>
```

Where `path` is where you want the file to be saved.

### `merge`

```ts
(filePaths: string[], tempFolder: string) => Promise<Buffer>
```

Where `filePaths` is an array of paths to pdf files in the order they should be merged and `tempFolder` is an existing folder where temporary files can be stored.

### `removePages`

```ts
(path: string, pagesToRemove: number[], tempFolder: string) => Promise<Buffer>
```

### `keepPages`

```ts
(path: string, pagesToKeep: number[], tempFolder: string) => Promise<Buffer>
```

### `render`

```ts
(dd: any, font?: "Courier" | "Helvetica" | undefined) => Promise<Buffer>
```

Where `dd` is a [pdfmake document definition](https://pdfmake.github.io/docs/document-definition-object/). There are no usable types for it but an excellent typed library to generate them with JSX: [pdfmakejsx](https://www.npmjs.com/package/pdfmakejsx) :-D

### `addText`

```ts
(path: string, body: AddTextData, tempFolder: string) => Promise<Buffer>
```

```ts
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
```

### `purgeTemp`

All of the above functions clean up temporary files if they tun successfully. This can be used in `catch` to clean up if something goes wrong

```ts
(tempFolder: string) => Promise<void>
```

