import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import {EventComponent} from './event.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {EventCardComponent} from './event-card/event-card.component';
import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap';
import {EventcardModule} from './event-card/eventcard.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    AlertModule,
    EventcardModule
  ],
  declarations: [
    EventComponent,
    EventListComponent,
    EventDetailComponent,
  ],
})
export class EventModule { }
