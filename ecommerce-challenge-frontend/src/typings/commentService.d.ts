import { IComment } from "./comment";


export interface ICommentGetAllResponse{
    comments : IComment[]
}

export interface ICommentCreateParameter{
    body : string
}