/// <reference types="node" />
export interface AddImageConfig {
    height: number;
    imagePath: string;
    page?: number;
    width: number;
    x: number;
    y: number;
}
declare const _default: (tempFolder: string, { height, imagePath, page, width, x, y, }: AddImageConfig, path: string) => Promise<Buffer>;
export default _default;
