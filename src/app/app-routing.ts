import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EventComponent} from './event/event.component';
import {TicketComponent} from './ticket/ticket.component';
import {AboutComponent} from './about/about.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {TicketsTableComponent} from './tickets-table/tickets-table.component';
import {TicketDetailComponent} from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'event', component: EventComponent,
    children: [
      {path: 'list', component: EventListComponent},
      {path: 'new', component: EventDetailComponent},
      {path: ':id/edit', component: EventDetailComponent},
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
  {path: 'login', component: SignInComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent},
      {path: 'edit', component: ProfileEditComponent}
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
