import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  passwordErrorMsg = false;
  signup_error_message  = "";

  constructor( private userSignUp:AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  /* This func retrieves data from the sign up form */
  /* Checks if all conditions match then call the api func */

  onSubmit(signUpForm:any){
    let data = signUpForm.value;
    if (!signUpForm.invalid){

      if (data.password === data.confirm_password){

        // call the api and pass data
        this.userSignUp.registerUser(data).subscribe((response:any) => {
            if (response.message){
              this.router.navigate(['/login'])
            }
            else if (response.error){
              this.signup_error_message = response.error
            }
            console.log("result", response)
        });
        
        this.passwordErrorMsg = false
        
      }
      else this.passwordErrorMsg = true
    }
  }
}
