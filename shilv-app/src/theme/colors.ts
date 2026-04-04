export const COLORS = {
  bg: '#F8FAF9',
  surface: '#FFFFFF',
  primary: '#2D5A47',
  primaryLight: '#E3EFEA',
  text: '#191C1C',
  subText: '#5D6661',
  muted: '#E6ECE9',
  accent: '#E8C16A',
  amber: '#E8A74D',
  danger: '#C75450',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Phase colors for calendar
  phase1: '#E8A74D',   // 蓄势 amber
  phase2: '#2D5A47',   // 精进 green
  phase3: '#8FAE9B',   // 巩固 sage

  // Task priority badges
  badgeHigh: '#2D5A47',
  badgeMid: '#5D6661',
  badgeFocus: '#2D5A47',
} as const;

export const RADIUS = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;
