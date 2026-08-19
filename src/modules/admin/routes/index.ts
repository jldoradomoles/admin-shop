import isAuthenticatedGuard from '../../auth/guards/is-authenticated.guard';
import isAdminGuard from '../../auth/guards/is-admin.guard';

export const adminRoutes = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAuthenticatedGuard, isAdminGuard],
  component: () => import('../layouts/AdminLayout.vue'),
  children: [
    {
      path: 'dashboard',
      name: 'admin-dashboard',
      component: () => import('@/modules/admin/views/DashboardView.vue'),
    },
    {
      path: 'products',
      name: 'admin-products',
      component: () => import('@/modules/admin/views/ProductsView.vue'),
    },
    {
      path: 'products/:productId',
      name: 'admin-product',
      props: true,
      component: () => import('@/modules/admin/views/ProductView.vue'),
    },
  ],
};
