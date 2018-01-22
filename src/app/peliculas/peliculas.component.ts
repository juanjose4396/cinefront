import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
declare var swal: any;

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas = null;
  msjError = '';

  constructor(private apiService: APIService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.apiService.getPeliculas().subscribe(
        response => {
            console.log(response);
            if(response.data.codigoRespuesta.toString() === 'ok') {
                this.peliculas = response.data.peliculas;
            }else{
                this.msjError = response.data.mensaje;
                setTimeout(() => {
                    this.msjError = '';
                }, 3000);
            }
        },
        error => {
            console.log(error);
        }
    );
  }

  public comprar(id) {
      if(this.authService.getUsuarioSesion().rol_fk.nomre == 'taquilla') {
          this.router.navigateByUrl('/prlicula/' + id);
      }else{
          swal('Lo semtimos!', 'Debes tener permiso de taquilla para entrar a esta seccion' , 'error');
      }
  }
}
