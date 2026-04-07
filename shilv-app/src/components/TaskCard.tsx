import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import type { TaskItem } from '../api/types';

interface TaskCardProps {
  task: TaskItem;
  onDone: () => void;
  onIgnore: () => void;
}

const PRIORITY_MAP: Record<string, { label: string; color: string }> = {
  HIGH: { label: 'HIGH', color: COLORS.badgeHigh },
  MID: { label: 'MID', color: COLORS.badgeMid },
  FOCUS: { label: 'FOCUS', color: COLORS.badgeFocus },
};

const ICON_MAP: Record<string, string> = {
  translate: 'language',
  podcast: 'radio',
  people: 'people',
  mic: 'mic',
  tv: 'tv',
  create: 'create',
  fitness: 'fitness',
  book: 'book',
};

export function TaskCard({ task, onDone, onIgnore }: TaskCardProps) {
  const badge = PRIORITY_MAP[task.priority] ?? PRIORITY_MAP.MID;
  const iconName = ICON_MAP[task.icon] ?? 'ellipse';

  return (
    <View style={[styles.card, task.done && styles.cardDone]}>
      <View style={styles.topRow}>
        <View style={styles.iconWrap}>
          <Ionicons name={iconName as any} size={18} color={COLORS.primary} />
        </View>
        <Text style={[styles.title, task.done && styles.titleDone]} numberOfLines={1}>
          {task.title}
        </Text>
        <View style={[styles.badge, { borderColor: badge.color }]}>
          <Text style={[styles.badgeText, { color: badge.color }]}>{badge.label}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.doneBtn, task.done && styles.doneBtnDone]}
          onPress={onDone}
        >
          <Text style={[styles.doneBtnText, task.done && styles.doneBtnTextDone]}>
            {task.done ? 'UNDO' : 'DONE'}
          </Text>
        </Pressable>
        {!task.done && (
          <Pressable style={styles.ignoreBtn} onPress={onIgnore}>
            <Ionicons name="close" size={18} color={COLORS.subText} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDone: {
    opacity: 0.6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.subText,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  doneBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingVertical: 10,
    alignItems: 'center',
  },
  doneBtnDone: {
    backgroundColor: COLORS.muted,
  },
  doneBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  doneBtnTextDone: {
    color: COLORS.subText,
  },
  ignoreBtn: {
    width: 44,
    height: 40,
    backgroundColor: COLORS.muted,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
