import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from './security.service';
import { AUTHORIZATION_HEADER } from '../../siteurl/siteurl';
import { Admin } from '../../models/admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: SecurityService) { }

  getJson(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    const options = {
        headers: headers
    };
    return this.http.get(url, options);
}

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Bearer ' + this.authService.getToken());
}

  obtainAccessToken(loggin: string, password: string) {
    let admin = new Admin();
    admin.login = loggin;
    admin.hardwareId = password;
    const url = this.authService.getServerUrl() + '/auth';

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json;charset=UTF-8');
    const options = ({headers: headers});
    return this.http.post<any>(url, admin, options).pipe(response => {
            return response;
        }
    );
}
}
