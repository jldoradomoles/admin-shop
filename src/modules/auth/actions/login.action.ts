import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../Interfaces';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  token: string;
  user: User;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginSuccess | LoginError> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', { email, password });

    return {
      ok: true,
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o contraseña no válidos',
      };
    }
    console.log(error);
    throw new Error('No se pudo iniciar sesión, intente de nuevo');
  }
};
