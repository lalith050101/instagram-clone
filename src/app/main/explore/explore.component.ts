import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private postservice:PostService) { }

  ngOnInit(): void {
  }
  showPost(){
    // this.postservice.showPost();
  }
}
