import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {bidMinimumValidator} from './bid.validator';
import {BidService} from '../../shared/bid.service';

@Component({
  selector: 'app-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.css']
})
export class BidFormComponent implements OnInit{
  @Input() ticket: TicketModel;
  @Output() bidWithBidStep = new EventEmitter<void>();
  displayBidStep = true;
  form: FormGroup;
  submitted = false;
  submitSuccessAlert = false;
  submitErrorAlert = false;

  constructor( private _fb: FormBuilder,
               private _bidService: BidService) {}

  ngOnInit() {
    this.form = this._fb.group(
      {
        bid: [null, Validators.compose(
          [Validators.required,
            bidMinimumValidator(this.ticket.currentBid + this.ticket.bidStep)])
        ]
      }
    );
  }

  onBidWithBidStep() {
    this.bidWithBidStep.emit();
  }

  displayBidWithStep($event: Event) {
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit() {
    this.submitted = true;
    this.submitSuccessAlert = false;
    this.submitErrorAlert = false;
    if (this.form.valid) {
      this._bidService.bid(this.ticket.id, this.form.value['bid'])
        .subscribe(
          () => {
            this.submitted = false;
            this.form.reset({bid: null});
            this.submitSuccessAlert = true;
          },
          err => {
            this.submitErrorAlert = true;
            console.warn(err);
          }
        );
      console.log(this.submitted);
    }
  }

}
