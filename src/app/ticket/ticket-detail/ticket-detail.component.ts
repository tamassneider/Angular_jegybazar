import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {EventService} from '../../shared/event.service';
import {TicketModel} from '../../shared/ticket-model';
import {EventModel} from '../../shared/event-model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: TicketModel;
  events: EventModel[];

  constructor(private _router: Router,
              private _ticketService: TicketService,
              private _userService: UserService,
              private _eventService: EventService) { }

  ngOnInit() {
    this.ticket = new TicketModel(TicketModel.emptyTicket);
    this.ticket.sellerUserId = this._userService.getCurrentUser().id;
//    this.events = this._eventService.getAllEvents();
  }

  onSubmit() {
    console.log(this.ticket);
    this._ticketService.create(this.ticket);
    this._router.navigate(['/ticket/table']);
  }

}
