import './assets/css/main.css';
import {createApp} from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';
import Homepage from './components/views/Homepage/Homepage.vue';
import HelloWorld from "@/components/HelloWorld.vue";
import CreaOrganizzazione from "@/components/views/organizzazione/CreaOrganizzazione.vue";
import Organizzazione from "@/components/views/organizzazione/Organizzazione.vue";
import ModificaOrganizzazione from "@/components/views/organizzazione/ModificaOrganizzazione.vue";
import ModificaOrganizzatore from "@/components/views/organizzatore/ModificaOrganizzatore.vue";

const routes = [
    {path: '/home', name: 'Homepage', component: Homepage},
    {path: '/hello', name: 'HelloWorld', component: HelloWorld},
    {path: '/', redirect: '/home'},
    {path: '/creaOrganizzazione', name: 'CreaOrganizzazione', component: CreaOrganizzazione},
    {path: '/organizzazione/:id', name: 'Organizzazione', component: Organizzazione},
    {path: '/modificaOrganizzazione/:id', name: 'ModificaOrganizzazione', component: ModificaOrganizzazione},
    {path: '/modificaOrganizzatore/:id', name: 'ModificaOrganizzatore', component: ModificaOrganizzatore},
    { path: '/accessibilita', name: 'accessibilita', component: () => import('./components/views/Accessibilita.vue') }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
