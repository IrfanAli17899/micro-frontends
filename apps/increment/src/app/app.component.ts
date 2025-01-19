import { Component, NgZone } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ReduxService } from '../services/redux.service';
import { increment } from '@micro-frontend-tutorial/shared';

@Component({
  imports: [],
  selector: 'app-increment',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'increment';
  private destroy$ = new Subject<void>();
  count = 0;

  constructor(private zone: NgZone, private reduxService: ReduxService) {
    this.count = 0;
  }

  increment(): void {
    this.reduxService.dispatch(increment());
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
