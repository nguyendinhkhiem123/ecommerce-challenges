import { IArticle } from "./article";

export interface IArticleGetAllResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticleDeleteResponse {
  raw: IArticle[];
}

export interface IArticleWrite {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
