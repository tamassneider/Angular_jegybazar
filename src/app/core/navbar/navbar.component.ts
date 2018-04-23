import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck, AfterViewChecked, AfterViewInit {
  isCollapsed = true;
  isLoggedIn = false;
  isCollapseLanguageSwitcher = true;
  currentLang = 'hu';

  constructor(public userService: UserService,
              private _cdr: ChangeDetectorRef,
              private translateService: TranslateService) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this._cdr.detectChanges();
      }
    );
    this.translateService.onLangChange.subscribe(
      newLang => {
        this.currentLang = newLang.lang;
        this.isCollapseLanguageSwitcher = true;
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

  toggleLanguageSwitcher($event) {
    $event.stopPropagation();
    $event.preventDefault();

    this.isCollapseLanguageSwitcher = !this.isCollapseLanguageSwitcher;
    this._cdr.detectChanges();
  }

  selectLang(lang: string, $event) {
    $event.stopPropagation();
    $event.preventDefault();

    this.translateService.use(lang);
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
    this._cdr.detectChanges();
  }

}
