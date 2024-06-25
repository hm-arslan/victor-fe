import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  loggedin: Boolean = false

  constructor(private router: Router, private _getService: GetService) {
    var token = sessionStorage.getItem("token")
    if (token) {
      this.loggedin = true;
    }
    else {
      this.loggedin = false
    }
  }

  signin_clicked() {
    this.router.navigate(['login'])
  }

  signup_clicked() {
    this.router.navigate(['create_account'])
  }
  signOut_clicked() {
    this._getService.getRequest('auth/logout').subscribe(
      res => {
        sessionStorage.clear()
        window.location.reload();
      },
      err => {
        sessionStorage.clear()
        window.location.reload();
      }
    )
  }
}
