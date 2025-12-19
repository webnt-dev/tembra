
/**
 * function provides syntax highlighting of GraphQL queries in editors that support it.
 * use GraphQL: Syntax Highlighting extension in VSCode
 */
export function gql(chunks: TemplateStringsArray, ...variables: any[]): string {
	return chunks.reduce((accumulator, chunk, index) => `${accumulator}${chunk}${index in variables ? variables[index] : ''}`, '');
}

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
export interface GraphQLResult<DataType, Extensions, ErrorExtensions>  {
	data: DataType | null;
	extensions?: Extensions;
	errors: GraphQLResultError<ErrorExtensions>[] | null;
	http: GraphQLResultHTTP;
}


function httpError<T, U, V>(statusText: string, status: number): GraphQLResult<T, U, V> {
	return {
		data: null,
		errors: [
			{
				message: '',
				locations: [],
				path: [],
			}
		],
		http: {
			status,
			statusText,
		}
	}
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
export type GraphQLCallback<T extends GraphQLResultData = any, U extends GraphQLResultExtension = { timestamp: string;	time: number; }, V extends GraphQLResultErrorExtension = { code: string; data: any;} > = (result: GraphQLResult<T, U, V>) => void;

/**
 * function to perform GraphQL queries
 * @param url url to GraphQL endpoint
 * @param data Query data
 * @param headers request headers
 * @param callback callback function called on request completion
 * @returns promise with GraphQL result
 */
export async function graphql<T extends GraphQLResultData = any, U extends GraphQLResultExtension = { timestamp: string;	time: number; }, V extends GraphQLResultErrorExtension = { code: string; data: any;}>(
	url: string,
	data: QueryData,
	headers: Record<string, string> = {},
	callback?: GraphQLCallback<T, U, V>,
): Promise<GraphQLResult<T, U, V>> {
	try {
		const f = await fetch(url, {
			method: "POST",
			headers,
			body: JSON.stringify({
				query: data.query,
				variables: data.variables,
			}),
		});
		if (f.status !== 200) {
			return httpError<T, U, V>(f.statusText, f.status);
		}
		const r = (await f.json()) as GraphQLResult<T, U, V>;
		r.http = {
			status: 200,
			statusText: 'OK',
		}
		if (!Array.isArray(r.errors)) {
			r.errors = null;
		}
		if (!r.data) {
			r.data = null;
		}
		if (callback) callback(r);
		return r;
	} catch (e) {
		const r = httpError<T, U, V>('', 0);
		if (e instanceof Error) {
			r.errors![0].message = e.name;
			if (e.name === 'AbortError') {
				r.http.status = 1;
			}
		}
		return r;
	}
}


interface GraphQLErrorExtension {
	code: string;
	data: {};
}

/**
 * GraphQL Error class
 */
export class GraphQLError extends Error {
	public data: {};
	constructor(error: GraphQLResultError<GraphQLErrorExtension>) {
		super(error.extensions?.code ?? error.message);
		this.data = error.extensions?.data ?? {};
		this.name = 'GraphQLError';
	}
}

/**
 * function tests GraphQL result for errors and throws GraphQLError if any found
 * @param graphQLResult GraphQL result to test
 */
export function testForApiError(graphQLResult: GraphQLResult<any, any, GraphQLErrorExtension>) {
	if (graphQLResult.errors?.length) {
		throw new GraphQLError(graphQLResult.errors[0]!);
	}
}


