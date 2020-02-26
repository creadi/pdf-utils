import { AddTextData } from './';
declare const _default: (dir: string, path: string, data: AddTextData) => Promise<{
    totalPages: number;
    overlays: {
        page: number;
        filePath: string;
    }[];
}>;
export default _default;
