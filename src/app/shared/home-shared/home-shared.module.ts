import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostComponent } from './view-post/view-post.component';



@NgModule({
  declarations: [
    ViewPostComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ViewPostComponent
  ]
})
export class HomeSharedModule { }
