import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './components/views/Homepage.vue';
import HelloWorld from "@/components/HelloWorld.vue";
import Welcome from "./components/TheWelcome.vue";

const routes = [
    { path: '/home', name: 'Homepage', component: Homepage },
    { path: '/', component: HelloWorld },
    { path: '/welcome', component: Welcome }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
