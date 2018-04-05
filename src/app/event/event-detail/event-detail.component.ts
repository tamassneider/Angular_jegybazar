import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../shared/event.service';
import {Location} from '@angular/common';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  editForm = false;

  constructor(private _route: ActivatedRoute,
              private _eventService: EventService,
              private _router: Router,
              private _location: Location,
              public userService: UserService) { }

  ngOnInit() {
    const evId = this._route.snapshot.params['id'];
    this.event = new EventModel(EventModel.emptyEvent);
     if (evId) {
       console.log('megvan az id');
       this._eventService.getEventById(evId)
         .subscribe(evm => this.event = evm);
       this.editForm = true;
     }

  }

  onSubmit(form) {
    if (this.event.id) {
      this._eventService.update(this.event);
      console.log('update');
    } else {
      this._eventService.create(this.event);
      console.log('create');
    }
    this._location.back();
  }
  navigateBack() {
    this._location.back();
  }

}
