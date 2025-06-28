import { createWebHistory, createRouter } from 'vue-router'
import LifeSpheres from '../pages/LifeSpheres.vue'
import MoodTracker from '../pages/MoodTracker.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: { name: 'life-spheres' },
        },
        { 
            path: '/mood-tracker', 
            name: 'mood-tracker',
            component: MoodTracker,
            meta: {
                title: 'Mood Tracker_',
            }
        },
        { 
            path: '/life-spheres', 
            name: 'life-spheres',
            component: LifeSpheres,
            meta: {
                title: 'Life Spheres_',
            }
        },
    ],
})