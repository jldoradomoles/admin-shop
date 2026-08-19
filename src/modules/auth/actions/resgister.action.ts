import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../Interfaces';
import { isAxiosError } from 'axios';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  token: string;
  user: User;
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterSuccess | RegisterError> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      token: data.token,
      user: data.user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo registrar, intente de nuevo',
    };
  }
};
