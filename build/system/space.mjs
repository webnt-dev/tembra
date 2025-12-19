import { gql, graphql, testForApiError } from "../graphql.mjs";
import { TembraApi, tembraBase } from "../types.mjs";
const url = `${tembraBase}/public/graphql/space`;
export class SpaceApi extends TembraApi {
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