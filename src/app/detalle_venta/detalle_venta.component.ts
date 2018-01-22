import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var swal: any;
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {AuthService} from '../services/auth.service';

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

  constructor(private apiService: APIService, private route: ActivatedRoute,private authService: AuthService) {
    this.id = this.route.snapshot.params['id'];
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
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

  generarReporte() {
      if(this.authService.getUsuarioSesion().rol_fk.nombre == 'supervisor') {
          const dd = {
              content: [
                  { text: 'Reporte de ventas', style: 'header' },
                  { text: 'nombre de la pelicula: ' + this.pelicula.nombre, fontSize: 15 },
                  { text: 'cantidad de personas que la vieron: ' + this.cantidadPersonas, fontSize: 15 },
                  { text: 'total de dinero recaudado: ' + this.totalRecaudado, fontSize: 15 }
              ],
              styles: {
                  header: {
                      fontSize: 22,
                      bold: true
                  }
              }
          };
          pdfMake.createPdf(dd).download();
          swal('Operacion exitosa!', 'Se genero el reporte correctamente', 'success');
      }else{
        swal('Error!', 'No tiene permisos para realizar esta accion', 'error');
      }
  }
}
