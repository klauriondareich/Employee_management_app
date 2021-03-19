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

  constructor( private userLogin:AuthService, private router:Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.email_sent_msg = localStorage.getItem("email_sent_msg") ?? ""
  }

  /* This func retrieves data from the login form */
  /* Checks if all conditions match then call the api */

  onSubmit(loginForm:any){
    if (!loginForm.invalid){

      // displays the loader
      this.spinner.show();

      // call the api and sends data
      this.userLogin.loginUser(loginForm.value).subscribe((response:any) =>{
        if (response.token){
          localStorage.setItem("user_token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          // hides the loader
          this.spinner.hide();
          // remove the email sent message from the localstorage
          localStorage.removeItem("email_sent_msg");
          this.router.navigate(['/employees'])
        }
      }) 
    }
  }
}
