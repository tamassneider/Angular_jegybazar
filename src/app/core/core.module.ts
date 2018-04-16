import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {NavbarItemComponent} from './navbar-item/navbar-item.component';
import {CollapseModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CollapseModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    JumbotronComponent,
    LoadingSpinnerComponent,
    NavbarItemComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    JumbotronComponent,
    LoadingSpinnerComponent
  ]
})
export class CoreModule { }
