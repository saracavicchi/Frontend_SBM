import './assets/main.css';
import {createApp} from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';
import Homepage from './components/views/Homepage.vue';
import HelloWorld from "@/components/HelloWorld.vue";
import CreaOrganizzazione from "@/components/views/organizzazione/CreaOrganizzazione.vue";
import Organizzazione from "@/components/views/organizzazione/Organizzazione.vue";

const routes = [
    {path: '/home', name: 'Homepage', component: Homepage},
    {path: '/hello', name: 'HelloWorld', component: HelloWorld},
    {path: '/', redirect: '/home'},
    {path: '/creaOrganizzazione', name: 'CreaOrganizzazione', component: CreaOrganizzazione},
    {path: '/organizzazione/:id', name: 'Organizzazione', component: Organizzazione}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
