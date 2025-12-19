import { gql, graphql, testForApiError } from "../../graphql.mjs";
import { TembraApi } from "../../types.mjs";
import { articleApiUrl } from "./utils.mjs";
/**
 * Class providing CMS article tag functions
 */
export class TagApi extends TembraApi {
    config;
    constructor(config) {
        super(config, articleApiUrl);
        this.config = config;
    }
    /**
     * list all tags
     * @param callback GraphQL function callback
     * @returns list of all tags
     */
    async listTags(callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query {
					listTags {
						id
						name
						parentId
						content {
							language
							data
						}
					}
				}
			`
        }, {
            'x-wnt-space-id': this.config.spaceId
        }, callback);
        testForApiError(result);
        return result.data?.listTags ?? [];
    }
    /**
     * function imports/creates tags
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new tag ID
     */
    async importTag(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importTag($data: ImportTagInput!) {
						importTag(data: $data)
					}
				`,
            variables: {
                data
            }
        }, {
            'x-wnt-space-id': this.config.spaceId,
            'x-wnt-api-key': this.config.apiKey ?? '',
        }, callback);
        testForApiError(result);
        return result.data?.importTag ?? '';
    }
}
//# sourceMappingURL=tag.mjs.map