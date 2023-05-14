import { AxiosResponse } from "axios";
import baseAxios from "../config/axios";
import { IArticle } from "../typings/article";
import {
  IArticleDeleteResponse,
  IArticleGetAllResponse,
  IArticleWrite,
} from "../typings/articleService";

class ArticleService {
  public getAllArticles(): Promise<AxiosResponse<IArticleGetAllResponse>> {
    return baseAxios.get("/articles");
  }
  public deleteArticle(
    slug: string
  ): Promise<AxiosResponse<IArticleDeleteResponse>> {
    return baseAxios.delete(`/articles/${slug}`);
  }
  public updateArticle(
    slug: string,
    body: IArticleWrite
  ): Promise<AxiosResponse<IArticle>> {
    return baseAxios.put(`/articles/${slug}`, body);
  }
  public createArticle(body: IArticleWrite): Promise<AxiosResponse<IArticle>> {
    return baseAxios.post("/articles", body);
  }
}

export default new ArticleService();
