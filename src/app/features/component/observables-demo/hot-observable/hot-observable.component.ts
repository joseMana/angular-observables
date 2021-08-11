import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-hot-observable',
  templateUrl: './hot-observable.component.html',
  styleUrls: ['./hot-observable.component.css']
})
export class HotObservableComponent implements OnInit, OnDestroy {
  subject$: Subject<number> | null = null;
  subscription: Subscription | null = null;
  isErrorOrCompleted: boolean = false;

  countToDisplay: number = -1;
  messageToDisplay: string = '';

  counter: number = 0;

  get hotObservable$(): Observable<number> | null {
    if (!this.subject$) {
      return null;
    }

    return this.subject$.asObservable();
  }

  constructor() { }

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
    this.subject$ = null;
    this.countToDisplay = -1;
    this.counter = 0;
    this.messageToDisplay = '';
    this.isErrorOrCompleted = false;
  }

  createHotObservable(initialValue: number | null): void {
    if (this.subject$ != null) {
      return;
    }

    this.subject$ = this.createSubject(initialValue);
  }

  createSubject(initialValue: number | null): Subject<number> {
    if (initialValue === null) {
      return new Subject<number>();
    }
    else {
      return new BehaviorSubject<number>(this.counter);
    }
  }

  subscribeToHotObservable(): void {
    if (this.subscription != null || !this.hotObservable$) {
      return;
    }

    this.subscription = this.hotObservable$.subscribe(data => {
      this.countToDisplay = data;
      console.log(data);
    }, error => {
      this.messageToDisplay = error;
      console.log(error);
    }, () => {
      this.messageToDisplay = 'Hot Observable Completed';
      console.log(this.messageToDisplay);
    });
  }

  incrementCount(): void {
    this.counter += 1;
    if (this.subject$) {
      this.subject$.next(this.counter);
    }
  }

  markAsCompleted(): void {
    if (!this.subject$) {
      return;
    }

    this.subject$.complete();
    this.isErrorOrCompleted = true;
  }

  markAsError(): void {
    if (!this.subject$) {
      return;
    }

    this.subject$.error(`Count reached limit`);
    this.isErrorOrCompleted = true;
  }
}
