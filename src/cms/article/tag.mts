import { gql, graphql, GraphQLCallback, testForApiError } from "../../graphql.mjs";
import { Nullable, TembraApi, TembraApiConfig } from "../../types.mjs";
import { articleApiUrl } from "./utils.mjs";


/**********************************************
 * TAG
 *********************************************/

// language version of tag
export interface TagContent {
	/**
	 * tag content language
	 */
	language: string;

	/**
	 * tag content (name)
	 */
	data: string;
}

// article tag
export interface Tag {
	/**
	 * tag ID
	 */
	id: string;

	/**
	 * tag name
	 */
	name: string;

	/**
	 * tag parent ID (either space article root or other tag)
	 */
	parentId: string;

	/**
	 * tag language versions
	 */
	content: TagContent[];
}

// language version of tag to import
export interface ImportTagContentInput {
	/**
	 * tag content language
	 */
	language: string;

	/**
	 * tag content (name)
	 */
	data: string;
}

// tag to import
export interface ImportTagInput {
	/**
	 * tag name
	 */
	name: string;

	/**
	 * tag parent ID (either null for root tag or other tag ID)
	 * there cannot be more than 2 levels of tag
	 */
	parentId: Nullable<string>;

	/**
	 * tag language versions
	 */
	content: ImportTagContentInput[];
}



/**
 * Class providing CMS article tag functions
 */
export class TagApi extends TembraApi {
	/**
	 * @param config Tembra API configuration
	 */
	constructor(protected override config: TembraApiConfig) {
		super(config, articleApiUrl)
	}

	/**
	 * list all tags
	 * @param callback GraphQL function callback
	 * @returns list of all tags
	 */
	async listTags(callback?: GraphQLCallback<{listTags: Tag[]}>): Promise<Tag[]> {
		const result = await graphql<{ listTags: Tag[] }>(this.apiUrl, {
			query: gql`
				query {
					listTags {
						id
						name
						parentId
						content {
							language
							data
						}
					}
				}
			`
		}, {
			'x-wnt-space-id': this.config.spaceId
		}, callback);

		testForApiError(result);

		return result.data?.listTags ?? []
	}

	/**
	 * function imports/creates tags
	 * @param data import data
	 * @param callback GraphQL function callback
	 * @returns new tag ID
	 */
	async importTag(data: ImportTagInput, callback?: GraphQLCallback<{ importTag: string }>): Promise<string> {
		const result = await graphql<{ importTag: string }>(
			this.apiUrl,
			{
				query: gql `
					mutation importTag($data: ImportTagInput!) {
						importTag(data: $data)
					}
				`,
				variables: {
					data
				}
			},
			{
				'x-wnt-space-id': this.config.spaceId,
				'x-wnt-api-key': this.config.apiKey ?? '',
			},
			callback
		);

		testForApiError(result);

		return result.data?.importTag ?? ''
	}
}

