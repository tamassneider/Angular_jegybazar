import { Component } from '@angular/core';
import {UserService} from './shared/user.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: ReplaySubject<boolean>;
  translateVariable = {variableValue: 'valtozo szoveg'};

  constructor(userService: UserService) {
    this.isLoggedIn$ = userService.isLoggedIn$;
  }

}
