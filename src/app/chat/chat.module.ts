import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatService} from './chat.service';
import {UserService} from '../shared/user.service';
import {MockChatService} from './mock-chat.service';
import {environment} from '../../environments/environment';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import {ReactiveFormsModule} from '@angular/forms';

export const chatServiceProvideFactoryFn =
  (userService: UserService) => {
    return environment.production ?
      new ChatService(userService) :
      new MockChatService(userService);
  };

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChatWindowComponent
  ],
  exports: [
    ChatWindowComponent
  ]
})
export class ChatModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChatModule,
      providers: [
        {
          provide: ChatService,
          useFactory: chatServiceProvideFactoryFn,
          deps: [UserService]
        }
        ]
    };
  }
}
