import { Injectable } from '@angular/core';
import {TicketModel} from './ticket-model';
import {EventService} from './event.service';
import {UserService} from './user.service';

@Injectable()
export class TicketService {
  private _tickets: TicketModel[];

  constructor(private _eventService: EventService,
              private _userService: UserService) {
    this._tickets = [
      new TicketModel({
        'id': 1,
        'date': '2019-05-02',
        'numberOfTickets': 5,
        'minimalBidPrice': 2000,
        'bidStep': 500,
        'eventId': 1,
        'sellerUserId': 1
      }),
      new TicketModel({
        'id': 2,
        'date': '2019-10-12',
        'numberOfTickets': 4,
        'minimalBidPrice': 4000,
        'bidStep': 1000,
        'eventId': 1,
        'sellerUserId': 2
      }),
      new TicketModel({
        'id': 6,
        'date': '2019-11-06',
        'numberOfTickets': 1,
        'minimalBidPrice': 15000,
        'bidStep': 1500,
        'eventId': 2,
        'sellerUserId': 3
      })
    ];
  }

  getAllTickets() {
    // return this._tickets.map(ticket => {
    //   return {
    //     ...ticket,
    //     event: this._eventService.getEventById(ticket.eventId),
    //     seller: this._userService.getUserById(ticket.sellerUserId)
    //   };
    // });
  }

  getEventNameById(id: number) {
    // return this._eventService.getEventById(id).name;
  }
  getTicketById(id: number) {
    const tic = this._tickets.filter( (x) => x.id === id);
    return tic.length;
  }
  create(param: TicketModel) {
    // this._tickets = [
    //   ...this._tickets,
    //     new TicketModel ({
    //       id: this._getMaxId(),
    //       ...param,
    //       event: this._eventService.getEventById(param.eventId),
    //       seller: this._userService.getUserById(param.sellerUserId)
    //     })
    // ];
    // console.log(this._tickets);
  }

  private _getMaxId() {
    return this._tickets.reduce((x, y) => x.id > y.id ? x : y).id + 1;
  }
}
