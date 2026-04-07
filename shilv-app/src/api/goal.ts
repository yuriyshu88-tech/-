import { get, post, del } from './client';
import type {
  ClarifyNextParams,
  ClarifyQuestion,
  ClarifySubmitResult,
  GoalCreateResult,
  GoalCurrent,
} from './types';

export function createGoal(title: string): Promise<GoalCreateResult> {
  return post<GoalCreateResult>('/api/goal/create', { title });
}

export function clarifyNext(
  goalId: string,
  params: ClarifyNextParams,
): Promise<ClarifyQuestion> {
  return post<ClarifyQuestion>(`/api/goal/${goalId}/clarify/next`, params);
}

export function clarifySubmit(
  goalId: string,
  params: ClarifyNextParams,
): Promise<ClarifySubmitResult> {
  return post<ClarifySubmitResult>(`/api/goal/${goalId}/clarify/submit`, params);
}

export function confirmGoal(goalId: string): Promise<{ success: boolean }> {
  return post<{ success: boolean }>(`/api/goal/${goalId}/confirm`);
}

export function getCurrentGoal(): Promise<GoalCurrent> {
  return get<GoalCurrent>('/api/goal/current');
}

export function deleteGoal(goalId: string): Promise<{ success: boolean }> {
  return del<{ success: boolean }>(`/api/goal/${goalId}`);
}
