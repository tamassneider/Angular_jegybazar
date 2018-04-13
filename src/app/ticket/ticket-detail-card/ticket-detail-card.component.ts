import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-ticket-detail-card',
  templateUrl: './ticket-detail-card.component.html',
  styleUrls: ['./ticket-detail-card.component.css']
})
export class TicketDetailCardComponent implements AfterViewInit, OnChanges {
  @Input() ticket: TicketModel;
  @Input() loading = false;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading'] != null
    && changes['loading'].currentValue !== changes['loading'].previousValue) {
      this._cdr.detectChanges();
    } else if (changes['ticket'] != null
    && !changes['ticket'].isFirstChange()) {
      const prev: TicketModel = changes['ticket'].previousValue;
      const current: TicketModel = changes['ticket'].currentValue;

      if (prev == null || current == null) {
        this._cdr.detectChanges();
      } else if ( prev.seller.name !== current.seller.name) {
        this._cdr.detectChanges();
      } else if ( prev.numberOfTickets !== current.numberOfTickets) {
        this._cdr.detectChanges();
      } else if ( prev.bidEndDate !== current.bidEndDate) {
        this._cdr.detectChanges();
      } else if ( prev.details !== current.details) {
        this._cdr.detectChanges();
      }
    }
  }

}
