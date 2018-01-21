import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-detalleVenta',
  templateUrl: './detalle_venta.component.html',
  styleUrls: ['./detalle_venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  pelicula: any = {};
  cantidadPersonas;
  totalRecaudado;
  id = null;

  constructor(private apiService: APIService,private route: ActivatedRoute,private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit() {
      this.apiService.getPelicula(this.id).subscribe(
        response => {
          console.log(response);
          if(response.data.codigoRespuesta.toString() === 'ok'){
            this.pelicula = response.data.pelicula;
            this.cantidadPersonas = response.data.cantidadPersonas;
            this.totalRecaudado = response.data.dineroRecaudado;
          }
        },
        error => {
          console.log(error);

        }
    );
  }
}
