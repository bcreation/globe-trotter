import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'



import App from './App.vue'
import router from './router'
import i18n from './modules/i18n'
import apolloClient from './apollo-client'

const app = createApp({
   setup () {
    provide(DefaultApolloClient, apolloClient)
  },
   render: () => h(App),
})

app.use(i18n);
app.use(router)

app.mount('#app')
