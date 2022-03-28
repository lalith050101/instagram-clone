import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  home: string = "assets/Images/home3.png";
  chat: string = "assets/Images/emptychat.png";
  square: string = "far fa-plus-square";
  compass: string = "far fa-compass";
  heart: string = "far fa-heart";
  onHomeClick(){
    if(this.home== "assets/Images/home3.png"){
      this.home = "assets/Images/filledhome1.png"
      this.chat = "assets/Images/emptychat.png"
      this.square = "far fa-plus-square"
      this.compass = "far fa-compass"
      this.heart = "far fa-heart"
    }else{
      this.home = "assets/Images/home3.png"
    }
  }

  onChatClick(){
    if(this.chat== "assets/Images/emptychat.png"){
      this.chat = "assets/Images/filledchat.png"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.compass = "far fa-compass"
      this.heart = "far fa-heart"

    }else{
      this.chat = "assets/Images/emptychat.png"
    }
  }

  onSquareClick(){
    if(this.square== "far fa-plus-square"){
      this.square = "fas fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.compass = "far fa-compass"
      this.heart = "far fa-heart"
    }else{
      this.square = "far fa-plus-square"
    }
  }

  onCompassClick(){
    if(this.compass== "far fa-compass"){
      this.compass = "fas fa-compass"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.heart = "far fa-heart"
    }else{
      this.compass = "far fa-compass"
    }
  }

  onHeartClick(){
    if(this.heart== "far fa-heart"){
      this.compass = "far fa-compass"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.heart = "fas fa-heart"
    }else{
      this.heart = "far fa-heart"
    }
  }
  disableIcons(){
    
      this.compass = "far fa-compass"
      this.square = "far fa-plus-square"
      this.home = "assets/Images/home3.png"
      this.chat = "assets/Images/emptychat.png"
      this.heart = "far fa-heart"
  }
  
  ngOnInit(): void {
  }

}