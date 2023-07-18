<template>
  <gt-header></gt-header>
  <main>
    <RouterView />
    <div class="backgound"></div>
  </main>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'

import GtHeader from './components/GtHeader.vue'
</script>
<style scoped>
main {
  padding-top: 4rem;
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.backgound {
  background: url('./assets/world-map.jpg') no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
  z-index: -1;
}
</style>
