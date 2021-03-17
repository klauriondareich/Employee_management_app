import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userLogin:LoginService) { }

  ngOnInit(): void {
  }

  /* This func retrieves data from the login form */
  /* Checks if all conditions match then call the api func */

  onSubmit(loginForm:any){
    if (!loginForm.invalid){

      // call the api and sends data
      this.userLogin.loginUser(loginForm.value).subscribe((result) =>{
        console.log("Login successfully");
        console.log("result", result)
      })
      
    }
  }
}
