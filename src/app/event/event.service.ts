import { Injectable } from '@angular/core';
import {EventModel} from '../shared/event-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/observable/fromPromise';
import * as firebase from 'firebase';
import Reference = firebase.database.Reference;

@Injectable()
export class EventService {
  // private _events: EventModel[];

  constructor(private _afDb: AngularFireDatabase) {

  }

  getAllEvents(): Observable<EventModel[]> {
    return this._afDb.list<EventModel>(`events`).valueChanges()
  }
  getEventById(id: string) {
    return this._afDb.object<EventModel>(`events/${id}`).valueChanges()
  }

  save(param: EventModel) {
    if (param.id) {
      return Observable.fromPromise(this._afDb
        .object(`events/${param.id}`).update(param));
    } else {
      return Observable.fromPromise(this._afDb
        .object(`events/${param.id}`).set(param));
    }
  }

  delete(param: EventModel) {
    return Observable.fromPromise (this._afDb
      .object(`events/${param.id}`).remove());
  }

  addTicket(eventId: string, ticketId: string): Observable<Reference> {
    return Observable.fromPromise(this._afDb.list(`events/${eventId}/tickets`)
      .push(ticketId));
  }

//   private _getMaxId() {
//     return this._events.reduce((x, y) => x.id > y.id ? x : y).id + 1
//   }
 }
