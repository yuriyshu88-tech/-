import { get, post } from './client';
import { setToken } from './token';
import type {
  AuthResult,
  GuestInitParams,
  LaunchStatus,
  LoginParams,
  RegisterParams,
} from './types';

export async function guestInit(params: GuestInitParams): Promise<AuthResult> {
  const data = await post<AuthResult>('/api/auth/guest-init', params);
  await setToken(data.token);
  return data;
}

export async function register(params: RegisterParams): Promise<AuthResult> {
  const data = await post<AuthResult>('/api/auth/register', params);
  await setToken(data.token);
  return data;
}

export async function login(params: LoginParams): Promise<AuthResult> {
  const data = await post<AuthResult>('/api/auth/login', params);
  await setToken(data.token);
  return data;
}

export async function logout(): Promise<AuthResult> {
  const data = await post<AuthResult>('/api/auth/logout');
  await setToken(data.token);
  return data;
}

export function getLaunchStatus(): Promise<LaunchStatus> {
  return get<LaunchStatus>('/api/launch/status');
}
