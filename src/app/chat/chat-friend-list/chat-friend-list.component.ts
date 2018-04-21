import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ChatFriendModel} from '../model/chat-friend.model';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-chat-friend-list',
  templateUrl: './chat-friend-list.component.html',
  styleUrls: ['./chat-friend-list.component.css']
})
export class ChatFriendListComponent implements OnInit {
  friendList$: Observable<ChatFriendModel[]>;
  @Output() select = new EventEmitter<ChatFriendModel>();

  constructor(private _chatService: ChatService) { }

  ngOnInit() {
    this.friendList$ =  this._chatService.getMyFriendList();
    this._chatService.getMyFriendList().subscribe(res => console.log(res))
  }

  onSelectFriend(friend: ChatFriendModel) {
    this.select.emit(friend);
  }
}
