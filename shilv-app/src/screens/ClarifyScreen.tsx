import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';
import { CLARIFY_QUESTIONS } from '../mock/data';
import { ProgressBar } from '../components/ProgressBar';

export function ClarifyScreen() {
  const step = useAppStore((s) => s.clarifyStep);
  const answers = useAppStore((s) => s.clarifyAnswers);
  const setClarifyAnswer = useAppStore((s) => s.setClarifyAnswer);
  const nextStep = useAppStore((s) => s.nextClarifyStep);
  const prevStep = useAppStore((s) => s.prevClarifyStep);
  const setRoute = useAppStore((s) => s.setRoute);
  const commitGoal = useAppStore((s) => s.commitGoal);

  const q = CLARIFY_QUESTIONS[step];
  const answer = answers[q.id];
  const selectedOption = answer?.option ?? null;
  const customText = answer?.custom ?? '';
  const isLast = step === CLARIFY_QUESTIONS.length - 1;

  const isCustom = selectedOption === 'D';
  const canContinue = selectedOption !== null && (!isCustom || customText.trim().length > 0);

  const handleNext = () => {
    if (isLast) {
      commitGoal();
      setRoute('planResult');
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      prevStep();
    } else {
      setRoute('newGoal');
    }
  };

  const stepLabel = String(step + 1).padStart(2, '0');
  const totalLabel = String(CLARIFY_QUESTIONS.length).padStart(2, '0');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable hitSlop={12} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>时律</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        <View style={styles.stepRow}>
          <Text style={styles.stepCurrent}>{stepLabel}</Text>
          <Text style={styles.stepTotal}> / {totalLabel}</Text>
        </View>
        <Text style={styles.aiLabel}>AI QUESTIONNAIRE</Text>
      </View>
      <View style={styles.progressBarWrap}>
        <ProgressBar progress={(step + 1) / CLARIFY_QUESTIONS.length} height={3} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollPad}>
        {/* Question */}
        <Text style={styles.questionTitle}>{q.title}</Text>
        <Text style={styles.questionDesc}>{q.description}</Text>

        {/* Options */}
        <View style={styles.options}>
          {q.options.map((opt) => {
            const active = selectedOption === opt.id;
            return (
              <Pressable
                key={opt.id}
                style={[styles.optionCard, active && styles.optionActive]}
                onPress={() => setClarifyAnswer(q.id, opt.id, customText)}
              >
                <View style={styles.optionContent}>
                  <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                    {opt.label}
                  </Text>
                  <Text style={styles.optionDesc}>{opt.description}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <Ionicons name="checkmark" size={14} color={COLORS.white} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Custom input if D selected */}
        {isCustom && (
          <TextInput
            style={styles.customInput}
            placeholder="请输入你的想法..."
            value={customText}
            onChangeText={(t) => setClarifyAnswer(q.id, 'D', t)}
          />
        )}

        {/* Suggestion Card */}
        {q.suggestion && (
          <View style={styles.suggestionCard}>
            <View style={styles.suggestionIcon}>
              <Ionicons name="sparkles-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionTitle}>智能建议</Text>
              <View style={styles.suggestionRow}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.subText} />
                <Text style={styles.suggestionText}>建议周期: {q.suggestion.cycle}</Text>
              </View>
              <View style={styles.suggestionRow}>
                <Ionicons name="calendar" size={14} color={COLORS.subText} />
                <Text style={styles.suggestionText}>预计结束: {q.suggestion.endDate}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomArea}>
        <Pressable
          style={[styles.ctaBtn, !canContinue && styles.ctaDisabled]}
          disabled={!canContinue}
          onPress={handleNext}
        >
          <Text style={styles.ctaText}>{isLast ? '提交并生成方案' : '下一题'}</Text>
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
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  stepCurrent: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.text,
  },
  stepTotal: {
    fontSize: 16,
    color: COLORS.subText,
    fontWeight: '500',
  },
  aiLabel: {
    fontSize: 11,
    color: COLORS.subText,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  progressBarWrap: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  scrollContent: {
    flex: 1,
  },
  scrollPad: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  questionDesc: {
    fontSize: 14,
    color: COLORS.subText,
    lineHeight: 20,
    marginBottom: 20,
  },
  options: {
    gap: 10,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  optionLabelActive: {
    color: COLORS.primary,
  },
  optionDesc: {
    fontSize: 13,
    color: COLORS.subText,
  },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  customInput: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
  },
  suggestionCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.muted,
    borderRadius: RADIUS.lg,
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionContent: {
    flex: 1,
    gap: 4,
  },
  suggestionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  suggestionText: {
    fontSize: 13,
    color: COLORS.subText,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 8,
  },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaDisabled: {
    opacity: 0.4,
  },
  ctaText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
