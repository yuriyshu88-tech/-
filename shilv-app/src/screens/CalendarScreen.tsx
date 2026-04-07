import { useEffect, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';
import { ProgressBar } from '../components/ProgressBar';

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

function getPhaseColor(phase: number, phases: { color: string }[]): string {
  return phases[phase - 1]?.color ?? COLORS.muted;
}

function getCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1);
  // Monday = 0, Sunday = 6
  let dayOfWeek = firstDay.getDay() - 1;
  if (dayOfWeek < 0) dayOfWeek = 6;

  const daysInMonth = new Date(year, month, 0).getDate();

  const grid: (null | { day: number; date: string })[][] = [];
  let week: (null | { day: number; date: string })[] = [];

  for (let i = 0; i < dayOfWeek; i++) {
    week.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    week.push({ day: d, date: dateStr });
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    grid.push(week);
  }

  return grid;
}

export function CalendarScreen() {
  const calendarData = useAppStore((s) => s.calendarData);
  const calendarYear = useAppStore((s) => s.calendarYear);
  const calendarMonth = useAppStore((s) => s.calendarMonth);
  const selectedDate = useAppStore((s) => s.selectedDate);
  const selectedDayDetail = useAppStore((s) => s.selectedDayDetail);
  const fetchCalendarMonth = useAppStore((s) => s.fetchCalendarMonth);
  const fetchCalendarDay = useAppStore((s) => s.fetchCalendarDay);
  const prevMonth = useAppStore((s) => s.prevMonth);
  const nextMonth = useAppStore((s) => s.nextMonth);

  useEffect(() => {
    fetchCalendarMonth(calendarYear, calendarMonth);
  }, [fetchCalendarMonth, calendarYear, calendarMonth]);

  const calendarGrid = useMemo(
    () => getCalendarGrid(calendarYear, calendarMonth),
    [calendarYear, calendarMonth],
  );

  const phases = calendarData?.phases ?? [];
  const days = calendarData?.days ?? [];
  const progress = calendarData?.progress;
  const completedCount = progress?.completed_days ?? 0;
  const totalDays = progress?.total_days ?? 0;

  const dayLookup = useMemo(
    () => new Map(days.map((d) => [d.date, d])),
    [days],
  );

  const handleSelectDate = (date: string) => {
    fetchCalendarDay(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>时律</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>本月进度</Text>
          <Text style={styles.progressCount}>
            {completedCount} / {totalDays} 天已完成
          </Text>
        </View>
        <ProgressBar progress={totalDays > 0 ? completedCount / totalDays : 0} height={10} />

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthTitle}>{calendarYear}年 {calendarMonth}月</Text>
            <View style={styles.navBtns}>
              <Pressable hitSlop={8} onPress={prevMonth}>
                <Ionicons name="chevron-back" size={20} color={COLORS.subText} />
              </Pressable>
              <Pressable hitSlop={8} onPress={nextMonth}>
                <Ionicons name="chevron-forward" size={20} color={COLORS.subText} />
              </Pressable>
            </View>
          </View>

          <View style={styles.weekRow}>
            {WEEKDAYS.map((d) => (
              <Text key={d} style={styles.weekDay}>{d}</Text>
            ))}
          </View>

          {calendarGrid.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((cell, ci) => {
                if (!cell) {
                  return <View key={ci} style={styles.dayCell} />;
                }

                const dayData = dayLookup.get(cell.date);
                const isSelected = cell.date === selectedDate;
                const isInPlan = !!dayData;
                const isCompleted = dayData?.completed ?? false;
                const phaseColor = dayData ? getPhaseColor(dayData.phase, phases) : COLORS.muted;

                let cellBg: string = COLORS.transparent;
                let textColor: string = COLORS.subText;
                let borderColor: string = COLORS.transparent;

                if (isInPlan) {
                  if (isCompleted) {
                    cellBg = phaseColor;
                    textColor = COLORS.white;
                  } else {
                    cellBg = phaseColor + '20';
                    textColor = phaseColor;
                    borderColor = phaseColor + '40';
                  }
                }

                if (isSelected) {
                  borderColor = COLORS.text;
                }

                return (
                  <Pressable
                    key={ci}
                    style={[
                      styles.dayCell,
                      {
                        backgroundColor: cellBg,
                        borderColor,
                        borderWidth: isSelected ? 2 : borderColor !== COLORS.transparent ? 1 : 0,
                      },
                    ]}
                    onPress={() => handleSelectDate(cell.date)}
                  >
                    <Text style={[styles.dayText, { color: textColor }]}>
                      {cell.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}

          {phases.length > 0 && (
            <View style={styles.legend}>
              {phases.map((p) => (
                <View key={p.name} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: p.color }]} />
                  <Text style={styles.legendText}>{p.label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {selectedDayDetail ? (
          <>
            <View style={styles.detailHeader}>
              <Text style={styles.detailDate}>
                {calendarMonth}月{parseInt(selectedDayDetail.date.split('-')[2], 10)}日
              </Text>
              <Text style={styles.detailPhase}>
                {selectedDayDetail.phase_name} PHASE {selectedDayDetail.phase_number}
              </Text>
            </View>

            {selectedDayDetail.tasks.map((task, i) => {
              const iconName = (
                { fitness: 'fitness', book: 'book', chatbubbles: 'chatbubbles', headset: 'headset', 'checkmark-circle': 'checkmark-circle', people: 'people' } as Record<string, string>
              )[task.icon] ?? 'ellipse';

              return (
                <View key={i} style={styles.detailCard}>
                  <View style={styles.detailIcon}>
                    <Ionicons name={iconName as any} size={20} color={COLORS.primary} />
                  </View>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{task.title}</Text>
                    <Text style={styles.detailSub}>{task.duration}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={COLORS.subText} />
                </View>
              );
            })}
          </>
        ) : selectedDate ? (
          <View style={styles.emptyDetail}>
            <Text style={styles.emptyText}>点击日期查看详情</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  scroll: { flex: 1 },
  scrollPad: { paddingHorizontal: 20, paddingBottom: 16 },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  progressTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  progressCount: { fontSize: 13, color: COLORS.subText },
  calendarCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  monthTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  navBtns: { flexDirection: 'row', gap: 12 },
  weekRow: { flexDirection: 'row', marginBottom: 4 },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.subText,
    fontWeight: '600',
    paddingVertical: 4,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  dayText: { fontSize: 14, fontWeight: '700' },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: COLORS.subText },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 12,
  },
  detailDate: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  detailPhase: {
    fontSize: 13,
    color: COLORS.subText,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 10,
    gap: 12,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: { flex: 1 },
  detailTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  detailSub: { fontSize: 12, color: COLORS.subText },
  emptyDetail: { padding: 30, alignItems: 'center' },
  emptyText: { fontSize: 14, color: COLORS.subText },
});
