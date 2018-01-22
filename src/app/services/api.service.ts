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
    public getAvailabilitySillas(id, numeroBoletas, tipo) {
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<Response>(this.urlBase + 'Boletas/pelicula/' + id + '/funcion/' + tipo + '/numero/' + numeroBoletas, {headers: headers});
    }
    public getSillas(id, tipo){
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<Response>(this.urlBase + 'Peliculas/' + id + '/funcion/' + tipo + '/sillas', {headers: headers});
    }
    public comprarBoleta(idUsuario, idPelicula, idSilla, tipo, fecha) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<Response>(this.urlBase + 'Boletas/compra',{data: {
                idPelicula: idPelicula,
                idUsuario: idUsuario,
                sillas: idSilla,
                tipo: tipo,
                fecha: fecha
            }}, {headers: headers});
    }
    public getDetallesVenta() {
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.get<Response>(this.urlBase + '/Boletas/detalle/ventas', {headers: headers});
    }
}