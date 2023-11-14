import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TimesheetView from '../views/TimesheetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/timesheet/:id',
      name: 'timesheet',
      component: TimesheetView,
      props: true
    }
  ]
})

export default router
