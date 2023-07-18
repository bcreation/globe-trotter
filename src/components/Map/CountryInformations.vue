<template>
  <article id="explore-informations">
    <div v-if="country">
      <h2>
        {{ country.name }} -
        <a
          class="wiki"
          target="_blank"
          :href="`https://fr.wikipedia.org/wiki/${encodeURI(country.name)}`"
          >Wiki</a
        >
      </h2>

      <ul id="country-informations">
        <li>{{ t('flag') }} {{ country.emoji }}</li>
        <li>{{ t('capital') }} {{ country.capital }}</li>
        <li>
          {{ t('currencies') }}
          <ul>
            <li v-for="(currency, i) of country.currencies" :key="`currency-${i}`">
              {{ currency }} -
              <span v-html="currencySymbol.symbol(currency) ?? '&#63;'"></span>
            </li>
          </ul>
        </li>
        <li>
          {{ t('phones') }}
          <ul>
            <li v-for="(phone, i) of country.phones" :key="`phone-${i}`">+({{ phone }})</li>
          </ul>
        </li>
        <li>
          {{ t('languages') }}
          <ul>
            <li v-for="(language, i) of country.languages" :key="`language-${i}`">
              {{ language.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </article>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import currencySymbol from 'currency-symbol'

import type { Country } from '@/composition/Countries/ICountry'

const { t } = useI18n()

defineProps({
  country: { type: Object as PropType<Country>, default: () => {} }
})
</script>
<style>
#explore-informations {
  width: calc(100% / 5);
  padding: 1rem;
  border-right: 1px solid grey;
  background-color: rgb(24, 24, 24, 0.4);
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
#country-informations li {
  list-style: none;
}

.wiki {
  font-size: 1rem;
}
</style>
