import { Component, OnInit } from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  public eventsGrouppedBy3: EventModel[];
  public events$: Observable<EventModel[]>
  public events: EventModel[];
  public eventsGrouppedBy3$: Observable<EventModel[]>;

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
      .map(data => {
        return data.reduce((acc, curr: EventModel, ind: number) => {
            if (ind % 3 === 0) {
              acc.push([]);
            }
            acc[acc.length - 1].push(curr);
            return acc;
          }, []);
      });

    // // [0,1,2,3,4,5,6,7,8] -- reduce --> [[0,1,2],[3,4,5],[6,7,8]]
    // this.eventsGrouppedBy3 = this._eventService.getAllEvents()
    //   .reduce((acc, curr: EventModel, ind: number) => {
    //     if (ind % 3 === 0) {
    //       acc.push([]);
    //     }
    //     acc[acc.length - 1].push(curr);
    //     return acc;
    //   }, []);
    // console.log(this.eventsGrouppedBy3);
  }

}
