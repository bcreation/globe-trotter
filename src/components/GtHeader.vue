<template>
  <header>
    <nav>
      <RouterLink id="nav-home" to="/">
        <span v-if="randomFlag" role="img" :aria-label="randomFlag.name">{{
          randomFlag.emoji
        }}</span
        >{{ t('nav.home') }}</RouterLink
      >
      <!-- <RouterLink to="/explore">{{ t('nav.explore') }}</RouterLink> -->
    </nav>
    <div id="search-country">
      <countries-autocomplete :countries="countries" v-if="!selectMode"></countries-autocomplete>
      <countries-search v-else :countries="countries"></countries-search>
    </div>
    <div id="select-option">
      <label for="select_mode"
        >{{ t('selectMode') }}
        <input type="checkbox" id="select_mode" name="select_mode" v-model="selectMode" />
      </label>
    </div>
    <loader v-if="loading"></loader>
  </header>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useQuery } from '@vue/apollo-composable'

import { getCountries } from '@/composition/Countries/Countries'

import CountriesAutocomplete from '@/components/Inputs/CountriesAutocomplete.vue'
import CountriesSearch from '@/components/Inputs/CountriesSearch.vue'

const { t, locale } = useI18n()

const randomFlag = ref()
const selectMode = ref(false)

const { result, loading } = useQuery(getCountries, () => ({
  locale: locale.value.substring(0, 2)
}))

const countries = computed(() => result?.value?.countries)

watch(result, (value) => {
  setInterval(() => {
    const randomIndex = Math.ceil(Math.random() * (value.countries.length - 0) + 0)
    randomFlag.value = value.countries[randomIndex]
  }, 1000)
})
</script>
<style scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: #181818;
  z-index: 50;
  height: 4rem;
  border-bottom: 1px solid white;
  padding: 0rem 2rem;
  display: flex;
  align-items: center;
}

nav {
  font-size: 2rem;
  display: flex;
  align-items: center;
}

nav #nav-home > span {
  margin-right: 1rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

#search-country {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
}

#select-option {
  display: flex;
  align-items: center;
  height: 100%;
}

#select-option > label {
  display: flex;
  align-items: center;
}

#select-option > label > input {
  margin-left: 1rem;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    margin-left: -1rem;
    font-size: 1.5rem;
  }
}
</style>
