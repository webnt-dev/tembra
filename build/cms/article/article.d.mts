import { GraphQLCallback } from "../../graphql.mjs";
import { LanguageCountry, Maybe, Nullable, Optional, TembraApi, TembraApiConfig } from "../../types.mjs";
interface GCreatedAndPublished {
    createdAt: string;
    updatedAt: string;
    publishedFrom: string;
    publishedTo: Nullable<string>;
}
type GCreatedAndPublishedProperties = 'createdAt' | 'updatedAt' | 'publishedFrom' | 'publishedTo';
export interface ArticleComments {
    all: number;
    new: number;
    valid: number;
    junk: number;
    validTree: number;
}
export interface ArticleVersionBase {
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
export interface Article {
    id: string;
    name: string;
    parentId: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    files: string[];
    published: boolean;
    publishedFrom: Date;
    publishedTo: Nullable<Date>;
    versions: ArticleVersionBase[];
    commentCount: ArticleComments;
    fullVersions: Optional<ArticleVersion[]>;
}
type GraphQLArticle = Omit<Article, GCreatedAndPublishedProperties | 'versions' | "fullVersions"> & GCreatedAndPublished & {
    versions: (Omit<ArticleVersionBase, GCreatedAndPublishedProperties> & GCreatedAndPublished)[];
} & {
    fullVersions: (Omit<ArticleVersion, GCreatedAndPublishedProperties> & GCreatedAndPublished)[];
};
export interface ImportArticleInput {
    name: string;
    tags: string[];
    files: string[];
    published: boolean;
    publishedFrom: Date;
    publishedTo?: Maybe<Date>;
}
export interface ListArticlesInput {
    published?: Maybe<boolean>;
    start?: Maybe<number>;
    count?: Maybe<number>;
    sort?: Maybe<"name" | "published">;
    sortDirection?: Maybe<-1 | 1>;
    tags?: Maybe<string[]>;
}
export interface ArticleVersion extends ArticleVersionBase {
    parentId: string;
    title: string;
    url: string;
    perex: string;
    text: string;
    description: string;
    keywords: string;
    ogDescription: string;
    ogTitle: string;
    ogImage: string;
    perexImage: string;
    commentCount: ArticleComments;
}
type GraphQLArticleVersion = Omit<ArticleVersion, GCreatedAndPublishedProperties> & GCreatedAndPublished;
export interface ImportArticleVersionInput {
    parentId: string;
    language: string;
    country: string[];
    publishedAsParent: boolean;
    published: boolean;
    publishedFrom: Date;
    publishedTo?: Maybe<Date>;
    title: string;
    url: string;
    perex: string;
    text: string;
    description: string;
    keywords: string;
    ogDescription: string;
    ogTitle: string;
    ogImage: string;
    perexImage: string;
}
export interface ArticleVersionListInput {
    languageCountry?: Maybe<LanguageCountry[]>;
    languageCountryAll?: Maybe<boolean>;
    published?: Maybe<boolean>;
}
export interface SearchArticleVersionsInput {
    languageCountry?: Maybe<LanguageCountry[]>;
    languageCountryAll?: Maybe<boolean>;
    published?: Maybe<boolean>;
    search?: Maybe<string>;
    tags?: Maybe<string[]>;
    start?: Maybe<number>;
    count?: Maybe<number>;
    sort?: Maybe<"published" | "searchScore" | "title">;
    sortDirection?: Maybe<-1 | 1>;
    url?: Maybe<string>;
}
export interface SearchArticleVersionsResult {
    items: (ArticleVersion & {
        searchScore: number;
        tags: string[];
    })[];
    listing: {
        itemsCount: number;
        start: number;
        count: number;
    };
}
type GraphQLSearchArticleVersionsResult = Omit<SearchArticleVersionsResult, "items"> & {
    items: (GraphQLArticleVersion & {
        searchScore: number;
    })[];
};
/**
 * Class providing CMS article functions
 */
export declare class ArticleApi extends TembraApi {
    protected config: TembraApiConfig;
    constructor(config: TembraApiConfig);
    /**
     * get article by ID
     * @param id article ID
     * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
     * @param callback GraphQL function callback
     * @returns article or null
     */
    getArticle(id: string, fullVersions: Nullable<ArticleVersionListInput>, callback?: GraphQLCallback<{
        getArticle: GraphQLArticle | null;
    }>): Promise<Article | null>;
    /**
     * list all articles
     * @param data listing parameters
     * @param fullVersions parameters to list fullVersion (use null not to return full version, use emty object {} to list all versions)
     * @param callback GraphQL function callback
     * @returns list of articles
     */
    listArticles(data: ListArticlesInput, fullVersions: Nullable<ArticleVersionListInput>, callback?: GraphQLCallback<{
        listArticles: GraphQLArticle[];
    }>): Promise<Article[]>;
    /**
     * search for / list article versions
     * @param data searching/listing parameters
     * @param callback GraphQL function callback
     * @returns list of articles versions
     */
    searchArticleVersions(data: SearchArticleVersionsInput, callback?: GraphQLCallback<{
        searchArticleVersions: GraphQLSearchArticleVersionsResult;
    }>): Promise<SearchArticleVersionsResult>;
    /**
     * create/import article
     * @param data import data
     * @param callback GraphQL function callback
     * @returns article ID
     */
    importArticle(data: ImportArticleInput, callback?: GraphQLCallback<{
        importArticle: string;
    }>): Promise<string>;
    /**
     * import/create article version
     * @param data import data
     * @param callback GraphQL function callback
     * @returns version ID
     */
    importArticleVersion(data: ImportArticleVersionInput, callback?: GraphQLCallback<{
        importArticleVersion: string;
    }>): Promise<string>;
}
export {};
//# sourceMappingURL=article.d.mts.map