/**
 * API and interfaces for accessing Tembra CMS Article module
 */


import { gql, graphql, GraphQLCallback, testForApiError } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
import { articleApiUrl } from "./utils.mjs";

/**
 * representation of date and time properties in GraphQL format
 */
export interface GCreatedAndPublished {
	createdAt: string;
	updatedAt: string;
	publishedFrom: string;
	publishedTo: Nullable<string>;
}

/**
 * properties representing date and time
 */
type GCreatedAndPublishedProperties = 'createdAt' | 'updatedAt' | 'publishedFrom' | 'publishedTo';


/**
 * article comments count
 */
export interface ArticleComments {
	/**
	 * number of all comments
	 */
	all: number;

	/**
	* number of new comments
	*/
	new: number;

	/**
	 * number of valid comments
	 */
	valid: number;

	/**
	 * number of junk comments
	 */
	junk: number;

	/**
	 * number of all valid comments (including tree structure)
	 */
	validTree: number;
}


/**
 * basic information about article version
 */
export interface ArticleVersionBase {

	/**
	 * version ID
	 */
	id: string;

	/**
	 * version langugae
	 */
	language: string;

	/**
	 * list of countries version applies to
	 */
	country: string[];

	/**
	 * when was version created
	 */
	createdAt: Date;

	/**
	 * when was version last updated
	 */
	updatedAt: Date;

	/**
	 * whether version published information mirror Article
	 */
	publishedAsParent: boolean;

	/**
	 * whether version is published
	 */
	published: boolean;

	/**
	 * when is version published from
	 */
	publishedFrom: Date;

	/**
	 * until when is version published from (null represents no end date)
	 */
	publishedTo: Nullable<Date>;
}


/**
 * representation of Article
 */
export interface Article {
	/**
	 * article ID
	 */
	id: string;

	/**
	 * article name
	 */
	name: string;

  /**
   * article parentId (space article ID)
   */
  parentId: string;

  /**
   * when was article created
   */
  createdAt: Date;

  /**
   * when was the last time article was updated
   */
  updatedAt: Date;

  /**
   * list of tags IDs
   */
  tags: string[];

  /**
   * list of files IDs
   */
  files: string[];

  /**
   * whether version is published
   */
  published: boolean;

  /**
   * when is version published from
   */
  publishedFrom: Date;

  /**
   * until when is version published from (null represents no end date)
   */
  publishedTo: Nullable<Date>;

  /**
   * list of basic versions information
   */
  versions: ArticleVersionBase[];

  /**
   * number of comments
   */
  commentCount: ArticleComments;

  /**
   * full article versions, property is filled if requested by API function
   */
  fullVersions: Optional<ArticleVersion[]>;
}

/**
 * type representing Article in GraphQL format
 */
export type GraphQLArticle = Omit<Article, GCreatedAndPublishedProperties  | 'versions' | "fullVersions"> & GCreatedAndPublished &
	{ versions: (Omit<ArticleVersionBase, GCreatedAndPublishedProperties> & GCreatedAndPublished)[] } &
	{ fullVersions: (Omit<ArticleVersion, GCreatedAndPublishedProperties> & GCreatedAndPublished)[] }


/**
 * article import data
 */
export interface ImportArticleInput {

  /**
   * article name
   */
  name: string;

  /**
   * list of tags ids
   */
  tags: string[];

  /**
   * list of files IDS
   */
  files: string[];

  /**
   * whether the article is published
   */
  published: boolean;

  /**
   * when is article published from
   */
  publishedFrom: Date;

  /**
   * until when is article published from (null represents no end date)
   */
  publishedTo?: Maybe<Date>;

  /**
   * when was article created (null or undefined means now)
   */
  createdAt?: Maybe<Date>;

  /**
   * when was article created (null or undefined means now)
   */
  updatedAt?: Maybe<Date>;

}


/**
 * listing article input, if any parameter is null | undefined, parameter is ignored
 */
export interface ListArticlesInput {

  /**
   * whether article was published
   */
  published?: Maybe<boolean>;

  /**
   * listing start
   */
  start?: Maybe<number>;

  /**
   * number of items returned (default to 100 if not set)
   */
  count?: Maybe<number>;

  /**
   * if sort is not set, defaults to publishedFrom descending
   * if sort is "name", sorting by case insensitive article name, sort direction default to ASC
   * if sort is "published", sorting by published state, than by publishedFrom, than by created, sort direction default to ASC
   */
  sort?: Maybe<"name" | "published">;

  /**
   * sort direction, -1 = DESC, 1 = ASC
   */
  sortDirection?: Maybe<-1 | 1>;

  /**
   * list of tag ID
   */
  tags?: Maybe<string[]>;
}

// /**********************************************
//  * VERSION
//  *********************************************/
/**
 * full article version
 */
export interface ArticleVersion extends ArticleVersionBase {

  /**
   * article ID
   */
  parentId: string;

