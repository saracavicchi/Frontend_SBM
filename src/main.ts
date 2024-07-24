import './assets/css/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './components/views/Homepage/Homepage.vue';
import HelloWorld from "@/components/HelloWorld.vue";
import './assets/css/main.css';

const routes = [
    { path: '/', name: 'Homepage', component: Homepage },
    { path: '/hello', component: HelloWorld },
    { path: '/accessibilita', name: 'accessibilita', component: () => import('./components/views/Accessibilita.vue') }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
