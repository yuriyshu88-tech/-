import { useEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';
import { ProgressBar } from '../components/ProgressBar';
import { TaskCard } from '../components/TaskCard';
import { IgnoreReasonModal } from '../components/IgnoreReasonModal';
import { RegenReasonModal } from '../components/RegenReasonModal';

export function TaskScreen() {
  const goalTitle = useAppStore((s) => s.goalTitle);
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const openIgnoreModal = useAppStore((s) => s.openIgnoreModal);
  const openRegenModal = useAppStore((s) => s.openRegenModal);
  const deleteGoal = useAppStore((s) => s.deleteGoal);
  const triggerAdjustment = useAppStore((s) => s.triggerAdjustment);
  const showAdjustment = useAppStore((s) => s.showAdjustment);
  const adjustmentNote = useAppStore((s) => s.adjustmentNote);
  const dismissAdjustment = useAppStore((s) => s.dismissAdjustment);

  const totalCount = tasks.length;
  const progressPct = Math.round((8 / 21) * 100); // Mock: 8 of 21 days

  // Show AI adjustment alert after regen (useEffect to avoid repeated alerts)
  useEffect(() => {
    if (showAdjustment && adjustmentNote) {
      Alert.alert('AI 调整说明', adjustmentNote, [{ text: '确定', onPress: dismissAdjustment }]);
    }
  }, [showAdjustment, adjustmentNote, dismissAdjustment]);

  const handleAdjust = () => {
    Alert.alert('需要调整', '语音功能演示中，已模拟触发 AI 调整', [
      {
        text: '好的',
        onPress: () => {
          triggerAdjustment('voice input');
        },
      },
    ]);
  };

  const handleDeleteGoal = () => {
    Alert.alert('删除目标', '确定要删除当前长期目标吗？所有进度将被清除。', [
      { text: '取消', style: 'cancel' },
      { text: '删除', style: 'destructive', onPress: deleteGoal },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header — title only */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>时律</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        {/* Goal Summary Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalTop}>
            <View style={styles.goalLeft}>
              <Text style={styles.goalLabel}>LONG TERM GOAL</Text>
              <Text style={styles.goalTitle}>{goalTitle || '学习流畅粤语'}</Text>
            </View>
            <View style={styles.goalRight}>
              <Text style={styles.goalPct}>{progressPct}%</Text>
              <Text style={styles.goalPctLabel}>PROGRESS</Text>
            </View>
          </View>
          <ProgressBar progress={progressPct / 100} height={6} />
          <View style={styles.goalDates}>
            <View style={styles.goalDateItem}>
              <Ionicons name="calendar-outline" size={14} color={COLORS.subText} />
              <Text style={styles.goalDateText}>始于 04.28</Text>
            </View>
            <Pressable style={styles.deleteBtn} onPress={handleDeleteGoal}>
              <Ionicons name="trash-outline" size={14} color={COLORS.danger} />
              <Text style={styles.deleteBtnText}>删除目标</Text>
            </Pressable>
          </View>
        </View>

        {/* Adjust entry (renamed from 声纹策略校准) */}
        <Pressable style={styles.adjustEntry} onPress={handleAdjust}>
          <Ionicons name="mic-outline" size={22} color={COLORS.primary} />
          <View style={styles.adjustEntryContent}>
            <Text style={styles.adjustEntryTitle}>需要调整</Text>
            <Text style={styles.adjustEntrySub}>即时调整今日任务负荷</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.subText} />
        </Pressable>

        {/* Tasks Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>今日三要事</Text>
          <Text style={styles.sectionCount}>{totalCount} 任务待办</Text>
        </View>

        {/* Task Cards */}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDone={() => toggleTask(task.id)}
            onIgnore={() => openIgnoreModal(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-circle-outline" size={36} color={COLORS.primary} />
            <Text style={styles.emptyText}>今日任务已全部完成</Text>
          </View>
        )}

        {/* Regenerate */}
        <Pressable style={styles.regenBtn} onPress={openRegenModal}>
          <Ionicons name="refresh-outline" size={16} color={COLORS.primary} />
          <Text style={styles.regenText}>重新生成今日任务</Text>
        </Pressable>

        {/* Bottom Cards */}
        <View style={styles.bottomCards}>
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>"语言是文化的地图。"</Text>
          </View>
          <View style={styles.growthCard}>
            <Text style={styles.growthLabel}>GROWTH</Text>
            <Text style={styles.growthValue}>+42</Text>
          </View>
        </View>
      </ScrollView>

      <IgnoreReasonModal />
      <RegenReasonModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scroll: { flex: 1 },
  scrollPad: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  // Goal Card
  goalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  goalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalLeft: { flex: 1 },
  goalLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.subText,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  goalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  goalRight: {
    alignItems: 'flex-end',
  },
  goalPct: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  goalPctLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.subText,
    letterSpacing: 1,
  },
  goalDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalDateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  goalDateText: {
    fontSize: 12,
    color: COLORS.subText,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteBtnText: {
    fontSize: 12,
    color: COLORS.danger,
    fontWeight: '600',
  },

  // Adjust entry
  adjustEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  adjustEntryContent: { flex: 1 },
  adjustEntryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  adjustEntrySub: {
    fontSize: 12,
    color: COLORS.subText,
  },

  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  sectionCount: {
    fontSize: 13,
    color: COLORS.subText,
  },

  // Empty
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 30,
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.subText,
    fontWeight: '600',
  },

  // Regen
  regenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginBottom: 16,
  },
  regenText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Bottom
  bottomCards: {
    flexDirection: 'row',
    gap: 12,
  },
  quoteCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 14,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  growthCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.subText,
    letterSpacing: 1,
  },
  growthValue: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
  },
});
