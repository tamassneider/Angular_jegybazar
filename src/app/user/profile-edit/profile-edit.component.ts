import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  user: UserModel;
  registerMode = false;

  private _destroy$ = new Subject();

  constructor(private _userService: UserService,
              private _router: Router) { }

  ngOnInit() {
    this._userService.getCurrentUser().subscribe(
      user => {
        this.user = user;
        if (user == null) {
          this.registerMode = true;
          this.user = new UserModel();
        }
      }
    );
  }

  ngOnDestroy () {
    this._destroy$.next();
    this._destroy$.complete();
  }

  updateUser() {
    this._userService.save(this.user);
    this._goToProfile()
  }

  createUser (pass: string) {
    this._userService.register(this.user, pass)
      .subscribe(
        data => this._goToProfile(),
        err => console.warn('regisztracios hiba: ', err)
      );
  }

  private _goToProfile() {
    this._router.navigate(['/user']);
  }

}
