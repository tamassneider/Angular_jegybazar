import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output, SimpleChanges
} from '@angular/core';
import {ChatFriendModel} from '../model/chat-friend.model';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-chat-friend-row',
  templateUrl: './chat-friend-row.component.html',
  styleUrls: ['./chat-friend-row.component.css']
})
export class ChatFriendRowComponent implements AfterViewInit, OnChanges {
  @Input() friend: ChatFriendModel;
  @Output() select = new EventEmitter<ChatFriendModel>();
  @HostBinding('class.clearfix') classClearFix = true;
  @HostBinding('class.text-muted') classTextMuted = true;
  @HostBinding('class.focused') classFocused = false;
  private focus$ = new Subject<boolean>();

  constructor(private _cdr: ChangeDetectorRef) {
    this.focus$
      .subscribe(
        value => {
          if (value !== this.classTextMuted) {
            this.classTextMuted = value;
            this.classFocused = !value;
          }
        }
      );
  }

  @HostListener('mouseover', ['$event'])
  onHostFocus($event) {
    $event.stopPropagation();
    $event.preventDefault();

    this.focus$.next(false);
  }

  @HostListener('mouseout', ['$event'])
  onHostBlur($event) {
    $event.stopPropagation();
    $event.preventDefault();

    this.focus$.next(true);
  }

  ngAfterViewInit(): void {
    this._cdr.detach();
  }

  @HostListener('click', ['$event'])
  onHostClick($event) {
    $event.stopPropagation();
    $event.preventDefault();

    this.select.emit(this.friend);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
