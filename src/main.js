import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEyeSlash, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faEyeSlash, faEye, faTrash)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
