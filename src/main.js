import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEyeSlash, faEye, faTrash, faDice } from '@fortawesome/free-solid-svg-icons'

library.add(faEyeSlash, faEye, faTrash, faDice)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
