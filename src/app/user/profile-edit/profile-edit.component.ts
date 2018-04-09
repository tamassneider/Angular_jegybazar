import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user: UserModel;

  private _destroy$ = new Subject();

  constructor(private _userService: UserService,
              private _router: Router) { }

  ngOnInit() {
    this.user = this._userService.getCurrentUser();
  }

  ngOnDestroy () {
    this._destroy$.next();
    this._destroy$.complete();
  }

  updateUser() {
    this._userService.save(this.user)
      .takeUntil(this._destroy$)
      .subscribe(
        data => this._goToProfile(),
        err => console.warn('problem when saving user: ', err)
      );
  }

  createUser (pass: string) {
    this._userService.register(this.user, pass)
      .takeUntil(this._destroy$)
      .subscribe(
        data => this._goToProfile(),
        err => console.warn('problem when registering user: ', err)
      );
  }

  private _goToProfile() {
    this._router.navigate(['/user']);
  }

}
