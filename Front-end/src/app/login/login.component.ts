import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userLogin:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  /* This func retrieves data from the login form */
  /* Checks if all conditions match then call the api func */

  onSubmit(loginForm:any){
    if (!loginForm.invalid){

      // call the api and sends data
      this.userLogin.loginUser(loginForm.value).subscribe((response:any) =>{
        if (response.token){
          localStorage.setItem("user_token", response.token);
          console.log("response", response)
          this.router.navigate(['/employees'])
        }
      })
      
    }
  }
}
