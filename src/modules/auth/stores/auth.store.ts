import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '../Interfaces';
import { AuthStatus } from '../Interfaces/auth-status.enum';
import { loginAction, checkAuthAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/resgister.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password);
      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.AUTHENTICATED;
      return true;
    } catch (error) {
      console.log(error);
      return logout();
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResp = await registerAction(fullName, email, password);
      if (!registerResp.ok) {
        logout();
        return { ok: false, message: registerResp.message };
      }
      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.AUTHENTICATED;
      return { ok: true, message: 'Usuario registrado correctamente' };
    } catch (error) {
      console.log(error);
      return { ok: false, message: 'No se pudo registrar, intente de nuevo' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    user.value = undefined;
    token.value = '';
    authStatus.value = AuthStatus.UNAUTHENTICATED;
    console.log('logout');
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const loginResp = await checkAuthAction();
      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.AUTHENTICATED;
      return true;
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    //getters
    isChecking: computed(() => authStatus.value === AuthStatus.CHECKING),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.AUTHENTICATED),
    isNotAuthenticated: computed(() => authStatus.value === AuthStatus.UNAUTHENTICATED),

    //getters for user properties
    userName: computed(() => user.value?.fullName ?? ''),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),

    //actions
    login,
    register,
    checkAuthStatus,
    logout,
  };
});
