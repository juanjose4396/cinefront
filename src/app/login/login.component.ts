import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  registerForm: FormGroup;
  minLengthEmail = 4;
  model: any = {};

  constructor(private router: Router, private authService: AuthService,private renderer: Renderer2) {
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

              if(response.data.codigoRespuesta.toString() === 'ok') {
                  swal('Login exitoso!', response.data.mensaje, 'success');
                  localStorage.setItem('usuarioSesion', JSON.stringify(response.data.usuario));
                  setTimeout(() => {
                      this.router.navigateByUrl('/peliculas');
                  }, 2000);
              }else{
                  swal('Ocurrio un error!', response.data.mensaje, 'error');
              }
          }, error => {
              console.log(error);
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
