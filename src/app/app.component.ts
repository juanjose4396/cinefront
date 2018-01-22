import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   constructor(private router: Router) {}
   ngOnInit() {
   }
   public logout() {
      localStorage.removeItem('usuarioSesion');
      this.router.navigateByUrl('/peliculas');
   }
}
