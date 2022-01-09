import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../model/board.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  getData(url: string) : Observable<Board>{
    return this.http.get<Board>(url)
  }

  postData(url: string, request: any) : Observable<any>{
    return this.http.post<Board>(url, request);
  }
}
