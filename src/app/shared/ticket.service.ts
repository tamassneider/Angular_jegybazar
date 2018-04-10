import {Injectable} from '@angular/core';
import {TicketModel} from './ticket-model';
import {EventService} from './event.service';
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


@Injectable()
export class TicketService {
  private _tickets: Observable<TicketModel[]>;

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private _http: HttpClient) {
  }

  getAllTickets() {
    return this._http.get(`${environment.firebase.baseUrl}/tickets.json`)
      .map(ticketObject => Object.values(ticketObject))
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
    return this._http
      .post<{ name: string }>(`${environment.firebase.baseUrl}/tickets.json`, param)
      .map(fbPostReturn => fbPostReturn.name)
      .switchMap(ticketId => this._saveGeneratedId(ticketId))
      .switchMap(ticketId => this._eventService.addTicket(param.eventId, ticketId))
      .switchMap(ticketId => this._userService.addTicket(ticketId));
  }

  private _saveGeneratedId(ticketId: string): Observable<string> {
    return this._http.patch<{ id: string }>(
      `${environment.firebase.baseUrl}/tickets/${ticketId}.json`,
      {id: ticketId}
    )
      .map(x => x.id);
  }

  getOne(id: string): Observable<TicketModel> {
    return this._http.get<TicketModel>(`${environment.firebase.baseUrl}/tickets/${id}.json`)
      .flatMap(
        ticket => Observable.combineLatest(
          Observable.of(new TicketModel(ticket)),
          this._eventService.getEventById(ticket.eventId),
          this._userService.getUserById(ticket.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return {
              ...t,
              event: e,
              seller: u
            };
          }
        )
      );
  }

  modify(ticket: TicketModel) {
    return this._http
      .put(`${environment.firebase.baseUrl}/tickets/${ticket.id}.json`, ticket);
  }

  // private _getMaxId() {
  //   return this._tickets.reduce((x, y) => x.id > y.id ? x : y).id + 1;
  // }

}
