import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: null;

  constructor( private auth:AuthService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem("user") ?? "");
    this.username = user.username;
  }

  // Called when user click on the logout button
  logout_user(){
    this.auth.logout()
  }


}
