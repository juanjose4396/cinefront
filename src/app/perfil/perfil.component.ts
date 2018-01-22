import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario;
  rol;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.authService.getUsuarioSesion().email;
    this.rol = this.authService.getUsuarioSesion().rol_fk.nombre;
  }

}
