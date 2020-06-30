import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import Cookies from 'js-cookie'
import enLocale from './en'
import zhLocale from './zh'
import {
	setLocalStorage,
	getLocalStorage
} from '../utils/index.js'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

const langMap = {
  en: 'English',
  zh: '简体中文'
}

export function getLanguage() {
  const chooseLanguage = getLocalStorage('language') // Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = navigator &&  (navigator.language || navigator.browserLanguage).toLowerCase() || ''
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
export function getLanguages() {
  return langMap
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
})

export default i18n
