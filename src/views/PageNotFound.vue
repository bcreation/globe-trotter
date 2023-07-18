<template>
  <div id="page-error">
    <h1>{{ t('error.404') }}</h1>
    <h2>{{ t('error.notFound') }}</h2>
    <RouterLink id="back-home" to="/">
      {{ t('backHome') }}
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<style>
#page-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}
#page-error #back-home {
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
}
</style>
