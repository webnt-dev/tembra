
/**********************************************
 * Comment
 *********************************************/

import { gql, graphql, GraphQLCallback, testForApiError } from "../../graphql.mjs";
import { Maybe, Nullable, TembraApi, TembraApiConfig } from "../../types.mjs";
import { articleApiUrl } from "./utils.mjs";

// custom comment field (e.g. email, www pages)
export interface CommentField {
	// field name
	name: string;

	// field value
	value: string;
}


// comment
export interface Comment {
	// comment id
	id: string;

	// comment parent (article) id
	articleId: string;

	// comment parent (article version) id
	versionId: string;

	// comment parent (parent comment) id
	parentId: Nullable<string>;

	// ID of user of Tembra (to identify your users responses)
	userId: Nullable<string>;

	// numeric representation of comemnts tree structure
	// 00000008.00000015.00000002 would represent second answer to 15th answer to 8th comment
	// if comment is deleted, levelIdent does not update, but order is of course preserved
	// usefull for sorting, can be referenced as id (since it does not change and is unique)
	levelIdent: string;

	// version language
	language: string;

	// date and time when comment version was created
	createdAt: string;

	// date and time when comment version was last updated
	updatedAt: string;

	// comment state
	state: CommentState;

	// comment subject
	subject: string;

	// comment text
	text: string;

	// comment custom fields
	fields: CommentField[];
}

// comment state (new comment, comment marked as valid, comment marked as junk)
export type CommentState = "new" | "valid" | "junk";

// custom comment field (e.g. email, www pages)
export interface CommentFieldInput {
	// field name
	name: string;

	// field value
	value: string;
}

// create comment data (submit comment)
export interface CreateCommentInput {
	// article version ID
	versionId: string;

	// comment parent (comment id), null if root comment
	parentId: Nullable<string>;

	// comment subject
	subject: string;

	// comment text
	text: string;

	// comment custom fields
	fields: CommentFieldInput[];
}

// comment listing/filtering data, Maybe fields are ignored if null | undefined
export interface ListCommentsInput {

	// article ID
	articleId: string;

	// parent comment id (or null to start from root)
	parentId: Nullable<string>;

	// article version id
	versionId: Nullable<string>;

	// comment version language
	language?: Maybe<string>;

	// whether to incclude all coments children
	includeChildren?: Maybe<boolean>;

	// which states are you interested
	// if parent does not mathc the state, no child is returned
	state?: Maybe<CommentState[]>;

	// listing offset start
	start?: Maybe<number>;

	// number of items to return (defaults to 100)
	count?: Maybe<number>;
}

// listing result
export interface ListCommentsResult {

	// list of comments
	items: Comment[];
	listing: {
		// number of all items based on parameters
		itemsCount: number;

		// listing offset start (from request)
		start: number;

		// listing count (from request)
		count: number;
	};
}


/**
 * Class providing CMS article comment functions
 */
export class CommentApi extends TembraApi {

	constructor(protected override config: TembraApiConfig) {
		super(config, articleApiUrl)
	}

	/**
	 * function to create comment
	 * @param data comment data
	 * @param callback GraphQL function callback
	 * @returns comment ID
	 */
	async createComment(data: CreateCommentInput, callback?: GraphQLCallback<{ createComment: string }>): Promise<string> {
		const result = await graphql<{ createComment: string }>(this.apiUrl, {
			query: gql`
				mutation createComment($data: CreateCommentInput!) {
					createComment(data: $data)
				}
			`,
			variables: {
				data
			}
		}, {
			'x-wnt-space-id': this.config.spaceId,
		}, callback);

		testForApiError(result);

		return result.data?.createComment ?? '';
	}


	/**
	 * function to list comments
	 * @param data list data
	 * @param callback GraphQL function callback
	 * @returns listing result
	 */
	async listComments(data: ListCommentsInput, callback?: GraphQLCallback<{ listComments: ListCommentsResult }>): Promise<ListCommentsResult> {

		const result = await graphql<{ listComments: ListCommentsResult }>(this.apiUrl, {
			query: gql`
				query listComments($data: ListCommentsInput!) {
					listComments(data: $data) {
						items {
							id
							articleId
							parentId
							userId
							levelIdent
							language
							versionId
							createdAt
							updatedAt
							state
							subject
							text
							fields {
								name
								value
							}
						}
						listing {
							itemsCount
							start
							count
						}
					}
				}
			`,
			variables: {
				data
			}
		}, {
			'x-wnt-space-id': this.config.spaceId,
		}, callback);

		testForApiError(result);

		return result.data?.listComments!;
	}

}
