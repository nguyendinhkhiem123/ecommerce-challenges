import { IUser } from "./user";

export interface IArticle {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  created: number;
  updated: number;
  tagList: string[];
  favoriteCount: 0;
  author: IUser;
}
