import { Injectable } from '@angular/core';
import {PostForm} from "../../interfaces/post/post-form";
import {HttpClient} from "@angular/common/http";
import {FileUploadService} from "../media/file-upload.service";
import {Observable} from "rxjs";
import { Comment } from "../../interfaces/react/comment";
import {finalize, map} from "rxjs/operators";
import {Like} from "../../interfaces/react/like";
import {PostHover} from "../../interfaces/profile/post-hover";
import {Post} from "../../interfaces/post/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseURL: string = 'https://instagram-clone-ui-1f83e-default-rtdb.firebaseio.com/'

  constructor( private http: HttpClient) { }

  getPost( postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}posts/${postId}.json`);
  }

  getPostComments( postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}comments.json`).pipe(
      map((data: any) => {
        let comments: Comment[] = [];
        Object.keys(data).forEach( key => {
          if( postId === data[key].postId) {
            let temp: Comment = {
              commentId: key,
              userId: data[key].userId,
              postId: data[key].postId,
              text: data[key].text,
              username: data[key].username,
              timeStamp: data[key].timeStamp
            }
            comments.push(temp);
          }
        });
        return comments;
      })
    );
  }

  createPost( post: PostForm): Observable<any> {
    post.likes = 0;
    post.comments = 0;
    return this.http.post(this.baseURL + 'posts.json', post);
  }

  likePost( like: Like): Observable<any> {
    return this.http.post( this.baseURL + 'likes.json', like).pipe(
      map((data) => {
        console.log('post return '+data);
        this.getPost(like.postId).subscribe( (data: Post) => {
          this.updateLikeCount(like.postId, data.likes+1).subscribe();
        });
        return true;
    })
    );
  }

  commentPost( comment: Comment): Observable<any> {
    return this.http.post( this.baseURL + 'comments.json', comment).pipe(
      map((data) => {
        console.log('post return '+data);
        this.getPost(comment.postId).subscribe( (data: Post) => {
          this.updateLikeCount(comment.postId, data.comments+1).subscribe();
        });
        return true;
      })
    );
  }

  updateLikeCount( postId: string, count: number): Observable<any> {
    return this.http.patch(`${this.baseURL}posts/${postId}.json`, { likes: count });
  }

  updateCommentCount( postId: string, count: number): Observable<any> {
    return this.http.patch(`${this.baseURL}posts/${postId}.json`, { comments: count });
  }

  unlikePost( unlike: Like): Observable<any> {
    return this.http.delete( `${this.baseURL}likes/${unlike.likeId}`).pipe(
      map((data) => {
        console.log('post return '+data);
        this.getPost(unlike.postId).subscribe( (data: Post) => {
          this.updateLikeCount(unlike.postId, data.likes-1).subscribe();
        });
        return true;
      })
    );
  }

  viewProfilePosts( userId?: string) : Observable<any> {
    return this.http.get( this.baseURL+'posts.json' ).pipe(
      map( (data: any) => {
        let posts: PostHover[] = [];
        Object.keys(data).forEach( key => {
          let temp: PostHover = {
            postId: data[key].userId,
            link: data[key].url,
            likeCount: data[key].likes,
            commentCount: data[key].comments
          }
          if( userId) {
            if(userId === data[key].id) {
              posts.push(temp);
            }
          } else {
            posts.push(temp);
          }
        });
        return posts;
      })
    );
  }

  homeProfilePosts( userId: string) : Observable<any> {
    return this.http.get( this.baseURL+'posts.json' ).pipe(
      map( (data: any) => {
        let posts: PostHover[] = [];
        Object.keys(data).forEach( key => {
          let temp: PostHover = {
            postId: data[key].userId,
            link: data[key].url,
            likeCount: data[key].likes,
            commentCount: data[key].comments
          }
          if(userId !== data[key].id) {
              posts.push(temp);
          }
        });
        return posts;
      })
    );
  }

  getPostLikes(postId: string): Observable<any> {
    return this.http.get(`${this.baseURL}likes.json`).pipe(
      map((data: any) => {
        let likes: Like[] = [];
        Object.keys(data).forEach( key => {

          if( postId === data[key].postId ) {
            let temp: Like = {
              likeId: key,
              postId: data[key].postId,
              userId: data[key].userId,
              timeStamp: data[key].timeStamp
            }
            likes.push(temp);
          }
        })
        return likes;
      })
    );
  }

  userIsLiked( userId: string, postId: string): Observable<any> {
    return this.getPostLikes(postId).pipe(
      map((likes: Like[] ) => {
        let index = likes.findIndex( (like: Like) => like.userId === userId);
        return index === -1;
      })
    );
  }



}
