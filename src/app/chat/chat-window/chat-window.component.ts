import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-chat-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  form: FormGroup;
  invalidChatMessageInput = false;
  @ViewChild('chatMessageInput') chatMessageInput: ElementRef;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      'chat-message': [null, Validators.required]
    });

    this.form.get('chat-message')
      .valueChanges
      .distinctUntilChanged(
        msg => {
          return !(msg.length > 0 && this.invalidChatMessageInput);
        }
      )
      .skip(1)
      .subscribe(
        msg => this.invalidChatMessageInput = false
      );
  }

  sendMessage() {
    if (this.form.invalid) {
      this.invalidChatMessageInput = true;
    } else {
      console.log(this.form.get('chat-message'));
    }
    this.chatMessageInput.nativeElement.focus();
  }

}
