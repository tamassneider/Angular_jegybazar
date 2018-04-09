import {EventModel} from './event-model';
import {UserModel} from './user-model';

export class TicketModel {
  id?: string;
  date: string;
  numberOfTickets: number;
  minimalBidPrice: number;
  bidStep: number;
  eventId: string;
  event?: EventModel;
  sellerUserId: string;
  seller?: UserModel;

  constructor(param?: TicketModel) {
      Object.assign(this, param);
  }

  static get emptyTicket(): TicketModel {
    return {
    date: '',
    numberOfTickets: 0,
    minimalBidPrice: 0,
    bidStep: 0,
    eventId: '',
    sellerUserId: ''
  };
  }
}
