import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store";
import App from "@/App.vue";
import Vue from "vue";



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: async () => await import (/* webpackChunkName: "about" */ '@/views/AboutView.vue')
  },
  {
    path: '/generator',
    name: 'generator',
    component: import( '@/views/GeneratorView.vue')
  },
  {
    path: '/note/:id',
    name: 'note',
    component: async () => await import('@/views/NoteView.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
