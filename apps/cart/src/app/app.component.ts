import { Component, NgZone } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ReduxService } from '../services/redux.service';
import { cart } from '@micro-frontend-tutorial/shared';

@Component({
  imports: [],
  selector: 'app-cart',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cart';
  private destroy$ = new Subject<void>();
  count = 0;

  constructor(private zone: NgZone, private reduxService: ReduxService) {
    this.count = 0;
  }

  cart(): void {
    this.reduxService.dispatch(cart());
  }

  ngOnInit(): void {
    this.reduxService
      .select((state) => state.counter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((appState) => {
        this.zone.run(() => {
          this.count = appState.value;
        });
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
