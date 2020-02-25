import { AddTextData } from './';
declare const _default: (path: string, data: AddTextData) => Promise<{
    totalPages: number;
    overlays: {
        page: number;
        filePath: string;
    }[];
}>;
export default _default;
