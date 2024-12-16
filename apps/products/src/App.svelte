<script>
  import '@micro-frontends/shared-styles';
  import { config } from '@micro-frontends/shared';
  import { onDestroy } from 'svelte';

  let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

  let selectedProducts = new Set();
  const logoUrl = `${config.productsUrl}/assets/logo.png`;

  const unsubscribeRemove = PubSub.subscribe('product-removed', (product) => {
    selectedProducts.delete(product.id);
    selectedProducts = new Set(selectedProducts);
  });

  const unsubscribeAdded = PubSub.subscribe('product-added', (product) => {
    selectedProducts.add(product.id);
    selectedProducts = new Set(selectedProducts);
  });

  function toggleSelection(product) {
    if (selectedProducts.has(product.id)) {
      PubSub.publish('product-removed', product);
    } else {
      PubSub.publish('product-added', product);
    }
  }

  onDestroy(() => {
    unsubscribeRemove();
    unsubscribeAdded();
  });
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
        {#each products as product}
          <tr>
            <td class="select-column">
              <input
                type="checkbox"
                checked={selectedProducts.has(product.id)}
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
