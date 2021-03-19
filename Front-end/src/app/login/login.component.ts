import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email_sent_msg = "";
  error_msg = "";

  constructor( private userLogin:AuthService, private router:Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.email_sent_msg = localStorage.getItem("email_sent_msg") ?? ""
  }

  /* This func retrieves data from the login form */
  /* Checks if all conditions match then call the api */

  onSubmit(loginForm:any){
    if (!loginForm.invalid){

      this.spinner.show(); // displays the loader
      // call the api and sends data
      this.userLogin.loginUser(loginForm.value).subscribe(
        (response:any) =>{
          console.log("response", response)
          if (response.token){
            localStorage.setItem("user_token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            this.spinner.hide();// hides the loader
            localStorage.removeItem("email_sent_msg"); // remove the email sent message from the localstorage
            this.router.navigate(['/employees'])
          }
      },
      (reject) => {
        this.error_msg = reject.error;
        this.spinner.hide()
      }) 
    }
  }
}
