import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {EventService} from '../../shared/event.service';
import {TicketModel} from '../../shared/ticket-model';
import {EventModel} from '../../shared/event-model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: TicketModel;
  events: Observable<EventModel[]>;

  private _subs: Subscription

  constructor(private _router: Router,
              private _ticketService: TicketService,
              private _userService: UserService,
              private _eventService: EventService) { }

  ngOnInit() {
    this.ticket = new TicketModel(TicketModel.emptyTicket);
    this.ticket.eventId = '';
    this.ticket.sellerUserId = this._userService.getCurrentUser().id;
    this.events = this._eventService.getAllEvents();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  onSubmit() {
    console.log(this.ticket);
    this._subs = this._ticketService.create(this.ticket)
      .subscribe(newTicketId => this._router.navigate(['/ticket/table']));
  }

}
