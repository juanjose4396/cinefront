import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../interfaces/response.interface';

@Injectable()

export class APIService {
    urlBase = 'http://localhost:8080/ApiWebDB/';
    constructor(private httpClient: HttpClient) {}

    public getPeliculas() {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<Response>(this.urlBase + 'Peliculas/peliculas', {headers: headers});
    }

    public getPelicula(id) {
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<Response>(this.urlBase + 'Peliculas/' + id, {headers: headers});
    }
    public getAvailabilitySillas(id, numeroBoletas){
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<Response>(this.urlBase + 'Boletas/pelicula/' + id + '/numero/' + numeroBoletas, {headers: headers});
    }
    public getSillas(id){
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<Response>(this.urlBase + 'Peliculas/' + id + '/sillas', {headers: headers});
    }
}