import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Detail from '@/views/Detail.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/tweet/:id',
    props: true,
    component: Detail,
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
