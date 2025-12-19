export function gql(chunks, ...variables) {
    return chunks.reduce((accumulator, chunk, index) => `${accumulator}${chunk}${index in variables ? variables[index] : ''}`, '');
}
function httpError(statusText, status) {
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
    };
}
export async function graphql(url, data, headers = {}, callback) {
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
            return httpError(f.statusText, f.status);
        }
        const r = (await f.json());
        r.http = {
            status: 200,
            statusText: 'OK',
        };
        if (!Array.isArray(r.errors)) {
            r.errors = null;
        }
        if (!r.data) {
            r.data = null;
        }
        if (callback)
            callback(r);
        return r;
    }
    catch (e) {
        const r = httpError('', 0);
        if (e instanceof Error) {
            r.errors[0].message = e.name;
            if (e.name === 'AbortError') {
                r.http.status = 1;
            }
        }
        return r;
    }
}
export class GraphQLError extends Error {
    data;
    constructor(error) {
        super(error.extensions?.code ?? error.message);
        this.data = error.extensions?.data ?? {};
        this.name = 'GraphQLError';
    }
}
export function testForApiError(graphQLResult) {
    if (graphQLResult.errors?.length) {
        throw new GraphQLError(graphQLResult.errors[0]);
    }
}
//# sourceMappingURL=graphql.mjs.map