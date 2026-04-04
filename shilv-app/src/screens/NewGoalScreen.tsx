import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';

export function NewGoalScreen() {
  const goalInput = useAppStore((s) => s.goalInput);
  const setGoalInput = useAppStore((s) => s.setGoalInput);
  const setRoute = useAppStore((s) => s.setRoute);
  const resetClarify = useAppStore((s) => s.resetClarify);

  const wordCount = goalInput.trim().length;
  const canSubmit = wordCount > 0;

  const handleCreate = () => {
    resetClarify();
    setRoute('clarify');
  };

  const handleVoice = () => {
    Alert.alert('语音灵感', '语音功能演示中，暂未接入真实服务');
  };

  return (
    <View style={styles.container}>
      {/* Header — title only */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>时律</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>NEW GOAL</Text>
        </View>

        <Text style={styles.title}>开始你的长期目标</Text>
        <Text style={styles.subtitle}>
          描绘一段旅程，而不是一个任务。请详细说明你想在接下来的几个月中成就什么。
        </Text>

        {/* Text Area */}
        <View style={styles.textAreaWrap}>
          <TextInput
            style={styles.textArea}
            placeholder="例如：在六个月内掌握自由泳技术，并完成一次1.5公里的公开水域游泳..."
            placeholderTextColor={COLORS.subText + '80'}
            value={goalInput}
            onChangeText={setGoalInput}
            multiline
            textAlignVertical="top"
          />
          <View style={styles.wordCountWrap}>
            <Text style={styles.wordCountLabel}>Tt</Text>
            <Text style={styles.wordCount}>{wordCount} 词</Text>
          </View>
        </View>

        {/* Voice Button */}
        <Pressable style={styles.voiceBtn} onPress={handleVoice}>
          <Ionicons name="mic" size={26} color={COLORS.text} />
        </Pressable>
        <Text style={styles.voiceHint}>点击开启语音灵感</Text>
      </View>

      {/* CTA */}
      <View style={styles.bottomArea}>
        <Pressable
          style={[styles.ctaBtn, !canSubmit && styles.ctaDisabled]}
          disabled={!canSubmit}
          onPress={handleCreate}
        >
          <Text style={styles.ctaText}>创建长期目标</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </Pressable>
        <Text style={styles.footerText}>点击创建即表示你承诺开启这段专注之旅</Text>
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
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.subText,
    lineHeight: 22,
    marginBottom: 20,
  },
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
  wordCountWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.muted,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  wordCountLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.subText,
  },
  wordCount: {
    fontSize: 13,
    color: COLORS.subText,
  },
  voiceBtn: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  voiceHint: {
    textAlign: 'center',
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
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
  ctaDisabled: {
    opacity: 0.4,
  },
  ctaText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 17,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.subText,
  },
});
