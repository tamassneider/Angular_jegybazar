import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {TicketModel} from '../../shared/ticket-model';
import {EventService} from '../../event/event.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-tickets-table',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsTableComponent implements OnInit, AfterViewInit{
  public tickets; // : Observable<TicketModel[]>;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null)

  constructor(private _ticketService: TicketService,
              public userService: UserService,
              private _eventService: EventService) { }

  ngOnInit() {
    this.tickets = this._ticketService.getAllTickets()
      .flatMap(
        tickets => {
          return this.filteredText$
            .map( filtertext => {
              if (filtertext === null) {
                return tickets;
              } else {
                return tickets.filter(
                  ticket => {
                    return ticket.event.name.toLowerCase().indexOf(filtertext.toLowerCase()) > -1;
                  }
                );
              }
            }
          );
        }
    );
  }

  ngAfterViewInit(): void {
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .map(
        (event: Event) => (event.srcElement as HTMLInputElement).value
      )
      .distinctUntilChanged()
      .subscribe(
        text => {
          if (text.length === 0) {
            text = null;
          }
          this.filteredText$.next(text);
        }
      )
  }

}
