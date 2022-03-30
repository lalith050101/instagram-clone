import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss']
})
export class StoryViewComponent implements OnInit {
  
  myScriptElement: HTMLScriptElement = document.createElement("script");

  constructor(){
    this.myScriptElement.src = "http://yourjavascript.com/32832190432/scripts.js";
    document.body.appendChild(this.myScriptElement);  
  }

  ngOnInit(): void {
  }

}
