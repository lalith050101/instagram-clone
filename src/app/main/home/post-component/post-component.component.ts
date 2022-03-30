import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post/post';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.scss']
})
export class PostComponentComponent implements OnInit {

  isdisablePause: boolean=false;
  ispostoption:boolean=false;

  constructor(private postservice:PostService, private http: HttpClient) { }

  posts: Post[] = [];

  ngOnInit(): void {
    this.http.get<Post[]>("assets/static-data/posts.json").subscribe(data => {
      console.log(data);
      this.posts = data;
    })
  }


  postView(postId:string){    
    this.postservice.showPost(postId);
  }

  postOptions(){
    this.ispostoption=true;
  }

  closeOption(){
    this.ispostoption=false;
  }

  isImage(url: string) {
    return this.postservice.isImage(url);
  }

  togglePlay(){
    if(this.isdisablePause){
      this.isdisablePause=false;
      console.log(this.isdisablePause);
    }else if(this.isdisablePause==false){
     this.isdisablePause=true;
      console.log(this.isdisablePause);
    }
 }
}
