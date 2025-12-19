import { gql, graphql, testForApiError } from "./graphql.mjs";
//export const tembraBase = 'https://api.tembra.app';
/**
 * Tembra API base URL endpoint
 */
export const tembraBase = 'http://localhost:8083';
/**
 * base Tembra API class
 */
export class TembraApi {
    config;
    apiUrl;
    /**
     *
     * @param config Tembra API configuration
     * @param apiUrl endpoint URL
     */
    constructor(config, apiUrl) {
        this.config = config;
        this.apiUrl = apiUrl;
    }
    /**
     * function to ping the API
     * @param callback callback function to be called on completion
     * @returns boolean indicating if the API is reachable
     */
    async ping(callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query {
					ping
				}
			`
        }, {
            'x-wnt-space-id': this.config.spaceId
        }, callback);
        testForApiError(result);
        return result.data?.ping ?? false;
    }
}
//# sourceMappingURL=types.mjs.map