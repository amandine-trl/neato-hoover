import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.page';
import NotFound from '@/pages/NotFound.page';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
        { path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFound },
    ],
});