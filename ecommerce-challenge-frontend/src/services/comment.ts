import { AxiosResponse } from "axios";
import baseAxios from "../config/axios";
import { IArticleDeleteResponse } from "../typings/articleService";
import { IComment } from "../typings/comment";
import { ICommentCreateParameter, ICommentGetAllResponse } from "../typings/commentService";

class CommentService {
  public getAllComments(
    slugArticle: string
  ): Promise<AxiosResponse<ICommentGetAllResponse>> {
    return baseAxios.get(`/articles/${slugArticle}/comments`);
  }
  public createComment(
    slugArticle: string,
    body: ICommentCreateParameter
  ): Promise<AxiosResponse<IComment>> {
    return baseAxios.post(`/articles/${slugArticle}/comments`, body);
  }
  public deleteComment(
    slugArticle: string,
    idComment: number
  ): Promise<AxiosResponse<IArticleDeleteResponse>> {
    return baseAxios.delete(`/articles/${slugArticle}/comments/${idComment}`);
  }
}

export default new CommentService();
