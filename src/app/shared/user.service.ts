  import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';
import {assertNumber} from '@angular/core/src/render3/assert';

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;
  private _allUsers: UserModel[];

  constructor(private _router: Router) {
    this._allUsers = [
      new UserModel ({
        'id': 1,
        'name': 'Pista ba',
        'email': 'pistaba@valami.hu',
        'address': 'utca 3',
        'dateOfBirth': '1930-03-04',
        'gender': 'male'
      }),
      new UserModel ({
        'id': 2,
        'name': 'Jani ba',
        'email': 'janiba@valami.hu',
        'address': 'utca 5',
        'dateOfBirth': '1940-03-04',
        'gender': 'male'
      }),
      new UserModel ({
        'id': 3,
        'name': 'Jozsi ba',
        'email': 'jozsiba@valami.hu',
        'address': 'utca 8',
        'dateOfBirth': '1950-03-04',
        'gender': 'male'
      })
    ];
  }

  login(email: string, password: string) {
    if (email === 'angular' && password === 'angular') {
      this._user = new UserModel(UserModel.exampleUser);
      this.isLoggedin = true;
      this._router.navigate(['/user']);
    }
    console.log('signed-in: ', this.isLoggedin);
    return false;
  }

  register(param?: UserModel) {
    if(param) {
      this._user = new UserModel(param);
    } else {
      this._user = new UserModel(UserModel.exampleUser);
    }
    this.isLoggedin = true;
    this._router.navigate(['/user']);
    console.log('signed-in: ', this.isLoggedin);
  }

  logout() {
    delete(this._user);
    this.isLoggedin = false;
    this._router.navigate(['/home']);
    console.log('signed-in: ', this.isLoggedin);
  }

  getUserById(id: number) {
    const user = this._allUsers.filter(u => u.id === id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
   return this._user;
  }
}
