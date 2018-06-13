import { PaymentsService } from './payments.service';
import { Component, AfterContentChecked } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterContentChecked {
  private monthlyEarnings = 1981.74;

  constructor(private paymentsService: PaymentsService) { }

  private checkForSavedSessions = () => {
    if (window.localStorage.getItem('outgoingsTracker')) {
      this.paymentsService.payments.next(JSON.parse(window.localStorage.getItem('outgoingsTracker')))
    }
  }

  ngAfterContentChecked() {
    // this.paymentsService.payments.next([
    //   {
    //     name: 'Credit Card',
    //     price: 1000,
    //     complete: false
    //   },
    //   {
    //     name: 'Rent',
    //     price: 200,
    //     complete: false
    //   },
    //   {
    //     name: 'Google',
    //     price: 4,
    //     complete: false
    //   },
    //   {
    //     name: 'GitHub',
    //     price: 6,
    //     complete: false
    //   },
    //   {
    //     name: 'Netflix',
    //     price: 9.99,
    //     complete: false
    //   },
    //   {
    //     name: 'You Know',
    //     price: 40,
    //     complete: false
    //   }, {
    //     name: 'EE',
    //     price: 20
    //   }
    // ]);
    this.checkForSavedSessions()
  }
}
