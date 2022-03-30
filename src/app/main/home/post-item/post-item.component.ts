import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post/post';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Like } from 'src/app/core/interfaces/react/like';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService) { }
  likeStatus: boolean = false;
  like: Like = {} as Like;

  ngOnInit(): void {
    // if(this.post.liked != undefined)
    console.log("liked obj" + this.post.liked);

    this.likeStatus = this.post.liked ? true : false;

    this.postService.userIsLiked(this.userService.getAuthUser().id, this.post.postId).subscribe((data) => {
      this.likeStatus = data ? true : false;
      if (this.likeStatus)
        this.like = data;
    })
  }

  @Input() post!: Post;

  ispostoption: boolean = false;

  isdisablePause: boolean = false;

  isImage(url: string) {
    return this.postService.isImage(url);
  }

  postOptions() {
    this.ispostoption = true;
  }


  loadThumbnail(url: string) {
    return url + '#t=20';
  }

  postView(postId: string) {
    this.postService.viewPost(postId);
  }

  closeOption() {
    this.ispostoption = false;
  }

  togglePlay() {
    if (this.isdisablePause) {
      this.isdisablePause = false;
      console.log(this.isdisablePause);
    } else if (this.isdisablePause == false) {
      this.isdisablePause = true;
      console.log(this.isdisablePause);
    }
  }


  changeLikeStatus() {
    if (this.likeStatus) {
      console.log("unlike");
      
      if (this.like != undefined) {
        this.postService.unlikePost(this.like).subscribe((data) => {
          console.log("unliked");
          
          this.likeStatus = false;
        },
        (error)=>{console.log("unlike err"+error);
        }
        );
      }
    }
    else {
      console.log("userid in comp: " + this.userService.getAuthUser().id);
      this.postService.likePost({
        userId: this.userService.getAuthUser().id,
        postId: this.post.postId,
        timeStamp: new Date()
      }).subscribe((data) => {
        this.likeStatus = true;
      });
    }


  }

}