import { get } from './client';
import type { UserProfile } from './types';

export function getUserProfile(): Promise<UserProfile> {
  return get<UserProfile>('/api/user/profile');
}
