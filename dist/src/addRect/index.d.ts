/// <reference types="node" />
export interface AddRectConfig {
    color?: string;
    height: number;
    page?: number;
    width: number;
    x: number;
    y: number;
}
declare const _default: (tempFolder: string, { height, color, page, width, x, y, }: AddRectConfig, path: string) => Promise<Buffer>;
export default _default;
