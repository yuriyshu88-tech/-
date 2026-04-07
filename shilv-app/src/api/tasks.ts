import { get, post } from './client';
import type {
  IgnoreParams,
  RegenerateParams,
  TaskItem,
  TodayTasksResult,
} from './types';

export function getTodayTasks(): Promise<TodayTasksResult> {
  return get<TodayTasksResult>('/api/tasks/today');
}

export function completeTask(taskId: string): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/api/tasks/${taskId}/complete`);
}

export function ignoreTask(
  taskId: string,
  params: IgnoreParams,
): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/api/tasks/${taskId}/ignore`, params);
}

export function regenerateTasks(
  params: RegenerateParams,
): Promise<{ tasks: TaskItem[]; adjustment_note: string }> {
  return post<{ tasks: TaskItem[]; adjustment_note: string }>(
    '/api/tasks/regenerate',
    params,
  );
}
