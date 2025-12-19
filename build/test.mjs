// import { ArticleApi, CommentApi, Space, SpaceApi, Tag, TagApi, TextApi, Text, PageApi, KeyValueApi } from "./index.mjs";
// import { Nullable } from "./types.mjs";
// import util from 'util';
export {};
// const logData = (data: any) => console.log(util.inspect(data, {
//   showHidden: false,
//   depth: null,
//   colors: true
// }));
// // const spaceId = 'caebe493-56ba-46a3-ac24-9882969b61ce';
// const spaceId = 'bdfa956f-59ce-47d5-aef8-67b0c523972f';
// const apiKey = 'mzT4Ku52e9MKqA3E2mBVNMBJF9C5rbyMmBmS8vt48DGkbkZa6qdj3rznmKmkaRJr';
// // const space: Space | null = await (new SpaceApi({ spaceId })).get();
// // console.log(space);
// /**********************************************
//  * TAGS
//  *********************************************/
// // const ping: boolean = await (new TagApi({ spaceId })).ping((data) => console.log(data));
// // console.log(JSON.stringify(ping, null, 2));
// // const tags: Tag[] = await (new TagApi({ spaceId })).listTags();
// // console.log(JSON.stringify(tags, null, 2));
// // let tagId: string = await (new TagApi({ spaceId, apiKey })).importTag({
// // 	content: [
// // 		{
// // 			data: 'entertainmnet',
// // 			language: 'en'
// // 		},
// // 		{
// // 			data: 'zábava',
// // 			language: 'cs'
// // 		},
// // 	],
// // 	name: 'entertainmnet',
// // 	parentId: null,
// // });
// // // console.log(JSON.stringify(tagId, null, 2));
// // let tagId1 = await (new TagApi({ spaceId, apiKey })).importTag({
// // 	content: [
// // 		{
// // 			data: 'movies',
// // 			language: 'en'
// // 		},
// // 		{
// // 			data: 'filmy',
// // 			language: 'cs'
// // 		},
// // 	],
// // 	name: 'movie',
// // 	parentId: tagId,
// // });
// // console.log(JSON.stringify(tagId1, null, 2));
// // let tagId2 = await (new TagApi({ spaceId, apiKey })).importTag({
// // 	content: [
// // 		{
// // 			data: 'books',
// // 			language: 'en'
// // 		},
// // 		{
// // 			data: 'knížky',
// // 			language: 'cs'
// // 		},
// // 	],
// // 	name: 'book',
// // 	parentId: tagId,
// // });
// // console.log(JSON.stringify(tagId2, null, 2));
// // tagId = await (new TagApi({ spaceId, apiKey })).importTag({
// // 	content: [
// // 		{
// // 			data: 'education',
// // 			language: 'en'
// // 		},
// // 		{
// // 			data: 'vzdělání',
// // 			language: 'cs'
// // 		},
// // 	],
// // 	name: 'education',
// // 	parentId: null,
// // });
// // console.log(JSON.stringify(tagId, null, 2));
// // tagId1 = await (new TagApi({ spaceId, apiKey })).importTag({
// // 	content: [
// // 		{
// // 			data: 'math',
// // 			language: 'en'
// // 		},
// // 		{
// // 			data: 'matematika',
// // 			language: 'cs'
// // 		},
// // 	],
// // 	name: 'math',
// // 	parentId: tagId,
// // });
// // console.log(JSON.stringify(tagId1, null, 2));
// // tagId2 = await (new TagApi({ spaceId, apiKey })).importTag({
// // 	content: [
// // 		{
// // 			data: 'english',
// // 			language: 'en'
// // 		},
// // 		{
// // 			data: 'angličtina',
// // 			language: 'cs'
// // 		},
// // 	],
// // 	name: 'english',
// // 	parentId: tagId,
// // });
// // console.log(JSON.stringify(tagId2, null, 2));
// /**********************************************
//  * ARTICLE
//  *********************************************/
// // const ping: boolean = await (new ArticleApi({ spaceId })).ping((data) => logData(data));
// // logData(ping);
// // const article: Nullable<Article> = await (new ArticleApi({ spaceId })).getArticle('a78f7dc0-c4e9-46e2-9b01-ed3966683217', /*{
// // 	// languageCountry: [{country: ''}],
// // 	// languageCountryAll: true,
// // }*/ null, (data) => logData(data));
// // logData(article);
// // const articles: Article[] = await (new ArticleApi({ spaceId })).listArticles({
// // 	start: 10,
// // 	count: 2
// // }, null, (data) => logData(data));
// // logData(articles);
// // const sArticles = await (new ArticleApi({ spaceId })).searchArticleVersions({
// // 	search: 'CEO',
// // 	published: true,
// // }, (data) => logData(data));
// // logData(sArticles);
// // const articleId: string = await (new ArticleApi({ spaceId, apiKey })).importArticle({
// // 	files: [],
// // 	tags: [],
// // 	name: 'third import article',
// // 	published: true,
// // 	publishedFrom: new Date('2025-02-03T12:15:16Z'),
// // 	publishedTo: null,
// // }, (data) => logData(data));
// // logData(articleId);
// // const articleIdV: string = await (new ArticleApi({ spaceId, apiKey })).importArticleVersion({
// // 	parentId: articleId,
// // 	country: ['sk'],
// // 	description: 'descr',
// // 	keywords: 'keys',
// // 	language: 'en',
// // 	ogDescription: 'ogDescri',
// // 	ogImage: 'ogIma',
// // 	ogTitle: 'ogTit',
// // 	perex: '<p>AAAApe<strong>re</strong>x</p>',
// // 	perexImage: 'img',
// // 	text: '<h1>tetx</h1><p>data</p>',
// // 	title: 'tit',
// // 	url: '/art3',
// // 	publishedAsParent: true,
// // 	published: true,
// // 	publishedFrom: new Date('2025-02-04T12:15:16Z'),
// // 	publishedTo: null,
// // }, (data) => logData(data));
// // logData(articleIdV);
// // const commentId: string = await (new CommentApi({ spaceId })).createComment({
// // 	fields: [
// // 		{
// // 			name: 'name',
// // 			value: 'Klučka'
// // 		}
// // 	],
// // 	parentId: null,
// // 	versionId: '0e17a204-6fa5-4378-82d3-b3449809c30c',
// // 	subject: 'comment 2',
// // 	text: '<p>brona</p>'
// // }, (data) => logData(data));
// // logData(commentId);
// // const commentId2: string = await (new CommentApi({ spaceId })).createComment({
// // 	fields: [
// // 		{
// // 			name: 'name',
// // 			value: 'Kukovič'
// // 		}
// // 	],
// // 	parentId: commentId,
// // 	versionId: '0e17a204-6fa5-4378-82d3-b3449809c30c',
// // 	subject: 'comment 21',
// // 	text: 'comment data 21'
// // }, (data) => logData(data));
// // logData(commentId2);
// // const comments = await (new CommentApi({ spaceId })).listComments({
// // 	versionId: '0e17a204-6fa5-4378-82d3-b3449809c30c',
// // 	articleId: 'a6588c61-2c73-4698-b9f9-4cf4e0464512',
// // 	parentId: null,
// // 	includeChildren: true,
// // 	state: ['valid']
// // }, (data) => logData(data));
// // logData(comments);
// // const catId: string = await (new TextApi({ spaceId, apiKey })).importCategory({
// // 	name: 'cat 7',
// // }, (data) => logData(data));
// // logData(catId);
// // const textId: string = await (new TextApi({ spaceId, apiKey })).importText({
// // 	categoryId: "2f9c484f-a8f4-4798-9780-c452f823c8af",
// // 	files: [],
// // 	name: 'new text 6'
// // }, (data) => logData(data));
// // logData(textId);
// // const versionId: string = await (new TextApi({ spaceId, apiKey })).importTextVersion({
// // 	parentId: textId,
// // 	country: [ 'cz' ],
// // 	language: 'cs',
// // 	text: '<p>this is text</p>',
// // 	title: 'this is title',
// // }, (data) => logData(data));
// // logData(versionId);
// // const textId: string = await (new TextApi({ spaceId, apiKey })).importText({
// // 	categoryId: "2f9c484f-a8f4-4798-9780-c452f823c8af",
// // 	files: [],
// // 	name: 'new text 6'
// // }, (data) => logData(data));
// // logData(textId);
// // const texts: Text[] = await (new TextApi({ spaceId, apiKey })).listTexts({
// // 	name: ['new text 1', 'new text 5', 'new text 6'],
// // 	categoryId: ['2f9c484f-a8f4-4798-9780-c452f823c8af'],
// // }, { languageCountry: [{language: 'en', country: 'sk' }]}, (data) => logData(data));
// // logData(texts);
// // const pageId: string = await (new PageApi({ spaceId, apiKey })).importPage({
// // 	files: [],
// // 	name: 'page 4',
// // 	published: true,
// // 	publishedFrom: new Date(),
// // }, (data) => logData(data));
// // logData(pageId);
// // const pageVId: string = await (new PageApi({ spaceId, apiKey })).importPageVersion({
// // 	country: ['sk'],
// // 	language: 'cs',
// // 	description: 'descripti',
// // 	keywords: 'keys',
// // 	ogDescription: 'ogd',
// // 	ogImage: 'obi',
// // 	ogTitle: 'ogt',
// // 	parentId: pageId,
// // 	published: true,
// // 	publishedAsParent: true,
// // 	publishedFrom: new Date,
// // 	text: 'this is text CS',
// // 	title: 'titttle CS',
// // 	url: '/page4',
// // }, (data) => logData(data));
// // logData(pageVId);
// // const pageVId2: string = await (new PageApi({ spaceId, apiKey })).importPageVersion({
// // 	country: ['us'],
// // 	language: 'en',
// // 	description: 'descripti',
// // 	keywords: 'keys',
// // 	ogDescription: 'ogd',
// // 	ogImage: 'obi',
// // 	ogTitle: 'ogt',
// // 	parentId: pageId,
// // 	published: true,
// // 	publishedAsParent: true,
// // 	publishedFrom: new Date,
// // 	text: 'this is text EN',
// // 	title: 'titttle EN',
// // 	url: '/page4',
// // }, (data) => logData(data));
// // logData(pageVId2);
// // const pages = await (new PageApi({ spaceId, apiKey })).listPages({
// // 	name: ['page 4']
// // }, {languageCountry: [{language: 'cs'}]}, (data) => logData(data));
// // logData(pages);
// // const pages = await (new PageApi({ spaceId, apiKey })).listPageVersions({
// // 	languageCountry: [{language: 'en'}]
// // }, (data) => logData(data));
// // logData(pages);
// // const kv1ID = await (new KeyValueApi({ spaceId, apiKey })).importKeyValue({
// // 	name: 'kv 2'
// // }, (data) => logData(data));
// // logData(kv1ID);
// // const kv1v1ID = await (new KeyValueApi({ spaceId, apiKey })).importKeyValueVersion({
// // 	parentId: kv1ID,
// // 	language: 'cs',
// // 	country: [''],
// // 	pairs: [
// // 		{
// // 			name: 'prop1',
// // 			value: 'hodnota1'
// // 		},
// // 		{
// // 			name: 'prop2',
// // 			value: 'hodnota2'
// // 		},
// // 	],
// // }, (data) => logData(data));
// // logData(kv1v1ID);
// // const kv1v2ID = await (new KeyValueApi({ spaceId, apiKey })).importKeyValueVersion({
// // 	parentId: kv1ID,
// // 	language: 'en',
// // 	country: [''],
// // 	pairs: [
// // 		{
// // 			name: 'prop1',
// // 			value: 'val 1'
// // 		},
// // 		{
// // 			name: 'prop2',
// // 			value: 'val 2'
// // 		},
// // 		{
// // 			name: 'prop3',
// // 			value: 'val 3'
// // 		},
// // 	],
// // }, (data) => logData(data));
// // logData(kv1v2ID);
// const kvs = await (new KeyValueApi({ spaceId, apiKey })).listKeyValues({
// }, {}, (data) => logData(data));
// logData(kvs);
//# sourceMappingURL=test.mjs.map