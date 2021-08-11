import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observable',
  templateUrl: './cold-observable.component.html',
  styleUrls: ['./cold-observable.component.css']
})
export class ColdObservableComponent implements OnInit, OnDestroy {
  coldObservable$: Observable<number> | null = null;
  subscription: Subscription | null = null;

  countToDisplay: number = 0;
  messageToDisplay: string = '';

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.cleanUpSubscriptions();
  }

  cleanUpSubscriptions(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  reset(): void {
    this.cleanUpSubscriptions();
    this.coldObservable$ = null;
    this.countToDisplay = 0;
    this.messageToDisplay = '';
  }

  startColdObservable(shouldComplete: boolean): void {
    this.reset();
    this.coldObservable$ = this.createColdObservable(shouldComplete);
  }

  createColdObservable(shouldComplete: boolean): Observable<number> {
    return new Observable<number>(observer => {
      let count = 0;
      console.log(count);
      setInterval(() => {
        count += 1;
        observer.next(count);

        if (count == 5) {
          if (shouldComplete) {
            observer.complete();
          }
          else {
            observer.error(`Count reached limit: ${count}`)
          }
        }
      }, 1000)
    });
  }

  subscribeToColdObservable(): void {
    if (!this.coldObservable$) {
      return;
    }

    this.subscription = this.coldObservable$.subscribe(data => {
      this.countToDisplay = data;
      console.log(data);
    }, error => {
      this.messageToDisplay = error;
      console.log(error);
    }, () => {
      this.messageToDisplay = 'Cold Observable Completed';
      console.log(this.messageToDisplay);
    });
  }
}
