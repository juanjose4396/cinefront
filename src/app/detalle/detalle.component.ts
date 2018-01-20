import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  pelicula: any = {};
  id = null;
  model: any = {};
  numeroForm: FormGroup;

  constructor(private apiService: APIService,private route: ActivatedRoute,private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit() {
      this.numeroForm = new FormGroup({
          'numero': new FormControl(this.model.numero, Validators.required)
      });
      this.apiService.getPelicula(this.id).subscribe(
        response => {
          console.log(response);
          if(response.data.codigoRespuesta.toString() === 'ok'){
            this.pelicula = response.data.pelicula;
          }
        },
        error => {
          console.log(error);

        }
    );
  }
  public getAvailabilitySillas(){
      this.apiService.getAvailabilitySillas(this.pelicula.id,this.model.numero)
          .subscribe(response => {
                console.log(response);
                if(response.data.codigoRespuesta.toString() === 'ok') {
                    if(response.data.availability == 'true'){
                        swal('Exito!', response.data.mensaje, 'success');
                        setTimeout( () => {
                            this.router.navigate(['/comprar/boletas/sillas'],{ queryParams: { id: this.pelicula.id, 'numero': this.model.numero } });
                        }, 3000);
                    }else{
                        swal("Lo sentimos!", response.data.mensaje, 'error');
                    }
                }
              },
              error => {
                console.log(error);
              });
  }
  get numero() {
      return this.numeroForm.get('numero');
  }
}
