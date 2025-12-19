import { gql, graphql, testForApiError } from "../../graphql.mjs";
import { TembraApi } from "../../types.mjs";
import { pageApiUrl } from "./utils.mjs";
function fixPublishedAndCreated(p) {
    return {
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
        publishedFrom: new Date(p.publishedFrom),
        publishedTo: p.publishedTo ? new Date(p.publishedTo) : null,
    };
}
/**
 * Class providing CMS page functions
 */
export class PageApi extends TembraApi {
    config;
    /**
     * @param config Tembra API configuration
     */
    constructor(config) {
        super(config, pageApiUrl);
        this.config = config;
    }
    /**
     * function imports/creates page
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new page ID
     */
    async importPage(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importPage($data: ImportPageInput!) {
						importPage(data: $data)
					}
				`,
            variables: {
                data: {
                    ...data,
                    publishedFrom: data.publishedFrom.toISOString(),
                    publishedTo: data.publishedTo?.toISOString() ?? null,
                }
            }
        }, {
            'x-wnt-space-id': this.config.spaceId,
            'x-wnt-api-key': this.config.apiKey ?? '',
        }, callback);
        testForApiError(result);
        return result.data?.importPage ?? '';
    }
    /**
     * import/create page version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns version ID
     */
    async importPageVersion(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
					mutation importPageVersion($data: ImportPageVersionInput!) {
						importPageVersion(data: $data)
					}
				`,
            variables: {
                data: {
                    ...data,
                    publishedFrom: data.publishedFrom.toISOString(),
                    publishedTo: data.publishedTo?.toISOString() ?? null,
                }
            }
        }, {
            'x-wnt-space-id': this.config.spaceId,
            'x-wnt-api-key': this.config.apiKey ?? '',
        }, callback);
        testForApiError(result);
        return result.data?.importPageVersion ?? '';
    }
    /**
     * list pages
     * @param data filter data
     * @param fullVersions version filter data (null to omit, {} to list all)
     * @param callback GraphQL function callback
     * @returns list of pages
     */
    async listPages(data, fullVersions, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query listPages($data: ListPagesInput! ${fullVersions !== null ? `,$ver: PageVersionListInput!` : ''}) {
					listPages(data: $data) {

						id
						name
						parentId
						createdAt
						updatedAt
						files
						published
						publishedFrom
						publishedTo

						${fullVersions !== null ? gql `
						fullVersions(data: $ver) {
							id
							parentId
							language
							country
							createdAt
							updatedAt
							title
							url
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							publishedAsParent
							published
							publishedFrom
							publishedTo
						}
						` : ''}
						versions {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
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
        const pages = result.data?.listPages;
        return pages.map(page => {
            return {
                ...fixPublishedAndCreated(page),
                versions: page.versions.map(fixPublishedAndCreated),
                fullVersions: page.fullVersions?.map(fixPublishedAndCreated) ?? undefined,
            };
        });
    }
    /**
     * list pages versions
     * @param data filter data
     * @param callback GraphQL function callback
     * @returns list of version
     */
    async listPageVersions(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query listPageVersions($data: ListPageVersionsInput!) {
					listPageVersions(data: $data) {

						id
						parentId
						language
						country
						createdAt
						updatedAt
						title
						url
						text
						description
						keywords
						ogDescription
						ogTitle
						ogImage
						publishedAsParent
						published
						publishedFrom
						publishedTo

					}
				}
			`,
            variables: {
                data,
            }
        }, {
            'x-wnt-space-id': this.config.spaceId
        }, callback);
        testForApiError(result);
        const pages = result.data?.listPageVersions;
        return pages.map(fixPublishedAndCreated);
    }
}
//# sourceMappingURL=page.mjs.map