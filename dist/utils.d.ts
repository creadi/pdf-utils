/// <reference types="node" />
export declare const run: (cmd: string) => Promise<string>;
export declare const read: (path: string) => Promise<Buffer>;
export declare const writeBuffer: (path: string, buffer: Buffer) => Promise<void>;
export declare const extractPage: (path: string, pageNumber: number, tempFolder: string) => Promise<{
    pageSelected: string;
    pagesAfter: string;
    pagesBefore: string;
}>;
