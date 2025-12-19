import { GraphQLCallback } from "../../graphql.mjs";
import { Nullable, TembraApi, TembraApiConfig } from "../../types.mjs";
/**********************************************
 * TAG
 *********************************************/
export interface TagContent {
    /**
     * tag content language
     */
    language: string;
    /**
     * tag content (name)
     */
    data: string;
}
export interface Tag {
    /**
     * tag ID
     */
    id: string;
    /**
     * tag name
     */
    name: string;
    /**
     * tag parent ID (either space article root or other tag)
     */
    parentId: string;
    /**
     * tag language versions
     */
    content: TagContent[];
}
export interface ImportTagContentInput {
    /**
     * tag content language
     */
    language: string;
    /**
     * tag content (name)
     */
    data: string;
}
export interface ImportTagInput {
    /**
     * tag name
     */
    name: string;
    /**
     * tag parent ID (either null for root tag or other tag ID)
     * there cannot be more than 2 levels of tag
     */
    parentId: Nullable<string>;
    /**
     * tag language versions
     */
    content: ImportTagContentInput[];
}
/**
 * Class providing CMS article tag functions
 */
export declare class TagApi extends TembraApi {
    protected config: TembraApiConfig;
    /**
     * @param config Tembra API configuration
     */
    constructor(config: TembraApiConfig);
    /**
     * list all tags
     * @param callback GraphQL function callback
     * @returns list of all tags
     */
    listTags(callback?: GraphQLCallback<{
        listTags: Tag[];
    }>): Promise<Tag[]>;
    /**
     * function imports/creates tags
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new tag ID
     */
    importTag(data: ImportTagInput, callback?: GraphQLCallback<{
        importTag: string;
    }>): Promise<string>;
}
//# sourceMappingURL=tag.d.mts.map