import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { config, Product, removeProduct } from '@micro-frontend-tutorial/shared';
import { ReduxService } from '../services/redux.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-cart',
  template: `
    <div class="simple-card">
      <div class="header">
        <img [src]="logoUrl" alt="Logo" class="logo" />
        <h1>
          Cart App 👋
        </h1>
      </div>
      <div class="content">
        <table *ngIf="cartProducts.length > 0; else emptyCart">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of cartProducts; let i = index">
              <td>{{ product.name }}</td>
              <td>\${{ product.price }}</td>
              <td class="select-column">
                <button (click)="removeFromCart(product)">-</button>
              </td>
            </tr>
          </tbody>
        </table>
        <ng-template #emptyCart>
          <p>Your cart is currently empty. Add some products to see them here.</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .select-column {
        width: 2rem;
      }
      .select-column button:hover {
        cursor: pointer;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  logoUrl = `${config.cartUrl}/logo.png`;
  cartProducts: Product[] = [];

  constructor(private zone: NgZone, private reduxService: ReduxService) {
    this.cartProducts = [];
  }

  removeFromCart(product: Product): void {
    this.reduxService.dispatch(removeProduct(product));
  }

  ngOnInit(): void {
    this.reduxService
      .select((state) => state.app)
      .pipe(takeUntil(this.destroy$))
      .subscribe((appState) => {
        this.zone.run(() => {
          this.cartProducts = appState.products.filter(
            (product) => appState.selectedProducts[product.id]
          );
        });
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
