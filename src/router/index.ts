import { createRouter, createWebHistory } from 'vue-router';
import ShopLayout from '../modules/shop/layouts/ShopLayout.vue';
import { authRoutes } from '@/modules/auth/routes/index.ts';
import { adminRoutes } from '@/modules/admin/routes/index.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../modules/shop/views/HomeView.vue'),
        },
      ],
    },
    // Auth routes
    authRoutes,

    // Admin routes
    adminRoutes,
  ],
});

export default router;
