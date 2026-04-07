import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';

export function RegisterScreen() {
  const doRegister = useAppStore((s) => s.doRegister);
  const loading = useAppStore((s) => s.loading);
  const setRoute = useAppStore((s) => s.setRoute);

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = account.trim().length >= 4 && password.length >= 6;

  const handleRegister = () => {
    if (!canSubmit || loading) return;
    doRegister(account.trim(), password, nickname.trim() || undefined);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable hitSlop={12} onPress={() => setRoute('login')}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>时律</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>创建账号</Text>
        <Text style={styles.subtitle}>注册后可同步数据到云端</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>账号</Text>
          <TextInput
            style={styles.input}
            placeholder="字母/数字/下划线，4-24位"
            placeholderTextColor={COLORS.subText + '80'}
            value={account}
            onChangeText={setAccount}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>密码</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.passwordInput}
              placeholder="6位以上"
              placeholderTextColor={COLORS.subText + '80'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <Pressable hitSlop={8} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.subText}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>昵称（可选）</Text>
          <TextInput
            style={styles.input}
            placeholder="给自己取个名字"
            placeholderTextColor={COLORS.subText + '80'}
            value={nickname}
            onChangeText={setNickname}
          />
        </View>
      </View>

      <View style={styles.bottomArea}>
        <Pressable
          style={[styles.ctaBtn, !canSubmit && styles.ctaDisabled]}
          disabled={!canSubmit || loading}
          onPress={handleRegister}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.ctaText}>注册</Text>
          )}
        </Pressable>

        <Pressable style={styles.switchBtn} onPress={() => setRoute('login')}>
          <Text style={styles.switchText}>
            已有账号？<Text style={styles.switchLink}>去登录</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  subtitle: { fontSize: 14, color: COLORS.subText, marginBottom: 32 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 14,
    fontSize: 15,
    color: COLORS.text,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingRight: 14,
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: COLORS.text,
  },
  bottomArea: { paddingHorizontal: 24, paddingBottom: 30 },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
  switchBtn: { alignItems: 'center', paddingVertical: 16 },
  switchText: { fontSize: 14, color: COLORS.subText },
  switchLink: { color: COLORS.primary, fontWeight: '600' },
});
