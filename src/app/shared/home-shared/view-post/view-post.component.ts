import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  isdisablepostview:boolean=false;
  url:any="assets/videos/vertical.mp4";
  format:any;
  isdisablePause: boolean=true;
  isdisableaudio:boolean=false;
  ispostoption:boolean=false;
  isuser:boolean=false;
  video = document.querySelector('video');
  constructor() { }

  ngOnInit(): void {
    this.checkFormat();
  }

  checkFormat(){
    const file = this.url;
    this.format='video';
    if(this.format=='video'){
      this.isdisablePause=false;
    }
  }

    togglePlay(){
     if(this.isdisablePause){
       this.isdisablePause=false;
       this.video?.play;
       console.log(this.isdisablePause);
     }else if(this.isdisablePause==false){
       this.video?.pause;
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
  // toggleAudio(){
  //   if(this.isdisableaudio){
  //       this.video?.muted;
  //       alert("hi")
  //   }else if(this.isdisableaudio==false){
  //     this.video?.play
  //   }
  // }

  
      
}
