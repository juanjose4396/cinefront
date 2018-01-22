import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';
declare var swal: any;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentasComponent implements OnInit {
  peliculas;
  totalCine;
  detalleVentas;

  constructor(private apiService: APIService) {
    }
  ngOnInit() {
    this.apiService.getDetallesVenta()
        .subscribe(response => {
          console.log(response);
          if (response.data.codigoRespuesta == 'ok') {
            this.detalleVentas = response.data.detalleVenta;
            this.totalCine = response.data.totalCine;
          }else{
            console.log(response.data.mensaje);
          }
        }, error => {
          console.log();
          swal('Ocurrio un error!', error.data.mensaje, 'error')
        });
  }
}
