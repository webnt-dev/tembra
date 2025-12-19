import { gql, graphql, testForApiError } from "../../graphql.mjs";
import { TembraApi } from "../../types.mjs";
import { textApiUrl } from "./utils.mjs";
/**
 * Class providing CMS text functions
 */
export class TextApi extends TembraApi {
    config;
    constructor(config) {
        super(config, textApiUrl);
        this.config = config;
    }
    /**
     * function imports/creates text category
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new category ID
     */
    async importCategory(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importCategory($data: ImportCategoryInput!) {
						importCategory(data: $data)
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
        return result.data?.importCategory ?? '';
    }
    /**
     * function imports/creates text
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new text ID
     */
    async importText(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importText($data: ImportTextInput!) {
						importText(data: $data)
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
        return result.data?.importText ?? '';
    }
    /**
     * function imports/creates text version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new text ID
     */
    async importTextVersion(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importTextVersion($data: ImportTextVersionInput!) {
						importTextVersion(data: $data)
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
        return result.data?.importTextVersion ?? '';
    }
    /**
     * list all text
     * @param data filtering data
     * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
     * @param callback GraphQL function callback
     * @returns list of textx
     */
    async listTexts(data, fullVersions, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query listTexts($data: ListTextsInput! ${fullVersions !== null ? `,$ver: TextVersionListInput!` : ''}) {
					listTexts(data: $data) {
						id
						name
						parentId
						createdAt
						updatedAt
						files
						categoryId
						${fullVersions !== null ? gql `
						fullVersions(data: $ver) {
							id
							language
							country
							createdAt
							updatedAt
							parentId
							title
							text
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
        const texts = result.data?.listTexts;
        return texts.map(text => {
            return {
                ...text,
                createdAt: new Date(text.createdAt),
                updatedAt: new Date(text.updatedAt),
                versions: text.versions.map(version => {
                    return {
                        ...version,
                        createdAt: new Date(version.createdAt),
                        updatedAt: new Date(version.updatedAt),
                    };
                }),
                fullVersions: text.fullVersions?.map(version => {
                    return {
                        ...version,
                        createdAt: new Date(version.createdAt),
                        updatedAt: new Date(version.updatedAt),
                    };
                }) ?? undefined,
            };
        });
    }
}
//# sourceMappingURL=text.mjs.map