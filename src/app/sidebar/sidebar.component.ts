import { PaymentsService } from './../payments.service';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit, DoCheck {
  public monthlyEarnings: number

  public payments: any

  constructor(private paymentsService: PaymentsService) { }

  public getCompletedPayments = () => {
    if (!this.payments || this.payments.length === 0) {
      return
    }

    let count = 0

    this.payments.filter(payment => (payment.complete ? count++ : undefined))

    return count
  }

  public getTotalMonthlyOutgoings = () => {
    if (!this.payments || this.payments.length === 0) {
      return
    }

    return this.payments.reduce((acc, val) => ({ price: acc.price + val.price }))
  }

  public getMoneyLeftOver = () => {
    if (!this.payments || this.payments.length === 0) {
      return
    }

    return this.monthlyEarnings - this.getTotalMonthlyOutgoings().price
  }

  ngOnInit() {
    const earningsPresent: any = window.localStorage.getItem('monthlyWage-outgoing-tracker')
    this.monthlyEarnings = earningsPresent
      ? JSON.parse(earningsPresent).earnings
      : 0

    this.paymentsService.payments.subscribe(payments => {
      this.payments = payments;
    })
  }

  ngDoCheck() {
    if (this.monthlyEarnings) {
      window.localStorage.setItem('monthlyWage-outgoing-tracker', JSON.stringify({ earnings: this.monthlyEarnings }))
    }
  }
}
