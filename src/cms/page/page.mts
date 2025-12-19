import { gql, graphql, GraphQLCallback, testForApiError } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
import { pageApiUrl } from "./utils.mjs";

/**
 * import/create page data
 */
export interface ImportPageInput {
	/**
	 * page name
	 */
	name: string;

	/**
	 * list of File.id
	 */
	files: string[];

	/**
	 * whether page is published
	 */
	published: boolean;

	/**
	 * date and time since the page is published
	 */
	publishedFrom: Date;

	/**
	 * date and time until the page is published
	 */
	publishedTo?: Maybe<Date>;

}

/**
 * import/create page version data
 */
export interface ImportPageVersionInput {

	/**
	 * language code
	 */
	language: string;

	/**
	 * country code
	 */
	country: string[];

	/**
	 * whether page version published parameters
	 * are copied from parent page
	 */
	publishedAsParent: boolean;

	/**
	 * whether page version is published
	 */
	published: boolean;

	/**
	 * date and time since the page version is published
	 */
	publishedFrom: Date;

	/**
	 * date and time until the page version is published
	 */
	publishedTo?: Maybe<Date>;

	/**
	 * Page.id
	 */
	parentId: string;

	/**
	 * page version title
	 */
	title: string;

	/**
	 * page version URL
	 */
	url: string;

	/**
	 * page version text
	 */
	text: string;

	/**
	 * page version description
	 */
	description: string;

	/**
	 * page version keywords
	 */
	keywords: string;

	/**
	 * og:description tag
	 */
	ogDescription: string;

	/**
	 * og:title tag
	 */
	ogTitle: string;

	/**
	 * og:image tag
	 */
	ogImage: string;
}


/**
 * input for page versions listing
 */
export interface PageVersionListInput {
	/**
	 * language / country filters for listing
	 */
	languageCountry?: Maybe<LanguageCountry[]>;

	/**
	 * if true, listing will return all versions in languageCountry parameter
	 * if false, listing will return only first found version for languageCountry parameter
	 */
	languageCountryAll?: Maybe<Boolean>;

	/**
	 * if true, listing will return only published versions
	 * if false, listing will return only unpublished versions
	 */
	published?: Maybe<boolean>;
}

/**
 * page representation
 */
export interface Page {

	/**
	 * Page.id
	 */
	id: string;

	/**
	 * page name
	 */
	name: string;

	/**
	 * Space.pageParentId
	 */
	parentId: string;

	/**
	 * date and time when page was created
	 */
	createdAt: Date;

	/**
	 * date and time when page last updated
	 */
	updatedAt: Date;

	/**
	 * list of File.id
	 */
	files: string[];

	/**
	 * whether page is published
	 */
	published: boolean;

	/**
	 * date and time since the page is published
	 */
	publishedFrom: string;

	/**
	 * date and time until the page is published
	 */
	publishedTo: Nullable<string>;

	/**
	 * listing function for full page versions
	 */
	fullVersions: Optional<PageVersion[]>;

	/**
	 * listing function for versions information list
	 */
	versions: PageVersionBase[];
}

/**
 * type representing date and time properties in GraphQL format
 */
export type DateProps = "createdAt" | "updatedAt" | "publishedFrom" | "publishedTo";

/**
 * type representing date and time properties in JS format
 */
export interface DateFields {
	createdAt: string;
	updatedAt: string;
	publishedFrom: string;
	publishedTo: Nullable<string>;
}

/**
 * type representing Page in GraphQL format
 */
export type GPage = Omit<Page, "fullVersions" | "versions" | DateProps> & DateFields & {
	fullVersions: Optional<GPageVersion[]>,
	versions: GPageVersionBase[],
}

/**
 * input for page listing
 */
export interface ListPagesInput {

	/**
	 * pages names
	 */
	name?: Maybe<string[]>;

	/**
	 * listing offset
	 */
	start?: Maybe<number>;

	/**
	 * listing count, defaults to 100
	 */
	count?: Maybe<number>;

}

/**
 * basic information about page version
 */
export interface PageVersionBase {

	/**
	 * version id
	 */
	id: string;

	/**
	 * language code
	 */
	language: string;

	/**
	 * country code
	 */
	country: string[];

	/**
	 * date and time when record was created
	 */
	createdAt: Date;

	/**
	 * date and time when record last updated
	 */
	updatedAt: Date;

	/**
	 * whether page version published parameters
	 * are copied from parent page
	 */
	publishedAsParent: boolean;

	/**
	 * whether page version is published
	 */
	published: boolean;

	/**
	 * date and time since the page version is published
	 */
	publishedFrom: Date;

	/**
	 * date and time until the page version is published
	 */
	publishedTo: Nullable<Date>;

}

/**
 * type representing PageVersionBase in GraphQL format
 */
export type GPageVersionBase = Omit<PageVersionBase, DateProps> & DateFields;

/**
 * Page version representation
 */
export interface PageVersion extends PageVersionBase {

	/**
	 * Page.id
	 */
	parentId: string;

	/**
	 * page version title
	 */
	title: string;

