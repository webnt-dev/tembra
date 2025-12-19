import { TembraApi } from "../types.mjs";
/**
 * SPACE
 */
export interface Space {
    /**
     * space ID
     */
    id: string;
    /**
     * space name
     */
    name: string;
    /**
     * root for article related content
     */
    articleParentId: string;
    /**
     * root for file module
     */
    fileParentId: string;
    /**
     * root for page related content
     */
    pageParentId: string;
    /**
     * root for text related content
     */
    textParentId: string;
    /**
     * root for key-value related content
     */
    keyValueParentId: string;
    /**
     * root for CMS related content (all files)
     */
    cmsParentId: string;
}
/**
 * Tembra Space API
 */
export declare class SpaceApi extends TembraApi {
    /**
     * get information about Space
     * @returns
     */
    get(): Promise<Space | null>;
}
//# sourceMappingURL=space.d.mts.map