import { Injectable } from '@angular/core';
import {PostForm} from "../../interfaces/post/post-form";
import {HttpClient} from "@angular/common/http";
import {FileUploadService} from "../media/file-upload.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Comment } from "../../interfaces/react/comment";
import {finalize, map} from "rxjs/operators";
import {Like} from "../../interfaces/react/like";
import {PostHover} from "../../interfaces/profile/post-hover";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  private hidecreatepost = new BehaviorSubject<boolean>(true);
  hidepost = this.hidecreatepost.asObservable();

  private viewpost = new BehaviorSubject<boolean>(true);
  showpostData = this.viewpost.asObservable();



  private baseURL: string = 'https://instagram-clone-ui-1f83e-default-rtdb.firebaseio.com/'

  constructor( private http: HttpClient) { }

  createPost( post: PostForm): Observable<any> {
    post.likes = 0;
    post.comments = 0;
    return this.http.post(this.baseURL + 'posts.json', post);
  }

  commentPost( comment: Comment): Observable<any> {
    return this.http.post(  this.baseURL + 'comments.json', comment);
  }

  likePost( like: Like): Observable<any> {
    return this.http.post( this.baseURL + 'likes.json', like);
  }

  unlikePost( unlike: Like): Observable<any> {
    return this.http.delete( `${this.baseURL}likes/${unlike.likeId}`);
  }


  showCreatePost(){
      this.hidecreatepost.next(false);
  }

  viewProfilePosts( userId?: string) : Observable<any> {
    return this.http.get( this.baseURL+'posts.json' ).pipe(
      map( (data: any) => {
        console.log(data);
        
        let posts: PostHover[] = [];
        Object.keys(data).forEach( key => {
          let temp: PostHover = {
            postId: data[key].userId,
            link: data[key].url,
            likeCount: data[key].likes,
            commentCount: data[key].comments
          }
          if( userId) {
            if(userId === data[key].userId) {
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

  showPost(){
    this.viewpost.next(false)
  }

  isImage(url: string) {
    url = url.split('?')[0];
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
}
