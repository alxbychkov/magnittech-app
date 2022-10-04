import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/task',
      name: 'Create task',
      component: () => import('../views/TaskView.vue')
    },
    {
      path: '/task/:id',
      name: 'Edit task',
      component: () => import('../views/TaskView.vue')
    }
  ]
})

export default router;
