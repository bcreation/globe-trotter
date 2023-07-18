<template>
  <div class="autocomplete">
    <label for="search_country">{{ t('nav.search') }}</label>
    <div class="input-wrapper" :class="{ expanded: !!search || focused }">
      <input
        id="search_country"
        name="search_country"
        v-model="search"
        data-cy="search_country"
        autocomplete="off"
        aria-autocomplete="list"
        role="combobox"
        :aria-expanded="!!search"
        :placeholder="t('nav.search')"
        v-on:keydown.arrow-down="handleDownNavigation"
        @focus="focused = true"
        @blur="focused = false"
      />

      <button
        class="toggle-countries"
        type="button"
        data-toggle="dropdown"
        aria-describedby="instructions"
        :aria-expanded="search"
        aria-haspopup="true"
        :aria-label="t('expand-list')"
        @click="toggleList"
      >
        <i class="carret-down"></i>
      </button>
    </div>

    <ol
      id="suggestion"
      role="listbox"
      :class="{ hidden: !openedList }"
      v-on:keydown.arrow-down="handleDownNavigation"
      v-on:keydown.arrow-up="handleUpNavigation"
      v-on:keydown.backspace="handleBackspaceNavigation"
    >
      <li
        v-for="(country, i) of filteredCountries"
        :key="`country-${i}`"
        role="option"
        tabindex="-1"
        aria-selected="false"
        :data-option-value="i"
        :id="`autocomplete_${i}`"
        v-on:keydown.prevent.enter="selectCountry(country)"
        @click="selectCountry(country)"
      >
        {{ country.name }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

import type { Country } from '@/composition/Countries/ICountry'

import {
  handleDownNavigation,
  handleUpNavigation,
  handleBackspaceNavigation
} from '@/composition/EventManager/HandleNavigation'

const props = defineProps({
  countries: { type: Array as PropType<Country[]>, default: () => [] }
})

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const search = ref()
const focused = ref(false)
const openedList = ref(false)

const filteredCountries = computed(() => {
  if (!search.value) return []
  else {
    const matchedCountries = props.countries?.filter((country: Country) =>
      country.name.toLowerCase().includes(search.value.toLowerCase())
    )
    return matchedCountries
  }
})

const exactMatch = computed(
  () =>
    !!filteredCountries.value.find(
      (country) => country?.name?.toLowerCase() === search.value?.toLowerCase()
    )
)

const selectCountry = (country: Country) => {
  if (!country) return
  search.value = country.name
  const input = document.querySelector('#search_country') as HTMLElement
  input.focus()
  router.push({
    path: '/explore',
    query: { 'country-code': country.code }
  })
}

const toggleList = (e: Event) => {
  if (!e) {
    if (!search.value || exactMatch.value) openedList.value = false
  }
  openedList.value = !openedList.value
}

watch(
  route,
  ({ query }) => {
    if (Object.keys(query).length) {
      const newCountry = props.countries.find(
        (country) => country.code === query['country-code']
      ) as Country
      search.value = newCountry.name
    }
  },
  { deep: true }
)

watch(search, (value) => {
  if (value) openedList.value = true
  if (exactMatch.value) openedList.value = false
})
</script>
<style>
.autocomplete {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 0.5rem;
  position: relative;
}

.autocomplete > label {
  display: none;
}
.autocomplete > .input-wrapper {
  position: relative;
  width: calc(100% / 3);
  transition: all 0.5s ease;
}

.autocomplete > .input-wrapper.expanded {
  width: 100%;
  transition: all 0.3s ease;
}

.autocomplete > .input-wrapper > #search_country {
  height: 100%;
  width: 100%;
  padding: 0.8rem;
  border-radius: 1.5rem;
  border: 1px solid white;
  background-color: transparent;
  color: white;
}

#suggestion {
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  background: white;
  color: black;
  top: calc(4rem - 0.5rem);
  border-radius: 1rem;
  max-height: 12rem;
  overflow-y: scroll;
  padding: 0;
}

#suggestion > li {
  list-style: none;
  padding: 1rem;
  border-bottom: 1px solid grey;
  cursor: pointer;
}

#suggestion > li[aria-selected='true'],
#suggestion > li:hover {
  background-color: #00bd7e;
  color: white;
  transition: all 0.3s ease-in-out;
}
#suggestion.hidden {
  display: none;
}
.toggle-countries {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  height: 100%;
  width: 2.5rem;
  position: absolute;
  right: 1rem;
  top: 0;
}
.carret-down {
  content: '';
  box-sizing: border-box;
  height: 1rem;
  width: 1rem;
  border-style: solid;
  border-color: white;
  border-width: 0px 1px 1px 0px;
  transform: rotate(45deg);
  transition: border-width 150ms ease-in-out;
  margin-top: -0.5rem;
}
</style>
