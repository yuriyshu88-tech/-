import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';
import { MOCK_PLAN } from '../mock/data';

export function PlanResultScreen() {
  const setRoute = useAppStore((s) => s.setRoute);
  const goalTitle = useAppStore((s) => s.goalTitle);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>时律</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.body}>
        {/* Success Banner */}
        <View style={styles.successBanner}>
          <Ionicons name="checkmark-circle" size={32} color={COLORS.primary} />
          <Text style={styles.successTitle}>方案已生成</Text>
          <Text style={styles.successSub}>
            AI 已为「{goalTitle}」定制了专属执行方案
          </Text>
        </View>

        {/* Overview Stats */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewRow}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>{MOCK_PLAN.totalDays}</Text>
              <Text style={styles.overviewLabel}>总天数</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>{MOCK_PLAN.phases.length}</Text>
              <Text style={styles.overviewLabel}>阶段</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>3</Text>
              <Text style={styles.overviewLabel}>每日任务</Text>
            </View>
          </View>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.subText} />
            <Text style={styles.dateText}>
              {MOCK_PLAN.startDate} → {MOCK_PLAN.endDate}
            </Text>
          </View>
        </View>

        {/* Phases — compact inline */}
        <View style={styles.phasesRow}>
          {MOCK_PLAN.phases.map((phase, i) => (
            <View key={i} style={styles.phaseChip}>
              <View style={[styles.phaseDot, { backgroundColor: phase.color }]} />
              <Text style={styles.phaseChipName}>{phase.name}</Text>
              <Text style={styles.phaseChipDays}>{phase.days}</Text>
            </View>
          ))}
        </View>

        {/* Today's Tasks */}
        <Text style={styles.sectionTitle}>今日任务预览</Text>
        {MOCK_PLAN.todayTasks.map((task, i) => (
          <View key={i} style={styles.taskPreview}>
            <View style={styles.taskNum}>
              <Text style={styles.taskNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.taskText}>{task}</Text>
          </View>
        ))}
      </View>

      {/* CTA */}
      <View style={styles.bottomArea}>
        <Pressable style={styles.ctaBtn} onPress={() => setRoute('main')}>
          <Text style={styles.ctaText}>开始执行</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  successBanner: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  successSub: {
    fontSize: 13,
    color: COLORS.subText,
    textAlign: 'center',
    lineHeight: 18,
  },
  overviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
  },
  overviewLabel: {
    fontSize: 11,
    color: COLORS.subText,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.muted,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.subText,
  },
  phasesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  phaseChip: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    paddingHorizontal: 8,
    gap: 4,
  },
  phaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phaseChipName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  phaseChipDays: {
    fontSize: 11,
    color: COLORS.subText,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  taskPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 6,
    gap: 10,
  },
  taskNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskNumText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 8,
  },
  ctaBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 17,
  },
});
