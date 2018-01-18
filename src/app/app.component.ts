import { Component } from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = false;
  userName;
  constructor(private authService: AuthService) {
    this.isLogged = this.authService.isLogged();
    if (this.authService.isLogged()) {
        this.userName = this.authService.getUsuarioSesion().email;
    }
  }
}
