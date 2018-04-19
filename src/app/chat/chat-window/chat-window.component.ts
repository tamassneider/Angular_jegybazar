import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/distinctUntilChanged';
import {environment} from '../../../environments/environment';
import {MockChatData} from '../mock-chat.service';
import {ChatMessageModel} from '../model/chat.model';
import {Observable} from 'rxjs/Observable';
import {ChatService} from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input() id: string;
  @Input() roomId; // = environment.production ? null : MockChatData.mockRoomId;
  @Input() title: string;
  @Input() closeable = false;
  @Output() close = new EventEmitter<void>();
  @Input() @HostBinding('class.floating') floating = true;

  resetForm = false;
  chatMessage$: Observable<ChatMessageModel[]>;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScroll = false;
  collapseBody: boolean;
  @HostBinding('style.height') height = '100%';

  constructor(private _chatService: ChatService) {
  }

  ngOnInit() {
    this.chatMessage$ = this._chatService.getRoomMessages(this.roomId);
    this.chatMessage$.first().subscribe(
      () => {
        this.shouldScroll = true;
        this.ngAfterViewChecked();
      }
    );
  }

  onNewMessage(newMessage: string) {
    this._chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.shouldScroll = true;
            this.resetForm = true;
          } else {
            alert ('Hiba a chat üzenet elküldésében');
          }
        }
      );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.cardBody.nativeElement
        .scrollTo(0, this.cardBody.nativeElement.scrollHeight);
      this.shouldScroll = false;
    }

  }

  collapseChat() {
    this.collapseBody = !this.collapseBody;
    if (this.collapseBody) {
      this.height = null;
    } else {
      this.height = '100%';
    }
  }

  closeWindow() {
    this.close.emit();
  }
}
