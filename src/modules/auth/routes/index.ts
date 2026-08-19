import type { RouteRecordRaw } from 'vue-router';
import isNotAuthenticatedGuard from '../guards/is-not-authenticated.guard.ts';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNotAuthenticatedGuard],
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
};
