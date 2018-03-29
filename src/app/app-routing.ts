import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {EventComponent} from './event/event.component';
import {TicketComponent} from './ticket/ticket.component';
import {AboutComponent} from './about/about.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {RegisterComponent} from './user/register/register.component';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventDetailComponent} from './event/event-detail/event-detail.component';
import {ProfileComponent} from './user/profile/profile.component';
import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {TicketsTableComponent} from './ticket/tickets-table/tickets-table.component';
import {TicketDetailComponent} from './ticket/ticket-detail/ticket-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'event', component: EventComponent,
    children: [
      {path: 'list', component: EventListComponent},
      {path: 'new', component: EventDetailComponent},
      {path: ':id', component: EventDetailComponent},
    ],
  },
  {
    path: 'ticket', component: TicketComponent,
    children: [
      {path: 'table', component: TicketsTableComponent},
      {path: 'new', component: TicketDetailComponent},
      {path: ':id/bid', component: TicketDetailComponent}
    ]
  },
  {path: 'about', component: AboutComponent},
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent},
      {path: 'edit', component: ProfileEditComponent},
      {path: 'login', component: SignInComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
  static routableComponent = [
    HomeComponent,
    PageNotFoundComponent,
    EventComponent,
    EventDetailComponent,
    EventListComponent,
    TicketComponent,
    TicketDetailComponent,
    TicketsTableComponent,
    AboutComponent,
    SignInComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditComponent
  ];
}
