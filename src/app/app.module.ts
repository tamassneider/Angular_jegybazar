import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { JumbotronComponent } from './core/jumbotron/jumbotron.component';
import { CardComponent } from './home/card/card.component';
import { AboutComponent } from './about/about.component';
import { TicketsTableComponent } from './ticket/tickets-table/tickets-table.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { RegisterComponent } from './user/register/register.component';
import { LicitComponent } from './ticket/licit/licit.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing';
import { EventComponent } from './event/event.component';
import { TicketComponent } from './ticket/ticket.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { TicketDetailComponent } from './ticket/ticket-detail/ticket-detail.component';
import { EventCardComponent } from './event/event-card/event-card.component';
import {EventService} from './shared/event.service';
import {UserService} from './shared/user.service';
import {AlertModule} from 'ngx-bootstrap';
import {TicketService} from './shared/ticket.service';
import {LoggedInGuard} from './shared/logged-in.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    JumbotronComponent,
    CardComponent,
    AboutComponent,
    TicketsTableComponent,
    EventListComponent,
    SignInComponent,
    RegisterComponent,
    LicitComponent,
    ProfileComponent,
    ProfileEditComponent,
    PageNotFoundComponent,
    HomeComponent,
    ...AppRoutingModule.routableComponent,
    EventComponent,
    TicketComponent,
    EventDetailComponent,
    TicketDetailComponent,
    EventCardComponent,
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule
  ],
  providers: [EventService, UserService, TicketService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
