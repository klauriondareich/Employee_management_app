import { Component, OnInit } from '@angular/core';
import {UserSignupService} from '../user-signup.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  passwordErrorMsg = false;

  constructor( private userSignUp:UserSignupService) { 

    this.userSignUp.getData().subscribe(data => {
      console.log(data)
    })

  }

  ngOnInit(): void {
  }

  /* This func retrieves data from the sign up form */
  /* Checks if all conditions match then submit the datas to the DB */

  onSubmit(signUpForm:any){
    let data = signUpForm.value;

    if (!signUpForm.invalid){
      if (data.password === data.confirmPassword){
        console.log("consume api");
        this.passwordErrorMsg = false
      }
      else this.passwordErrorMsg = true
    }
  }
}
