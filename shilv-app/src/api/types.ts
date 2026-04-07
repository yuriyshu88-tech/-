// ─── Unified API Response ──────────────────────────
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

// ─── Auth ──────────────────────────────────────────
export interface GuestInitParams {
  device_id: string;
  platform: 'ios' | 'android';
}

export interface AuthResult {
  token: string;
  user_id: string;
  is_guest: boolean;
  nickname?: string;
  avatar_url?: string;
}

export interface RegisterParams {
  account: string;
  password: string;
  nickname?: string;
}

export interface LoginParams {
  account: string;
  password: string;
}

// ─── Launch ────────────────────────────────────────
export interface LaunchStatus {
  has_goal: boolean;
  need_yesterday_confirm: boolean;
}

// ─── Goal ──────────────────────────────────────────
export interface ClarifyOption {
  id: string;
  label: string;
  description: string;
}

export interface ClarifyQuestion {
  question_index: number;
  title: string;
  description: string;
  options: ClarifyOption[];
}

export interface GoalCreateResult {
  goal_id: string;
  first_question: ClarifyQuestion;
}

export interface ClarifyNextParams {
  question_index: number;
  selected_option: 'A' | 'B' | 'C' | 'D';
  custom_text?: string;
}

export interface PhaseInfo {
  name: string;
  days: number;
  description: string;
  color: string;
}

export interface ClarifySubmitResult {
  total_days: number;
  start_date: string;
  end_date: string;
  phases: PhaseInfo[];
  today_tasks: string[];
}

export interface GoalCurrent {
  goal_id: string;
  title: string;
  total_days: number;
  start_date: string;
  end_date: string;
  current_day: number;
  remaining_days: number;
  completion_rate: number;
  phases: PhaseInfo[];
}

// ─── Tasks ─────────────────────────────────────────
export interface TaskItem {
  id: string;
  title: string;
  icon: string;
  priority: 'HIGH' | 'MID' | 'FOCUS';
  done: boolean;
}

export interface TodayTasksResult {
  tasks: TaskItem[];
  adjustment_note: string | null;
}

export interface IgnoreParams {
  reason: string;
  reason_text?: string;
}

export interface RegenerateParams {
  reason: string;
  reason_text?: string;
}

// ─── Yesterday ─────────────────────────────────────
export interface YesterdayTask {
  id: string;
  title: string;
  icon: string;
  category: string;
  subtitle: string;
  resolved: boolean;
  action: 'done' | 'ignore' | null;
}

export interface ResolveParams {
  action: 'done' | 'ignore';
  ignore_reason?: string;
}

// ─── Calendar ──────────────────────────────────────
export interface CalendarDay {
  date: string;
  phase: number;
  completed: boolean;
}

export interface CalendarPhase {
  name: string;
  label: string;
  color: string;
}

export interface CalendarMonthResult {
  progress: {
    completed_days: number;
    total_days: number;
  };
  phases: CalendarPhase[];
  days: CalendarDay[];
}

export interface CalendarDayDetail {
  date: string;
  phase_name: string;
  phase_number: number;
  tasks: { title: string; duration: string; icon: string }[];
}

// ─── User ──────────────────────────────────────────
export interface UserProfile {
  user_id: string;
  nickname: string;
  avatar_url: string;
  is_guest: boolean;
  is_member: boolean;
  stats: {
    ongoing: number;
    completion_rate: number;
    streak: number;
  };
}
