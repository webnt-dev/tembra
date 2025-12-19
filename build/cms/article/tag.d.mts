import { GraphQLCallback } from "../../graphql.mjs";
import { Nullable, TembraApi, TembraApiConfig } from "../../types.mjs";
/**********************************************
 * TAG
 *********************************************/
export interface TagContent {
    language: string;
    data: string;
}
export interface Tag {
    id: string;
    name: string;
    parentId: string;
    content: TagContent[];
}
export interface ImportTagContentInput {
    language: string;
    data: string;
}
export interface ImportTagInput {
    name: string;
    parentId: Nullable<string>;
    content: ImportTagContentInput[];
}
/**
 * Class providing CMS article tag functions
 */
export declare class TagApi extends TembraApi {
    protected config: TembraApiConfig;
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