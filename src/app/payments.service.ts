import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentsService {
  public payments: Subject<any> = new Subject<any>();
}
