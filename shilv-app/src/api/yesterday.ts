import { get, post } from './client';
import type { ResolveParams, YesterdayTask } from './types';

export function getYesterdayTasks(): Promise<{ tasks: YesterdayTask[] }> {
  return get<{ tasks: YesterdayTask[] }>('/api/yesterday/tasks');
}

export function resolveYesterdayTask(
  taskId: string,
  params: ResolveParams,
): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(
    `/api/yesterday/tasks/${taskId}/resolve`,
    params,
  );
}

export function confirmYesterday(): Promise<{ success: boolean }> {
  return post<{ success: boolean }>('/api/yesterday/confirm');
}
