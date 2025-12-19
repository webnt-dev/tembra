import { GraphQLCallback } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
export interface ImportCategoryInput {
    name: string;
}
export interface ImportTextInput {
    name: string;
    files: string[];
    categoryId: string;
}
export interface ImportTextVersionInput {
    parentId: string;
    language: string;
    country: string[];
    title: string;
    text: string;
}
export interface TextVersionListInput {
    languageCountry?: Maybe<LanguageCountry[]>;
    languageCountryAll?: Maybe<boolean>;
}
export interface TextVersionBase {
    id: string;
    language: string;
    country: string[];
    createdAt: Date;
    updatedAt: Date;
}
type GTextVersionBase = Omit<TextVersionBase, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};
export interface TextVersion extends TextVersionBase {
    parentId: string;
    title: string;
    text: string;
}
type GTextVersion = Omit<TextVersion, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};
export interface Text {
    id: string;
    name: string;
    parentId: string;
    createdAt: Date;
    updatedAt: Date;
    files: string[];
    categoryId: string[];
    fullVersions: Optional<TextVersion[]>;
    versions: TextVersionBase[];
}
type GText = Omit<Text, "createdAt" | "updatedAt" | "versions" | "fullVersions"> & {
    createdAt: string;
    updatedAt: string;
    versions: GTextVersionBase[];
    fullVersions: GTextVersion[];
};
export interface ListTextsInput {
    name?: Maybe<string[]>;
    categoryId?: Maybe<string[]>;
    categoryName?: Maybe<string[]>;
    start?: Maybe<number>;
    count?: Maybe<number>;
    sort?: Maybe<"name">;
    sortDirection?: Maybe<number>;
}
/**
 * Class providing CMS text functions
 */
export declare class TextApi extends TembraApi {
    protected config: TembraApiConfig;
    constructor(config: TembraApiConfig);
    /**
     * function imports/creates text category
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new category ID
     */
    importCategory(data: ImportCategoryInput, callback?: GraphQLCallback<{
        importCategory: string;
    }>): Promise<string>;
    /**
     * function imports/creates text
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new text ID
     */
    importText(data: ImportTextInput, callback?: GraphQLCallback<{
        importText: string;
    }>): Promise<string>;
    /**
     * function imports/creates text version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new text ID
     */
    importTextVersion(data: ImportTextVersionInput, callback?: GraphQLCallback<{
        importTextVersion: string;
    }>): Promise<string>;
    /**
     * list all text
     * @param data filtering data
     * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
     * @param callback GraphQL function callback
     * @returns list of textx
     */
    listTexts(data: ListTextsInput, fullVersions: Nullable<TextVersionListInput>, callback?: GraphQLCallback<{
        listTexts: GText[];
    }>): Promise<Text[]>;
}
export {};
//# sourceMappingURL=text.d.mts.map