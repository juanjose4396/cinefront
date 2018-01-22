import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
declare var swal: any;

@Injectable()

export class AdministradorGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}
    canActivate() {
        const rol = this.authService.getUsuarioSesion().rol_fk.nombre;
        if (rol === 'administrador') {
            return true;
        }
        swal('Lo sentimos!', 'No tienes permiso para entrar aqui', 'error');
        this.router.navigateByUrl('/peliculas');
        return false;
    }
}