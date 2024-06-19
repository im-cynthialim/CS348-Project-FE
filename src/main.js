import './assets/main.css'

//icons
import 'font-awesome/css/font-awesome.min.css'
//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa4'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Date picker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//Components
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  }
})

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.use(vuetify)
app.use(router)

app.mount('#app')

new Vue({
  el: '#app',

  render: (h) => h(App)
})
