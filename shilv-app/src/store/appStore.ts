import { create } from 'zustand';
import {
  TaskItem,
  YesterdayTask,
  PRIMARY_TASKS,
  REGEN_TASKS,
  YESTERDAY_TASKS,
  ADJUSTMENT_NOTES,
} from '../mock/data';

export type AppRoute =
  | 'splash'
  | 'newGoal'
  | 'clarify'
  | 'planResult'
  | 'yesterday'
  | 'main';

export type MainTab = 'tasks' | 'calendar' | 'profile';

interface ClarifyAnswer {
  option: string;
  custom?: string;
}

interface AppState {
  // Routing
  route: AppRoute;
  tab: MainTab;
  setRoute: (r: AppRoute) => void;
  setTab: (t: MainTab) => void;

  // Goal
  hasGoal: boolean;
  goalTitle: string;
  goalInput: string;
  setGoalInput: (text: string) => void;
  commitGoal: () => void;
  deleteGoal: () => void;

  // Clarify
  clarifyStep: number;
  clarifyAnswers: Record<number, ClarifyAnswer>;
  setClarifyAnswer: (questionId: number, option: string, custom?: string) => void;
  nextClarifyStep: () => void;
  prevClarifyStep: () => void;
  resetClarify: () => void;

  // Tasks
  tasks: TaskItem[];
  toggleTask: (id: string) => void;
  ignoreTask: (id: string) => void;
  regenerateTasks: () => void;
  isRegenerated: boolean;

  // Yesterday
  yesterdayTasks: YesterdayTask[];
  resolveYesterday: (id: string, action: 'done' | 'ignore') => void;
  needsYesterdayConfirm: boolean;
  confirmYesterday: () => void;

  // Calendar
  selectedDate: string;
  setSelectedDate: (d: string) => void;

  // AI adjustment
  adjustmentNote: string | null;
  showAdjustment: boolean;
  triggerAdjustment: (reason: string) => void;
  dismissAdjustment: () => void;

  // Ignore modal
  ignoreModalVisible: boolean;
  ignoreTargetId: string | null;
  openIgnoreModal: (taskId: string) => void;
  closeIgnoreModal: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // ─── Routing ──────────────────────────────
  route: 'splash',
  tab: 'tasks',
  setRoute: (r) => set({ route: r }),
  setTab: (t) => set({ tab: t }),

  // ─── Goal ─────────────────────────────────
  hasGoal: false,
  goalTitle: '',
  goalInput: '',
  setGoalInput: (text) => set({ goalInput: text }),
  commitGoal: () =>
    set((s) => ({
      hasGoal: true,
      goalTitle: s.goalInput.trim() || '学习流畅粤语',
    })),
  deleteGoal: () =>
    set({
      hasGoal: false,
      goalTitle: '',
      goalInput: '',
      tasks: PRIMARY_TASKS.map((t) => ({ ...t, done: false })),
      isRegenerated: false,
      yesterdayTasks: YESTERDAY_TASKS.map((t) => ({ ...t })),
      needsYesterdayConfirm: false,
      route: 'newGoal',
    }),

  // ─── Clarify ──────────────────────────────
  clarifyStep: 0,
  clarifyAnswers: {},
  setClarifyAnswer: (questionId, option, custom) =>
    set((s) => ({
      clarifyAnswers: {
        ...s.clarifyAnswers,
        [questionId]: { option, custom },
      },
    })),
  nextClarifyStep: () => set((s) => ({ clarifyStep: s.clarifyStep + 1 })),
  prevClarifyStep: () => set((s) => ({ clarifyStep: Math.max(0, s.clarifyStep - 1) })),
  resetClarify: () => set({ clarifyStep: 0, clarifyAnswers: {} }),

  // ─── Tasks ────────────────────────────────
  tasks: PRIMARY_TASKS.map((t) => ({ ...t })),
  isRegenerated: false,
  toggleTask: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })),
  ignoreTask: (id) =>
    set((s) => ({
      tasks: s.tasks.filter((t) => t.id !== id),
      ignoreModalVisible: false,
      ignoreTargetId: null,
    })),
  regenerateTasks: () =>
    set((s) => {
      const next = s.isRegenerated
        ? PRIMARY_TASKS.map((t) => ({ ...t, done: false }))
        : REGEN_TASKS.map((t) => ({ ...t, done: false }));
      const note = ADJUSTMENT_NOTES[Math.floor(Math.random() * ADJUSTMENT_NOTES.length)];
      return {
        tasks: next,
        isRegenerated: !s.isRegenerated,
        adjustmentNote: note,
        showAdjustment: true,
      };
    }),

  // ─── Yesterday ────────────────────────────
  yesterdayTasks: YESTERDAY_TASKS.map((t) => ({ ...t })),
  needsYesterdayConfirm: true,
  resolveYesterday: (id, action) =>
    set((s) => ({
      yesterdayTasks: s.yesterdayTasks.map((t) =>
        t.id === id ? { ...t, resolved: true, action } : t,
      ),
    })),
  confirmYesterday: () => set({ needsYesterdayConfirm: false, route: 'main' }),

  // ─── Calendar ─────────────────────────────
  selectedDate: '2024-05-09',
  setSelectedDate: (d) => set({ selectedDate: d }),

  // ─── AI Adjustment ────────────────────────
  adjustmentNote: null,
  showAdjustment: false,
  triggerAdjustment: (reason) => {
    const note = ADJUSTMENT_NOTES[Math.floor(Math.random() * ADJUSTMENT_NOTES.length)];
    set({ adjustmentNote: note, showAdjustment: true });
  },
  dismissAdjustment: () => set({ showAdjustment: false }),

  // ─── Ignore Modal ─────────────────────────
  ignoreModalVisible: false,
  ignoreTargetId: null,
  openIgnoreModal: (taskId) => set({ ignoreModalVisible: true, ignoreTargetId: taskId }),
  closeIgnoreModal: () => set({ ignoreModalVisible: false, ignoreTargetId: null }),
}));
