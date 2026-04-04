import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        {/* Success Banner */}
        <View style={styles.successBanner}>
          <Ionicons name="checkmark-circle" size={40} color={COLORS.primary} />
          <Text style={styles.successTitle}>方案已生成</Text>
          <Text style={styles.successSub}>
            AI 已为「{goalTitle}」定制了专属执行方案
          </Text>
        </View>

        {/* Overview Card */}
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

        {/* Phases */}
        <Text style={styles.sectionTitle}>阶段分配</Text>
        {MOCK_PLAN.phases.map((phase, i) => (
          <View key={i} style={styles.phaseCard}>
            <View style={[styles.phaseDot, { backgroundColor: phase.color }]} />
            <View style={styles.phaseContent}>
              <View style={styles.phaseHeader}>
                <Text style={styles.phaseName}>{phase.name}</Text>
                <Text style={styles.phaseDays}>{phase.days}</Text>
              </View>
              <Text style={styles.phaseDesc}>{phase.description}</Text>
            </View>
          </View>
        ))}

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
      </ScrollView>

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
  scroll: { flex: 1 },
  scrollPad: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  successBanner: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  successSub: {
    fontSize: 14,
    color: COLORS.subText,
    textAlign: 'center',
    lineHeight: 20,
  },
  overviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  overviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
  },
  overviewLabel: {
    fontSize: 12,
    color: COLORS.subText,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.muted,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.subText,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  phaseCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    alignItems: 'flex-start',
  },
  phaseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  phaseContent: {
    flex: 1,
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  phaseName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  phaseDays: {
    fontSize: 13,
    color: COLORS.subText,
  },
  phaseDesc: {
    fontSize: 13,
    color: COLORS.subText,
  },
  taskPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  taskNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  taskText: {
    flex: 1,
    fontSize: 15,
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
    paddingVertical: 18,
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
