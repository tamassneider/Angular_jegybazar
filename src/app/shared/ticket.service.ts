import {Injectable} from '@angular/core';
import {TicketModel} from './ticket-model';
import {EventService} from '../event/event.service';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {EventModel} from './event-model';
import {UserModel} from './user-model';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import * as firebase from 'firebase';
import 'rxjs/add/operator/first';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/observable/fromPromise';


@Injectable()
export class TicketService {
  private _tickets: Observable<TicketModel[]>;

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private _afDb: AngularFireDatabase) {
  }

  getAllTickets() {
    return this._afDb.list<TicketModel>(`tickets`).valueChanges()
      .map(ticketsArray => ticketsArray.map(tm =>
        Observable.zip(
          Observable.of(tm),
          this._eventService.getEventById(tm.eventId),
          this._userService.getUserById(tm.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return {
              ...t,
              event: e,
              seller: u
            };
          }
        )))
      .switchMap(zipStremArray => Observable.forkJoin(zipStremArray));
  }

  create(param: TicketModel) {
    return Observable.fromPromise (this._afDb.list('tickets').push(param))
      .map(
        resp => resp.key
      )
      .do(
        key => Observable.combineLatest(
          this._eventService.addTicket(param.eventId, key),
          this._userService.addTicket(key)
        )
      );
  }

  // private _saveGeneratedId(ticketId: string): Observable<string> {
  //   return this._http.patch<{ id: string }>(
  //     `${environment.firebase.baseUrl}/tickets/${ticketId}.json`,
  //     {id: ticketId}
  //   )
  //     .map(x => x.id);
  // }

  getOneOnce(id: string): Observable<TicketModel> {
    return this.getOne(id).first();
  }

  getOne(id: string): Observable<TicketModel> {
    return this._afDb.object<TicketModel>(`tickets/${id}`).valueChanges()
      .flatMap(
        ticketFireBaseRemoteModel => {
          return Observable.combineLatest(
            Observable.of(new TicketModel(ticketFireBaseRemoteModel)),
            this._eventService.getEventById(ticketFireBaseRemoteModel.eventId),
            this._userService.getUserById(ticketFireBaseRemoteModel.sellerUserId),
            (t: TicketModel, e: EventModel, u: UserModel) => {
              return t.setEvent(e).setSeller(u);
            });
        }
      );
  }

  modify(ticket: TicketModel) {
    return Observable.fromPromise(this._afDb
      .object(`tickets/${ticket.id}`).update(ticket));
  }

  // private _getMaxId() {
  //   return this._tickets.reduce((x, y) => x.id > y.id ? x : y).id + 1;
  // }

}
