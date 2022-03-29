import {Comment} from "../react/comment";

export interface Post {
  postId: string;
  userId: string;
  username: string;
  url: string;
  caption: string;
  timeStamp: string;
  likes: number;
  comments: number;
}
