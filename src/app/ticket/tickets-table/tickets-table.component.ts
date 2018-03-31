import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css']
})
export class TicketsTableComponent implements OnInit {
  public tickets: TicketModel[];

  constructor(private _ticketService: TicketService,
              private _userService: UserService) { }

  ngOnInit() {
    this.tickets = this._ticketService.getAllTickets();
    console.log(this.tickets);
  }

}
