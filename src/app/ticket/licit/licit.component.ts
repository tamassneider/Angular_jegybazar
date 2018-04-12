import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-licit',
  templateUrl: './licit.component.html',
  styleUrls: ['./licit.component.css']
})
export class LicitComponent implements OnInit, OnDestroy {
  ticket$: Observable<TicketModel>;
  isLoggedIn$: Observable<boolean>;
  progressRefreshTicket = false;
  private ticketWatcherSubscription: Subscription;

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
  }

  ngOnDestroy(): void {
    this.ticketWatcherSubscription.unsubscribe()
  }

  private refreshTicket (id: string) {
    this.progressRefreshTicket = true
    const handle404 = () => {
      this._router.navigate(['404']);
    };

    this.ticket$ = this._ticketService.getOne(id).share();
    this.ticketWatcherSubscription = this.ticket$.subscribe(
      ticket => {
        this.progressRefreshTicket = false;
        if (ticket === null) {
          handle404();
        }
      },
      err => {
        return handle404();
      }
    );
  }

  onBid() {
    this.progressRefreshTicket = true;
  }

}
