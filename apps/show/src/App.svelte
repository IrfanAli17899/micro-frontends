<script lang="ts">
  import { writable } from 'svelte/store';
  // @ts-ignore
  import { store } from '@micro-frontend-tutorial/shared';
  export let name: string;
  const counterStore = writable(store.getState().counter);

  store.subscribe(() => {
    const newState = store.getState().counter;
    if (newState !== $counterStore) {
      counterStore.set(newState);
    }
  });
</script>

<main>
  <h1>Welcome {name}! ({$counterStore.value})</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
