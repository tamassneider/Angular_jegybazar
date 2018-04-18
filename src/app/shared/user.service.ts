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
  import {ReplaySubject} from 'rxjs/ReplaySubject';
  import * as firebase from 'firebase';
  import 'rxjs/add/observable/fromPromise';
  import {AngularFireAuth} from 'angularfire2/auth';
  import {AngularFireDatabase} from 'angularfire2/database';
  import {User, UserInfo} from 'firebase';
  import 'rxjs/add/operator/first';

@Injectable()
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);

  private _user = new ReplaySubject<UserModel>(1);
  private _fbAuthData: any;

  constructor(private _router: Router,
             // private _http: HttpClient,
              private _afAuth: AngularFireAuth,
              private _afDb: AngularFireDatabase) {
    this._afAuth.authState.subscribe(
      user => {
        if (user != null) {
          this.getUserById(user.uid).subscribe(remoteUser => {
            this._user.next(remoteUser);
            this.isLoggedIn$.next(true);
          });
        } else {
          this._user.next(null);
          this.isLoggedIn$.next(false);
        }
      }
    );
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return Observable.fromPromise(this._afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  register(param: UserModel, password: string) {
    return Observable.fromPromise(
      this._afAuth.auth.createUserWithEmailAndPassword(param.email, password)
    )
      .do(
        (user: UserInfo) => this.save({...param, id: user.uid})
      );
  }

  save(param: UserModel) {
    return this._afDb.object(`users/${param.id}`).set(param)
      .then(
        user => user
      );
  }

  logout() {
    this._afAuth.auth.signOut();
    this._router.navigate(['/home']);
  }

  getUserById(fbid: string) {
    return this._afDb.object<UserModel>(`users/${fbid}`).valueChanges();
  }

  getCurrentUser() {
   return this._user.asObservable();
  }

  // getAllUsers() {
  //   this._http.get(`${environment.firebase.baseUrl}/users.json`)
  //     .map(usersObject => Object.values(usersObject).map(user => new UserModel(user)));
  // }

  // addTicket(ticketId: string): Observable<string> {
  //   return this._user.first().flatMap(
  //     user => {
  //       return this._afDb.list(`users/${user.id}/tickets`)
  //         .push(ticketId)
  //     });
  // }

}
