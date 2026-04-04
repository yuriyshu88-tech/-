import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';
import { ProgressBar } from '../components/ProgressBar';
import { CALENDAR_DATA, PHASES } from '../mock/data';

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

function getPhaseColor(phase: number): string {
  if (phase === 1) return PHASES[0].color;
  if (phase === 2) return PHASES[1].color;
  return PHASES[2].color;
}

function getCalendarGrid() {
  // Build a May 2024 grid
  // May 1, 2024 = Wednesday (index 2 in Mon-based week)
  const firstDayOfWeek = 2; // Wednesday
  const daysInMonth = 31;

  const grid: (null | { day: number; date: string })[][] = [];
  let week: (null | { day: number; date: string })[] = [];

  // Pad start
  for (let i = 0; i < firstDayOfWeek; i++) {
    week.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `2024-05-${String(d).padStart(2, '0')}`;
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
  const selectedDate = useAppStore((s) => s.selectedDate);
  const setSelectedDate = useAppStore((s) => s.setSelectedDate);

  const calendarGrid = getCalendarGrid();
  const completedCount = CALENDAR_DATA.filter((d) => d.completed).length;
  const totalDays = 21;

  const selectedDayData = CALENDAR_DATA.find((d) => d.date === selectedDate);
  const selectedDay = selectedDate ? parseInt(selectedDate.split('-')[2], 10) : 0;
  const selectedPhaseInfo = selectedDayData
    ? PHASES[selectedDayData.phase - 1]
    : null;

  const calendarLookup = new Map(CALENDAR_DATA.map((d) => [d.date, d]));

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Header — title only */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>时律</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        {/* Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>本月进度</Text>
          <Text style={styles.progressCount}>
            {completedCount} / {totalDays} 天已完成
          </Text>
        </View>
        <ProgressBar progress={completedCount / totalDays} height={10} />

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthTitle}>2024年 5月</Text>
            <View style={styles.navBtns}>
              <Pressable hitSlop={8}>
                <Ionicons name="chevron-back" size={20} color={COLORS.subText} />
              </Pressable>
              <Pressable hitSlop={8}>
                <Ionicons name="chevron-forward" size={20} color={COLORS.subText} />
              </Pressable>
            </View>
          </View>

          {/* Weekday Headers */}
          <View style={styles.weekRow}>
            {WEEKDAYS.map((d) => (
              <Text key={d} style={styles.weekDay}>{d}</Text>
            ))}
          </View>

          {/* Day Grid */}
          {calendarGrid.map((week, wi) => (
            <View key={wi} style={styles.weekRow}>
              {week.map((cell, ci) => {
                if (!cell) {
                  return <View key={ci} style={styles.dayCell} />;
                }

                const dayData = calendarLookup.get(cell.date);
                const isSelected = cell.date === selectedDate;
                const isInPlan = !!dayData;
                const isCompleted = dayData?.completed ?? false;
                const phaseColor = dayData ? getPhaseColor(dayData.phase) : COLORS.muted;

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
                    onPress={() => setSelectedDate(cell.date)}
                  >
                    <Text style={[styles.dayText, { color: textColor }]}>
                      {cell.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}

          {/* Legend */}
          <View style={styles.legend}>
            {PHASES.map((p) => (
              <View key={p.name} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: p.color }]} />
                <Text style={styles.legendText}>{p.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Date Detail — only show tasks for today and past (completed) dates */}
        {selectedDayData && selectedDayData.completed ? (
          <>
            <View style={styles.detailHeader}>
              <Text style={styles.detailDate}>
                5月{selectedDay}日
              </Text>
              <Text style={styles.detailPhase}>
                {selectedPhaseInfo?.label}期 PHASE {selectedDayData.phase}
              </Text>
            </View>

            {selectedDayData.tasks.map((task, i) => {
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
        ) : selectedDayData ? (
          <View style={styles.emptyDetail}>
            <Text style={styles.detailDate}>5月{selectedDay}日</Text>
            <Text style={styles.emptyText}>任务将在当天解锁</Text>
          </View>
        ) : (
          <View style={styles.emptyDetail}>
            <Text style={styles.emptyText}>暂无任务</Text>
          </View>
        )}
      </ScrollView>
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

  // Progress
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  progressCount: {
    fontSize: 13,
    color: COLORS.subText,
  },

  // Calendar Card
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
  monthTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  navBtns: {
    flexDirection: 'row',
    gap: 12,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
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
  dayText: {
    fontSize: 14,
    fontWeight: '700',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.subText,
  },

  // Detail
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 12,
  },
  detailDate: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
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
  detailTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  detailSub: {
    fontSize: 12,
    color: COLORS.subText,
  },
  emptyDetail: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.subText,
  },
});