	/**
	 * page version URL
	 */
	url: string;

	/**
	 * page version text
	 */
	text: string;

	/**
	 * page version description
	 */
	description: string;

	/**
	 * page version keywords
	 */
	keywords: string;

	/**
	 * og:description tag
	 */
	ogDescription: string;

	/**
	 * og:title tag
	 */
	ogTitle: string;

	/**
	 * og:image tag
	 */
	ogImage: string;

}

/**
 * type representing PageVersion in GraphQL format
 */
export type GPageVersion = Omit<PageVersion, "createdAt" | "updatedAt" | "publishedFrom" | "publishedTo"> & {
	createdAt: string;
	updatedAt: string;
	publishedFrom: string;
	publishedTo: Nullable<string>;
}

/**
 * input for versions listing
 */
export interface ListPageVersionsInput {

	/**
	 * language / country filters for listing
	 */
	languageCountry?: Maybe<LanguageCountry[]>;

	/**
	 * if true, listing will return all versions in languageCountry parameter
	 * if false, listing will return only first found version for languageCountry parameter
	 */
	languageCountryAll?: Maybe<boolean>;

	/**
	 * if true, listing will return only published versions
	 * if false, listing will return only unpublished versions
	 */
	published?: Maybe<boolean>;

	/**
	 * page ID
	 */
	parentId?: Maybe<string>;

	/**
	 * page version title
	 */
	title?: Maybe<string>;

	/**
	 * page version URL
	 */
	url?: Maybe<string>;

	/**
	 * sort by
	 */
	sort?: Maybe<"title" | "published">

	/**
	 * sort direction
	 */
	sortDirection?: Maybe<number>;

	/**
	 * listing start
	 */
	start?: Maybe<number>;

	/**
	 * listing count
	 */
	count?: Maybe<number>;
}


function fixPublishedAndCreated<T>(p: DateFields): T {
	return {
		...p,
		createdAt: new Date(p.createdAt),
		updatedAt: new Date(p.updatedAt),
		publishedFrom: new Date(p.publishedFrom),
		publishedTo: p.publishedTo ? new Date(p.publishedTo) : null,
	} as T
}

/**
 * Class providing CMS page functions
 */
export class PageApi extends TembraApi {
	/**
	 * @param config Tembra API configuration
	 */
	constructor(protected override config: TembraApiConfig) {
		super(config, pageApiUrl)
	}

	/**
	 * function imports/creates page
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns new page ID
	 */
	async importPage(data: ImportPageInput, callback?: GraphQLCallback<{ importPage: string }>): Promise<string> {
		const result = await graphql<{ importPage: string }>(
			this.apiUrl,
			{
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
			},
			{
				'x-wnt-space-id': this.config.spaceId,
				'x-wnt-api-key': this.config.apiKey ?? '',
			},
			callback
		);

		testForApiError(result);

		return result.data?.importPage ?? ''
	}

	/**
	 * import/create page version
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns version ID
	 */
	async importPageVersion(data: ImportPageVersionInput, callback?: GraphQLCallback<{ importPageVersion: string }>): Promise<string> {
		const result = await graphql<{ importPageVersion: string }>(
			this.apiUrl,
			{
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
			},
			{
				'x-wnt-space-id': this.config.spaceId,
				'x-wnt-api-key': this.config.apiKey ?? '',
			},
			callback
		);

		testForApiError(result);

		return result.data?.importPageVersion ?? ''
	}

	/**
	 * list pages
	 * @param data filter data
	 * @param fullVersions version filter data (null to omit, {} to list all)
	 * @param callback GraphQL function callback
	 * @returns list of pages
	 */
	async listPages(data: ListPagesInput, fullVersions: Nullable<PageVersionListInput>, callback?: GraphQLCallback<{ listPages: GPage[] }>): Promise<Page[]> {
		const result = await graphql<{ listPages: GPage[] }>(this.apiUrl, {
			query: gql`
				query listPages($data: ListPagesInput! ${ fullVersions !== null ? `,$ver: PageVersionListInput!` : '' }) {
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

						${fullVersions !== null ? gql`
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
						` : '' }
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

		const pages = result.data?.listPages!;
		return pages.map(page => {
			return {
				...fixPublishedAndCreated(page),
				versions: page.versions.map(fixPublishedAndCreated) as PageVersionBase[],
				fullVersions: page.fullVersions?.map(fixPublishedAndCreated)  as PageVersion[] ?? undefined,
			};
		});

	}

	/**
	 * list pages versions
	 * @param data filter data
	 * @param callback GraphQL function callback
	 * @returns list of version
	 */
	async listPageVersions(data: ListPageVersionsInput, callback?: GraphQLCallback<{ listPageVersions: GPageVersion[] }>): Promise<PageVersion[]> {
		const result = await graphql<{ listPageVersions: GPageVersion[] }>(this.apiUrl, {
			query: gql`
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

		const pages = result.data?.listPageVersions!;
		return pages.map(fixPublishedAndCreated) as PageVersion[];

	}

}
