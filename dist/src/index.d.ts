/// <reference types="node" />
/// <reference types="ts-toolbelt" />
import { AddImageConfig } from './addImage';
import { AddRectConfig } from './addRect';
import { ReplaceTextConfig } from './replaceText';
declare type PathOrBuffer = string | Buffer;
export declare const addImage: (tempFolder: string, config: AddImageConfig, pdf: PathOrBuffer) => Promise<Buffer>;
export declare const addRect: (tempFolder: string, config: AddRectConfig, pdf: PathOrBuffer) => Promise<Buffer>;
export declare const addText: (tempFolder: string, config: import("./addText").AddTextData, pdf: PathOrBuffer) => Promise<Buffer>;
export declare const bufferToFile: (path: string, buffer: Buffer) => Promise<void>;
export declare const countPages: (pdf: PathOrBuffer, tempFolder?: string | undefined) => Promise<number>;
export declare const extractText: (pdf: PathOrBuffer, tempFolder?: string | undefined) => Promise<{
    page: number;
    text: string;
    size: number[];
}[]>;
export declare const keepPages: (tempFolder: string, config: number[], pdf: PathOrBuffer) => Promise<Buffer>;
export declare const merge: (filePaths: string[], tempFolder: string) => Promise<Buffer>;
export declare const purgeTemp: (tempFolder: string) => Promise<void>;
export declare const removePages: (tempFolder: string, config: number[], pdf: PathOrBuffer) => Promise<Buffer>;
export declare const render: (dd: any, font?: "Courier" | "Helvetica" | undefined) => Promise<Buffer>;
export declare const replaceText: (tempFolder: string, config: ReplaceTextConfig, pdf: PathOrBuffer) => Promise<Buffer>;
export declare const init: (pathToTempFolder: string) => {
    addImage: import("Function/Curry").Curry<(config: AddImageConfig, pdf: PathOrBuffer) => Promise<Buffer>>;
    addRect: import("Function/Curry").Curry<(config: AddRectConfig, pdf: PathOrBuffer) => Promise<Buffer>>;
    addText: import("Function/Curry").Curry<(config: import("./addText").AddTextData, pdf: PathOrBuffer) => Promise<Buffer>>;
    bufferToFile: import("Function/Curry").Curry<(path: string, buffer: Buffer) => Promise<void>>;
    countPages: (pdf: PathOrBuffer) => Promise<number>;
    extractText: (pdf: PathOrBuffer) => Promise<{
        page: number;
        text: string;
        size: number[];
    }[]>;
    keepPages: import("Function/Curry").Curry<(config: number[], pdf: PathOrBuffer) => Promise<Buffer>>;
    merge: (filePaths: string[]) => Promise<Buffer>;
    purgeTemp: () => Promise<void>;
    removePages: import("Function/Curry").Curry<(config: number[], pdf: PathOrBuffer) => Promise<Buffer>>;
    render: (dd: any, font?: "Courier" | "Helvetica" | undefined) => Promise<Buffer>;
    replaceText: import("Function/Curry").Curry<(config: ReplaceTextConfig, pdf: PathOrBuffer) => Promise<Buffer>>;
};
declare const _default: {
    addImage: (tempFolder: string, config: AddImageConfig, pdf: PathOrBuffer) => Promise<Buffer>;
    addRect: (tempFolder: string, config: AddRectConfig, pdf: PathOrBuffer) => Promise<Buffer>;
    addText: (tempFolder: string, config: import("./addText").AddTextData, pdf: PathOrBuffer) => Promise<Buffer>;
    bufferToFile: (path: string, buffer: Buffer) => Promise<void>;
    countPages: (pdf: PathOrBuffer, tempFolder?: string | undefined) => Promise<number>;
    extractText: (pdf: PathOrBuffer, tempFolder?: string | undefined) => Promise<{
        page: number;
        text: string;
        size: number[];
    }[]>;
    keepPages: (tempFolder: string, config: number[], pdf: PathOrBuffer) => Promise<Buffer>;
    merge: (filePaths: string[], tempFolder: string) => Promise<Buffer>;
    purgeTemp: (tempFolder: string) => Promise<void>;
    removePages: (tempFolder: string, config: number[], pdf: PathOrBuffer) => Promise<Buffer>;
    render: (dd: any, font?: "Courier" | "Helvetica" | undefined) => Promise<Buffer>;
    replaceText: (tempFolder: string, config: ReplaceTextConfig, pdf: PathOrBuffer) => Promise<Buffer>;
    init: (pathToTempFolder: string) => {
        addImage: import("Function/Curry").Curry<(config: AddImageConfig, pdf: PathOrBuffer) => Promise<Buffer>>;
        addRect: import("Function/Curry").Curry<(config: AddRectConfig, pdf: PathOrBuffer) => Promise<Buffer>>;
        addText: import("Function/Curry").Curry<(config: import("./addText").AddTextData, pdf: PathOrBuffer) => Promise<Buffer>>;
        bufferToFile: import("Function/Curry").Curry<(path: string, buffer: Buffer) => Promise<void>>;
        countPages: (pdf: PathOrBuffer) => Promise<number>;
        extractText: (pdf: PathOrBuffer) => Promise<{
            page: number;
            text: string;
            size: number[];
        }[]>;
        keepPages: import("Function/Curry").Curry<(config: number[], pdf: PathOrBuffer) => Promise<Buffer>>;
        merge: (filePaths: string[]) => Promise<Buffer>;
        purgeTemp: () => Promise<void>;
        removePages: import("Function/Curry").Curry<(config: number[], pdf: PathOrBuffer) => Promise<Buffer>>;
        render: (dd: any, font?: "Courier" | "Helvetica" | undefined) => Promise<Buffer>;
        replaceText: import("Function/Curry").Curry<(config: ReplaceTextConfig, pdf: PathOrBuffer) => Promise<Buffer>>;
    };
};
export default _default;
