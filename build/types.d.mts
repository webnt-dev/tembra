import { GraphQLCallback } from "./graphql.mjs";
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | undefined | null;
export interface LanguageCountry {
    language?: Maybe<string>;
    country?: Maybe<string>;
}
export declare const tembraBase = "http://localhost:8083";
export interface TembraApiConfig {
    spaceId: string;
    apiKey?: string;
}
export declare class TembraApi {
    protected config: TembraApiConfig;
    protected apiUrl: string;
    constructor(config: TembraApiConfig, apiUrl: string);
    ping(callback?: GraphQLCallback<{
        ping: boolean;
    }>): Promise<boolean>;
}
//# sourceMappingURL=types.d.mts.map