import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(signUpForm:any){
    let datas = signUpForm;
    if (datas.username && datas.email && datas.password){
      console.log("form valid")
    }
    else console.log("done!")
  }

  // Check if the entered passwords are identical
  checkPassword(password:string, confirmPassword:string){
    if (password === confirmPassword) return true
    else return false
  }
}
