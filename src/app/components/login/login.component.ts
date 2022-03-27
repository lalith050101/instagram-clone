import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  
  signin = this.fb.group({
    username:['',Validators.required],
    password: ['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$')]]
  })

  onSubmit(){
  }

  get username(){
    return this.signin.get('username');
  }

  get password(){
    return this.signin.get('password');
  }
  
  showhide:string = "Show"
  slideIndex = 0;
  ngOnInit(): void {
    this.showSlides()
  }

  ngOnChanges(): void{
    this.showSlides()
  }

   myFunction() {
    var x = document.getElementById("password-field") as HTMLFormElement;
    if (x['type'] === "password") {
      x['type'] = "text";
      this.showhide="Hide"
    } else {
      x['type'] = "password";
      this.showhide="Show"
    }
  }

  showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {this.slideIndex = 1}
    slides[this.slideIndex-1].style.display = "block";
    setTimeout(() =>{
      this.showSlides()
    },1600)
  }
}
