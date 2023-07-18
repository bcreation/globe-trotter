<template>
  <div id="explore-map">
    <h1>{{ t('worldMap') }}</h1>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1001">
      <path
        v-for="_country of countries"
        :key="_country.id"
        :id="_country.id"
        :d="_country.shape"
        :style="`fill: ${
          country && _country.id.includes(country.code) ? '#00bd7e' : '#EEE'
        } ; cursor: pointer; stroke: #ccc `"
        @click="setCountry(_country.id)"
      />
    </svg>
  </div>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import { useI18n } from 'vue-i18n'

import countries from 'world-map-country-shapes'

import type { Country } from '@/composition/Countries/ICountry'

const { t } = useI18n()

defineProps({
  country: { type: Object as PropType<Country>, default: () => {} }
})
const emit = defineEmits(['country-selected'])

const setCountry = (id: string) => emit('country-selected', id)
</script>
<style>
#explore-map {
  flex: 1;
  justify-content: space-evenly;
  padding: 1rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
