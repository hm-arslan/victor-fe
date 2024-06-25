import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(
    private fb: FormBuilder, 
    private _authService:AuthService,
    private _router: Router,
  ) {
    if(sessionStorage.getItem("token")){
      this._router.navigate (['/home'])
    }
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  submit(){
    this._authService.login(this.loginForm.value).subscribe(
      response => {
        if(response.token){
          sessionStorage.setItem('token', response.token)
          window.location.reload();
          
        }
      },
      err => {

      }

    )
  }
}
