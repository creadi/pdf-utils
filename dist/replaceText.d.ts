/// <reference types="node" />
export interface ReplaceTextConfig {
    newText: string;
    page?: number;
    textToReplace: string;
}
declare const _default: (tempFolder: string, { textToReplace, newText, page }: ReplaceTextConfig, path: string) => Promise<Buffer>;
export default _default;
