import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas = null;

  constructor(private apiService: APIService) {
  }

  ngOnInit() {
    this.apiService.getPeliculas().subscribe(
        response => {
          console.log(response);
          this.peliculas = response.data.peliculas;
        },
        error => {
          console.log(error);
        }
    );
  }
}
