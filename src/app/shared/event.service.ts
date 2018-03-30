import { Injectable } from '@angular/core';
import {EventModel} from './event-model';

@Injectable()
export class EventService {
  private _events: EventModel[];

  constructor() {
    this._events = [
      {
        'id': 1,
        'name': 'Sziget',
        'date': '2018-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 2,
        'name': 'Diótörő Balett',
        'date': '2018-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 3,
        'name': 'Sziget',
        'date': '2018-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 4,
        'name': 'Diótörő Balett',
        'date': '2018-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 5,
        'name': 'Sziget',
        'date': '2018-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 6,
        'name': 'Diótörő Balett',
        'date': '2018-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 7,
        'name': 'Sziget',
        'date': '2018-08-03',
        'pictureURL': 'assets/sziget.png',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 8,
        'name': 'Diótörő Balett',
        'date': '2018-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Lorem ipsum dolor sit amet.'
      },
      {
        'id': 9,
        'name': 'Diótörő Balett',
        'date': '2018-11-23',
        'pictureURL': 'assets/diotoro.jpg',
        'description': 'Lorem ipsum dolor sit amet.'
      }
    ];
  }

  getAllEvents(): EventModel[] {
    return this._events;
  }
}
