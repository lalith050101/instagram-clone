import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CreatePostComponent
  ]
})
export class HomeSharedModule { }
