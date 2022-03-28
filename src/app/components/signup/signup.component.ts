import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

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
    password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$')]]
  },{
    validators:this.checkEmailorNum('emailno'),
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
    //console.log(this.signup.value.emailno)
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

  checkEmailorNum(email:string){
    return(fg:FormGroup) => {
      const emailnum = fg.controls['emailno'];
      const emailornum = fg.controls['emailno'].value;
      let isnum = /^\+?[0-9 \.-]+$/.test(emailornum);
      const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(emailnum.errors && !emailnum.errors['notvalid']){
        return
      }
      if(isnum)
      {
        if(emailornum.length !== 10)
          emailnum.setErrors({notvalidnum: true});
        else{
          emailnum.setErrors(null);
        }
      }
      else {
        if(regularExpression.test(emailornum.toLowerCase()))
        {
          emailnum.setErrors(null);
        }
        else{
          emailnum.setErrors({notvalidemail:true})
        }
      }
      return
    }
  }
}
