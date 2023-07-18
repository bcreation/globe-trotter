<template>
  <div class="home">
    <h1 class="home-title">{{ t('homeTitle') }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.home-title {
  font-size: 3rem;
  max-width: 50%;
  text-align: center;
  z-index: 1;
}
</style>
