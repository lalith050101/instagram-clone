import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post/post';
import { Comment } from 'src/app/core/interfaces/react/comment';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  post:Post={} as Post;
  comments:Comment[]=[];



  postId:string='';

  isdisablepostview:boolean=true;

  url:string="";

  format:any;
  isdisablePause: boolean=false;
  isdisableaudio:boolean=false;
  ispostoption:boolean=false;

  // isuser:boolean=false;
  

  video = document.querySelector('video');
  constructor(private postservice:PostService) {
    this.viewPost();
    this.postservice.$postid.subscribe((data)=>{
      this.postId=data
      
      this.getPost(this.postId);  
    })
    
  }
  getPost(postId: string) {
      this.postservice.getPost(this.postId).subscribe((data)=>{
        this.post=data;
       
        if(this.postservice.isImage(this.post.url)){
          this.format='image';
        }
        else{
          this.format='video';
        }
        this.url=this.post.url;
    });
    
    this.postservice.getPostComments(this.postId).subscribe((data)=>{
      this.comments=data;
      
    })
  }

  isUser(){

    let user:any=localStorage.getItem('user');
    if(user){
      if(JSON.parse(user).id===this.post.userId){
          return true;
      }
    }
  return false;
  }
  

  ngOnInit(): void {
    this.isdisablepostview=true;
    this.checkFormat();
   
    
  }




  viewPost() {
    //to display the overlay of viewpost
    this.postservice.showpostData.subscribe((data)=>{
      this.isdisablepostview=data;
    })

    //to verify the url is image or video
    this.postservice.$postURL.subscribe((data) => {
      this.url =  data;
      if(this.postservice.isImage(data))
        this.format = 'image';
      else
        this.format = 'video';
        
      
    })
    
  }

  checkFormat(){
    const file = this.url;
    this.format='video';
    if(this.format=='video'){
      this.isdisablePause=false;
    }
  }

  hidePost(){
    if(this.isdisablepostview==false){
      this.pauseVideo('pause');
      this.isdisablePause=false;
      this.isdisablepostview=true;
    }

  }
    togglePlay(){
     if(this.isdisablePause){
       this.isdisablePause=false;
       
     }else if(this.isdisablePause==false){
      this.isdisablePause=true;
      
     }
  }
  
  postOptions(){
    this.ispostoption=true;
  }

  closeOption(){
    this.ispostoption=false;
  }

  pauseVideo = function (s:string) {
    var iframe =document.querySelector( 'iframe');
    var video = document.querySelector( 'video' );
    if ( iframe ) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }
    if ( video &&s=='pause') {
      video.pause();
    }
    if( video && s=='play'){
      video.play();
    }
  };

  
      
}
