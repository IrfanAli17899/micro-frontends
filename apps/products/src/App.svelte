<script>
  import '@micro-frontend-tutorial/shared/styles/index.css';
  import {
    config,
    store,
    addProduct,
    removeProduct,
  } from '@micro-frontend-tutorial/shared';
  import { writable } from 'svelte/store';

  const appStore = writable(store.getState().app);

  store.subscribe(() => {
    const newState = store.getState().app;
    if (newState !== $appStore) {
      appStore.set(newState);
    }
  });

  const logoUrl = `${config.productsUrl}/logo.png`;

  function toggleSelection(product) {
    const isSelected = $appStore.selectedProducts[product.id];
    store.dispatch(isSelected ? removeProduct(product) : addProduct(product));
  }
</script>

<div class="simple-card">
  <div class="header">
    <img src={logoUrl} alt="Logo" class="logo" />
    <h1>Products App 👋</h1>
  </div>
  <div class="content">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {#each $appStore.products as product}
          <tr>
            <td class="select-column">
              <input
                type="checkbox"
                checked={$appStore.selectedProducts[product.id]}
                on:change={() => toggleSelection(product)}
              />
            </td>
            <td>{product.name}</td>
            <td>${product.price}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .select-column {
    width: 2rem;
  }
</style>
