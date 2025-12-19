import { gql, graphql, testForApiError } from "../../graphql.mjs";
import { TembraApi } from "../../types.mjs";
import { keyValueApiUrl } from "./utils.mjs";
function fixCreated(p) {
    return {
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
    };
}
/**
 * Class providing CMS page functions
 */
export class KeyValueApi extends TembraApi {
    config;
    constructor(config) {
        super(config, keyValueApiUrl);
        this.config = config;
    }
    /**
     * function imports/creates key-value
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new key-value ID
     */
    async importKeyValue(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importKeyValue($data: ImportKeyValueInput!) {
						importKeyValue(data: $data)
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
        return result.data?.importKeyValue ?? '';
    }
    /**
     * function imports/creates key-value version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new key-value ID
     */
    async importKeyValueVersion(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importKeyValueVersion($data: ImportKeyValueVersionInput!) {
						importKeyValueVersion(data: $data)
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
        return result.data?.importKeyValueVersion ?? '';
    }
    /**
     * list key-values
     * @param data filter data
     * @param fullVersions version filter data (null to omit, {} to list all)
     * @param callback GraphQL function callback
     * @returns list of pages
     */
    async listKeyValues(data, fullVersions, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query listKeyValues($data: ListKeyValuesInput! ${fullVersions !== null ? `,$ver: KeyValueVersionListInput!` : ''}) {
					listKeyValues(data: $data) {

						id
						name
						parentId
						createdAt
						updatedAt

						${fullVersions !== null ? gql `
						fullVersions(data: $ver) {
							id
							parentId
							language
							country
							createdAt
							updatedAt
							pairs {
								name
								value
							}
						}
						` : ''}
						versions {
							id
							language
							country
							createdAt
							updatedAt
						}
					}
				}
			`,
            variables: {
                data,
                ver: fullVersions,
            }
        }, {
            'x-wnt-space-id': this.config.spaceId
        }, callback);
        testForApiError(result);
        const kvs = result.data?.listKeyValues;
        return kvs.map(kv => {
            return {
                ...fixCreated(kv),
                versions: kv.versions.map(fixCreated),
                fullVersions: kv.fullVersions?.map(fixCreated) ?? undefined,
            };
        });
    }
}
//# sourceMappingURL=keyvalue.mjs.map