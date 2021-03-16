import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // User login func
  onSubmit(loginForm:any){
    if (!loginForm.invalid){
      console.log("data", loginForm.value)
    }
  }
}
