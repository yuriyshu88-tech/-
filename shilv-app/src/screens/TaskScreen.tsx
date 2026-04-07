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
  const goalCurrent = useAppStore((s) => s.goalCurrent);
  const goalTitle = useAppStore((s) => s.goalTitle);
  const tasks = useAppStore((s) => s.tasks);
  const adjustmentNote = useAppStore((s) => s.adjustmentNote);
  const completeTask = useAppStore((s) => s.completeTask);
  const openIgnoreModal = useAppStore((s) => s.openIgnoreModal);
  const openRegenModal = useAppStore((s) => s.openRegenModal);
  const removeGoal = useAppStore((s) => s.removeGoal);
  const fetchTodayTasks = useAppStore((s) => s.fetchTodayTasks);
  const fetchGoalCurrent = useAppStore((s) => s.fetchGoalCurrent);

  useEffect(() => {
    fetchGoalCurrent();
    fetchTodayTasks();
  }, [fetchGoalCurrent, fetchTodayTasks]);

  // Show AI adjustment note
  useEffect(() => {
    if (adjustmentNote) {
      Alert.alert('AI 调整说明', adjustmentNote);
    }
  }, [adjustmentNote]);

  const progressPct = goalCurrent?.completion_rate ?? 0;
  const startDate = goalCurrent?.start_date ?? '';
  const totalCount = tasks.length;

  const handleDeleteGoal = () => {
    Alert.alert('删除目标', '确定要删除当前长期目标吗？所有进度将被清除。', [
      { text: '取消', style: 'cancel' },
      { text: '删除', style: 'destructive', onPress: removeGoal },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>时律</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        <View style={styles.goalCard}>
          <View style={styles.goalTop}>
            <View style={styles.goalLeft}>
              <Text style={styles.goalLabel}>LONG TERM GOAL</Text>
              <Text style={styles.goalTitle}>{goalTitle || '加载中...'}</Text>
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
              <Text style={styles.goalDateText}>
                始于 {startDate ? startDate.slice(5).replace('-', '.') : '--'}
              </Text>
            </View>
            <Pressable style={styles.deleteBtn} onPress={handleDeleteGoal}>
              <Ionicons name="trash-outline" size={14} color={COLORS.danger} />
              <Text style={styles.deleteBtnText}>删除目标</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>今日三要事</Text>
          <Text style={styles.sectionCount}>{totalCount} 任务待办</Text>
        </View>

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDone={() => completeTask(task.id)}
            onIgnore={() => openIgnoreModal(task.id)}
          />
        ))}

        {tasks.length === 0 && (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-circle-outline" size={36} color={COLORS.primary} />
            <Text style={styles.emptyText}>今日任务已全部完成</Text>
          </View>
        )}

        <Pressable style={styles.regenBtn} onPress={openRegenModal}>
          <Ionicons name="refresh-outline" size={16} color={COLORS.primary} />
          <Text style={styles.regenText}>重新生成今日任务</Text>
        </Pressable>
      </ScrollView>

      <IgnoreReasonModal />
      <RegenReasonModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  scroll: { flex: 1 },
  scrollPad: { paddingHorizontal: 20, paddingBottom: 16 },
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
  goalTop: { flexDirection: 'row', justifyContent: 'space-between' },
  goalLeft: { flex: 1 },
  goalLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.subText,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  goalTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  goalRight: { alignItems: 'flex-end' },
  goalPct: { fontSize: 28, fontWeight: '800', color: COLORS.primary },
  goalPctLabel: { fontSize: 9, fontWeight: '600', color: COLORS.subText, letterSpacing: 1 },
  goalDates: { flexDirection: 'row', justifyContent: 'space-between' },
  goalDateItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  goalDateText: { fontSize: 12, color: COLORS.subText },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deleteBtnText: { fontSize: 12, color: COLORS.danger, fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  sectionCount: { fontSize: 13, color: COLORS.subText },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 30,
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  emptyText: { fontSize: 15, color: COLORS.subText, fontWeight: '600' },
  regenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginBottom: 16,
  },
  regenText: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
});
