import './assets/main.css';
import {createApp} from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';
import UserSettings from '@/components/views/organizzatore/UserSetting.vue';


const routes = [
    {path: '/user-settings', name: 'UserSettings', component: UserSettings},

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
