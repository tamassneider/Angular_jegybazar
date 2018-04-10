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
  @Output() bid = new EventEmitter<void>();
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
              bidMinimumValidator(() => {return this.ticket; } )
            ]
          )
        ]
      }
    );
  }

  onBidWithBidStep() {
    this.toBid(this.ticket.currentBid + this.ticket.bidStep)
      .subscribe(
        () => {
          this.submitSuccessAlert = true;
          this.bid.emit();
        },
        err => {
          this.submitErrorAlert = true;
          console.warn(err);
        }
      );
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
      this.toBid(this.form.value['bid'])
        .subscribe(
          () => {
            this.submitted = false;
            this.form.reset({bid: null});
            this.submitSuccessAlert = true;
            this.bid.emit();
          },
          err => {
            this.submitErrorAlert = true;
            console.warn(err);
          }
        );
      console.log(this.submitted);
    }
  }

  toBid(value: number) {
    return this._bidService.bid(this.ticket.id, value);
  }

}
