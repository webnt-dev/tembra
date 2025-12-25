import { GraphQLCallback } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
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
};
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
};
/**
 * key-value version information
 */
export interface KeyValueVersion extends KeyValueVersionBase {
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
//# sourceMappingURL=keyvalue.d.mts.map