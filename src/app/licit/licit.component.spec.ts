import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitComponent } from './licit.component';

describe('LicitComponent', () => {
  let component: LicitComponent;
  let fixture: ComponentFixture<LicitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
