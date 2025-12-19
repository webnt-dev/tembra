import { GraphQLCallback } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
export interface ImportPageInput {
    name: string;
    files: string[];
    published: boolean;
    publishedFrom: Date;
    publishedTo?: Maybe<Date>;
}
export interface ImportPageVersionInput {
    language: string;
    country: string[];
    publishedAsParent: boolean;
    published: boolean;
    publishedFrom: Date;
    publishedTo?: Maybe<Date>;
    parentId: string;
    title: string;
    url: string;
    text: string;
    description: string;
    keywords: string;
    ogDescription: string;
    ogTitle: string;
    ogImage: string;
}
export interface PageVersionListInput {
    languageCountry?: Maybe<LanguageCountry[]>;
    languageCountryAll?: Maybe<Boolean>;
    published?: Maybe<boolean>;
}
export interface Page {
    id: string;
    name: string;
    parentId: string;
    createdAt: Date;
    updatedAt: Date;
    files: string[];
    published: boolean;
    publishedFrom: string;
    publishedTo: Nullable<string>;
    fullVersions: Optional<PageVersion[]>;
    versions: PageVersionBase[];
}
type DateProps = "createdAt" | "updatedAt" | "publishedFrom" | "publishedTo";
interface DateFields {
    createdAt: string;
    updatedAt: string;
    publishedFrom: string;
    publishedTo: Nullable<string>;
}
type GPage = Omit<Page, "fullVersions" | "versions" | DateProps> & DateFields & {
    fullVersions: Optional<GPageVersion[]>;
    versions: GPageVersionBase[];
};
export interface ListPagesInput {
    name?: Maybe<string[]>;
    start?: Maybe<number>;
    count?: Maybe<number>;
}
export interface PageVersionBase {
    id: string;
    language: string;
    country: string[];
    createdAt: Date;
    updatedAt: Date;
    publishedAsParent: boolean;
    published: boolean;
    publishedFrom: Date;
    publishedTo: Nullable<Date>;
}
type GPageVersionBase = Omit<PageVersionBase, DateProps> & DateFields;
export interface PageVersion extends PageVersionBase {
    parentId: string;
    title: string;
    url: string;
    text: string;
    description: string;
    keywords: string;
    ogDescription: string;
    ogTitle: string;
    ogImage: string;
}
type GPageVersion = Omit<PageVersion, "createdAt" | "updatedAt" | "publishedFrom" | "publishedTo"> & {
    createdAt: string;
    updatedAt: string;
    publishedFrom: string;
    publishedTo: Nullable<string>;
};
export interface ListPageVersionsInput {
    languageCountry?: Maybe<LanguageCountry[]>;
    languageCountryAll?: Maybe<boolean>;
    published?: Maybe<boolean>;
    parentId?: Maybe<string>;
    title?: Maybe<string>;
    url?: Maybe<string>;
    sort?: Maybe<"title" | "published">;
    sortDirection?: Maybe<number>;
    start?: Maybe<number>;
    count?: Maybe<number>;
}
/**
 * Class providing CMS page functions
 */
export declare class PageApi extends TembraApi {
    protected config: TembraApiConfig;
    constructor(config: TembraApiConfig);
    /**
     * function imports/creates page
     * @param data import data
     * @param callback GraphQL function callback
     * @returns new page ID
     */
    importPage(data: ImportPageInput, callback?: GraphQLCallback<{
        importPage: string;
    }>): Promise<string>;
    /**
     * import/create page version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns version ID
     */
    importPageVersion(data: ImportPageVersionInput, callback?: GraphQLCallback<{
        importPageVersion: string;
    }>): Promise<string>;
    /**
     * list pages
     * @param data filter data
     * @param fullVersions version filter data (null to omit, {} to list all)
     * @param callback GraphQL function callback
     * @returns list of pages
     */
    listPages(data: ListPagesInput, fullVersions: Nullable<PageVersionListInput>, callback?: GraphQLCallback<{
        listPages: GPage[];
    }>): Promise<Page[]>;
    /**
     * list pages versions
     * @param data filter data
     * @param callback GraphQL function callback
     * @returns list of version
     */
    listPageVersions(data: ListPageVersionsInput, callback?: GraphQLCallback<{
        listPageVersions: GPageVersion[];
    }>): Promise<PageVersion[]>;
}
export {};
//# sourceMappingURL=page.d.mts.map