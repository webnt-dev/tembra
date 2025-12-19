import { GraphQLCallback } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
export interface ImportKeyValueInput {
    name: string;
}
export interface KeyValuePairInput {
    name: string;
    value: string;
}
export interface ImportKeyValueVersionInput {
    parentId: string;
    language: string;
    country: string[];
    pairs: KeyValuePairInput[];
}
export interface KeyValueVersionListInput {
    languageCountry?: Maybe<LanguageCountry[]>;
    languageCountryAll?: Maybe<boolean>;
}
export interface KeyValue {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    fullVersions: Optional<KeyValueVersion[]>;
    versions: KeyValueVersionBase[];
}
type GKeyValue = Omit<KeyValue, "createdAt" | "updatedAt" | "fullVersions" | "versions"> & {
    createdAt: string;
    updatedAt: string;
    fullVersions: Optional<GKeyValueVersion[]>;
    versions: GKeyValueVersionBase[];
};
export interface ListKeyValuesInput {
    name?: Maybe<string[]>;
    start?: Maybe<number>;
    count?: Maybe<number>;
    sort?: Maybe<"name">;
    sortDirection?: Maybe<number>;
}
export interface KeyValuePair {
    name: string;
    value: string;
}
export interface KeyValueVersionBase {
    id: string;
    language: string;
    country: string[];
    createdAt: Date;
    updatedAt: Date;
}
type GKeyValueVersionBase = Omit<KeyValueVersionBase, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};
export interface KeyValueVersion {
    parentId: string;
    pairs: KeyValuePair[];
}
type GKeyValueVersion = Omit<KeyValueVersion, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};
/**
 * Class providing CMS page functions
 */
export declare class KeyValueApi extends TembraApi {
    protected config: TembraApiConfig;
    constructor(config: TembraApiConfig);
    /**
     * function imports/creates key-value
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new key-value ID
     */
    importKeyValue(data: ImportKeyValueInput, callback?: GraphQLCallback<{
        importKeyValue: string;
    }>): Promise<string>;
    /**
     * function imports/creates key-value version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new key-value ID
     */
    importKeyValueVersion(data: ImportKeyValueVersionInput, callback?: GraphQLCallback<{
        importKeyValueVersion: string;
    }>): Promise<string>;
    /**
     * list key-values
     * @param data filter data
     * @param fullVersions version filter data (null to omit, {} to list all)
     * @param callback GraphQL function callback
     * @returns list of pages
     */
    listKeyValues(data: ListKeyValuesInput, fullVersions: Nullable<KeyValueVersionListInput>, callback?: GraphQLCallback<{
        listKeyValues: GKeyValue[];
    }>): Promise<KeyValue[]>;
}
export {};
//# sourceMappingURL=keyvalue.d.mts.map