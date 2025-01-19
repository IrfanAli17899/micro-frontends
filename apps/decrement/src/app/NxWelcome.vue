<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { createSelector } from '@reduxjs/toolkit';
import { decrement, store } from '@micro-frontend-tutorial/shared';

// Define component props
defineProps<{
  title: string;
}>();

// Reactive state
const count = ref(0);

// Selector for the counter slice
const selectCounterSlice = createSelector(
  (state: any) => state.counter,
  (counter) => counter
);

// Function to synchronize the store state with the local state
const syncStoreState = () => {
  const currentSlice = selectCounterSlice(store.getState());
  if (count.value !== currentSlice.value) {
    count.value = currentSlice.value;
  }
};

// Subscribe to store updates
let unsubscribe: () => void;

onMounted(() => {
  // Sync initial state
  syncStoreState();

  // Subscribe to store changes
  unsubscribe = store.subscribe(syncStoreState);
});

onUnmounted(() => {
  // Clean up the subscription
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div id="welcome">
        <h1>
          <span> Hello there, </span>
          Welcome {{ title }} {{ count }} 👋
        </h1>
        <button @click="store.dispatch(decrement())">Decrement</button>
      </div>
    </div>
  </div>
</template>
