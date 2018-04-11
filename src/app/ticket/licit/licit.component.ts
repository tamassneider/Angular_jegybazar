import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-licit',
  templateUrl: './licit.component.html',
  styleUrls: ['./licit.component.css']
})
export class LicitComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn$: Observable<boolean>;
  progressRefreshTicket = false;

  constructor( private _ticketService: TicketService,
               userService: UserService,
               private _route: ActivatedRoute,
               private _router: Router) {
    this.isLoggedIn$ = userService.isLoggedIn$;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this.refreshTicket(params.get('id'));
      }
    );

    console.log(this.ticket);
  }

  onRefreshTicket() {
    this.refreshTicket(this.ticket.id);
  }

  private refreshTicket (id: string) {
    this.progressRefreshTicket = true
    const handle404 = () => {
      this._router.navigate(['404']);
    };

    this._ticketService.getOne(id).subscribe(
      ticket => {
        this.progressRefreshTicket = false;
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

}
