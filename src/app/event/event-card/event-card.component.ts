import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {EventModel} from '../../shared/event-model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements AfterViewInit, OnChanges {
  @Input () esemeny: EventModel
  @Input () nextLabel = 'Tovább';
  constructor(private _cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this._cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nextLabel'] != null
      && changes ['nextLabel'].isFirstChange()) {
      this._cdr.detectChanges();
    } else if (changes['esemeny'] != null) {
      const prev: EventModel = changes['esemeny'].previousValue;
      const current: EventModel = changes['esemeny'].currentValue;

      if (prev == null || current == null) {
        this._cdr.detectChanges();
      } else if (prev.pictureURL !== current.pictureURL) {
        this._cdr.detectChanges();
      } else if (prev.name !== current.name) {
        this._cdr.detectChanges();
      } else if (prev.date !== current.date) {
        this._cdr.detectChanges();
      } else if (prev.description !== current.description) {
        this._cdr.detectChanges();
      } else if (prev.id !== current.id) {
        this._cdr.detectChanges();
      }
    }
  }

}
