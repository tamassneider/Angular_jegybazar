import { Component } from '@angular/core';
import {UserService} from './shared/user.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: ReplaySubject<boolean>;

  constructor(userService: UserService) {
    this.isLoggedIn$ = userService.isLoggedIn$;
  }

}
