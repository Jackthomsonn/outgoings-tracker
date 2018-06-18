import { PaymentsService } from './../payments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})

export class TrackerComponent implements OnInit {
  public payments: Array<any> = []

  public newExpense = {
    name: undefined,
    price: 0,
    date: new Date()
  }

  constructor(private paymentsService: PaymentsService) { }

  public save = () => {
    window.localStorage.setItem(
      'outgoingsTracker',
      JSON.stringify(this.payments)
    )
    this.sortPaymentsByDateAsc(this.payments)
  }

  public toggle = payment => {
    payment.complete = !payment.complete
    this.save()
  }

  public addExpense = () => {
    this.paymentsService.payments.next(this.payments.concat(this.newExpense))
    this.newExpense = { name: undefined, price: 0, date: undefined }
    this.save()
  }

  public removeExpense = (payment: any) => {
    const index = this.payments.indexOf(payment)
    this.payments.splice(index, 1)
    this.save()
  }

  private sortPaymentsByDateAsc = (payments: any) => {
    return payments.sort(((a, b) => {
      if (a.date && b.date) {
        return a.date - b.date
      }
    }))
  }

  private getGetOrdinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;

    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  ngOnInit() {
    this.paymentsService.payments.subscribe(payments => {
      this.payments = this.sortPaymentsByDateAsc(payments);
    })
  }
}
