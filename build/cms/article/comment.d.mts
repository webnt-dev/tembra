/**********************************************
 * Comment
 *********************************************/
import { GraphQLCallback } from "../../graphql.mjs";
import { Maybe, Nullable, TembraApi, TembraApiConfig } from "../../types.mjs";
export interface CommentField {
    name: string;
    value: string;
}
export interface Comment {
    id: string;
    articleId: string;
    versionId: string;
    parentId: Nullable<string>;
    userId: Nullable<string>;
    levelIdent: string;
    language: string;
    createdAt: string;
    updatedAt: string;
    state: CommentState;
    subject: string;
    text: string;
    fields: CommentField[];
}
export type CommentState = "new" | "valid" | "junk";
export interface CommentFieldInput {
    name: string;
    value: string;
}
export interface CreateCommentInput {
    versionId: string;
    parentId: Nullable<string>;
    subject: string;
    text: string;
    fields: CommentFieldInput[];
}
export interface ListCommentsInput {
    articleId: string;
    parentId: Nullable<string>;
    versionId: Nullable<string>;
    language?: Maybe<string>;
    includeChildren?: Maybe<boolean>;
    state?: Maybe<CommentState[]>;
    start?: Maybe<number>;
    count?: Maybe<number>;
}
export interface ListCommentsResult {
    items: Comment[];
    listing: {
        itemsCount: number;
        start: number;
        count: number;
    };
}
/**
 * Class providing CMS article comment functions
 */
export declare class CommentApi extends TembraApi {
    protected config: TembraApiConfig;
    constructor(config: TembraApiConfig);
    /**
     * function to create comment
     * @param data comment data
     * @param callback GraphQL function callback
     * @returns comment ID
     */
    createComment(data: CreateCommentInput, callback?: GraphQLCallback<{
        createComment: string;
    }>): Promise<string>;
    /**
     * function to list comments
     * @param data list data
     * @param callback GraphQL function callback
     * @returns listing result
     */
    listComments(data: ListCommentsInput, callback?: GraphQLCallback<{
        listComments: ListCommentsResult;
    }>): Promise<ListCommentsResult>;
}
//# sourceMappingURL=comment.d.mts.map