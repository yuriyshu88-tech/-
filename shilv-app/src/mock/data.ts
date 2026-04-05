export interface TaskItem {
  id: string;
  title: string;
  icon: string;
  priority: 'HIGH' | 'MID' | 'FOCUS';
  done: boolean;
}

export interface YesterdayTask {
  id: string;
  title: string;
  icon: string;
  category: string;
  subtitle: string;
  resolved: boolean;
  action?: 'done' | 'ignore';
}

export interface ClarifyOption {
  id: string;
  label: string;
  description: string;
}

export interface ClarifyQuestion {
  id: number;
  title: string;
  description: string;
  options: ClarifyOption[];
  suggestion?: { cycle: string; endDate: string };
}

export interface PhaseInfo {
  name: string;
  label: string;
  color: string;
}

export interface CalendarDayInfo {
  date: string;
  phase: number;
  completed: boolean;
  tasks: { title: string; duration: string; icon: string }[];
}

// ─── Clarify Questions ──────────────────────────────
export const CLARIFY_QUESTIONS: ClarifyQuestion[] = [
  {
    id: 1,
    title: '你的目标执行频率是？',
    description: '选择最适合您当前生活节奏的频率，我们将为您智能规划阶段性目标。',
    options: [
      { id: 'A', label: '每天', description: '建立持续的肌肉记忆，追求极致改变' },
      { id: 'B', label: '每周 3-4 次', description: '平衡工作与自律，柔性推进目标' },
      { id: 'C', label: '周末', description: '专注深度沉浸，利用大块时间突破' },
      { id: 'D', label: '其他（手动输入）', description: '自定义你的节奏' },
    ],
    suggestion: { cycle: '21 天', endDate: '2024-05-20' },
  },
  {
    id: 2,
    title: '你更希望每天投入多久？',
    description: '合理的时间分配能让你走得更远。',
    options: [
      { id: 'A', label: '15 分钟', description: '碎片化学习，适合忙碌日程' },
      { id: 'B', label: '30 分钟', description: '均衡投入，效果与时间兼顾' },
      { id: 'C', label: '45 分钟+', description: '深度沉浸，追求高效进步' },
      { id: 'D', label: '其他（手动输入）', description: '自定义投入时间' },
    ],
    suggestion: { cycle: '21 天', endDate: '2024-05-20' },
  },
  {
    id: 3,
    title: '你偏好的学习时段是？',
    description: '选择你精力最充沛的时间段，提升执行效率。',
    options: [
      { id: 'A', label: '早晨（6:00-10:00）', description: '头脑清醒，适合高强度任务' },
      { id: 'B', label: '中午（11:00-14:00）', description: '利用午休间隙，轻量推进' },
      { id: 'C', label: '晚上（19:00-23:00）', description: '一天结束后的自我时间' },
      { id: 'D', label: '其他（手动输入）', description: '自定义学习时段' },
    ],
    suggestion: { cycle: '21 天', endDate: '2024-05-20' },
  },
  {
    id: 4,
    title: '你更偏好的任务类型是？',
    description: '了解你的学习偏好，AI 会据此调配任务比例。',
    options: [
      { id: 'A', label: '输入型（听/读）', description: '先大量吸收，建立知识基础' },
      { id: 'B', label: '输出型（说/写）', description: '以练代学，在实践中巩固' },
      { id: 'C', label: '混合型', description: '输入+输出交替，全面发展' },
      { id: 'D', label: '其他（手动输入）', description: '自定义任务类型' },
    ],
    suggestion: { cycle: '21 天', endDate: '2024-05-20' },
  },
  {
    id: 5,
    title: '遇到中断时，你希望系统如何处理？',
    description: '生活总有意外，我们帮你做好应急预案。',
    options: [
      { id: 'A', label: '自动顺延到次日', description: '不给自己额外压力，从容应对' },
      { id: 'B', label: '当天缩短任务量', description: '保持节奏不断，灵活调整' },
      { id: 'C', label: '保留并提醒补做', description: '不放过每一个任务，严格执行' },
      { id: 'D', label: '其他（手动输入）', description: '自定义中断处理方式' },
    ],
    suggestion: { cycle: '21 天', endDate: '2024-05-20' },
  },
];

// ─── Tasks ──────────────────────────────────────────
export const PRIMARY_TASKS: TaskItem[] = [
  { id: 't1', title: 'AI 基础概念认读', icon: 'book', priority: 'HIGH', done: false },
  { id: 't2', title: '精读机器学习入门文章', icon: 'document-text', priority: 'MID', done: false },
  { id: 't3', title: '动手实践 Python 数据处理', icon: 'code-slash', priority: 'FOCUS', done: false },
];

