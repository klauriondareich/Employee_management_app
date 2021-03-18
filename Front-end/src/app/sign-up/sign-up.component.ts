import { Component, OnInit } from '@angular/core';
import {UserSignupService} from '../user-signup.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  passwordErrorMsg = false;

  constructor( private userSignUp:UserSignupService) {}

  ngOnInit(): void {
  }

  /* This func retrieves data from the sign up form */
  /* Checks if all conditions match then call the api func */

  onSubmit(signUpForm:any){
    let data = signUpForm.value;
    if (!signUpForm.invalid){

      if (data.password === data.confirm_password){

        // call the api and pass data
        this.userSignUp.registerUser(data).subscribe((result) => {
          console.log("result", result)
        });
        this.passwordErrorMsg = false
        
      }
      else this.passwordErrorMsg = true
    }
  }
}
