import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme/colors';
import { PROFILE } from '../mock/data';

const MENU_ITEMS = [
  { icon: 'person-outline', label: '账户与安全' },
  { icon: 'help-circle-outline', label: '帮助与反馈' },
];

export function ProfileScreen() {

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Header — title only */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>个人中心</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollPad}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={COLORS.subText} />
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            </View>
          </View>
          <Text style={styles.userName}>{PROFILE.name}</Text>
          <Text style={styles.userId}>ID: {PROFILE.id}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{PROFILE.stats.ongoing}</Text>
            <Text style={styles.statLabel}>进行中</Text>
          </View>
          <View style={[styles.statItem, styles.statCenter]}>
            <Text style={styles.statValueHighlight}>{PROFILE.stats.completionRate}%</Text>
            <Text style={styles.statLabelHighlight}>完成率</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{PROFILE.stats.streak}</Text>
            <Text style={styles.statLabel}>连续打卡</Text>
          </View>
        </View>

        {/* Member Banner */}
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
            onPress={() => Alert.alert('会员', '会员功能演示中')}
          >
            <Text style={styles.upgradeBtnText}>升级</Text>
          </Pressable>
        </View>

        {/* Menu List */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, i) => (
            <Pressable
              key={i}
              style={styles.menuItem}
              onPress={() => Alert.alert(item.label, '功能演示中')}
            >
              <Ionicons name={item.icon as any} size={20} color={COLORS.subText} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.subText} />
            </Pressable>
          ))}
        </View>

        {/* Logout — demo placeholder */}
        <Pressable
          style={styles.logoutBtn}
          onPress={() => Alert.alert('退出登录', '演示版暂不支持此功能')}
        >
          <Text style={styles.logoutText}>退出当前账号</Text>
        </Pressable>
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
    paddingBottom: 30,
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatarRing: {
    position: 'relative',
    marginBottom: 10,
  },
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
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 2,
  },
  userId: {
    fontSize: 13,
    color: COLORS.subText,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    marginVertical: 16,
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
  },
  statCenter: {
    backgroundColor: COLORS.primary,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.subText,
    marginTop: 2,
  },
  statValueHighlight: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  statLabelHighlight: {
    fontSize: 11,
    color: COLORS.white + 'CC',
    marginTop: 2,
  },

  // Member
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
  memberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  memberIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  memberSub: {
    fontSize: 12,
    color: COLORS.subText,
  },
  upgradeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  upgradeBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 13,
  },

  // Menu
  menuSection: {
    gap: 2,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 16,
    gap: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },

  // Logout
  logoutBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 14,
    color: COLORS.danger,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
