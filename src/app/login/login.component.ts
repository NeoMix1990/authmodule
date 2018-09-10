import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './auth-service/user.service';
import { SecurityService } from './auth-service/security.service';
import { HttpClient } from '@angular/common/http';
import { GLOBAL_ADMIN } from '../siteurl/siteurl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private _secSrv: SecurityService, private http: HttpClient) { }
  loggin: string;
  password: string;
  errorMessage: string = '';
  errorTitle: string = 'Ошибка: ';
  loginMessage: string = 'Вход';

  ngOnInit() {
  }

  logIn() {
    this.userService.obtainAccessToken(this.loggin, this.password)
        .subscribe(res => {
            this._secSrv.setToken(res.AccessToken);
            this._secSrv.setRefreshToken(res.RefreshToken);
            console.log(res.AccessToken);
            console.log(res.RefreshToken);
            if(res.AccessToken != '' || res.AccessToken != null || res.AccessToken != undefined) {
                this._secSrv.setRole(GLOBAL_ADMIN);
                this.router.navigate(['dashbroad']);
            }
                

        },error => {
            if (error.status === 400) {
                this.errorMessage = ' Не верный пароль';
                this.showError();
            }
            else if (error.ok === false) {
                this.errorMessage = 'Нет связи с сервером, проверьте интернет подключение...';
                this.showError();
            }
            else {
                this.checkError(error)
            }
        });
  }

    private checkUserAuthority() {
        let isAuthorized = this._secSrv.isGlobalAdmin() || this._secSrv.isCompanyAdmin();
        if (!isAuthorized) {
            this.errorMessage = "Пользователь не имеет прав доступа";
            this.showError();
        }
        return isAuthorized;
    }

    private checkError(error: any) {
        if (error.status === 403 || error.status === 401) {
            this.errorMessage = 'В доступе отказано';
        }else {
            this.errorMessage = 'Ошибка!';
        }
        this.showError();
    }

    private showError() {
        alert(this.errorTitle + ' ' + this.errorMessage)
    }

    private passwordChanged(event) {
        if (event.code === 'Enter') {
            this.logIn();
        }
    }

}
