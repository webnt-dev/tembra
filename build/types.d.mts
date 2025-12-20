import { GraphQLCallback } from "./graphql.mjs";
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
export declare const apiConfig: {
    tembraBase: string;
};
/**
 * Tembra API base URL endpoint
 */
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
export declare class TembraApi {
    protected config: TembraApiConfig;
    protected apiUrl: string;
    /**
     *
     * @param config Tembra API configuration
     * @param apiUrl endpoint URL
     */
    constructor(config: TembraApiConfig, apiUrl: string);
    /**
     * function to ping the API
     * @param callback callback function to be called on completion
     * @returns boolean indicating if the API is reachable
     */
    ping(callback?: GraphQLCallback<{
        ping: boolean;
    }>): Promise<boolean>;
}
//# sourceMappingURL=types.d.mts.map