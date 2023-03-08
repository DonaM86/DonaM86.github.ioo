import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Favorites from './components/Favorites.vue'

const routes = [{
        path: '/',
        name: 'Hem',
        component: Home
    },
    {
        path: '/favorites',
        name: 'Favoriter',
        component: Favorites
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
