/**
 * API and interfaces for accessing Tembra CMS Article module
 */
import { gql, graphql, testForApiError } from "../../graphql.mjs";
import { TembraApi } from "../../types.mjs";
import { articleApiUrl } from "./utils.mjs";
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
 * Class providing CMS article functions
 */
export class ArticleApi extends TembraApi {
    config;
    constructor(config) {
        super(config, articleApiUrl);
        this.config = config;
    }
    /**
     * get article by ID
     * @param id article ID
     * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
     * @param callback GraphQL function callback
     * @returns article or null
     */
    async getArticle(id, fullVersions, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query getArticle($id: String! ${fullVersions !== null ? `,$ver: ArticleVersionListInput!` : ''}) {
					getArticle(id: $id) {
						id
						name
						parentId
						createdAt
						updatedAt
						tags
						files

						published
						publishedFrom
						publishedTo

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

						commentCount {
							all
							new
							valid
							junk
							validTree
						}
						${fullVersions !== null ? gql `
						fullVersions(data: $ver) {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
							parentId
							title
							url
							perex
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							perexImage
							commentCount {
								all
								new
								valid
								junk
								validTree
							}
						}
						` : ''}

					}
				}
			`,
            variables: {
                id,
                ver: fullVersions
            }
        }, {
            'x-wnt-space-id': this.config.spaceId
        }, callback);
        testForApiError(result);
        if (result.data?.getArticle) {
            const article = result.data?.getArticle;
            return {
                ...fixPublishedAndCreated(article),
                versions: article.versions.map(v => {
                    return {
                        ...fixPublishedAndCreated(v),
                    };
                }),
                fullVersions: article.fullVersions?.map(version => {
                    return {
                        ...fixPublishedAndCreated(version),
                    };
                }) ?? undefined,
            };
        }
        return null;
    }
    /**
     * list all articles
     * @param data listing parameters
     * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
     * @param callback GraphQL function callback
     * @returns list of articles
     */
    async listArticles(data, fullVersions, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query listArticles($data: ListArticlesInput! ${fullVersions !== null ? `,$ver: ArticleVersionListInput!` : ''}) {
					listArticles(data: $data) {
						id
						name
						parentId
						createdAt
						updatedAt
						tags
						files

						published
						publishedFrom
						publishedTo

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

						commentCount {
							all
							new
							valid
							junk
							validTree
						}

						${fullVersions !== null ? gql `
						fullVersions(data: $ver) {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
							parentId
							title
							url
							perex
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							perexImage
							tags
							commentCount {
								all
								new
								valid
								junk
								validTree
							}
						}
						` : ''}

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
        const articles = result.data?.listArticles;
        return articles.map(article => {
            return {
                ...fixPublishedAndCreated(article),
                versions: article.versions.map(v => {
                    return {
                        ...fixPublishedAndCreated(v),
                    };
                }),
                fullVersions: article.fullVersions?.map(version => {
                    return {
                        ...fixPublishedAndCreated(version),
                    };
                }) ?? undefined,
            };
        });
    }
    /**
     * search for / list article versions
     * @param data searching/listing parameters
     * @param callback GraphQL function callback
     * @returns list of articles versions
     */
    async searchArticleVersions(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				query searchArticleVersions($data: SearchArticleVersionsInput!) {
					searchArticleVersions(data: $data) {
						items {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
							parentId
							title
							url
							perex
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							perexImage
							tags

							commentCount {
								all
								new
								valid
								junk
								validTree
							}
							searchScore
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
            'x-wnt-space-id': this.config.spaceId
        }, callback);
        testForApiError(result);
        const articles = result.data?.searchArticleVersions;
        return {
            ...articles,
            items: articles.items.map(i => {
                return {
                    ...i,
                    ...fixPublishedAndCreated(i)
                };
            })
        };
    }
    /**
     * create/import article
     * @param data import data
     * @param callback GraphQL function callback
     * @returns article ID
     */
    async importArticle(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				mutation importArticle($data: ImportArticleInput!) {
					importArticle(data: $data)
				}
			`,
            variables: {
                data: {
                    ...data,
                    publishedFrom: data.publishedFrom.toISOString(),
                    publishedTo: data.publishedTo?.toISOString() ?? null,
                    createdAt: data.createdAt?.toISOString() ?? null,
                    updatedAt: data.updatedAt?.toISOString() ?? null,
                }
            }
        }, {
            'x-wnt-space-id': this.config.spaceId,
            'x-wnt-api-key': this.config.apiKey ?? '',
        }, callback);
        testForApiError(result);
        return result.data?.importArticle ?? '';
    }
    /**
     * import/create article version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns version ID
     */
    async importArticleVersion(data, callback) {
        const result = await graphql(this.apiUrl, {
            query: gql `
				mutation importArticleVersion($data: ImportArticleVersionInput!) {
					importArticleVersion(data: $data)
				}
			`,
            variables: {
                data: {
                    ...data,
                    publishedFrom: data.publishedFrom.toISOString(),
                    publishedTo: data.publishedTo?.toISOString() ?? null,
                    createdAt: data.createdAt?.toISOString() ?? null,
                    updatedAt: data.updatedAt?.toISOString() ?? null,
                }
            }
        }, {
            'x-wnt-space-id': this.config.spaceId,
            'x-wnt-api-key': this.config.apiKey ?? '',
        }, callback);
        testForApiError(result);
        return result.data?.importArticleVersion ?? '';
    }
}
//# sourceMappingURL=article.mjs.map