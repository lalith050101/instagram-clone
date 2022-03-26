import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './main/home/home-component/home-component.component';
import { PostComponentComponent } from './main/home/post-component/post-component.component';
import { StoryComponentComponent } from './main/home/story-component/story-component.component';
import { SuggestionComponentComponent } from './main/home/suggestion-component/suggestion-component.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    PostComponentComponent,
    StoryComponentComponent,
    SuggestionComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
