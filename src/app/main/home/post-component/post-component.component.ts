import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.scss']
})
export class PostComponentComponent implements OnInit {

  constructor(private postservice:PostService) { }

  ngOnInit(): void {
  }

  postView(){
    console.log("called postView");
    
    this.postservice.showPost();
  }
}
