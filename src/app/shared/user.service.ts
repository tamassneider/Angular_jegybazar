  import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
  import {Observable} from 'rxjs/Observable';
  import {HttpClient} from '@angular/common/http';
  import {environment} from '../../environments/environment.prod';
  import {FirebaseLoginModel} from './firebase-login-model';
  import 'rxjs/add/observable/of';
  import 'rxjs/add/operator/do';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/switchMap';
  import {FirebaseRegistrationModel} from '../firebase-registration-model';

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;
  private _fbAuthData: FirebaseLoginModel | FirebaseRegistrationModel | undefined;

  constructor(private _router: Router,
              private _http: HttpClient) {
  }

  get fbIdToken(): string | null {
    return this._fbAuthData ? this._fbAuthData.idToken : null;
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apikey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
      .do((fbAuthResponse: FirebaseLoginModel) => this._fbAuthData = fbAuthResponse)
      .switchMap(fbLogin => this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbLogin.localId}.json`))
      .do(user => this.isLoggedin = true)
      .do(user => this._user = user)
      .do(user => console.log('succesful login with user ', user));
  }

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
      `${environment.firebase.registerUrl}?key=${environment.firebase.apikey}`,
      {
        'email': param.email,
        'password': password,
        'returnSecureToken': true
      }
    )
      .do((fbAuthResponse: FirebaseRegistrationModel) => this._fbAuthData = fbAuthResponse)
      .map(fbreg => {
        return {
        id: fbreg.localId,
      ...param
        };
      })
      .switchMap(user => this.save(user))
      .do (user => this.isLoggedin = true)
      .do (user => console.log('succesful registration with user ', user));
  }

  save(param: UserModel) {
    return this._http.put<UserModel>(
      `${environment.firebase.baseUrl}/users/${param.id}.json`, param)
      .do(user => this._user = user);
  }

  logout() {
    this._user = new UserModel()
    this.isLoggedin = false;
    delete(this._fbAuthData);
    this._router.navigate(['/home']);
    console.log('signed out');
  }

  getUserById(fbid: string) {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
  }


  getCurrentUser() {
   return this._user;
  }

  getAllUsers() {
    this._http.get(`${environment.firebase.baseUrl}/users.json`)
      .map(usersObject => Object.values(usersObject).map(user => new UserModel(user)));
  }

  addTicket(ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/users/${this._user.id}/tickets.json`,
      {[ticketId]: true}
    )
      .map(rel => Object.keys(rel)[0]);
  }

}
