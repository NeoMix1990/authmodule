import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { SecurityService } from '../../login/auth-service/security.service';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    // return this._http.get(url, httpOptions);
    return this._http.get(url, httpOptions).pipe(mergeMap(data => <Observable<any>> this._http.get(url, httpOptions)));
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

  public putContentFormData(url: any, content: any) {
    console.log(content);
    console.log(url);
    const Option = { headers: new HttpHeaders({
      'Authorization':  this._authorization.getToken()})
      };
    const formData = new FormData();
          formData.append('file', content);
    console.log(formData);
    return this._http.put(url, formData, Option);
    
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
