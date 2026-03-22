import { gql, graphql, GraphQLCallback, testForApiError } from "./graphql.mjs";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | undefined | null;

/**
 * language and country code pair
 * represents regionality
 */
export interface LanguageCountry {
	language?: Maybe<string>;
	country?: Maybe<string>;
}

/**
 * Tembra API base URL endpoint
 */
export const apiConfig = {
	tembraBase: 'https://api.tembra.app',
	// tembraBase: 'http://localhost:8083',
}


/**
 * Tembra API configuration
 */
export interface TembraApiConfig {
	/**
	 * space ID
	 */
	spaceId: string;

	/**
	 * optional API key for authentication
	 */
	apiKey?: string;
}

/**
 * base Tembra API class
 */
export class TembraApi {
	/**
	 *
	 * @param config Tembra API configuration
	 * @param apiUrl endpoint URL
	 */
	constructor(protected config: TembraApiConfig, protected apiUrl: string) {}

	/**
	 * function to ping the API
	 * @param callback callback function to be called on completion
	 * @returns boolean indicating if the API is reachable
	 */
	async ping(callback?: GraphQLCallback<{ ping: boolean }>): Promise<boolean> {
		const result = await graphql<{ ping: boolean }>(this.apiUrl, {
			query: gql`
				query {
					ping
				}
			`
		}, {
			'x-wnt-space-id': this.config.spaceId
		}, callback);

		testForApiError(result);

		return result.data?.ping ?? false;
	}

}
