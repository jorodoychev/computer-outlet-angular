import {Injectable} from '@angular/core';
import {UserForAuth} from "../../types/user";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";


@Injectable({
  providedIn: 'root',
})

export class UserService {

  user: UserForAuth | undefined

  private url = 'http://localhost:3030/users';

  constructor(private http: HttpClient) {

    localStorage.getItem('accessToken')
    this.user = JSON.parse(localStorage.getItem('user') || 'null')
  }

  get isLogged(): boolean {
    return !!this.user
  }


  login(email: string, password: string): Observable<UserForAuth> {
    const body = {
      email: email,
      password: password
    };

    return this.http.post<UserForAuth>(this.url + '/login', body)
      .pipe(
        tap(response => {
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('user', JSON.stringify(response))
          this.user = response
        })
      )
  }

  register(email: string, username: string, password: string, rePassword: string) {
    const body = {
      email: email,
      username: username,
      password: password,
      rePassword: rePassword
    }
    return this.http.post<UserForAuth>(this.url + '/register', body)
      .pipe(
        tap(response => {
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('user', JSON.stringify(response))
          this.user = response
        })
      )
  }

  logout() {
    this.user = undefined
    localStorage.removeItem('user')
  }

}
