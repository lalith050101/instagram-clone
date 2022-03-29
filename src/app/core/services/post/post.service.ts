import { Injectable } from '@angular/core';
import {PostForm} from "../../interfaces/post/post-form";
import {HttpClient} from "@angular/common/http";
import {FileUploadService} from "../media/file-upload.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import { Comment } from "../../interfaces/react/comment";
import {finalize} from "rxjs/operators";
import {Like} from "../../interfaces/react/like";
import { Post } from '../../interfaces/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  
  private hidecreatepost = new BehaviorSubject<boolean>(true);
  hidepost = this.hidecreatepost.asObservable();

  private viewpost = new BehaviorSubject<boolean>(true);
  showpostData = this.viewpost.asObservable();
  private postURL = new BehaviorSubject<string>("");
  $postURL = this.postURL.asObservable();


  private baseURL: string = 'https://instagram-clone-ui-1f83e-default-rtdb.firebaseio.com/'

  constructor( private http: HttpClient) { }

  createPost( post: PostForm): Observable<any> {
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

  showPost(postId: string){
    this.viewpost.next(false);

    this.http.get<Post[]>("assets/static-data/posts.json").subscribe(data => {    
      this.postURL.next(data.find(post => post.postId === postId)?.url!);
    })

  }

  isImage(url: string) {
    url = url.split('?')[0];
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
  

}
