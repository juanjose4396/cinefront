import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas = null;
  msjError = '';

  constructor(private apiService: APIService) {
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
}
