import { gql, graphql, testForApiError } from "../graphql.mjs";
import { TembraApi, apiConfig } from "../types.mjs";

/**
 * SPACE
 */
export interface Space {

  /**
   * space ID
   */
  id: string;

  /**
   * space name
   */
  name: string;

  /**
   * root for article related content
   */
  articleParentId: string;

  /**
   * root for file module
   */
  fileParentId: string;

  /**
   * root for page related content
   */
  pageParentId: string;

  /**
   * root for text related content
   */
  textParentId: string;

  /**
   * root for key-value related content
   */
  keyValueParentId: string;

  /**
   * root for CMS related content (all files)
   */
  cmsParentId: string;
}


const url = `${apiConfig.tembraBase}/public/graphql/space`;


/**
 * Tembra Space API
 */
export class SpaceApi extends TembraApi {

	/**
	 * get information about Space
	 * @returns Space or null if not found
	 */
	async get(): Promise<Space | null> {
		const result = await graphql<{ get: Space | null }>(url, {
			query: gql`
				query {
					get {
						id
						name
						articleParentId
						fileParentId
						pageParentId
						textParentId
						keyValueParentId
						cmsParentId
					}
				}
			`
		}, {
			'x-wnt-space-id': this.config.spaceId
		});

		testForApiError(result);

		return result.data?.get ?? null
	}
}


//


