import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from 'firebase/app';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAnO9kGupTo2BGqvCNu3ak1HBHz9ZL_CYE",
//     authDomain: "week07-26177.firebaseapp.com",
//     projectId: "week07-26177",
//     storageBucket: "week07-26177.appspot.com",
//     messagingSenderId: "887862320464",
//     appId: "1:887862320464:web:ad23f31854484329a6e055"
// };

// Initialize Firebase
// initializeApp(firebaseConfig);

// Create Vue App
const app = createApp(App);

// Use Router and PrimeVue
app.use(router);
app.use(PrimeVue, { theme: { preset: Aura } });

// Mount the app
app.mount('#app');
