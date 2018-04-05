import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';

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
    if (!this._userService.login(email, password)) {
      this.error = 'Hiba a belépési adatokban. Próbáld újra.';
    } else {
      this._router.navigate(['/user']);
    }
  }

  clearError() {
    delete(this.error);
  }
}
