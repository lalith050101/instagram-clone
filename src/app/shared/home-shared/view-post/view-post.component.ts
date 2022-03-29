import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  isdisablepostview:boolean=true;

  url:any="assets/videos/vertical.mp4";

  format:any;
  isdisablePause: boolean=false;
  isdisableaudio:boolean=false;
  ispostoption:boolean=false;
  isuser:boolean=false;
  video = document.querySelector('video');
  constructor(private postservice:PostService) {
    this.viewPost();
   }

  ngOnInit(): void {
    // this.viewPost();
    this.isdisablepostview=true;
 
    this.checkFormat();
  }
  viewPost() {
    this.postservice.showpostData.subscribe((data)=>{

      this.isdisablepostview=data;
      console.log(data);
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
       console.log(this.isdisablePause);
     }else if(this.isdisablePause==false){
      this.isdisablePause=true;
       console.log(this.isdisablePause);
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
