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
    return this._http.get(url, httpOptions);
  }


  public putContent(url: any, content: any): any {
    console.log(content);
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this._authorization.getToken()
      })
    };
    return this._http.put(url, content, httpOptions);
  }

  public postContent(url: any, content: any) {
    console.log(content);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this._authorization.getToken()
      })
    };
    return this._http.post(url, content, httpOptions);
  }

  public deleteContent(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this._authorization.getToken()
      })
    };
    return this._http.delete(url, httpOptions);
	}
}
