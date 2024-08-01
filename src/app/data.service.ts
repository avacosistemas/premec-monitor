import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Item, ResponseData } from './data.model';
import { PREFIX_DOMAIN_API } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = PREFIX_DOMAIN_API + 'monitor?skip='; // URL de tu servicio REST
  
  constructor(private http: HttpClient) { }

  getItems(skip: string): Observable<ResponseData> {
      return this.http.get<ResponseData>(this.apiUrl + skip);
  }
}