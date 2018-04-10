import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-licit',
  templateUrl: './licit.component.html',
  styleUrls: ['./licit.component.css']
})
export class LicitComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;

  constructor( private _ticketService: TicketService,
               userService: UserService,
               private _route: ActivatedRoute,
               private _router: Router) {
    this.isLoggedIn = userService.isLoggedin;
  }

  ngOnInit() {
    const handle404 = () => {
      this._router.navigate(['404']);
    };

    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this._ticketService.getOne(params.get('id')).subscribe(
          ticket => {
            if (ticket === null) {
              handle404();
            } else {
              this.ticket = ticket;
            }
          },
          err => {
            return handle404();
          }
        );
      }
    );

    console.log(this.ticket);
  }

}
