export function gql(chunks: TemplateStringsArray, ...variables: any[]): string {
	return chunks.reduce((accumulator, chunk, index) => `${accumulator}${chunk}${index in variables ? variables[index] : ''}`, '');
}


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

export interface QueryData {
	query: string;
	variables?: any;
}


export type GraphQLCallback<T extends GraphQLResultData = any, U extends GraphQLResultExtension = { timestamp: string;	time: number; }, V extends GraphQLResultErrorExtension = { code: string; data: any;} > = (result: GraphQLResult<T, U, V>) => void;

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

export class GraphQLError extends Error {
	public data: {};
	constructor(error: GraphQLResultError<GraphQLErrorExtension>) {
		super(error.extensions?.code ?? error.message);
		this.data = error.extensions?.data ?? {};
		this.name = 'GraphQLError';
	}
}

export function testForApiError(graphQLResult: GraphQLResult<any, any, GraphQLErrorExtension>) {
	if (graphQLResult.errors?.length) {
		throw new GraphQLError(graphQLResult.errors[0]!);
	}

}


