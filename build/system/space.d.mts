import { TembraApi } from "../types.mjs";
export interface Space {
    id: string;
    name: string;
    articleParentId: string;
    fileParentId: string;
    pageParentId: string;
    textParentId: string;
    keyValueParentId: string;
    cmsParentId: string;
}
export declare class SpaceApi extends TembraApi {
    get(): Promise<Space | null>;
}
//# sourceMappingURL=space.d.mts.map