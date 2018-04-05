  import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
  import {Observable} from 'rxjs/Observable';
  import {HttpClient} from '@angular/common/http';
  import {environment} from '../../environments/environment.prod';
  import {FirebaseLoginModel} from './firebase-login-model';
  import 'rxjs/add/operator/do';
  import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;
  private _allUsers: UserModel[];

  constructor(private _router: Router,
              private _http: HttpClient) {
    this._allUsers = this._getMockData()
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apikey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
      .switchMap(fbLogin => this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbLogin.localId}.json`))
      .do(user => this.isLoggedin = true)
      .do(user => this._user = user);
  }
  private _getMockData() {
    return [
      new UserModel ({
        'id': 0,
        'name': 'Tomi ba',
        'email': 'tomiba@valami.hu',
        'address': 'utca 0',
        'dateOfBirth': '1990-03-04',
        'gender': 'male',
      }),
      new UserModel ({
        'id': 1,
        'name': 'Pista ba',
        'email': 'pistaba@valami.hu',
        'address': 'utca 3',
        'dateOfBirth': '1930-03-04',
        'gender': 'male',
      }),
      new UserModel ({
        'id': 2,
        'name': 'Jani ba',
        'email': 'janiba@valami.hu',
        'address': 'utca 5',
        'dateOfBirth': '1940-03-04',
        'gender': 'male',
      }),
      new UserModel ({
        'id': 3,
        'name': 'Jozsi ba',
        'email': 'jozsiba@valami.hu',
        'address': 'utca 8',
        'dateOfBirth': '1950-03-04',
        'gender': 'male',
      }),
      ];
  }

  register(param: UserModel) {
    if (param) {
      this._user = new UserModel({
        id: 4,
        ...param
      });

      this._allUsers = [
        ...this._allUsers,
        this._user
      ];
    }


    this.isLoggedin = true;

    console.log('signed-in: ', this.isLoggedin);
    console.log(this._allUsers)
  }

  logout() {
    delete(this._user);
    this.isLoggedin = false;
    this._router.navigate(['/home']);
    console.log('signed-in: ', this.isLoggedin);
  }
  updateUser(param: UserModel) {
    this._user = new UserModel(param);
  }

  getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === +id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
   return this._user;
  }
  private _getMaxId() {
    return this._allUsers.reduce((x, y) => x.id > y.id ? x : y).id + 1
  }

}
