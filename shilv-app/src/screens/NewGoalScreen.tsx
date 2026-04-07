import { Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';

export function NewGoalScreen() {
  const goalInput = useAppStore((s) => s.goalInput);
  const setGoalInput = useAppStore((s) => s.setGoalInput);
  const submitGoal = useAppStore((s) => s.submitGoal);
  const loading = useAppStore((s) => s.loading);

  const canSubmit = goalInput.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>时律</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>NEW GOAL</Text>
        </View>

        <Text style={styles.title}>开始你的长期目标</Text>

        <View style={styles.textAreaWrap}>
          <TextInput
            style={styles.textArea}
            placeholder="例如：在1个月内学习完AI基础知识"
            placeholderTextColor={COLORS.subText + '80'}
            value={goalInput}
            onChangeText={setGoalInput}
            multiline
            textAlignVertical="top"
            blurOnSubmit
            returnKeyType="done"
          />
        </View>
      </View>

      <View style={styles.bottomArea}>
        <Pressable
          style={[styles.ctaBtn, (!canSubmit || loading) && styles.ctaDisabled]}
          disabled={!canSubmit || loading}
          onPress={submitGoal}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.ctaText}>创建长期目标</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: COLORS.primary, letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, marginBottom: 20 },
  textAreaWrap: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: 16,
    minHeight: 180,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  textArea: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    minHeight: 140,
  },
  bottomArea: { paddingHorizontal: 24, paddingBottom: 30 },
  ctaBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: COLORS.white, fontWeight: '700', fontSize: 17 },
});
