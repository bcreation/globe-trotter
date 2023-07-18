import { createI18n } from 'vue-i18n';
import fr from './locales/fr.json'
import en from './locales/en.json'

const navigatorLang =
  navigator.language.length === 2
    ? `${navigator.language}-${navigator.language === 'en' ? 'GB' : navigator.language.toUpperCase()}`
    : navigator.language
   

export default new createI18n({
  legacy: false,
  globalInjection: true,
  locale: navigatorLang.substring(0,2),
  fallbackLocale: 'fr',
  messages: {fr, en}
})