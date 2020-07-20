"use strict";
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/home/home';
import SignIn from '@/components/signin/signin';
import Admin from '@/components/admin/admin';
Vue.use(VueRouter);

const root = { path: '/', redirect: '/home'};
export const ComponentRouters = [
  {path: '/home', component: Home, name:'Home'},
  { path: '/signin', component: SignIn, name:'SignIn'},
  { path: '/admin', component: Admin, name:'Admin'}
];

export default new VueRouter({
  routes: [root].concat(ComponentRouters),
  mode: 'history',
  linkActiveClass: 'active'
});