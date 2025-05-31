import { Injectable, OnDestroy } from '@angular/core';
import { RootState, store } from '@micro-frontend-tutorial/shared';
import { PayloadAction } from '@reduxjs/toolkit';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReduxService implements OnDestroy {
  private stateSubject = new BehaviorSubject<RootState>(store.getState());
  private unsubscribe: () => void;

  readonly state$ = this.stateSubject.asObservable();

  constructor() {
    this.unsubscribe = store.subscribe(() => {
      const newState = store.getState();
      if (this.stateSubject.getValue() !== newState) {
        this.stateSubject.next(newState);
      }
    });
  }

  select<T>(selector: (state: RootState) => T): Observable<T> {
    return this.state$.pipe(
      map(selector),
      distinctUntilChanged()
    );
  }

  dispatch<T>(action: PayloadAction<T>) {
    store.dispatch(action);
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    this.stateSubject.complete();
  }
}