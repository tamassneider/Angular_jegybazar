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
  translateVariable = {variableValue: 'valtozo szoveg'};

  constructor(userService: UserService,
              translateService: TranslateService) {
    this.isLoggedIn$ = userService.isLoggedIn$;
    translateService.get('WITHVARIABLE', this.translateVariable)
      .subscribe(
        res => console.log('translate with variable: ', res)
      );

    translateService.get(['SIMPLE', 'WITHVARIABLE'], this.translateVariable)
      .subscribe(
        res => console.log('translate with variable: ', res)
      );
  }

}
