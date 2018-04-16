import { Injectable } from '@angular/core';
import {ChatService} from './chat.service';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from './model/chat.model';
import {UserService} from '../shared/user.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import * as moment from 'moment';

export const MockChatData = {
  mockRoomId: '-Ky0HolLJBH3Q5uVHWZf',
  mockUserId: '6qMPlofDmGUruFkR6uZVHHEXKp53',
  mockUserName: 'ST hejhaj hajhaj',
  mockUserPictureUrl: 'assets/macskak.jpg',
  created: +moment().unix()
};

@Injectable()
export class MockChatService extends ChatService {

  private rooms$ = new BehaviorSubject<BehaviorSubject<ChatMessageModel[]>[]>([]);

  constructor(userService: UserService) {
    super(userService);
    // fill mock messages
    const mockMessages = [];
    for (let i = 0; i < 10; i++) {
      mockMessages.push({
        $id: null,
        msg: `Test message: ${i}`,
        userId: MockChatData.mockUserId,
        userName: MockChatData.mockUserName,
        userPictureUrl: MockChatData.mockUserPictureUrl,
        created: +moment().unix()
      });
    }
    const currentRooms = this.rooms$.getValue();
    currentRooms[MockChatData.mockRoomId] = new BehaviorSubject<ChatMessageModel[]>(mockMessages);
    this.rooms$.next(currentRooms);
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
              userId: MockChatData.mockUserId,
              userName: MockChatData.mockUserName,
              userPictureUrl: MockChatData.mockUserPictureUrl,
              created: +moment().unix()
            })
          );
          rooms[roomId].next(roomMessages);
          return Observable.of(true);
        }
      );

  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    const rooms = this.rooms$.getValue();
    if (rooms[roomId] == null) {
      // First init room
      rooms[roomId] = new BehaviorSubject<ChatMessageModel[]>([]);
      this.rooms$.next(rooms);
    }
    return rooms[roomId].asObservable();
  }
}
