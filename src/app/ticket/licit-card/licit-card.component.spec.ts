import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitCardComponent } from './licit-card.component';

describe('LicitCardComponent', () => {
  let component: LicitCardComponent;
  let fixture: ComponentFixture<LicitCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
