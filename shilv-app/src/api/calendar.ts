import { get } from './client';
import type { CalendarDayDetail, CalendarMonthResult } from './types';

export function getCalendarMonth(
  year: number,
  month: number,
): Promise<CalendarMonthResult> {
  return get<CalendarMonthResult>(
    `/api/calendar/month?year=${year}&month=${month}`,
  );
}

export function getCalendarDay(date: string): Promise<CalendarDayDetail> {
  return get<CalendarDayDetail>(`/api/calendar/day/${date}`);
}
