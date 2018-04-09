import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-licit',
  templateUrl: './licit.component.html',
  styleUrls: ['./licit.component.css']
})
export class LicitComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;

  constructor( private _ticketService: TicketService,
               userService: UserService) {
    this.isLoggedIn = userService.isLoggedin;
  }

  ngOnInit() {
    const id = '-Ky0HolLJBH3Q5uVHWZf';
    this._ticketService.getOne(id).subscribe(
      ticket => this.ticket = ticket
    );
    console.log(this.ticket);
  }

}
