import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';

import { config } from '../../shared/config';
import { User } from '../../shared/interfaces/user';
import { UtilService } from '../../shared/services/util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedUser = new EventEmitter<boolean>();

  private readonly JWT_TOKEN = 'OPTICAL_TOKEN';
  private readonly MESSAGE = 'Credenciais incorretas. Por favor, tente novamente.';

  constructor(private http: HttpClient, private util: UtilService) {}

  login(user: { email: string; password: string }): Observable<boolean> {
    return this.http
      .post<any>(`${config.apiUrl}/user/sign`, {
        userEmail: user.email,
        userPassword: user.password,
      })
      .pipe(
        tap((data) => this.doLoginUser(data)),
        mapTo(true),
        catchError((error) => {
          if (!error.signAt) {
            this.util.showMessage({
              message: this.MESSAGE,
              duration: 5000,
              position: 'top',
              color: 'danger',
            });
          }
          return of(false);
        })
      );
  }

  logout(): void {
    this.doLogoutUser();
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isTokenValid(): Observable<{ isToken: boolean }> {
    return this.http.get<any>(`${config.apiUrl}/token/isvalid`).pipe(
      map((data) => data),
      catchError((e) => {
        return of({ isToken: false });
      })
    );
  }

  private doLoginUser(data: User): void {
    this.loggedUser.emit(true);
    this.storeJwtToken(data.token);
  }

  private doLogoutUser(): void {
    this.removeJwtToken();
    this.loggedUser.emit(false);
  }

  private storeJwtToken(jwt: string): void {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeJwtToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
