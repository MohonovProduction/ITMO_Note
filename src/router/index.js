import { createRouter, createWebHashHistory } from 'vue-router'
import store from "@/store";
import App from "@/App.vue";
import Vue from "vue";



const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/generator',
    name: 'generator',
    component: () => import('@/views/GeneratorView.vue')
  },
  {
    path: '/note/:id',
    name: 'note',
    component: () => import('@/views/NoteView.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
