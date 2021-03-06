import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {EventService} from '../../event/event.service';
import {TicketModel} from '../../shared/ticket-model';
import {EventModel} from '../../shared/event-model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit, OnDestroy {
  ticket: TicketModel;
  events: Observable<EventModel[]>;

  private _subs: Subscription

  constructor(private _router: Router,
              private _ticketService: TicketService,
              private _userService: UserService,
              private _eventService: EventService) { }

  ngOnInit() {
    this.ticket = new TicketModel;
    this.ticket.eventId = '';
    this._userService.getCurrentUser()
      .subscribe( user => this.ticket.sellerUserId = user.id);
     this.events = this._eventService.getAllEvents();
    this._eventService.getAllEvents().subscribe(val => console.log(val))
  }

  ngOnDestroy() {
     if (this._subs) {this._subs.unsubscribe();}
  }

  onSubmit() {
    console.log(this.ticket);
    this._subs = this._ticketService.create(this.ticket)
      .subscribe(newTicketId => this._router.navigate(['/ticket/table']));
  }

}
