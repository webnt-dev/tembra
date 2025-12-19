import { gql, graphql, GraphQLCallback, testForApiError } from "./graphql.mjs";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | undefined | null;

export interface LanguageCountry {
	language?: Maybe<string>;
	country?: Maybe<string>;
}

//export const tembraBase = 'https://api.tembra.app';
export const tembraBase = 'http://localhost:8083';


export interface TembraApiConfig {
	spaceId: string;
	apiKey?: string;
}

export class TembraApi {
	constructor(protected config: TembraApiConfig, protected apiUrl: string) {}

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
