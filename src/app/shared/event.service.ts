import { Injectable } from '@angular/core';
import {EventModel} from './event-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventService {
  private _events: EventModel[];

  constructor(private _http: HttpClient) {
    this._events = this.getMockData ();
  }

  getMockData() {
    return [
      new EventModel(
    {
      'id': 1,
      'name': 'Sziget',
      'date': '2018-08-03',
      'pictureURL': 'assets/sziget.png',
      'description': 'Lorem ipsum dolor sit amet.'
    }),
      new EventModel(
    {
      'id': 2,
      'name': 'Diótörő Balett',
      'date': '2018-11-23',
      'pictureURL': 'assets/diotoro.jpg',
      'description': 'Lorem ipsum dolor sit amet.'
    }),
    {
      'id': 3,
      'name': 'Sziget',
      'date': '2018-08-03',
      'pictureURL': 'assets/sziget.png',
      'description': 'Lorem ipsum dolor sit amet.'
    },
      new EventModel(
    {
      'id': 4,
      'name': 'Diótörő Balett',
      'date': '2018-11-23',
      'pictureURL': 'assets/diotoro.jpg',
      'description': 'Lorem ipsum dolor sit amet.'
    }),
      new EventModel(
    {
      'id': 5,
      'name': 'Sziget',
      'date': '2018-08-03',
      'pictureURL': 'assets/sziget.png',
      'description': 'Lorem ipsum dolor sit amet.'
    }),
      new EventModel(
    {
      'id': 6,
      'name': 'Diótörő Balett',
      'date': '2018-11-23',
      'pictureURL': 'assets/diotoro.jpg',
      'description': 'Lorem ipsum dolor sit amet.'
    }),
      new EventModel(
    {
      'id': 7,
      'name': 'Sziget',
      'date': '2018-08-03',
      'pictureURL': 'assets/sziget.png',
      'description': 'Lorem ipsum dolor sit amet.'
    }),
      new EventModel(
    {
      'id': 8,
      'name': 'Diótörő Balett',
      'date': '2018-11-23',
      'pictureURL': 'assets/diotoro.jpg',
      'description': 'Lorem ipsum dolor sit amet.'
    }),
      new EventModel(
    {
      'id': 9,
      'name': 'Diótörő Balett',
      'date': '2018-11-23',
      'pictureURL': 'assets/diotoro.jpg',
      'description': 'Lorem ipsum dolor sit amet.'
    })];
  }

  getAllEvents(): Observable<EventModel[]> {
    return this._http.get<EventModel[]>(`${environment.firebase.baseUrl}/events.json`)
    .map(data => Object.values(data));
  }
  getEventById(id: number) {
    // const ev = this._events.filter( x => x.id === +id);
    // return ev.length > 0 ? ev[0] : new EventModel(EventModel.emptyEvent);
  }
  update(param: EventModel) {
    // this._events = this._events
    //   .map( ev => ev.id === param.id ? {...param} : ev);
  }
  create(param: EventModel) {
    // this._events = [
    //   ...this._events,
    //   {
    //     id: this._getMaxId(),
    //     ...param
    //   }
    // ];
  }

  private _getMaxId() {
    return this._events.reduce((x, y) => x.id > y.id ? x : y).id + 1
  }
}
