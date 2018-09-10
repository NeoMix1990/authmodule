import { Injectable, isDevMode } from '@angular/core';
import { DEV_URL, PROD_URL, GLOBAL_ADMIN, COMPANY_ADMIN } from '../../siteurl/siteurl';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private accessToken: string = '';
  private refreshToken: string = '';
  private loggin: string = '';
  private role: string = '';
  private userId: number = 0;
  private name: string = '';
  private serverUrl: string = '';


  constructor() {
    //   this.serverUrl = isDevMode() ? DEV_URL : PROD_URL;
      this.serverUrl = PROD_URL;
  }

  public setName(name: string): void {
      this.name = name;
  }

  public getName(): string {
      return this.name;
  }

  public setToken(token: string) {
      this.accessToken = token;
  }

  public getToken(): string {
      return this.accessToken;
  }

  public setRefreshToken(token: string) {
      this.refreshToken = token;
  }

  public getRefreshToken(): string {
      return this.refreshToken;
  }

  public setLogin(login: string) {
      this.loggin = login;
  }

  public getLogin(): string {
      return this.loggin;
  }


  public setRole(role: string) {
      this.role = role;
  }


  public getRole(): string {
      return this.role;
  }

  public setUserId(userId: number) {
      this.userId = userId;
  }

  public getUserId(): number {
      return this.userId;
  }

  public setServerUrl(url: string): void {
      this.serverUrl = url;
  }

  public getServerUrl(): string {
      return this.serverUrl;
  }
  public isGlobalAdmin(): boolean {
      return this.role === GLOBAL_ADMIN;
  }

  public isCompanyAdmin(): boolean {
      return this.role === COMPANY_ADMIN;
  }
}