  /**
   * article version title
   */
  title: string;

  /**
   * article version URL
   */
  url: string;

  /**
   * article version perex
   */
  perex: string;

  /**
   * article version text
   */
  text: string;

  /**
   * article version description
   */
  description: string;

  /**
   * article version keywords
   */
  keywords: string;

  /**
   * article version og:description
   */
  ogDescription: string;

  /**
   * article version og:title
   */
  ogTitle: string;

  /**
   * article version og:image
   */
  ogImage: string;

  /**
   * URL of article version perex image
   */
  perexImage: string;

  /**
   * list of tags IDs
   */
  tags: string[];

  /**
   * number of comments for this article version
   */
  commentCount: ArticleComments;
}

/**
 * type representing Article version in GraphQL format
 */
export type GraphQLArticleVersion = Omit<ArticleVersion, GCreatedAndPublishedProperties> & GCreatedAndPublished;

/** article version import data */
export interface ImportArticleVersionInput {

	/**
	 * article ID this version belongs to
	 */
	parentId: string;

	/**
	 * article version language
	 */
	language: string;

	/**
	 * article version countries
	 */
	country: string[];

	/**
	 * whether published parameters are inherited/managed by parent (article)
	 */
	publishedAsParent: boolean;

	/**
	 * whether the article version is published
	 */
	published: boolean;

	/**
	 * when is version published from
	 */
	publishedFrom: Date;

	/**
	 * until when is version published from (null represents no end date)
	 */
	publishedTo?: Maybe<Date>;

	/**
	 * version title
	 */
	title: string;

	/**
	 * version URL
	 */
	url: string;

	/**
	 * version perex text
	 */
	perex: string;

	/**
	 * version text
	 */
	text: string;

	/**
	 * version description (can be used as meta tag)
	 */
	description: string;

	/**
	 * version keywords (meta tag)
	 */
	keywords: string;

	/**
	 * version og:description meta tag
	 */
	ogDescription: string;

	/**
	 * version og:title meta tag
	 */
	ogTitle: string;

	/**
	 * version og:image meta tag
	 */
	ogImage: string;

	/**
	 * perex image URL (ident)
	 */
	perexImage: string;

  /**
   * when was article created (null or undefined means now)
   */
  createdAt?: Maybe<Date>;

  /**
   * when was article created (null or undefined means now)
   */
  updatedAt?: Maybe<Date>;

}


/**
 * parameter used for listing fullVersions attribute, if any parameter is null | undefined, parameter is ignored
 */
export interface ArticleVersionListInput {

	/**
	 * list of language-country pairs to obtain versions of
	 */
	languageCountry?: Maybe<LanguageCountry[]>;

	/**
	 * if this is true, return all versions in the language country list. Otherwise, return the first existing version.
	 */
	languageCountryAll?: Maybe<boolean>;

	/**
	 * whether article was published,
	 */
	published?: Maybe<boolean>;
}

/**
 * parameter used for searcing article versions, if any parameter is null | undefined, parameter is ignored
 */
export interface SearchArticleVersionsInput {
	/**
	 * list of language-country pairs to obtain versions of
	 */
	languageCountry?: Maybe<LanguageCountry[]>;

	/**
	 * if this is true, return all versions in the language country list. Otherwise, return the first existing version.
	 */
	languageCountryAll?: Maybe<boolean>;

	/**
	 * whether article was published,
	 */
	published?: Maybe<boolean>

	/**
	 * search text
	 */
	search?: Maybe<string>;

	/**
	 * filter by tags (names of IDs)
	 */
	tags?: Maybe<string[]>;

	/**
	 * listing offset
	 */
	start?: Maybe<number>;

	/**
	 * listing count (defaults to 100)
	 */
	count?: Maybe<number>;

	/**
	 * if sort is not set, defaults to searchScore descending, published descending, publishedFrom descending
	 * if sort = "searchScore", search by searchScore ordered by sortDirection (defaults to descending), than published descending, publishedFrom descending
	 * if sort = "published", sort by published than by publishedFrom (order defaults to descending)
	 * if sort = "title", search by title ordered by sortDirection (defaults to ascending), than published descending, publishedFrom descending
	 */
	sort?: Maybe<"published" | "searchScore" | "title">;

	/**
	 * sort direction
	 */
	sortDirection?: Maybe<-1 | 1>;

	/**
	 * search version by URL
	 */
	url?: Maybe<string>;
}

/**
 * result of article version search function, can be used for listing as well just do not use "search" parameter in request
 */
export interface SearchArticleVersionsResult {
	/**
	 * list of found versions
	 * searchScore represents search match if "search" parameter is used, higher score, higher match (if "search" not specified, field returns 1)
	 * tags represents list of article tags
	 */
	items: (ArticleVersion & { searchScore: number; tags: string[]; })[];

