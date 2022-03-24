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
    }else{
      this.home = "assets/Images/home3.png"
    }
  }

  onChatClick(){
    if(this.chat== "assets/Images/emptychat.png"){
      this.chat = "assets/Images/filledchat.png"
    }else{
      this.chat = "assets/Images/emptychat.png"
    }
  }

  onSquareClick(){
    if(this.square== "far fa-plus-square"){
      this.square = "fas fa-plus-square"
    }else{
      this.square = "far fa-plus-square"
    }
  }

  onCompassClick(){
    if(this.compass== "far fa-compass"){
      this.compass = "fas fa-compass"
    }else{
      this.compass = "far fa-compass"
    }
  }

  onHeartClick(){
    if(this.heart== "far fa-heart"){
      this.heart = "fas fa-heart"
    }else{
      this.heart = "far fa-heart"
    }
  }
  
  ngOnInit(): void {
  }

}
