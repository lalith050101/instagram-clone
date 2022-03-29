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

  constructor(private postservice:PostService, private http: HttpClient) { }

  posts: any = [];

  ngOnInit(): void {
    this.http.get("assets/static-data/posts.json").subscribe(data => {
      console.log(data);
      this.posts = data;
      
    })
  }

  postView(){
    console.log("called postView");
    
    this.postservice.showPost();
  }
}
