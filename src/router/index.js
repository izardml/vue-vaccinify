import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/views/DashboardPage.vue';
import RequestConsultation from '@/views/RequestConsultation.vue';
import RegisterVaccination from '@/views/RegisterVaccination.vue';
import DetailRegVaccination from '@/views/DetailRegVaccination.vue';
import LoginPage from '@/views/LoginPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage
    },
    {
      path: '/consultation',
      name: 'consultation',
      component: RequestConsultation
    },
    {
      path: '/vaccination',
      name: 'vaccination',
      component: RegisterVaccination
    },
    {
      path: '/vaccination/:id',
      name: 'reg_vaccination',
      component: DetailRegVaccination
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/login?logout=success',
      name: 'logout',
      component: LoginPage
    },
  ]
})

export default router
