export declare function gql(chunks: TemplateStringsArray, ...variables: any[]): string;
export interface GraphQLResultData {
    [key: string]: unknown;
}
export interface GraphQLResultExtension {
    timestamp: string;
    time: number;
}
export interface GraphQLResultErrorExtension {
    code: string;
    data: any;
}
export interface GraphQLResultErrorLocation {
    line: number;
    column: number;
}
export interface GraphQLResultError<GraphQLResultErrorExtensions> {
    message: string;
    locations: GraphQLResultErrorLocation[];
    path: string[];
    extensions?: GraphQLResultErrorExtensions;
}
export interface GraphQLResultHTTP {
    status: number;
    statusText: string;
}
export interface GraphQLResult<DataType, Extensions, ErrorExtensions> {
    data: DataType | null;
    extensions?: Extensions;
    errors: GraphQLResultError<ErrorExtensions>[] | null;
    http: GraphQLResultHTTP;
}
export interface QueryData {
    query: string;
    variables?: any;
}
export type GraphQLCallback<T extends GraphQLResultData = any, U extends GraphQLResultExtension = {
    timestamp: string;
    time: number;
}, V extends GraphQLResultErrorExtension = {
    code: string;
    data: any;
}> = (result: GraphQLResult<T, U, V>) => void;
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
export declare class GraphQLError extends Error {
    data: {};
    constructor(error: GraphQLResultError<GraphQLErrorExtension>);
}
export declare function testForApiError(graphQLResult: GraphQLResult<any, any, GraphQLErrorExtension>): void;
export {};
//# sourceMappingURL=graphql.d.mts.map