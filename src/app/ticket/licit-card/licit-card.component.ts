import {Component, Input} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-licit-card',
  templateUrl: './licit-card.component.html',
  styleUrls: ['./licit-card.component.css']
})
export class LicitCardComponent {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: boolean;

  onBidWithBidStep() {
    alert('Megnyomtak a gombot');
  }

}
