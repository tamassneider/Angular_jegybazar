import {Component, Input} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-ticket-detail-card',
  templateUrl: './ticket-detail-card.component.html',
  styleUrls: ['./ticket-detail-card.component.css']
})
export class TicketDetailCardComponent  {
  @Input() ticket: TicketModel;

}
