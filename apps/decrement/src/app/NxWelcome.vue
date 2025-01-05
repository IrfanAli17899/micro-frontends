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

<style scoped>
svg {
  display: block;
  vertical-align: middle;
  shape-rendering: auto;
  text-rendering: optimizeLegibility;
}
pre {
  background-color: rgba(55, 65, 81, 1);
  border-radius: 0.25rem;
  color: rgba(229, 231, 235, 1);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
  overflow: auto;
  padding: 0.5rem 0.75rem;
}

.shadow {
  box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.rounded {
  border-radius: 1.5rem;
}
.wrapper {
  width: 100%;
}
.container {
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(55, 65, 81, 1);
  width: 100%;
}
#welcome {
  margin-top: 2.5rem;
}
#welcome h1 {
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1;
}
#welcome span {
  display: block;
  font-size: 1.875rem;
  font-weight: 300;
  line-height: 2.25rem;
  margin-bottom: 0.5rem;
}
</style>
