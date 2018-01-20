import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {APIService} from '../services/api.service';
declare var swal: any;

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  idPelicula = 0;
  numeroBoletas = 0;
  sillas: any;
  sillasOcupadas;

  constructor(private route: ActivatedRoute, private apiService: APIService) {
    this.idPelicula = this.route.snapshot.queryParams['id'];
    this.numeroBoletas = this.route.snapshot.queryParams['numero'];
    console.log(this.idPelicula);
    console.log(this.numeroBoletas);
  }

  ngOnInit() {
    this.apiService.getSillas(this.idPelicula)
        .subscribe(response => {
              console.log(response);
              if(response.data.codigoRespuesta == 'ok'){
                this.sillas = response.data.sillas;
                this.sillasOcupadas = response.data.sillasOcupadas;

                this.marcarSillasOcupadas();
              }else{
                swal('Ocurrio un error!', response.data.mensaje, 'error');
              }
            },
            error => {
              console.log(error);
            });
  }
  public marcarSillasOcupadas() {
      console.log(this.sillas);
      console.log(this.sillasOcupadas);
      console.log({id: '1', ubicacion: 'A-01'});
      console.log();
        this.sillas.forEach( (silla) => {
          this.sillasOcupadas.forEach((sillaOcupada) => {
              if(sillaOcupada.id == silla.id) {
                  const indice = this.sillas.indexOf(silla);
                  silla.disponibilidad = 'ocupada';
                  this.sillas[indice] = silla;
              }
          });
        });
  }
}
