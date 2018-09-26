import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from '../../login/auth-service/security.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient, private _authorization: SecurityService) {}


  


  public getContent(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this._authorization.getToken()
      })
    };
    // console.log(url);
    // console.log(httpOptions);
    return this._http.get(url, httpOptions);
  }


  public putContent(url: any, content: any): any {
    console.log(content);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this._authorization.getToken()
      })
    };
    return this._http.put(url, content, httpOptions);
  }
}
