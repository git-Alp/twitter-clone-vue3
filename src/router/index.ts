import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Detail from '@/views/Detail.vue'
import { firebaseApp} from '../firebase/firebaseConfig';
import { getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tweet/:id',
    props: true,
    component: Detail,
    meta: {
      requiresAuth: true
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/')
    return;
  }
  next();
})
