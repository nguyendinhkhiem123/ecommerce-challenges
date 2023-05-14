import { IUser } from "./user";
export interface IComment{
    id : 1;
    created  : number;
    body : string;
    author : IUser
   
}