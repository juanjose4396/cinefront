import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msjError= '';
  msjSuccess= '';
  registerForm: FormGroup;
  minLengthEmail = 4;
  model: any = {};

  constructor(private router: Router, private authService: AuthService) {
      this.model.email = '';
      this.model.pass = '';
  }

  ngOnInit() {
      this.registerForm = new FormGroup({
          'email': new FormControl(this.model.email, [
              Validators.required,
              Validators.email
          ]),
          'pass': new FormControl(this.model.pass, [
              Validators.required,
              Validators.minLength(this.minLengthEmail)
          ])
      });
  }

  public login() {
      this.authService.login(this.model.email, this.model.pass).subscribe(
          response => {
              console.log(response);
              this.msjSuccess = response.data.mensaje;
              localStorage.setItem('usuarioSesion', JSON.stringify(response.data.usuario));
              setTimeout(() => {
                  this.router.navigateByUrl('/home');
              }, 3000);
          }, error => {
              console.log(error);
              this.msjError = error.data.mensaje;
          }
      );
  }

  get email() {
    return this.registerForm.get('email');
  }
  get pass() {
    return this.registerForm.get('pass');
  }
}
