import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';
import { YesterdayIgnoreModal } from '../components/YesterdayIgnoreModal';

const ICON_MAP: Record<string, string> = {
  fitness: 'fitness',
  book: 'book',
  'code-slash': 'code-slash',
  'document-text': 'document-text',
};

export function YesterdayScreen() {
  const yesterdayTasks = useAppStore((s) => s.yesterdayTasks);
  const resolveYesterday = useAppStore((s) => s.resolveYesterday);
  const confirmYesterday = useAppStore((s) => s.confirmYesterday);
  const fetchYesterdayTasks = useAppStore((s) => s.fetchYesterdayTasks);
  const openYesterdayIgnoreModal = useAppStore((s) => s.openYesterdayIgnoreModal);

  useEffect(() => {
    fetchYesterdayTasks();
  }, [fetchYesterdayTasks]);

  const allResolved = yesterdayTasks.length > 0 && yesterdayTasks.every((t) => t.resolved);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>时律</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        <Text style={styles.label}>昨日回顾</Text>
        <Text style={styles.title}>先确认一下昨天的进度</Text>
        <View style={styles.divider} />

        {yesterdayTasks.map((task) => {
          const iconName = ICON_MAP[task.icon] ?? 'ellipse';

          if (task.resolved && task.action === 'done') {
            return (
              <View key={task.id} style={styles.confirmedCard}>
                <View style={styles.confirmedIcon}>
                  <Ionicons name={iconName as any} size={18} color={COLORS.primary} />
                </View>
                <View style={styles.confirmedContent}>
                  <Text style={styles.confirmedTitle}>{task.title}</Text>
                  <Text style={styles.confirmedSub}>{task.subtitle}</Text>
                </View>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={18} color={COLORS.primary} />
                </View>
              </View>
            );
          }

          if (task.resolved && task.action === 'ignore') {
            return null;
          }

          return (
            <View key={task.id} style={styles.actionCard}>
              <View style={styles.actionCardHeader}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{task.category}</Text>
                </View>
                <Ionicons name={iconName as any} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.actionTitle}>{task.title}</Text>
              <Text style={styles.actionSub}>{task.subtitle}</Text>

              <View style={styles.actionRow}>
                <Pressable
                  style={styles.doneBtn}
                  onPress={() => resolveYesterday(task.id, 'done')}
                >
                  <Ionicons name="checkmark" size={16} color={COLORS.white} />
                  <Text style={styles.doneBtnText}>完成</Text>
                </Pressable>
                <Pressable
                  style={styles.ignoreBtn}
                  onPress={() => openYesterdayIgnoreModal(task.id)}
                >
                  <Ionicons name="close" size={16} color={COLORS.text} />
                  <Text style={styles.ignoreBtnText}>忽略</Text>
                </Pressable>
              </View>
            </View>
          );
        })}

        <View style={styles.quoteCard}>
          <View style={styles.quoteImagePlaceholder}>
            <Ionicons name="image-outline" size={40} color={COLORS.muted} />
          </View>
          <Text style={styles.quoteText}>
            "每一个被确认的足迹，都是向卓越迈进的基石。"
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomArea}>
        <Pressable
          style={[styles.ctaBtn, !allResolved && styles.ctaDisabled]}
          disabled={!allResolved}
          onPress={confirmYesterday}
        >
          <Text style={styles.ctaText}>确认并开启今日</Text>
        </Pressable>
      </View>

      <YesterdayIgnoreModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  scroll: { flex: 1 },
  scrollPad: { paddingHorizontal: 24, paddingBottom: 16 },
  label: { fontSize: 13, color: COLORS.primary, fontWeight: '600', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginBottom: 10 },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  actionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: COLORS.muted,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: { fontSize: 12, fontWeight: '600', color: COLORS.subText },
  actionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  actionSub: { fontSize: 13, color: COLORS.subText, marginBottom: 14 },
  actionRow: { flexDirection: 'row', gap: 10 },
  doneBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  doneBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
  ignoreBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.muted,
    borderRadius: RADIUS.sm,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  ignoreBtnText: { color: COLORS.text, fontWeight: '600', fontSize: 15 },
  confirmedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 14,
    gap: 12,
  },
  confirmedIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmedContent: { flex: 1 },
  confirmedTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  confirmedSub: { fontSize: 12, color: COLORS.subText },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteCard: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginTop: 8,
  },
  quoteImagePlaceholder: {
    height: 140,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteText: {
    color: COLORS.white,
    fontSize: 14,
    fontStyle: 'italic',
    padding: 16,
    lineHeight: 20,
  },
  bottomArea: { paddingHorizontal: 24, paddingBottom: 30, paddingTop: 8 },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    alignItems: 'center',
  },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: COLORS.white, fontWeight: '700', fontSize: 17 },
});
