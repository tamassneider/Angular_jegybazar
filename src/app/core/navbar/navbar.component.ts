import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck, AfterViewChecked, AfterViewInit {
  isCollapsed = true;
  isLoggedIn = false;

  constructor(public userService: UserService,
              private _cdr: ChangeDetectorRef) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this._cdr.detectChanges();
      }
    );
  }

  logout() {
    this.userService.logout();
  }

  ngAfterViewChecked(): void {
    // console.log('NavBar AfterViewChecked')
  }

  ngDoCheck() {
    // console.log('NavBar DoCheck')
  }

  ngAfterViewInit(): void {
    this._cdr.detach();
  }

  ngOnInit(): void {
    console.log('NavBar OnInit')
  }

}
