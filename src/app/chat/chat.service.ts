import {Injectable, Optional} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from './model/chat.model';
import {AngularFireDatabase} from 'angularfire2/database';
import * as moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {ChatFriendModel} from './model/chat-friend.model';
import {ChatCallModel} from './model/chat-call.model';

@Injectable()
export class ChatService {
  private static  PATH = 'chat';
  public currentUserId: string;

  constructor(protected _userService: UserService,
              @Optional() protected afDb?: AngularFireDatabase) { }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    return this._userService.getCurrentUser()
      .switchMap(
        user => {
          return new Observable<boolean>(
            observer => {
              const room = this.afDb.list(`${ChatService.PATH}/${roomId}`);
              room.push(
                new ChatMessageModel(
                  {
                    $id: null,
                    'msg': msg,
                    userId: user.id,
                    userName: user.name,
                    userPictureUrl: user.profilePictureUrl,
                    created: moment().unix()
                  }
                )
              ). then (
                () => {
                  observer.next(true);
                  observer.complete();
                },
                error => {
                  observer.next(false);
                  observer.error(error);
                  observer.complete();
                }
              );
            }
          );
        }
      );
  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    return this.afDb.list(`${ChatService.PATH}/${roomId}`)
      .valueChanges()
      .map(
        list => Object.values(list)
          .map(
            chatMessage =>
              new ChatMessageModel(Object.assign(chatMessage, {
                $id: '',
                msg: chatMessage['msg'],
                userId: chatMessage['userId'],
                userName: chatMessage['userName'],
                userPictureUrl: chatMessage['userPictureUrl'],
                created: chatMessage['created']
              }))
          )
      );
  }

  getMyFriendList(): Observable<ChatFriendModel[]> {
    return this._userService.getCurrentUser()
      .first()
      .switchMap(
        user => {
          return this.afDb.list<ChatFriendModel>(`chat_friend_list/${user.id}`).valueChanges();
        }
      );
  }

  addChatWait(roomId: string, friend: ChatFriendModel) {
    this._userService.getCurrentUser().first().
      subscribe (
        user => {
          this.afDb.object(`chat_wait/${friend.$id}/${user.id}`)
            .set({
              'roomId': roomId,
              'friend': new ChatFriendModel({
                $id: user.id,
                name: user.name,
                profilePictureUrl: user.profilePictureUrl})
            });
        }
    );
  }

  getChatCallWatcher() {
    this._userService.getCurrentUser().first().subscribe(user => this.currentUserId = user.id)
    return this.afDb.list(`chat_wait/${this.currentUserId}`).valueChanges()
       .map(
         calls => Object.values(calls)
            .map(
                call =>
                  new ChatCallModel({
                    $id: '',
                    roomId: call.roomId,
                    friend: new ChatFriendModel(
                     {
                       $id: '',
                       name: '',
                       profilePictureUrl: ''
                     }
                   )
                 })
              )
           );
  }

}
