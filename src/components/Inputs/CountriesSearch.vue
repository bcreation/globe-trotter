<template>
  <div class="search-elements">
    <label for="search_country">{{ t('nav.search') }}</label>
    <input
      id="search_country"
      name="search_country"
      v-model="search"
      autocomplete="off"
      aria-autocomplete="list"
      role="combobox"
      :aria-expanded="!!search"
      :placeholder="t('nav.search')"
    />
    <select
      id="countries-filtered"
      name="countries-filtered"
      @change="selectCountry"
      v-model="selectedCountry"
    >
      <option v-for="(country, i) of filteredCountries" :key="`country-${i}`" :value="country">
        {{ country.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

import type { Country } from '@/composition/Countries/ICountry'

const props = defineProps({
  countries: { type: Array as PropType<Country[]>, default: () => [] }
})

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const search = ref()
const selectedCountry: Ref<Country | undefined> = ref()

const filteredCountries = computed(() => {
  if (!search.value) return []
  else {
    const matchedCountries = props.countries?.filter((country: any) =>
      country.name.toLowerCase().includes(search.value.toLowerCase())
    )

    return matchedCountries
  }
})

const selectCountry = () => {
  if (!selectedCountry.value) return
  search.value = selectedCountry.value.name
  const input = document.querySelector('#search_country') as HTMLElement
  input.focus()
  router.push({
    path: '/explore',
    query: {
      'country-name': selectedCountry.value.name,
      'country-code': selectedCountry.value.code
    }
  })
}

watch(
  route,
  ({ query }) => {
    const newCountry = props.countries.find(
      (country) => country.code === query['country-code']
    ) as Country
    search.value = newCountry.name
  },
  { deep: true }
)
</script>
<style>
.search-elements {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0.5rem;
  position: relative;
}

.search-elements > label {
  display: none;
}

.search-elements > #search_country {
  width: calc(100% / 3);
  height: 100%;
  padding: 0.8rem;
  border-radius: 1.5rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  transition: all 0.5s ease;
}

#countries-filtered {
  flex: 1;
}

#search_country,
#countries-filtered {
  height: 100%;
  padding: 0.8rem;
  border-radius: 1.5rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
}

#suggestion.hidden {
  display: none;
}
</style>
