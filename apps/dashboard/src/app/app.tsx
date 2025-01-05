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
    const { bootstrap } = await import('increment/Module');
    const { bootstrap: bootstrapDecrement } = await import('decrement/Module');
    bootstrapDecrement('#decrement-container');
    bootstrap();
  };

  return (
    <div>
      <div id='decrement-container' />
      {/* @ts-expect-error need to define */}
      <app-increment></app-increment>
      <NxWelcome title="dashboard" />
    </div>
  );
}

export default App;
