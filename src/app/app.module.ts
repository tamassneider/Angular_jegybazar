import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppComponent } from './app.component';
import { CardComponent } from './home/card/card.component';
import { TicketsTableComponent } from './ticket/tickets-table/tickets-table.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { LicitComponent } from './ticket/licit/licit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing';
import { TicketComponent } from './ticket/ticket.component';
import { TicketDetailComponent } from './ticket/ticket-detail/ticket-detail.component';
import {EventService} from './event/event.service';
import {UserService} from './shared/user.service';
import {AlertModule} from 'ngx-bootstrap';
import {TicketService} from './shared/ticket.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TicketDetailCardComponent } from './ticket/ticket-detail-card/ticket-detail-card.component';
import { LicitCardComponent } from './ticket/licit-card/licit-card.component';
import {MomentModule} from 'angular2-moment';
import 'moment/locale/hu';
import { BidFormComponent } from './ticket/bid-form/bid-form.component';
import {BidService} from './shared/bid.service';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';
import {EventcardModule} from './event/event-card/eventcard.module';
import {CoreModule} from './core/core.module';
import {EventModule} from './event/event.module';
import {ChatModule} from './chat/chat.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TicketsTableComponent,
    SignInComponent,
    LicitComponent,
    ProfileComponent,
    ProfileEditComponent,
    PageNotFoundComponent,
    HomeComponent,
    TicketComponent,
    TicketDetailComponent,
    TicketDetailCardComponent,
    LicitCardComponent,
    BidFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    EventcardModule,
    CoreModule,
    EventModule.forRoot(),
    ChatModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    UserService,
    TicketService,
    LoggedInGuard,
    BidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase);
  }
}
