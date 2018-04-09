import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-licit-card',
  templateUrl: './licit-card.component.html',
  styleUrls: ['./licit-card.component.css']
})
export class LicitCardComponent {
  @Input() ticket: TicketModel;
  @Output() bidWithBidStep = new EventEmitter<void>();

  onBidWithBidStep() {
    this.bidWithBidStep.emit();
  }
}
