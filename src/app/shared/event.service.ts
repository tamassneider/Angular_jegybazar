import { Injectable } from '@angular/core';
import {EventModel} from './event-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class EventService {
  // private _events: EventModel[];

  constructor(private _http: HttpClient) {
   // this._events = this.getMockData ();
  }

  // getMockData() {
  //   return [
  //     new EventModel(
  //   {
  //     'id': 1,
  //     'name': 'Sziget',
  //     'date': '2018-08-03',
  //     'pictureURL': 'assets/sziget.png',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   }),
  //     new EventModel(
  //   {
  //     'id': 2,
  //     'name': 'Diótörő Balett',
  //     'date': '2018-11-23',
  //     'pictureURL': 'assets/diotoro.jpg',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   }),
  //   {
  //     'id': 3,
  //     'name': 'Sziget',
  //     'date': '2018-08-03',
  //     'pictureURL': 'assets/sziget.png',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   },
  //     new EventModel(
  //   {
  //     'id': 4,
  //     'name': 'Diótörő Balett',
  //     'date': '2018-11-23',
  //     'pictureURL': 'assets/diotoro.jpg',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   }),
  //     new EventModel(
  //   {
  //     'id': 5,
  //     'name': 'Sziget',
  //     'date': '2018-08-03',
  //     'pictureURL': 'assets/sziget.png',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   }),
  //     new EventModel(
  //   {
  //     'id': 6,
  //     'name': 'Diótörő Balett',
  //     'date': '2018-11-23',
  //     'pictureURL': 'assets/diotoro.jpg',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   }),
  //     new EventModel(
  //   {
  //     'id': 7,
  //     'name': 'Sziget',
  //     'date': '2018-08-03',
  //     'pictureURL': 'assets/sziget.png',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   }),
  //     new EventModel(
  //   {
  //     'id': 8,
  //     'name': 'Diótörő Balett',
  //     'date': '2018-11-23',
  //     'pictureURL': 'assets/diotoro.jpg',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   }),
  //     new EventModel(
  //   {
  //     'id': 9,
  //     'name': 'Diótörő Balett',
  //     'date': '2018-11-23',
  //     'pictureURL': 'assets/diotoro.jpg',
  //     'description': 'Lorem ipsum dolor sit amet.'
  //   })];
  // }

  getAllEvents(): Observable<EventModel[]> {
    return this._http.get<EventModel[]>(`${environment.firebase.baseUrl}/events.json`)
    .map(data => Object.values(data));
  }
  getEventById(id: string) {
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);
  }

  save(param: EventModel) {
    console.log(param);
  if (param.id)  { // update event
    return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`,param);
  } else { // create event
    return this._http.post(`${environment.firebase.baseUrl}/events.json`, param)
      .map((fbPostReturn: {name: string }) => fbPostReturn.name)
      .switchMap(fbId => this._http.patch(
        `${environment.firebase.baseUrl}/events/${fbId}.json`, {id: fbId}));
  }
  }

  delete(param: EventModel) {
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`)
  }

  addTicket(eventId: string, ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/events/${eventId}/tickets.json`,
      {[ticketId]: true}
    )
      .map(rel => Object.keys(rel)[0]);
  }

//   private _getMaxId() {
//     return this._events.reduce((x, y) => x.id > y.id ? x : y).id + 1
//   }
 }
