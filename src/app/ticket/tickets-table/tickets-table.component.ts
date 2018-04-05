import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {TicketModel} from '../../shared/ticket-model';
import {EventService} from '../../shared/event.service';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css']
})
export class TicketsTableComponent implements OnInit {
  public tickets: TicketModel[];

  constructor(private _ticketService: TicketService,
              public userService: UserService,
              private _eventService: EventService) { }

  ngOnInit() {
  //  this.tickets = this._ticketService.getAllTickets();
    console.log(this.tickets);
  }

}
