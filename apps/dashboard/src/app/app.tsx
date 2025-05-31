// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import 'zone.js';
import { useEffect, useRef } from 'react';
import NxWelcome from './nx-welcome';

export function App() {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      loadModules();
      isMounted.current = true;
    }
  }, []);

  const loadModules = async () => {
    const { bootstrap } = await import('cart/Module');
    const { bootstrap: bootstrapBudget } = await import('budget/Module');
    const { bootstrap: bootstrapProducts } = await import('products/Module');
    bootstrapBudget('#budget-container');
    bootstrapProducts(document.getElementById('products-container') as HTMLElement);
    bootstrap();
  };

  return (
    <div>
      <NxWelcome title="dashboard" />
      <div id='budget-container' />
      <div id='products-container' />
      {/* @ts-expect-error need to define */}
      <app-cart></app-cart>
    </div>
  );
}

export default App;
