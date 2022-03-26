import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
=======
import { ProfileComponent } from './components/profile/profile.component';
>>>>>>> 49889e85a80de585ad939bffd7fe315263d2266e

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
<<<<<<< HEAD
    LoginComponent,
    FooterComponent,
    SignupComponent
=======
    ProfileComponent
>>>>>>> 49889e85a80de585ad939bffd7fe315263d2266e
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
