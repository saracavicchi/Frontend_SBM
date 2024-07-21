import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './components/views/Homepage.vue';
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
    { path: '/home', name: 'Homepage', component: Homepage },
    { path: '/hello', component: HelloWorld }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
