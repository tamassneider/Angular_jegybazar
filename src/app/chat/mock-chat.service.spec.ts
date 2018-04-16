import { TestBed, inject } from '@angular/core/testing';

import { MockChatService } from './mock-chat.service';

describe('MockChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockChatService]
    });
  });

  it('should be created', inject([MockChatService], (service: MockChatService) => {
    expect(service).toBeTruthy();
  }));
});
