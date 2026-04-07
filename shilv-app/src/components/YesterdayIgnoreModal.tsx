import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { IGNORE_REASONS } from '../mock/data';
import { useAppStore } from '../store/appStore';

export function YesterdayIgnoreModal() {
  const visible = useAppStore((s) => s.yesterdayIgnoreModalVisible);
  const targetId = useAppStore((s) => s.yesterdayIgnoreTargetId);
  const closeModal = useAppStore((s) => s.closeYesterdayIgnoreModal);
  const resolveYesterday = useAppStore((s) => s.resolveYesterday);

  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');

  const canSubmit = selected !== null && (selected !== '其他' || customText.trim().length > 0);

  const handleSubmit = () => {
    if (!targetId || !canSubmit) return;
    const reason = selected === '其他' ? customText.trim() : (selected ?? '');
    resolveYesterday(targetId, 'ignore', reason);
    setSelected(null);
    setCustomText('');
  };

  const handleClose = () => {
    closeModal();
    setSelected(null);
    setCustomText('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>忽略原因</Text>
            <Pressable onPress={handleClose} hitSlop={12}>
              <Ionicons name="close" size={24} color={COLORS.subText} />
            </Pressable>
          </View>
          <Text style={styles.subtitle}>请说明忽略这个任务的原因</Text>

          <View style={styles.options}>
            {IGNORE_REASONS.map((reason) => {
              const active = selected === reason;
              return (
                <Pressable
                  key={reason}
                  style={[styles.option, active && styles.optionActive]}
                  onPress={() => setSelected(reason)}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {reason}
                  </Text>
                  {active && <Ionicons name="checkmark" size={18} color={COLORS.primary} />}
                </Pressable>
              );
            })}
          </View>

          {selected === '其他' && (
            <TextInput
              style={styles.input}
              placeholder="请输入具体原因..."
              value={customText}
              onChangeText={setCustomText}
              multiline
            />
          )}

          <Pressable
            style={[styles.submitBtn, !canSubmit && styles.disabled]}
            disabled={!canSubmit}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>提交</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.subText, marginBottom: 16 },
  options: { gap: 8, marginBottom: 12 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionActive: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  optionText: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  optionTextActive: { color: COLORS.primary },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 14,
    fontSize: 15,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  disabled: { opacity: 0.4 },
  submitText: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
});
