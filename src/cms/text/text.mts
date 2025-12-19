import { gql, graphql, GraphQLCallback, testForApiError } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
import { textApiUrl } from "./utils.mjs";

// create / import category
export interface ImportCategoryInput {

	// category name
	name: string;

}

// create text
export interface ImportTextInput {
	// text name
	name: string;

	// list of File.id
	files: string[];

	// category ID
	categoryId: string;
}

// create text version
export interface ImportTextVersionInput {

	// text ID
	parentId: string;

	// language code
	language: string;

	// country code
	country: string[];

	// text title
	title: string;

	// text data
	text: string;

}


// input for text versions listing
export interface TextVersionListInput {

	// language / country filters for listing
	languageCountry?: Maybe<LanguageCountry[]>;

	// if true, listing will return all versions in languageCountry parameter
	// if false, listing will return only first found version for languageCountry parameter
	languageCountryAll?: Maybe<boolean>;

}

export interface TextVersionBase {

	// version id
	id: string;

	// language code
	language: string;

	// country code
	country: string[];

	// date and time when article version was created
	createdAt: Date

	// date and time when article version last updated
	updatedAt: Date;

}

type GTextVersionBase = Omit<TextVersionBase, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
}

// Text version representation
export interface TextVersion extends TextVersionBase {

	// Text.id
	parentId: string;

	// text title
	title: string;

	// text data
	text: string;
}

type GTextVersion = Omit<TextVersion, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
}


// representation of text
export interface Text {

	// Text.id
	id: string;

	// text name
	name: string;

	// text parent id (Space.textParentId)
	parentId: string;

	// date and time when text was created
	createdAt: Date;

	// date and time when text last updated
	updatedAt: Date;

	// list of File.id
	files: string[];

	// category ID
	categoryId: string[];

	// listing function for full text versions
	fullVersions: Optional<TextVersion[]>;

	// listing function for versions information list
	versions: TextVersionBase[];
}

type GText = Omit<Text, "createdAt" | "updatedAt" | "versions" | "fullVersions"> & {
	createdAt: string;
	updatedAt: string;
	versions: GTextVersionBase[];
	fullVersions: GTextVersion[];
}


// input for text listing
export interface ListTextsInput {

	// list of text names to list
	name?: Maybe<string[]>;

	// list of category IDs to list texts from
	categoryId?: Maybe<string[]>;

	// list of category names to list texts from
	categoryName?: Maybe<string[]>;

	// listing offset,
	start?: Maybe<number>;

	// listing count
	count?: Maybe<number>;

	// sort field (name)
	sort?: Maybe<"name">;

	// sort direction (1 = ascending, -1 = descending)
	sortDirection?: Maybe<number>;

}


/**
 * Class providing CMS text functions
 */
export class TextApi extends TembraApi {
	constructor(protected override config: TembraApiConfig) {
		super(config, textApiUrl)
	}

	/**
	 * function imports/creates text category
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns new category ID
	 */
	async importCategory(data: ImportCategoryInput, callback?: GraphQLCallback<{ importCategory: string }>): Promise<string> {
		const result = await graphql<{ importCategory: string }>(
			this.apiUrl,
			{
				query: gql `
					mutation importCategory($data: ImportCategoryInput!) {
						importCategory(data: $data)
					}
				`,
				variables: {
					data
				}
			},
			{
				'x-wnt-space-id': this.config.spaceId,
				'x-wnt-api-key': this.config.apiKey ?? '',
			},
			callback
		);

		testForApiError(result);

		return result.data?.importCategory ?? ''
	}

	/**
	 * function imports/creates text
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns new text ID
	 */
	async importText(data: ImportTextInput, callback?: GraphQLCallback<{ importText: string }>): Promise<string> {
		const result = await graphql<{ importText: string }>(
			this.apiUrl,
			{
				query: gql `
					mutation importText($data: ImportTextInput!) {
						importText(data: $data)
					}
				`,
				variables: {
					data
				}
			},
			{
				'x-wnt-space-id': this.config.spaceId,
				'x-wnt-api-key': this.config.apiKey ?? '',
			},
			callback
		);

		testForApiError(result);

		return result.data?.importText ?? ''
	}

	/**
	 * function imports/creates text version
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns new text ID
	 */
	async importTextVersion(data: ImportTextVersionInput, callback?: GraphQLCallback<{ importTextVersion: string }>): Promise<string> {
		const result = await graphql<{ importTextVersion: string }>(
			this.apiUrl,
			{
				query: gql `
					mutation importTextVersion($data: ImportTextVersionInput!) {
						importTextVersion(data: $data)
					}
				`,
				variables: {
					data
				}
			},
			{
				'x-wnt-space-id': this.config.spaceId,
				'x-wnt-api-key': this.config.apiKey ?? '',
			},
			callback
		);

		testForApiError(result);

		return result.data?.importTextVersion ?? ''
	}

	/**
	 * list all text
	 * @param data filtering data
	 * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
	 * @param callback GraphQL function callback
	 * @returns list of textx
	 */
	async listTexts(data: ListTextsInput, fullVersions: Nullable<TextVersionListInput>, callback?: GraphQLCallback<{ listTexts: GText[] }>): Promise<Text[]> {
		const result = await graphql<{ listTexts: GText[] }>(this.apiUrl, {
			query: gql`
				query listTexts($data: ListTextsInput! ${ fullVersions !== null ? `,$ver: TextVersionListInput!` : '' }) {
					listTexts(data: $data) {
						id
						name
						parentId
						createdAt
						updatedAt
						files
						categoryId
						${fullVersions !== null ? gql`
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
						` : '' }
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

		const texts = result.data?.listTexts!;
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
					}
				}),
				fullVersions: text.fullVersions?.map(version => {
					return {
						...version,
						createdAt: new Date(version.createdAt),
						updatedAt: new Date(version.updatedAt),
					}
				}) ?? undefined,
			};
		});

	}
}
