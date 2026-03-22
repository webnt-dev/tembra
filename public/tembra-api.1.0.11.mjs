function t(t,...e){return t.reduce((t,a,i)=>`${t}${a}${i in e?e[i]:""}`,"")}function e(t,e){return{data:null,errors:[{message:"",locations:[],path:[]}],http:{status:e,statusText:t}}}async function a(t,a,i={},s){try{const r=await fetch(t,{method:"POST",headers:i,body:JSON.stringify({query:a.query,variables:a.variables})});if(200!==r.status)return e(r.statusText,r.status);const n=await r.json();return n.http={status:200,statusText:"OK"},Array.isArray(n.errors)||(n.errors=null),n.data||(n.data=null),s&&s(n),n}catch(t){const a=e("",0);return t instanceof Error&&(a.errors[0].message=t.name,"AbortError"===t.name&&(a.http.status=1)),a}}class i extends Error{data;constructor(t){super(t.extensions?.code??t.message),this.data=t.extensions?.data??{},this.name="GraphQLError"}}function s(t){if(t.errors?.length)throw new i(t.errors[0])}const r={tembraBase:"https://api.tembra.app"};class n{config;apiUrl;constructor(t,e){this.config=t,this.apiUrl=e}async ping(e){const i=await a(this.apiUrl,{query:t`
				query {
					ping
				}
			`},{"x-wnt-space-id":this.config.spaceId},e);return s(i),i.data?.ping??!1}}const d=`${r.tembraBase}/public/graphql/space`;class o extends n{async get(){const e=await a(d,{query:t`
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
			`},{"x-wnt-space-id":this.config.spaceId});return s(e),e.data?.get??null}}const l=`${r.tembraBase}/public/cms/graphql/article`;class u extends n{config;constructor(t){super(t,l),this.config=t}async listTags(e){const i=await a(this.apiUrl,{query:t`
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
			`},{"x-wnt-space-id":this.config.spaceId},e);return s(i),i.data?.listTags??[]}async importTag(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importTag($data: ImportTagInput!) {
						importTag(data: $data)
					}
				`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importTag??""}}function p(t){return{...t,createdAt:new Date(t.createdAt),updatedAt:new Date(t.updatedAt),publishedFrom:new Date(t.publishedFrom),publishedTo:t.publishedTo?new Date(t.publishedTo):null}}class c extends n{config;constructor(t){super(t,l),this.config=t}async getArticle(e,i,r){const n=await a(this.apiUrl,{query:t`
				query getArticle($id: String! ${null!==i?",$ver: ArticleVersionListInput!":""}) {
					getArticle(id: $id) {
						id
						name
						parentId
						createdAt
						updatedAt
						tags
						files

						published
						publishedFrom
						publishedTo

						versions {
							id
							language
							country
							createdAt
							updatedAt


							publishedAsParent
							published
							publishedFrom
							publishedTo
						}

						commentCount {
							all
							new
							valid
							junk
							validTree
						}
						${null!==i?t`
						fullVersions(data: $ver) {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
							parentId
							title
							url
							perex
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							perexImage
							commentCount {
								all
								new
								valid
								junk
								validTree
							}
						}
						`:""}

					}
				}
			`,variables:{id:e,ver:i}},{"x-wnt-space-id":this.config.spaceId},r);if(s(n),n.data?.getArticle){const t=n.data?.getArticle;return{...p(t),versions:t.versions.map(t=>({...p(t)})),fullVersions:t.fullVersions?.map(t=>({...p(t)}))??void 0}}return null}async listArticles(e,i,r){const n=await a(this.apiUrl,{query:t`
				query listArticles($data: ListArticlesInput! ${null!==i?",$ver: ArticleVersionListInput!":""}) {
					listArticles(data: $data) {
						id
						name
						parentId
						createdAt
						updatedAt
						tags
						files

						published
						publishedFrom
						publishedTo

						versions {
							id
							language
							country
							createdAt
							updatedAt


							publishedAsParent
							published
							publishedFrom
							publishedTo
						}

						commentCount {
							all
							new
							valid
							junk
							validTree
						}

						${null!==i?t`
						fullVersions(data: $ver) {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
							parentId
							title
							url
							perex
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							perexImage
							tags
							commentCount {
								all
								new
								valid
								junk
								validTree
							}
						}
						`:""}

					}
				}
			`,variables:{data:e,ver:i}},{"x-wnt-space-id":this.config.spaceId},r);s(n);const d=n.data?.listArticles;return d.map(t=>({...p(t),versions:t.versions.map(t=>({...p(t)})),fullVersions:t.fullVersions?.map(t=>({...p(t)}))??void 0}))}async searchArticleVersions(e,i){const r=await a(this.apiUrl,{query:t`
				query searchArticleVersions($data: SearchArticleVersionsInput!) {
					searchArticleVersions(data: $data) {
						items {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
							parentId
							title
							url
							perex
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							perexImage
							tags

							commentCount {
								all
								new
								valid
								junk
								validTree
							}
							searchScore
						}

						listing {
							itemsCount
							start
							count
						}
					}
				}
			`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId},i);s(r);const n=r.data?.searchArticleVersions;return{...n,items:n.items.map(t=>({...t,...p(t)}))}}async importArticle(e,i){const r=await a(this.apiUrl,{query:t`
				mutation importArticle($data: ImportArticleInput!) {
					importArticle(data: $data)
				}
			`,variables:{data:{...e,publishedFrom:e.publishedFrom.toISOString(),publishedTo:e.publishedTo?.toISOString()??null,createdAt:e.createdAt?.toISOString()??null,updatedAt:e.updatedAt?.toISOString()??null}}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importArticle??""}async importArticleVersion(e,i){const r=await a(this.apiUrl,{query:t`
				mutation importArticleVersion($data: ImportArticleVersionInput!) {
					importArticleVersion(data: $data)
				}
			`,variables:{data:{...e,publishedFrom:e.publishedFrom.toISOString(),publishedTo:e.publishedTo?.toISOString()??null,createdAt:e.createdAt?.toISOString()??null,updatedAt:e.updatedAt?.toISOString()??null}}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importArticleVersion??""}}class g extends n{config;constructor(t){super(t,l),this.config=t}async createComment(e,i){const r=await a(this.apiUrl,{query:t`
				mutation createComment($data: CreateCommentInput!) {
						createComment(data: $data)
				}
			`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId},i);return s(r),r.data?.createComment??""}async listComments(e,i){const r=await a(this.apiUrl,{query:t`
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
			`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId},i);return s(r),r.data?.listComments}}const m=`${r.tembraBase}/public/cms/graphql/page`;function h(t){return{...t,createdAt:new Date(t.createdAt),updatedAt:new Date(t.updatedAt),publishedFrom:new Date(t.publishedFrom),publishedTo:t.publishedTo?new Date(t.publishedTo):null}}class y extends n{config;constructor(t){super(t,m),this.config=t}async importPage(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importPage($data: ImportPageInput!) {
						importPage(data: $data)
					}
				`,variables:{data:{...e,publishedFrom:e.publishedFrom.toISOString(),publishedTo:e.publishedTo?.toISOString()??null}}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importPage??""}async importPageVersion(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importPageVersion($data: ImportPageVersionInput!) {
						importPageVersion(data: $data)
					}
				`,variables:{data:{...e,publishedFrom:e.publishedFrom.toISOString(),publishedTo:e.publishedTo?.toISOString()??null}}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importPageVersion??""}async listPages(e,i,r){const n=await a(this.apiUrl,{query:t`
				query listPages($data: ListPagesInput! ${null!==i?",$ver: PageVersionListInput!":""}) {
					listPages(data: $data) {

						id
						name
						parentId
						createdAt
						updatedAt
						files
						published
						publishedFrom
						publishedTo

						${null!==i?t`
						fullVersions(data: $ver) {
							id
							parentId
							language
							country
							createdAt
							updatedAt
							title
							url
							text
							description
							keywords
							ogDescription
							ogTitle
							ogImage
							publishedAsParent
							published
							publishedFrom
							publishedTo
						}
						`:""}
						versions {
							id
							language
							country
							createdAt
							updatedAt
							publishedAsParent
							published
							publishedFrom
							publishedTo
						}
					}
				}
			`,variables:{data:e,ver:i}},{"x-wnt-space-id":this.config.spaceId},r);s(n);const d=n.data?.listPages;return d.map(t=>({...h(t),versions:t.versions.map(h),fullVersions:t.fullVersions?.map(h)??void 0}))}async listPageVersions(e,i){const r=await a(this.apiUrl,{query:t`
				query listPageVersions($data: ListPageVersionsInput!) {
					listPageVersions(data: $data) {

						id
						parentId
						language
						country
						createdAt
						updatedAt
						title
						url
						text
						description
						keywords
						ogDescription
						ogTitle
						ogImage
						publishedAsParent
						published
						publishedFrom
						publishedTo

					}
				}
			`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId},i);s(r);const n=r.data?.listPageVersions;return n.map(h)}}const A=`${r.tembraBase}/public/cms/graphql/text`;class b extends n{config;constructor(t){super(t,A),this.config=t}async importCategory(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importCategory($data: ImportCategoryInput!) {
						importCategory(data: $data)
					}
				`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importCategory??""}async importText(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importText($data: ImportTextInput!) {
						importText(data: $data)
					}
				`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importText??""}async importTextVersion(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importTextVersion($data: ImportTextVersionInput!) {
						importTextVersion(data: $data)
					}
				`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importTextVersion??""}async listTexts(e,i,r){const n=await a(this.apiUrl,{query:t`
				query listTexts($data: ListTextsInput! ${null!==i?",$ver: TextVersionListInput!":""}) {
					listTexts(data: $data) {
						id
						name
						parentId
						createdAt
						updatedAt
						files
						categoryId
						${null!==i?t`
						fullVersions(data: $ver) {
							id
							language
							country
							createdAt
							updatedAt
							parentId
							title
							text
						}
						`:""}
						versions {
							id
							language
							country
							createdAt
							updatedAt
						}
					}
				}
			`,variables:{data:e,ver:i}},{"x-wnt-space-id":this.config.spaceId},r);s(n);const d=n.data?.listTexts;return d.map(t=>({...t,createdAt:new Date(t.createdAt),updatedAt:new Date(t.updatedAt),versions:t.versions.map(t=>({...t,createdAt:new Date(t.createdAt),updatedAt:new Date(t.updatedAt)})),fullVersions:t.fullVersions?.map(t=>({...t,createdAt:new Date(t.createdAt),updatedAt:new Date(t.updatedAt)}))??void 0}))}}const I=`${r.tembraBase}/public/cms/graphql/keyValue`;function w(t){return{...t,createdAt:new Date(t.createdAt),updatedAt:new Date(t.updatedAt)}}class f extends n{config;constructor(t){super(t,I),this.config=t}async importKeyValue(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importKeyValue($data: ImportKeyValueInput!) {
						importKeyValue(data: $data)
					}
				`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importKeyValue??""}async importKeyValueVersion(e,i){const r=await a(this.apiUrl,{query:t`
					mutation importKeyValueVersion($data: ImportKeyValueVersionInput!) {
						importKeyValueVersion(data: $data)
					}
				`,variables:{data:e}},{"x-wnt-space-id":this.config.spaceId,"x-wnt-api-key":this.config.apiKey??""},i);return s(r),r.data?.importKeyValueVersion??""}async listKeyValues(e,i,r){const n=await a(this.apiUrl,{query:t`
				query listKeyValues($data: ListKeyValuesInput! ${null!==i?",$ver: KeyValueVersionListInput!":""}) {
					listKeyValues(data: $data) {

						id
						name
						parentId
						createdAt
						updatedAt

						${null!==i?t`
						fullVersions(data: $ver) {
							id
							parentId
							language
							country
							createdAt
							updatedAt
							pairs {
								name
								value
							}
						}
						`:""}
						versions {
							id
							language
							country
							createdAt
							updatedAt
						}
					}
				}
			`,variables:{data:e,ver:i}},{"x-wnt-space-id":this.config.spaceId},r);s(n);const d=n.data?.listKeyValues;return d.map(t=>({...w(t),versions:t.versions.map(w),fullVersions:t.fullVersions?.map(w)??void 0}))}}export{c as ArticleApi,g as CommentApi,f as KeyValueApi,y as PageApi,o as SpaceApi,u as TagApi,b as TextApi,r as apiConfig};
//# sourceMappingURL=tembra-api.1.0.11.mjs.map
