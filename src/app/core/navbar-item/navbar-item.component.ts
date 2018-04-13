import {AfterViewChecked, Component, DoCheck, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit, DoCheck, AfterViewChecked {
  @Input() url: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
     // console.log('NavBarItem ngAfterViewChecked');
  }

  ngDoCheck(): void {
     // console.log('NavBarItem ngDoCheck');
  }

}
