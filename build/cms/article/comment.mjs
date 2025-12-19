/**********************************************
 * Comment
 *********************************************/
import { gql, graphql, testForApiError } from "../../graphql.mjs";
import { TembraApi } from "../../types.mjs";
import { articleApiUrl } from "./utils.mjs";
/**
 * Class providing CMS article comment functions
 */
export class CommentApi extends TembraApi {
    config;
    constructor(config) {
        super(config, articleApiUrl);
        this.config = config;
    }
    /**
     * function to create comment
     * @param data comment data
     * @param callback GraphQL function callback
     * @returns comment ID
     */
    async createComment(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				mutation createComment($data: CreateCommentInput!) {
					createComment(data: $data)
				}
			`,
            variables: {
                data
            }
        }, {
            'x-wnt-space-id': this.config.spaceId,
        }, callback);
        testForApiError(result);
        return result.data?.createComment ?? '';
    }
    /**
     * function to list comments
     * @param data list data
     * @param callback GraphQL function callback
     * @returns listing result
     */
    async listComments(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query listComments($data: ListCommentsInput!) {
					listComments(data: $data) {
						items {
							id
							articleId
							parentId
							userId
							levelIdent
							language
							versionId
							createdAt
							updatedAt
							state
							subject
							text
							fields {
								name
								value
							}
						}
						listing {
							itemsCount
							start
							count
						}
					}
				}
			`,
            variables: {
                data
            }
        }, {
            'x-wnt-space-id': this.config.spaceId,
        }, callback);
        testForApiError(result);
        return result.data?.listComments;
    }
}
//# sourceMappingURL=comment.mjs.map