	/**
	 * search listing information
	 */
	listing: {
			/**
			 * number of all versions
			 */
			itemsCount: number;

			/**
			 * listing offset (from request)
			 */
			start: number;

			/**
			 * number of items to return (from request)
			 */
			count: number;
	};
}

/**
 * type representing search article versions result in GraphQL format
 */
export type GraphQLSearchArticleVersionsResult = Omit<SearchArticleVersionsResult, "items"> & {
	items: (GraphQLArticleVersion & { searchScore: number; })[];
}



function fixPublishedAndCreated<T>(p: GCreatedAndPublished): T {
	return {
		...p,
		createdAt: new Date(p.createdAt),
		updatedAt: new Date(p.updatedAt),
		publishedFrom: new Date(p.publishedFrom),
		publishedTo: p.publishedTo ? new Date(p.publishedTo) : null,
	} as T
}


/**
 * Class providing CMS article functions
 */
export class ArticleApi extends TembraApi {

	constructor(protected override config: TembraApiConfig) {
		super(config, articleApiUrl)
	}

	/**
	 * get article by ID
	 * @param id article ID
	 * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
	 * @param callback GraphQL function callback
	 * @returns article or null
	 */
	async getArticle(id: string, fullVersions: Nullable<ArticleVersionListInput>, callback?: GraphQLCallback<{ getArticle: GraphQLArticle | null }>): Promise<Article | null> {
		const result = await graphql<{ getArticle: GraphQLArticle | null }>(this.apiUrl, {
			query: gql`
				query getArticle($id: String! ${ fullVersions !== null ? `,$ver: ArticleVersionListInput!` : '' }) {
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
						${fullVersions !== null ? gql`
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
						` : '' }

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
				...fixPublishedAndCreated<Article>(article),
				versions: article.versions.map(v => {
					return {
						...fixPublishedAndCreated<ArticleVersionBase>(v),
					}
				}),
				fullVersions: article.fullVersions?.map(version => {
					return {
						...fixPublishedAndCreated(version),
					}
				}) ?? undefined,
			}
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
	async listArticles(data: ListArticlesInput, fullVersions: Nullable<ArticleVersionListInput>, callback?: GraphQLCallback<{ listArticles: GraphQLArticle[] }>): Promise<Article[]> {
		const result = await graphql<{ listArticles: GraphQLArticle[] }>(this.apiUrl, {
			query: gql`
				query listArticles($data: ListArticlesInput! ${ fullVersions !== null ? `,$ver: ArticleVersionListInput!` : '' }) {
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

						${fullVersions !== null ? gql`
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
						` : '' }

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

		const articles = result.data?.listArticles!;
		return articles.map(article => {
			return {
				...fixPublishedAndCreated<Article>(article),
				versions: article.versions.map(v => {
					return {
						...fixPublishedAndCreated<ArticleVersionBase>(v),
					}
				}),
				fullVersions: article.fullVersions?.map(version => {
					return {
						...fixPublishedAndCreated(version),
					}
				}) ?? undefined,
			}
		});
	}

	/**
	 * search for / list article versions
	 * @param data searching/listing parameters
	 * @param callback GraphQL function callback
	 * @returns list of articles versions
	 */
	async searchArticleVersions(data: SearchArticleVersionsInput, callback?: GraphQLCallback<{ searchArticleVersions: GraphQLSearchArticleVersionsResult }>): Promise<SearchArticleVersionsResult> {
		const result = await graphql<{ searchArticleVersions: GraphQLSearchArticleVersionsResult }>(this.apiUrl, {
			query: gql`
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

		const articles = result.data?.searchArticleVersions!;
		return {
			...articles,
			items: articles.items.map(i => {
				return {
					...i,
					...fixPublishedAndCreated<ArticleVersion & { searchScore: number; tags: string[] }>(i)
				}
			})
		}

	}

	/**
	 * create/import article
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns article ID
	 */
	async importArticle(data: ImportArticleInput, callback?: GraphQLCallback<{ importArticle: string }>): Promise<string> {
		const result = await graphql<{ importArticle: string }>(this.apiUrl, {
			query: gql`
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
	async importArticleVersion(data: ImportArticleVersionInput, callback?: GraphQLCallback<{ importArticleVersion: string }>): Promise<string> {
		const result = await graphql<{ importArticleVersion: string }>(this.apiUrl, {
			query: gql`
				mutation importArticleVersion($data: ImportArticleVersionInput!) {
					importArticleVersion(data: $data)
				}
			`,
			variables: {
				data,
				publishedFrom: data.publishedFrom.toISOString(),
				publishedTo: data.publishedTo?.toISOString() ?? null,
				createdAt: data.createdAt?.toISOString() ?? null,
				updatedAt: data.updatedAt?.toISOString() ?? null,
			}
		}, {
			'x-wnt-space-id': this.config.spaceId,
			'x-wnt-api-key': this.config.apiKey ?? '',
		}, callback);

		testForApiError(result);

		return result.data?.importArticleVersion ?? '';
	}



}
