import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  passwordErrorMsg = false;
  signup_error_message  = "";

  constructor( private userSignUp:AuthService, private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
  }

  /* This func retrieves data from the sign up form */
  /* Checks if all conditions match then call the api func */

  onSubmit(signUpForm:any){
    let data = signUpForm.value;
    if (!signUpForm.invalid){

      if (data.password === data.confirm_password){

        this.spinner.show();// displays the loader
        // call the api and pass data
        this.userSignUp.registerUser(data).subscribe((response:any) => {
            if (response.message){
              localStorage.setItem("email_sent_msg", response.info);
              this.spinner.hide(); // hides the loader
              this.router.navigate([''])
            }
            else if (response.error){
              this.spinner.hide(); // hides the loader
              this.signup_error_message = response.error
            }
        });
        
        this.passwordErrorMsg = false
        
      }
      else this.passwordErrorMsg = true
    }
  }
}
