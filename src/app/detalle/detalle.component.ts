import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  pelicula: any = {};
  id = null;

  constructor(private apiService: APIService,private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit() {
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
}
