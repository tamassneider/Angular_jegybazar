import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../event.service';
import {EventModel} from '../../shared/event-model';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinctUntilChanged';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  // public eventsGrouppedBy3: EventModel[];
  // public events$: Observable<EventModel[]>
  // public events: EventModel[];
  public eventsGrouppedBy3$: Observable<EventModel[]>;
  private filteredText$ = new BehaviorSubject<string>(null);


  constructor(private _eventService: EventService,
              public userService: UserService) {
  }

  ngOnInit() {
    // basic would look the following:

    // this._eventService
    //   .getAllEvents()
    //   .subscribe( data => {
    // this.events = data,

    // grouping by 3 using subscribe:

    // this._eventService
    //   .getAllEvents()
    //   .subscribe( data => {
    //     this.eventsGrouppedBy3 = data.reduce((acc, curr: EventModel, ind: number) => {
    //       if (ind % 3 === 0) {
    //         acc.push([]);
    //       }
    //       acc[acc.length - 1].push(curr);
    //       return acc;
    //     }, []);

    // grouping by 3 using async:

    this.eventsGrouppedBy3$ = this._eventService.getAllEvents()
      .flatMap(
         events => {
          return this.filteredText$.map(
            filterText => {
              if (filterText === null) {
                return events;
              } else {
                return events.filter(
                  event => {
                    return event.name.toLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1;
                  }
                );
              }
            }
          );
       }
      )
      .map(data => {
        return data.reduce((acc, curr: EventModel, ind: number) => {
          if (ind % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        }, []);
      });
  }

  ngAfterViewInit(): void {
    console.log(this.searchInput);
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .delay(300)
      .map(
        (event: Event) => {
          return (event.srcElement as HTMLInputElement).value;
        }
      )
      .distinctUntilChanged()
      .subscribe(
        inputText => {
          if (inputText.length === 0) {
            inputText = null;
          }
          this.filteredText$.next(inputText);
        }

      );
  }

}
