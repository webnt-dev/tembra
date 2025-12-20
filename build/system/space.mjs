import { gql, graphql, testForApiError } from "../graphql.mjs";
import { TembraApi, apiConfig } from "../types.mjs";
const url = `${apiConfig.tembraBase}/public/graphql/space`;
/**
 * Tembra Space API
 */
export class SpaceApi extends TembraApi {
    /**
     * get information about Space
     * @returns Space or null if not found
     */
    async get() {
        const result = await graphql(url, {
            query: gql `
				query {
					get {
						id
						name
						articleParentId
						fileParentId
						pageParentId
						textParentId
						keyValueParentId
						cmsParentId
					}
				}
			`
        }, {
            'x-wnt-space-id': this.config.spaceId
        });
        testForApiError(result);
        return result.data?.get ?? null;
    }
}
//
//# sourceMappingURL=space.mjs.map