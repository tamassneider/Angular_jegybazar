import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { CardComponent } from './card/card.component';
import { AboutComponent } from './about/about.component';
import { TicketsTableComponent } from './tickets-table/tickets-table.component';
import { EventListComponent } from './event-list/event-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { LicitComponent } from './licit/licit.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing';
import { EventComponent } from './event/event.component';
import { TicketComponent } from './ticket/ticket.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { EventCardComponent } from './event-card/event-card.component';


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
    NewTicketComponent,
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
