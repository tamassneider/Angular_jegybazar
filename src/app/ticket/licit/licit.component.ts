import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-licit',
  templateUrl: './licit.component.html',
  styleUrls: ['./licit.component.css']
})
export class LicitComponent implements OnInit {
  ticket: TicketModel;

  constructor( private _ticketService: TicketService) { }

  ngOnInit() {
    const id = '-Ky0HolLJBH3Q5uVHWZf';
    this._ticketService.getOne(id).subscribe(
      ticket => this.ticket = ticket
    );
    console.log(this.ticket)
  }

  onBidWithBidStep() {
    alert('Megnyomtak a gombot');
  }

}
