import { Injectable } from '@angular/core';
import {ChatService} from './chat.service';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from './model/chat.model';
import {UserService} from '../shared/user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class MockChatService extends ChatService {

  private rooms$ = new BehaviorSubject<BehaviorSubject<ChatMessageModel[]>[]>([]);

  constructor(userService: UserService) {
    super(userService);
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    const rooms = this.rooms$.getValue();
    const roomMessages = rooms[roomId].getValue();

    return this._userService.getCurrentUser()
      .delay(300)
      .switchMap(
        user => {
          roomMessages.push(
            new ChatMessageModel({
              $id: null,
              'msg': msg,
              userId: user.id,
              userName: user.name,
              userPictureUrl: user.profilePictureUrl
            })
          );
          rooms[roomId].next(roomMessages);
          return Observable.of(true);
        }
      );

  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    const rooms = this.rooms$.getValue();
    if(rooms[roomId] == null) {
      // First init room
      rooms[roomId] = new BehaviorSubject<ChatMessageModel[]>([]);
      this.rooms$.next(rooms);
    }
    return rooms[roomId].asObservable();
  }
}
