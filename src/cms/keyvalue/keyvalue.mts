import { gql, graphql, GraphQLCallback, testForApiError } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
import { keyValueApiUrl } from "./utils.mjs";

/**
 * key-value data
 */
export interface ImportKeyValueInput {
	/**
	 * name
	 */
	name: string;
}

/**
 * key-value pair data
 */
export interface KeyValuePairInput {

	/**
	 * key
	 */
	name: string;

	/**
	 * value
	 */
	value: string;
}

/**
 * key-value version data
 */
export interface ImportKeyValueVersionInput {
	/**
	 * KeyValue.id
	 */
	parentId: string;

	/**
	 * language code
	 */
	language: string;

	/**
	 * country code
	 */
	country: string[];

	/**
	 * list of key-value pairs
	 */
	pairs: KeyValuePairInput[];
}


/**
 * key-value pairs listing input data
 */
export interface KeyValueVersionListInput {

	/**
	 * language / country filters for listing
	 */
	languageCountry?: Maybe<LanguageCountry[]>;

	/**
	 * if true, listing will return all versions in languageCountry parameter
	 * if false, listing will return only first found version for languageCountry parameter
	 */
	languageCountryAll?: Maybe<boolean>;

}

/**
 * key-value pair representation
 */
export interface KeyValue {

	/**
	 * ID
	 */
	id: string;

	/**
	 * name
	 */
	name: string;

	/**
	 * date and time when record was created
	 */
	createdAt: string;

	/**
	 * date and time when record last updated
	 */
	updatedAt: string;

	/**
	 * listing function for full key-value versions
	 */
	fullVersions: Optional<KeyValueVersion[]>;

	/**
	 * listing function for versions information list
	 */
	versions: KeyValueVersionBase[];
}

/**
 * type representing KeyValue in GraphQL format
 */
export type GKeyValue = Omit<KeyValue, "createdAt" | "updatedAt" | "fullVersions" | "versions"> & {
	createdAt: string;
	updatedAt: string;
	fullVersions: Optional<GKeyValueVersion[]>;
	versions: GKeyValueVersionBase[];
}

/**
 * input for key-value listing
 */
export interface ListKeyValuesInput {

	/**
	 * list of names to list
	 */
	name?: Maybe<string[]>;

	/**
	 * listing offset
	 */
	start?: Maybe<number>;

	/**
	 * listing count
	 */
	count?: Maybe<number>;

	/**
	 * sort field (name)
	 */
	sort?: Maybe<"name">;

	/**
	 * sort direction (1 = ascending, -1 = descending)
	 */
	sortDirection?: Maybe<number>;
}

/**
 * key-value pair data
 */
export interface KeyValuePair {

	/**
	 * key
	 */
	name: string;

	/**
	 * value
	 */
	value: string;

}


/**
 * basic information of version
 */
export interface KeyValueVersionBase {

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

}
/**
 * type representing KeyValueVersionBase in GraphQL format
 */
export type GKeyValueVersionBase = Omit<KeyValueVersionBase, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
}

/**
 * key-value version information
 */
export interface KeyValueVersion {

	/**
	 * KeyValue.id
	 */
	parentId: string;

	/**
	 * list of key-value pairs
	 */
	pairs: KeyValuePair[];

}
/**
 * type representing KeyValueVersion in GraphQL format
 */
export type GKeyValueVersion = Omit<KeyValueVersion, "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
}

function fixCreated<T>(p: {
	createdAt: string;
	updatedAt: string;
}): T {
	return {
		...p,
		createdAt: new Date(p.createdAt),
		updatedAt: new Date(p.updatedAt),
	} as T
}

/**
 * Class providing CMS page functions
 */
export class KeyValueApi extends TembraApi {
	constructor(protected override config: TembraApiConfig) {
		super(config, keyValueApiUrl)
	}

	/**
	 * function imports/creates key-value
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns new key-value ID
	 */
	async importKeyValue(data: ImportKeyValueInput, callback?: GraphQLCallback<{ importKeyValue: string }>): Promise<string> {
		const result = await graphql<{ importKeyValue: string }>(
			this.apiUrl,
			{
				query: gql `
					mutation importKeyValue($data: ImportKeyValueInput!) {
						importKeyValue(data: $data)
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

		return result.data?.importKeyValue ?? ''
	}


	/**
	 * function imports/creates key-value version
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns new key-value ID
	 */
	async importKeyValueVersion(data: ImportKeyValueVersionInput, callback?: GraphQLCallback<{ importKeyValueVersion: string }>): Promise<string> {
		const result = await graphql<{ importKeyValueVersion: string }>(
			this.apiUrl,
			{
				query: gql `
					mutation importKeyValueVersion($data: ImportKeyValueVersionInput!) {
						importKeyValueVersion(data: $data)
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

		return result.data?.importKeyValueVersion ?? ''
	}

	/**
	 * list key-values
	 * @param data filter data
	 * @param fullVersions version filter data (null to omit, {} to list all)
	 * @param callback GraphQL function callback
	 * @returns list of pages
	 */
	async listKeyValues(data: ListKeyValuesInput, fullVersions: Nullable<KeyValueVersionListInput>, callback?: GraphQLCallback<{ listKeyValues: GKeyValue[] }>): Promise<KeyValue[]> {
		const result = await graphql<{ listKeyValues: GKeyValue[] }>(this.apiUrl, {
			query: gql`
				query listKeyValues($data: ListKeyValuesInput! ${ fullVersions !== null ? `,$ver: KeyValueVersionListInput!` : '' }) {
					listKeyValues(data: $data) {

						id
						name
						parentId
						createdAt
						updatedAt

						${fullVersions !== null ? gql`
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

		const kvs = result.data?.listKeyValues!;
		return kvs.map(kv => {
			return {
				...fixCreated(kv),
				versions: kv.versions.map(fixCreated) as KeyValueVersionBase[],
				fullVersions: kv.fullVersions?.map(fixCreated)  as KeyValueVersion[] ?? undefined,
			};
		});
	}

}
