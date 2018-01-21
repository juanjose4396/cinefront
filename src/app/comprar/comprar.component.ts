import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIService} from '../services/api.service';
import {AuthService} from '../services/auth.service';
import {DatePipe} from '@angular/common';
declare var swal: any;

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  idPelicula = 0;
  numeroBoletas = 0;
  tipo;
  sillas: any;
  sillasOcupadas;
  sillasSeleccionadas = [];
  contador = 0;
  idUsuario;

  constructor(private route: ActivatedRoute, private apiService: APIService, private authService: AuthService, private router: Router) {
    this.idPelicula = this.route.snapshot.queryParams['id'];
    this.numeroBoletas = this.route.snapshot.queryParams['numero'];
    this.tipo = this.route.snapshot.queryParams['tipo'];
    console.log(this.idPelicula);
    console.log(this.numeroBoletas);
  }

  ngOnInit() {
    this.apiService.getSillas(this.idPelicula, this.tipo)
        .subscribe(response => {
              console.log(response);
              if (response.data.codigoRespuesta == 'ok') {
                this.sillas = response.data.sillas;
                this.sillasOcupadas = response.data.sillasOcupadas;

                this.marcarSillasOcupadas();
              }else {
                swal('Ocurrio un error!', response.data.mensaje, 'error');
              }
            },
            error => {
              console.log(error);
            });
  }
  public marcarSillasOcupadas() {
      this.sillas.forEach( (silla) => {
          this.sillasOcupadas.forEach((sillaOcupada) => {
              if (sillaOcupada.id == silla.id) {
                  const indice = this.sillas.indexOf(silla);
                  silla.disponibilidad = 'ocupada';
                  this.sillas[indice] = silla;
              }
          });
      });
  }
  public seleccionarSilla(id) {
    this.sillasSeleccionadas.push(id);
    this.contador++;
    console.log(this.contador);
    console.log(this.sillasSeleccionadas);
  }
  public comprar() {
      this.idUsuario = this.authService.getUsuarioSesion().id;
      const fecha = this.getFechaActual();
      console.log(fecha);
      console.log(this.tipo);
      this.apiService.comprarBoleta(this.idUsuario, this.idPelicula, this.sillasSeleccionadas, this.tipo, fecha).subscribe(
              response => {
                  console.log(response);
                  if(response.data.codigoRespuesta == 'ok') {
                      swal('Compra exitosa!', response.data.mensaje, 'success');
                      setTimeout( () => {
                          this.router.navigateByUrl('/peliculas');
                      }, 2000);
                  }
              }, error => {console.log(error);});
  }

  public getFechaActual() {
      const tod = new Date();
      let dd = tod.getDate();
      let mm = tod.getMonth()+1; //January is 0!
      let d;
      let m;

      const yyyy = tod.getFullYear();
      if(dd < 10){
          d = '0' + dd;
      }
      if(mm < 10){
          m = '0' + mm;
      }
      const t = yyyy + '-' + m + '-' + d;
      return t;
    }
}
