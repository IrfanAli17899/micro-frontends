import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { config, Product } from 'libs/shared/src/index';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-cart-component',
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
                <button (click)="removeFromCart(i)">-</button>
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
  logoUrl = `${config.cartUrl}/logo.png`;
  cartProducts: Product[] = [];
  unsubscribeProductAdd: VoidFunction;
  unsubscribeProductRemove: VoidFunction;

  constructor(private zone: NgZone) {
    this.cartProducts = [];
    this.unsubscribeProductAdd = () => { };
    this.unsubscribeProductRemove = () => { };
  }



  removeFromCart(index: number): void {
    window.PubSub.publish('product-removed', this.cartProducts[index]);
  }

  ngOnInit(): void {
    this.unsubscribeProductAdd = window.PubSub.subscribe('product-added', (product: Product) => {
      this.zone.run(() => {
        this.cartProducts.push(product);
      });
    });

    this.unsubscribeProductRemove = window.PubSub.subscribe('product-removed', (product: Product) => {
      this.zone.run(() => {
        this.cartProducts = this.cartProducts.filter((p) => p.id !== product.id);
      });
    });
  }

  ngOnDestroy(): void {

  }
}
