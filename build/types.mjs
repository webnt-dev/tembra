import { gql, graphql, testForApiError } from "./graphql.mjs";
//export const tembraBase = 'https://api.tembra.app';
export const tembraBase = 'http://localhost:8083';
export class TembraApi {
    config;
    apiUrl;
    constructor(config, apiUrl) {
        this.config = config;
        this.apiUrl = apiUrl;
    }
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