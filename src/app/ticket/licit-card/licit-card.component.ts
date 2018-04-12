import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-licit-card',
  templateUrl: './licit-card.component.html',
  styleUrls: ['./licit-card.component.css']
})
export class LicitCardComponent implements OnChanges  {
  @Input() ticket: TicketModel;
  @Input() isLoggedIn: boolean;
  @Output() bid = new EventEmitter<void>();
  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes ['ticket'] != null
      && !changes['ticket'].isFirstChange()
      && changes['ticket'].currentValue != null) {
      this.loading = false;
    }
  }

  onBidWithBidStep() {
    this.loading = true
    this.bid.emit();
  }

}
