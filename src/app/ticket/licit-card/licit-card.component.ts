import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-licit-card',
  templateUrl: './licit-card.component.html',
  styleUrls: ['./licit-card.component.css']
})
export class LicitCardComponent {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: boolean;
  @Output() refreshTicket = new EventEmitter<void>();
  @Input() loading = false;

  onBidWithBidStep() {
    this.refreshTicket.emit();
  }

}
