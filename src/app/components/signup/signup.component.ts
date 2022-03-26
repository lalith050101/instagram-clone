import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  showhide:string = "Show"
  ngOnInit(): void {
  }

  signup = this.fb.group({
    emailno:['',Validators.required],
    fullname:['',Validators.required],
    username:['',Validators.required],
    password:['',Validators.required]
  })

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

  onSubmit(){
    console.log(this.signup.value.emailno)
  }

  get emailno(){
    return this.signup.get('emailno');
  }

  get fullname(){
    return this.signup.get('fullname');
  }

  get username(){
    return this.signup.get('username');
  }

  get password(){
    return this.signup.get('password');
  }
}
