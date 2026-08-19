// oxlint-disable no-unused-expressions
import type { RouteLocationNormalized } from 'vue-router';
import { AuthStatus } from '../Interfaces';
import { useAuthStore } from '../stores/auth.store';

const isAuthenticatedGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();
  return authStore.authStatus === AuthStatus.UNAUTHENTICATED ? { name: 'home' } : true;
};

export default isAuthenticatedGuard;
