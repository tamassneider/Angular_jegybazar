import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';

@Injectable()
export class UserService {
  isLoggedin = false;

  private _user: UserModel;

  constructor(private _router: Router) {
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
}
