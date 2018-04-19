import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFriendRowComponent } from './chat-friend-row.component';

describe('ChatFriendRowComponent', () => {
  let component: ChatFriendRowComponent;
  let fixture: ComponentFixture<ChatFriendRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFriendRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFriendRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
