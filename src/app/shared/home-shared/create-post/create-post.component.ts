import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  disableupload:boolean=true;
  disablechoose:boolean=false;

  format:any;
  url:any;
  
  caption:any;
  length:number=0;
  
  isaccess:boolean=false;
  isadvance=false;
  isdiscard=false;


  ngOnInit(): void {
  }

    
    constructor() { }

    showAccessbility(){
      if(this.isaccess==true){
        this.isaccess=false;
      }else{
        this.isaccess=true;
      }
    }

    showAdvanceSetting(){
      if(this.isadvance==true){
        this.isadvance=false;
      }else{
        this.isadvance=true;
      }
    }
    
    captionlength(){
       this.length=this.caption.length;
    }

    closeChoose() {
      this.disablechoose=true;
    }

    closeUpload(){
      this.pauseVideo('pause')
      this.disableupload=false;
      this.isdiscard=true;
    }

    discardAll(){
      this.pauseVideo('pause')
      this.isdiscard=false;
      this.disablechoose=false;
      this.disableupload=true;
    }
    
    closeDiscard(){
      this.pauseVideo('play')
      this.isdiscard=false;
      this.disableupload=false;
      
    }
    
    openChoose(){
      this.disableupload=true;
      this.disablechoose=false;
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
   onChange(event:any) {

    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
      this.disableupload=false;
      this.disablechoose=true;
    }else{
      this.disableupload=true;
        this.disablechoose=false;
    }
    
  }



}
