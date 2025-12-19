/**
 * function provides syntax highlighting of GraphQL queries in editors that support it.
 * use GraphQL: Syntax Highlighting extension in VSCode
 */
export declare function gql(chunks: TemplateStringsArray, ...variables: any[]): string;
/**
 * interface for GraphQL result data
 */
export interface GraphQLResultData {
    [key: string]: unknown;
}
/**
 * GraphQL result extension interfaces
 */
export interface GraphQLResultExtension {
    timestamp: string;
    time: number;
}
/**
 * GraphQL result error extension interfaces
 */
export interface GraphQLResultErrorExtension {
    code: string;
    data: any;
}
/**
 * GraphQL result error location
 */
export interface GraphQLResultErrorLocation {
    line: number;
    column: number;
}
/**
 * GraphQL result error
 */
export interface GraphQLResultError<GraphQLResultErrorExtensions> {
    message: string;
    locations: GraphQLResultErrorLocation[];
    path: string[];
    extensions?: GraphQLResultErrorExtensions;
}
/**
 * GraphQL result HTTP info
 */
export interface GraphQLResultHTTP {
    status: number;
    statusText: string;
}
/**
 * GraphQL result JSON structure
 */
export interface GraphQLResult<DataType, Extensions, ErrorExtensions> {
    data: DataType | null;
    extensions?: Extensions;
    errors: GraphQLResultError<ErrorExtensions>[] | null;
    http: GraphQLResultHTTP;
}
/**
 * GraphQL query data
 */
export interface QueryData {
    query: string;
    variables?: any;
}
/**
 * GraphQL function callback type called on each request completion
 */
export type GraphQLCallback<T extends GraphQLResultData = any, U extends GraphQLResultExtension = {
    timestamp: string;
    time: number;
}, V extends GraphQLResultErrorExtension = {
    code: string;
    data: any;
}> = (result: GraphQLResult<T, U, V>) => void;
/**
 * function to perform GraphQL queries
 * @param url url to GraphQL endpoint
 * @param data Query data
 * @param headers request headers
 * @param callback callback function called on request completion
 * @returns promise with GraphQL result
 */
export declare function graphql<T extends GraphQLResultData = any, U extends GraphQLResultExtension = {
    timestamp: string;
    time: number;
}, V extends GraphQLResultErrorExtension = {
    code: string;
    data: any;
}>(url: string, data: QueryData, headers?: Record<string, string>, callback?: GraphQLCallback<T, U, V>): Promise<GraphQLResult<T, U, V>>;
interface GraphQLErrorExtension {
    code: string;
    data: {};
}
/**
 * GraphQL Error class
 */
export declare class GraphQLError extends Error {
    data: {};
    constructor(error: GraphQLResultError<GraphQLErrorExtension>);
}
/**
 * function tests GraphQL result for errors and throws GraphQLError if any found
 * @param graphQLResult GraphQL result to test
 */
export declare function testForApiError(graphQLResult: GraphQLResult<any, any, GraphQLErrorExtension>): void;
export {};
//# sourceMappingURL=graphql.d.mts.map