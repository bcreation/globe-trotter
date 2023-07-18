<template>
  <div id="explore">
    <country-informations :country="country"></country-informations>
    <world-map :country="country" @country-selected="selectedCountry"></world-map>
  </div>
  <loader v-if="loading"></loader>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue'

import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { useQuery } from '@vue/apollo-composable'

import { getCountry } from '@/composition/Countries/Countries'
import WorldMap from '@/components/Map/WorldMap.vue'
import CountryInformations from '@/components/Map/CountryInformations.vue'
import Loader from '@/components/Loader.vue'
const route = useRoute()
const router = useRouter()

const { locale } = useI18n()

const { result, loading, error } = useQuery(getCountry, () => ({
  locale: locale.value.substring(0, 2),
  code: route.query['country-code'] as string
}))
const country = computed(() => result?.value?.country)

const selectedCountry = (code: string) => {
  router.push({
    query: {
      'country-code': code
    }
  })
}
watch(error, () => {
  if (error) router.push('/404')
})
</script>
<style>
#explore {
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  min-height: 100%;
  display: flex;
}
</style>
