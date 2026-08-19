// oxlint-disable no-unused-expressions
import type { RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../Interfaces';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();
  return authStore.authStatus === AuthStatus.AUTHENTICATED ? { name: 'home' } : true;
};

export default isNotAuthenticatedGuard;
