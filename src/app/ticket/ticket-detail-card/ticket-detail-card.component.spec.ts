import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailCardComponent } from './ticket-detail-card.component';

describe('TicketDetailCardComponent', () => {
  let component: TicketDetailCardComponent;
  let fixture: ComponentFixture<TicketDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