export const REGEN_TASKS: TaskItem[] = [
  { id: 'r1', title: '观看 AI 科普视频 20 分钟', icon: 'tv', priority: 'HIGH', done: false },
  { id: 'r2', title: '整理学习笔记', icon: 'create', priority: 'MID', done: false },
  { id: 'r3', title: '完成课后练习题', icon: 'checkmark-circle', priority: 'FOCUS', done: false },
];

export const YESTERDAY_TASKS: YesterdayTask[] = [
  {
    id: 'y1',
    title: '阅读《深度学习入门》第2章',
    icon: 'book',
    category: '阅读',
    subtitle: '原定于昨日 18:00 完成',
    resolved: false,
  },
  {
    id: 'y2',
    title: '完成 Python 基础练习',
    icon: 'code-slash',
    category: '实践',
    subtitle: '进度：已完成 60%',
    resolved: true,
    action: 'done',
  },
];

// ─── Ignore Reasons ─────────────────────────────────
export const IGNORE_REASONS = [
  '太难了',
  '不想做',
  '不相关',
  '时间不够',
  '其他',
] as const;

// ─── Regenerate Reasons ─────────────────────────────
export const REGEN_REASONS = [
  '任务太难了',
  '不够有挑战',
  '想换个方向',
  '时间冲突',
  '其他',
] as const;

// ─── Plan Result (after clarify) ────────────────────
export const MOCK_PLAN = {
  totalDays: 21,
  startDate: '2024-04-29',
  endDate: '2024-05-20',
  phases: [
    { name: '蓄势期', days: '第1-8天', description: '建立基础习惯与知识储备', color: '#E8A74D' },
    { name: '精进期', days: '第9-16天', description: '强化训练与实战练习', color: '#2D5A47' },
    { name: '巩固期', days: '第17-21天', description: '回顾总结与能力巩固', color: '#8FAE9B' },
  ],
  todayTasks: [
    'AI 基础概念认读',
    '精读机器学习入门文章',
    '动手实践 Python 数据处理',
  ],
};

// ─── Calendar Data ──────────────────────────────────
export const PHASES: PhaseInfo[] = [
  { name: 'phase1', label: '蓄势', color: '#E8A74D' },
  { name: 'phase2', label: '精进', color: '#2D5A47' },
  { name: 'phase3', label: '巩固', color: '#8FAE9B' },
];

function generateCalendarData(): CalendarDayInfo[] {
  const data: CalendarDayInfo[] = [];
  const startDate = new Date(2024, 4, 1); // May 1

  for (let i = 0; i < 21; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const phase = i < 8 ? 1 : i < 16 ? 2 : 3;
    const completed = i < 8;

    const tasks =
      phase === 1
        ? [
            { title: '清晨冥想', duration: '15 min · 呼吸调节', icon: 'fitness' },
            { title: '核心知识阅读', duration: '45 min · 笔记整理', icon: 'book' },
            { title: 'AI 概念速记', duration: '20 min · 术语卡片', icon: 'chatbubbles' },
          ]
        : phase === 2
          ? [
              { title: '模型原理精读', duration: '30 min · 深度理解', icon: 'chatbubbles' },
              { title: '代码实践训练', duration: '20 min · 动手编码', icon: 'headset' },
              { title: '论文摘要整理', duration: '15 min · 归纳总结', icon: 'book' },
            ]
          : [
              { title: '综合复习', duration: '40 min · 查漏补缺', icon: 'checkmark-circle' },
              { title: '实战演练', duration: '30 min · 项目实操', icon: 'people' },
              { title: '知识输出', duration: '20 min · 写学习笔记', icon: 'book' },
            ];

    data.push({ date: dateStr, phase, completed, tasks });
  }
  return data;
}

export const CALENDAR_DATA = generateCalendarData();

// ─── Profile Stats ──────────────────────────────────
export const PROFILE = {
  name: '林木木',
  id: '88294021',
  stats: {
    ongoing: 12,
    completionRate: 94,
    streak: 42,
  },
  isMember: false,
};

// ─── AI Adjustment Notes ────────────────────────────
export const ADJUSTMENT_NOTES = [
  '已根据你的反馈调整了今日任务难度，降低了词汇量要求，增加了趣味性练习。',
  '检测到你最近精力有限，已将今日任务时长缩短 30%，并推迟了截止日期。',
  '根据你的语音输入，已重新安排了本阶段的任务重心，更侧重听力训练。',
];
