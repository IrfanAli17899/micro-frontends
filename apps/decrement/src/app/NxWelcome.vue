<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div id="welcome">
        <h1>
          <span> Hello there, </span>
          Welcome {{ title }} 👋
        </h1>
      </div>
    </div>
  </div>
</template>