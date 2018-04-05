import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {UserModel} from '../../shared/user-model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public error: string;

  constructor(private _userService: UserService,
              private _router: Router) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this._userService.login(email, password).subscribe(
    (user: UserModel) => {
      console.log('login complete', user);
      this._router.navigate(['/user']);
    },
      err => console.warn( 'error in login', err)
    );
  }

  clearError() {
    delete(this.error);
  }
}
