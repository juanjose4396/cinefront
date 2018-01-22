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
  pelicula:any = {};
  numeroBoletas = 0;
  tipo;
  sillas: any;
  sillasOcupadas;
  sillasSeleccionadas = [];
  contador = 0;
  idUsuario;
  model:any = {};

  constructor(private route: ActivatedRoute, private apiService: APIService, private authService: AuthService, private router: Router) {
    this.idPelicula = this.route.snapshot.queryParams['id'];
    this.numeroBoletas = this.route.snapshot.queryParams['numero'];
    this.tipo = this.route.snapshot.queryParams['tipo'];
    this.model.dinero = '';
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
    this.apiService.getPelicula(this.idPelicula)
        .subscribe(response => {
            console.log(response);
            this.pelicula = response.data.pelicula;
        }, error => {
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
      const valorCompra= (this.numeroBoletas * this.pelicula.precio);

      if(this.model.dinero == '') {
          swal('Error', 'Debe ingresar un valor', 'error');
      }else{
          if(this.model.dinero >=  valorCompra) {
              this.apiService.comprarBoleta(this.idUsuario, this.idPelicula, this.sillasSeleccionadas, this.tipo, this.pelicula.fecha).subscribe(
                  response => {
                      console.log(response);
                      if(response.data.codigoRespuesta == 'ok') {
                          const devuelta = (this.model.dinero - valorCompra);
                          swal('Informacion taquilla', response.data.mensaje + ', la devuelta es: ' + devuelta, 'success');
                          setTimeout( () => {
                              this.router.navigateByUrl('/peliculas');
                          }, 2000);
                      }
                  }, error => {console.log(error);});
          }else{
              swal('Informacion taquilla', 'El monto debe superar el valor de la compra: ' + valorCompra, 'error');
          }
      }
  }
}
