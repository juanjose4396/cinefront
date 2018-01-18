import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class APIService {
    constructor(private httpClient: HttpClient){ }
}