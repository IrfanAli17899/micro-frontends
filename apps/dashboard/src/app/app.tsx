import 'zone.js';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@micro-frontend-tutorial/shared';

export function App() {
  const isMounted = useRef(false);
  const selectedProducts = useSelector<RootState, Record<string, boolean>>(
    (state) => state.app.selectedProducts
  );
  const count = Object.keys(selectedProducts).length;

  useEffect(() => {
    if (!isMounted.current) {
      loadModules();
      isMounted.current = true;
    }
  }, []);

  const loadModules = async () => {
    const { bootstrap: bootstrapCart } = await import('cart/Module');
    const { bootstrap: bootstrapBudget } = await import('budget/Module');
    const { bootstrap: bootstrapProducts } = await import('products/Module');
    bootstrapCart(); // load angular cart app
    bootstrapBudget('#budget'); // load vue budget app
    bootstrapProducts(document.getElementById('products') as HTMLElement); // load svelte products app
  };

  return (
    <div className="container">
      <div id="welcome">
        <div className="header">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
          <h1>Dashboard 👋 ({count})</h1>
        </div>
      </div>
      <div className="apps-container">
        <div id="products" />
        <div id="cart">
          {/* @ts-ignore */}
          <app-cart />
        </div>
        <div id="budget" />
      </div>
    </div>
  );
}

export default App;
