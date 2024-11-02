import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'bootstrap/dist/css/bootstrap-utilities.css';

import 'primevue/resources/themes/aura-dark-blue/theme.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';



import ToastService from 'primevue/toastservice';
import BadgeDirective from 'primevue/badgedirective';


const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.directive('badge', BadgeDirective);

// Mount the root component to the DOM
app.mount('#app');