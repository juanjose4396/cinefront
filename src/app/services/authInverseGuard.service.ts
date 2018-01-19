import {Injectable} from '@angular/core';
import {CanActivate, CanDeactivate, Router} from '@angular/router';

@Injectable()

export class AuthGuardInverse implements CanActivate {
    constructor(private router: Router) {}
    canActivate() {
        if (!localStorage.getItem('usuarioSesion')) {
            return true;
        }
        this.router.navigateByUrl('/peliculas');
        return false;
    }
}