import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '../interfaces/response.interface';

@Injectable()
export class AuthService {
    urlBase = 'http://localhost:8080/ApiWebDB/';
    constructor(private httpClient: HttpClient) { }

    public login(email, password) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.httpClient.post<Response>(this.urlBase + 'Login/login',{data: {
                email: email,
                password: password
            }}, {headers: headers});
    }
    public getUsuarioSesion() {
        const usuario = localStorage.getItem('usuarioSesion');
        if (usuario) {
            return JSON.parse(usuario);
        }
        return null;
    }
    public isLogged(){
        return localStorage.getItem('usuarioSesion') ? true : false;
    }
}