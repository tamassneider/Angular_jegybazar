import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventCardComponent} from './event-card.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    EventCardComponent
  ],
  exports: [
    EventCardComponent
  ]
})
export class EventcardModule { }
