import { create } from 'zustand';
import { Alert, Platform } from 'react-native';
import { authApi, goalApi, tasksApi, yesterdayApi, calendarApi, userApi, ApiError, getToken } from '../api';
import type {
  TaskItem,
  YesterdayTask,
  ClarifyQuestion,
  ClarifySubmitResult,
  GoalCurrent,
  CalendarMonthResult,
  CalendarDayDetail,
  UserProfile,
} from '../api/types';
import { IGNORE_REASONS, REGEN_REASONS } from '../mock/data';

// ─── Route Types ──────────────────────────────
export type AppRoute =
  | 'splash'
  | 'newGoal'
  | 'clarify'
  | 'planResult'
  | 'yesterday'
  | 'login'
  | 'register'
  | 'main';

export type MainTab = 'tasks' | 'calendar' | 'profile';

// ─── State Shape ──────────────────────────────
interface AppState {
  // Routing
  route: AppRoute;
  tab: MainTab;
  setRoute: (r: AppRoute) => void;
  setTab: (t: MainTab) => void;

  // Auth
  isGuest: boolean;
  userId: string;
  nickname: string;
  avatarUrl: string;

  // Loading
  loading: boolean;

  // Init & Launch
  initApp: () => Promise<void>;

  // Auth actions
  doRegister: (account: string, password: string, nickname?: string) => Promise<void>;
  doLogin: (account: string, password: string) => Promise<void>;
  doLogout: () => Promise<void>;

  // Goal
  hasGoal: boolean;
  goalId: string;
  goalTitle: string;
  goalInput: string;
  goalCurrent: GoalCurrent | null;
  setGoalInput: (text: string) => void;
  submitGoal: () => Promise<void>;
  confirmGoalPlan: () => Promise<void>;
  removeGoal: () => Promise<void>;
  fetchGoalCurrent: () => Promise<void>;

  // Clarify
  clarifyStep: number;
  currentQuestion: ClarifyQuestion | null;
  planResult: ClarifySubmitResult | null;
  clarifySelectedOption: string | null;
  clarifyCustomText: string;
  setClarifyOption: (option: string) => void;
  setClarifyCustomText: (text: string) => void;
  submitClarifyAnswer: () => Promise<void>;
  prevClarifyStep: () => void;

  // Tasks
  tasks: TaskItem[];
  adjustmentNote: string | null;
  fetchTodayTasks: () => Promise<void>;
  completeTask: (id: string) => Promise<void>;

  // Ignore modal
  ignoreModalVisible: boolean;
  ignoreTargetId: string | null;
  openIgnoreModal: (taskId: string) => void;
  closeIgnoreModal: () => void;
  submitIgnore: (reason: string, reasonText?: string) => Promise<void>;

  // Regen modal
  regenModalVisible: boolean;
  openRegenModal: () => void;
  closeRegenModal: () => void;
  submitRegen: (reason: string, reasonText?: string) => Promise<void>;

  // Yesterday
  yesterdayTasks: YesterdayTask[];
  needsYesterdayConfirm: boolean;
  fetchYesterdayTasks: () => Promise<void>;
  resolveYesterday: (id: string, action: 'done' | 'ignore', ignoreReason?: string) => Promise<void>;
  confirmYesterday: () => Promise<void>;

  // Yesterday ignore modal
  yesterdayIgnoreModalVisible: boolean;
  yesterdayIgnoreTargetId: string | null;
  openYesterdayIgnoreModal: (taskId: string) => void;
  closeYesterdayIgnoreModal: () => void;

  // Calendar
  calendarData: CalendarMonthResult | null;
  calendarYear: number;
  calendarMonth: number;
  selectedDate: string;
  selectedDayDetail: CalendarDayDetail | null;
  setSelectedDate: (d: string) => void;
  fetchCalendarMonth: (year: number, month: number) => Promise<void>;
  fetchCalendarDay: (date: string) => Promise<void>;
  prevMonth: () => void;
  nextMonth: () => void;

  // Profile
  profile: UserProfile | null;
  fetchProfile: () => Promise<void>;
}

// ─── Error handler ────────────────────────────
function handleApiError(error: unknown, set: (partial: Partial<AppState>) => void) {
  if (error instanceof ApiError) {
    if (error.code === 1002) {
      // Token expired — back to splash to re-init
      set({ route: 'splash' });
      return;
    }
    Alert.alert('提示', error.message);
  } else {
    Alert.alert('网络错误', '请检查网络连接后重试');
  }
}

