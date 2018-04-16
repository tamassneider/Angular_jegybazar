import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {EventComponent} from './event/event.component';
import {TicketComponent} from './ticket/ticket.component';
import {AboutComponent} from './about/about.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventDetailComponent} from './event/event-detail/event-detail.component';
import {ProfileComponent} from './user/profile/profile.component';
import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {TicketsTableComponent} from './ticket/tickets-table/tickets-table.component';
import {TicketDetailComponent} from './ticket/ticket-detail/ticket-detail.component';
import {LicitComponent} from './ticket/licit/licit.component';
import {LoggedInGuard} from './shared/logged-in.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', loadChildren: 'app/event/event.module#EventModule'},
  {
    path: 'ticket', component: TicketComponent,
    children: [
      {path: 'table', component: TicketsTableComponent},
      {path: 'new', component: TicketDetailComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: LicitComponent}
    ]
  },
  {path: 'about', loadChildren: 'app/about/about.module#AboutModule'},
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent, canActivate: [LoggedInGuard]},
      {path: 'edit', component: ProfileEditComponent, canActivate: [LoggedInGuard]},
      {path: 'login', component: SignInComponent},
      {path: 'register', component: ProfileEditComponent},
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
    LicitComponent,
    AboutComponent,
    SignInComponent,
    ProfileComponent,
    ProfileEditComponent
  ];
}
