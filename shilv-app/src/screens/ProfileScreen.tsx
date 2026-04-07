import { useEffect } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { useAppStore } from '../store/appStore';

export function ProfileScreen() {
  const setRoute = useAppStore((s) => s.setRoute);
  const profile = useAppStore((s) => s.profile);
  const isGuest = useAppStore((s) => s.isGuest);
  const fetchProfile = useAppStore((s) => s.fetchProfile);
  const doLogout = useAppStore((s) => s.doLogout);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const name = profile?.nickname || '游客';
  const userId = profile?.user_id || '--';
  const stats = profile?.stats ?? { ongoing: 0, completion_rate: 0, streak: 0 };

  const handleLogout = () => {
    Alert.alert('退出登录', '退出后将回到游客状态', [
      { text: '取消', style: 'cancel' },
      { text: '退出', style: 'destructive', onPress: doLogout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>个人中心</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={COLORS.subText} />
            </View>
            {!isGuest && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userId}>ID: {userId}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.ongoing}</Text>
            <Text style={styles.statLabel}>进行中</Text>
          </View>
          <View style={[styles.statItem, styles.statCenter]}>
            <Text style={styles.statValueHighlight}>{stats.completion_rate}%</Text>
            <Text style={styles.statLabelHighlight}>完成率</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>连续打卡</Text>
          </View>
        </View>

        {profile?.is_member === false && (
          <View style={styles.memberCard}>
            <View style={styles.memberLeft}>
              <View style={styles.memberIcon}>
                <Ionicons name="diamond-outline" size={20} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.memberTitle}>时律会员</Text>
                <Text style={styles.memberSub}>解锁更多AI功能</Text>
              </View>
            </View>
            <Pressable
              style={styles.upgradeBtn}
              onPress={() => Alert.alert('会员', '会员功能即将上线')}
            >
              <Text style={styles.upgradeBtnText}>升级</Text>
            </Pressable>
          </View>
        )}

        {isGuest ? (
          <View style={styles.menuSection}>
            <Pressable style={styles.menuItem} onPress={() => setRoute('login')}>
              <Ionicons name="log-in-outline" size={20} color={COLORS.primary} />
              <Text style={[styles.menuLabel, { color: COLORS.primary }]}>登录 / 注册</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>退出当前账号</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { alignItems: 'center', paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.primary },
  scroll: { flex: 1 },
  scrollPad: { paddingHorizontal: 20, paddingBottom: 30 },
  avatarSection: { alignItems: 'center', paddingVertical: 16 },
  avatarRing: { position: 'relative', marginBottom: 10 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
  },
  userName: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 2 },
  userId: { fontSize: 13, color: COLORS.subText },
  statsRow: { flexDirection: 'row', marginVertical: 16, gap: 8 },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
  },
  statCenter: { backgroundColor: COLORS.primary },
  statValue: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 11, color: COLORS.subText, marginTop: 2 },
  statValueHighlight: { fontSize: 22, fontWeight: '800', color: COLORS.white },
  statLabelHighlight: { fontSize: 11, color: COLORS.white + 'CC', marginTop: 2 },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  memberLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  memberIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  memberSub: { fontSize: 12, color: COLORS.subText },
  upgradeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  upgradeBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 13 },
  menuSection: { gap: 2, marginBottom: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 16,
    gap: 12,
  },
  menuLabel: { flex: 1, fontSize: 15, color: COLORS.text, fontWeight: '500' },
  logoutBtn: { alignItems: 'center', paddingVertical: 12 },
  logoutText: { fontSize: 14, color: COLORS.danger, fontWeight: '600', letterSpacing: 1 },
});