// ─── Store ────────────────────────────────────
export const useAppStore = create<AppState>((set, get) => ({
  // ─── Routing ──────────────────────────────
  route: 'splash',
  tab: 'tasks',
  setRoute: (r) => set({ route: r }),
  setTab: (t) => set({ tab: t }),

  // ─── Auth ─────────────────────────────────
  isGuest: true,
  userId: '',
  nickname: '',
  avatarUrl: '',

  // ─── Loading ──────────────────────────────
  loading: false,

  // ─── Init ─────────────────────────────────
  initApp: async () => {
    try {
      // Check if we already have a token
      const existingToken = await getToken();

      if (!existingToken) {
        // First launch — guest init
        const auth = await authApi.guestInit({
          device_id: `device_${Date.now()}`,
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
        });
        set({ isGuest: auth.is_guest, userId: auth.user_id });
      }

      // Check launch status
      const status = await authApi.getLaunchStatus();

      if (!status.has_goal) {
        set({ hasGoal: false, route: 'newGoal' });
      } else if (status.need_yesterday_confirm) {
        set({ hasGoal: true, needsYesterdayConfirm: true, route: 'yesterday' });
      } else {
        set({ hasGoal: true, needsYesterdayConfirm: false, route: 'main' });
      }
    } catch (error) {
      // If token is invalid, clear and retry as guest
      if (error instanceof ApiError && error.code === 1002) {
        const { clearToken } = await import('../api/token');
        await clearToken();
        await get().initApp();
        return;
      }
      handleApiError(error, set);
    }
  },

  // ─── Auth Actions ─────────────────────────
  doRegister: async (account, password, nickname) => {
    set({ loading: true });
    try {
      const auth = await authApi.register({ account, password, nickname });
      set({
        isGuest: false,
        userId: auth.user_id,
        nickname: auth.nickname ?? '',
        loading: false,
        route: 'main',
      });
    } catch (error) {
      set({ loading: false });
      handleApiError(error, set);
    }
  },

  doLogin: async (account, password) => {
    set({ loading: true });
    try {
      const auth = await authApi.login({ account, password });
      set({
        isGuest: false,
        userId: auth.user_id,
        nickname: auth.nickname ?? '',
        loading: false,
      });
      // Re-check launch status after login
      const status = await authApi.getLaunchStatus();
      if (!status.has_goal) {
        set({ hasGoal: false, route: 'newGoal' });
      } else if (status.need_yesterday_confirm) {
        set({ hasGoal: true, needsYesterdayConfirm: true, route: 'yesterday' });
      } else {
        set({ hasGoal: true, needsYesterdayConfirm: false, route: 'main' });
      }
    } catch (error) {
      set({ loading: false });
      handleApiError(error, set);
    }
  },

  doLogout: async () => {
    try {
      const auth = await authApi.logout();
      set({
        isGuest: true,
        userId: auth.user_id,
        nickname: '',
        avatarUrl: '',
        profile: null,
        hasGoal: false,
        goalId: '',
        goalTitle: '',
        goalCurrent: null,
        tasks: [],
        calendarData: null,
      });
      // Re-check launch status
      const status = await authApi.getLaunchStatus();
      if (!status.has_goal) {
        set({ route: 'newGoal' });
      } else {
        set({ route: 'main' });
      }
    } catch (error) {
      handleApiError(error, set);
    }
  },

  // ─── Goal ─────────────────────────────────
  hasGoal: false,
  goalId: '',
  goalTitle: '',
  goalInput: '',
  goalCurrent: null,
  setGoalInput: (text) => set({ goalInput: text }),

  submitGoal: async () => {
    const { goalInput } = get();
    const title = goalInput.trim();
    if (!title) return;

    set({ loading: true });
    try {
      const result = await goalApi.createGoal(title);
      set({
        goalId: result.goal_id,
        goalTitle: title,
        hasGoal: true,
        clarifyStep: 0,
        currentQuestion: result.first_question,
        clarifySelectedOption: null,
        clarifyCustomText: '',
        planResult: null,
        loading: false,
        route: 'clarify',
      });
    } catch (error) {
      set({ loading: false });
      if (error instanceof ApiError && error.code === 2002) {
        // Already has an active goal
        Alert.alert('提示', '当前已有进行中的目标');
        set({ route: 'main', hasGoal: true });
        return;
      }
      handleApiError(error, set);
    }
  },

  confirmGoalPlan: async () => {
    const { goalId } = get();
    set({ loading: true });
    try {
      await goalApi.confirmGoal(goalId);
      set({ loading: false, route: 'main' });
    } catch (error) {
      set({ loading: false });
      handleApiError(error, set);
    }
  },

  removeGoal: async () => {
    const { goalId } = get();
    try {
      await goalApi.deleteGoal(goalId);
      set({
        hasGoal: false,
        goalId: '',
        goalTitle: '',
        goalInput: '',
        goalCurrent: null,
        tasks: [],
        route: 'newGoal',
      });
    } catch (error) {
      handleApiError(error, set);
    }
  },

  fetchGoalCurrent: async () => {
    try {
      const goal = await goalApi.getCurrentGoal();
      set({ goalCurrent: goal, goalId: goal.goal_id, goalTitle: goal.title });
    } catch (error) {
      if (error instanceof ApiError && error.code === 2001) {
        set({ hasGoal: false, route: 'newGoal' });
        return;
      }
      handleApiError(error, set);
    }
  },

  // ─── Clarify ──────────────────────────────
  clarifyStep: 0,
  currentQuestion: null,
  planResult: null,
  clarifySelectedOption: null,
  clarifyCustomText: '',
  setClarifyOption: (option) => set({ clarifySelectedOption: option }),
  setClarifyCustomText: (text) => set({ clarifyCustomText: text }),

  submitClarifyAnswer: async () => {
    const { goalId, clarifyStep, clarifySelectedOption, clarifyCustomText } = get();
    if (!clarifySelectedOption) return;

    const params = {
      question_index: clarifyStep + 1,
      selected_option: clarifySelectedOption as 'A' | 'B' | 'C' | 'D',
      custom_text: clarifySelectedOption === 'D' ? clarifyCustomText : undefined,
    };

    set({ loading: true });
    try {
      const isLast = clarifyStep === 4; // 5 questions total (0-4)
      if (isLast) {
        const result = await goalApi.clarifySubmit(goalId, params);
        set({
          planResult: result,
          loading: false,
          route: 'planResult',
        });
      } else {
        const nextQ = await goalApi.clarifyNext(goalId, params);
        set({
          clarifyStep: clarifyStep + 1,
          currentQuestion: nextQ,
          clarifySelectedOption: null,
          clarifyCustomText: '',
          loading: false,
        });
      }
    } catch (error) {
      set({ loading: false });
      handleApiError(error, set);
    }
  },

  prevClarifyStep: () => {
    const { clarifyStep } = get();
    if (clarifyStep > 0) {
      set({ clarifyStep: clarifyStep - 1, clarifySelectedOption: null, clarifyCustomText: '' });
    }
  },

  // ─── Tasks ────────────────────────────────
  tasks: [],
  adjustmentNote: null,

  fetchTodayTasks: async () => {
    try {
      const result = await tasksApi.getTodayTasks();
      set({ tasks: result.tasks, adjustmentNote: result.adjustment_note });
    } catch (error) {
      if (error instanceof ApiError && error.code === 1001) {
        // Yesterday tasks not confirmed
        set({ needsYesterdayConfirm: true, route: 'yesterday' });
        return;
      }
      handleApiError(error, set);
    }
  },

  completeTask: async (id) => {
    const { tasks } = get();
    // Optimistic update
    set({
      tasks: tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    });
    try {
      await tasksApi.completeTask(id);
    } catch (error) {
      // Rollback
      set({
        tasks: tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      });
      handleApiError(error, set);
    }
  },

  // ─── Ignore Modal ─────────────────────────
  ignoreModalVisible: false,
  ignoreTargetId: null,
  openIgnoreModal: (taskId) => set({ ignoreModalVisible: true, ignoreTargetId: taskId }),
  closeIgnoreModal: () => set({ ignoreModalVisible: false, ignoreTargetId: null }),

  submitIgnore: async (reason, reasonText) => {
    const { ignoreTargetId, tasks } = get();
    if (!ignoreTargetId) return;

    try {
      await tasksApi.ignoreTask(ignoreTargetId, {
        reason,
        reason_text: reason === '其他' ? reasonText : undefined,
      });
      set({
        tasks: tasks.filter((t) => t.id !== ignoreTargetId),
        ignoreModalVisible: false,
        ignoreTargetId: null,
      });
    } catch (error) {
      handleApiError(error, set);
    }
  },

  // ─── Regen Modal ──────────────────────────
  regenModalVisible: false,
  openRegenModal: () => set({ regenModalVisible: true }),
  closeRegenModal: () => set({ regenModalVisible: false }),

  submitRegen: async (reason, reasonText) => {
    set({ loading: true });
    try {
      const result = await tasksApi.regenerateTasks({
        reason,
        reason_text: reason === '其他' ? reasonText : undefined,
      });
      set({
        tasks: result.tasks,
        adjustmentNote: result.adjustment_note,
        regenModalVisible: false,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      handleApiError(error, set);
    }
  },

  // ─── Yesterday ────────────────────────────
  yesterdayTasks: [],
  needsYesterdayConfirm: false,

  fetchYesterdayTasks: async () => {
    try {
      const result = await yesterdayApi.getYesterdayTasks();
      set({ yesterdayTasks: result.tasks });
    } catch (error) {
      handleApiError(error, set);
    }
  },

  resolveYesterday: async (id, action, ignoreReason) => {
    try {
      await yesterdayApi.resolveYesterdayTask(id, {
        action,
        ignore_reason: action === 'ignore' ? ignoreReason : undefined,
      });
      set({
        yesterdayTasks: get().yesterdayTasks.map((t) =>
          t.id === id ? { ...t, resolved: true, action } : t,
        ),
        yesterdayIgnoreModalVisible: false,
        yesterdayIgnoreTargetId: null,
      });
    } catch (error) {
      handleApiError(error, set);
    }
  },

  confirmYesterday: async () => {
    try {
      await yesterdayApi.confirmYesterday();
      set({ needsYesterdayConfirm: false, route: 'main' });
    } catch (error) {
      handleApiError(error, set);
    }
  },

  // ─── Yesterday Ignore Modal ───────────────
  yesterdayIgnoreModalVisible: false,
  yesterdayIgnoreTargetId: null,
  openYesterdayIgnoreModal: (taskId) =>
    set({ yesterdayIgnoreModalVisible: true, yesterdayIgnoreTargetId: taskId }),
  closeYesterdayIgnoreModal: () =>
    set({ yesterdayIgnoreModalVisible: false, yesterdayIgnoreTargetId: null }),

  // ─── Calendar ─────────────────────────────
  calendarData: null,
  calendarYear: new Date().getFullYear(),
  calendarMonth: new Date().getMonth() + 1,
  selectedDate: '',
  selectedDayDetail: null,

  setSelectedDate: (d) => set({ selectedDate: d }),

  fetchCalendarMonth: async (year, month) => {
    try {
      const data = await calendarApi.getCalendarMonth(year, month);
      set({ calendarData: data, calendarYear: year, calendarMonth: month });
    } catch (error) {
      handleApiError(error, set);
    }
  },

  fetchCalendarDay: async (date) => {
    try {
      const detail = await calendarApi.getCalendarDay(date);
      set({ selectedDayDetail: detail, selectedDate: date });
    } catch (error) {
      handleApiError(error, set);
    }
  },

  prevMonth: () => {
    const { calendarYear, calendarMonth, fetchCalendarMonth } = get();
    const newMonth = calendarMonth === 1 ? 12 : calendarMonth - 1;
    const newYear = calendarMonth === 1 ? calendarYear - 1 : calendarYear;
    fetchCalendarMonth(newYear, newMonth);
  },

  nextMonth: () => {
    const { calendarYear, calendarMonth, fetchCalendarMonth } = get();
    const newMonth = calendarMonth === 12 ? 1 : calendarMonth + 1;
    const newYear = calendarMonth === 12 ? calendarYear + 1 : calendarYear;
    fetchCalendarMonth(newYear, newMonth);
  },

  // ─── Profile ──────────────────────────────
  profile: null,

  fetchProfile: async () => {
    try {
      const data = await userApi.getUserProfile();
      set({
        profile: data,
        isGuest: data.is_guest,
        nickname: data.nickname,
        avatarUrl: data.avatar_url,
        userId: data.user_id,
      });
    } catch (error) {
      handleApiError(error, set);
    }
  },
}));
