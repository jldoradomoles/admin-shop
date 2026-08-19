import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../Interfaces/auth.response';
import type { User } from '../Interfaces/user.interface';
import { isAxiosError } from 'axios';

interface CheckAuthError {
  ok: false;
}

interface CheckAuthSuccess {
  ok: true;
  user: User;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckAuthSuccess | CheckAuthError> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response?.status === 401) {
      return { ok: false };
    }
    throw new Error('No se pudo verificar la autenticación, intente de nuevo');
  }
};
