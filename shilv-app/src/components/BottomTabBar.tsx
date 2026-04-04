import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { MainTab, useAppStore } from '../store/appStore';

const TABS: { key: MainTab; label: string; icon: string; iconActive: string }[] = [
  { key: 'tasks', label: '任务', icon: 'document-text-outline', iconActive: 'document-text' },
  { key: 'calendar', label: '日历', icon: 'calendar-outline', iconActive: 'calendar' },
  { key: 'profile', label: '我的', icon: 'person-outline', iconActive: 'person' },
];

export function BottomTabBar() {
  const tab = useAppStore((s) => s.tab);
  const setTab = useAppStore((s) => s.setTab);

  return (
    <View style={styles.bar}>
      {TABS.map((t) => {
        const active = tab === t.key;
        return (
          <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
            <Ionicons
              name={active ? (t.iconActive as any) : (t.icon as any)}
              size={22}
              color={active ? COLORS.primary : COLORS.subText}
            />
            <Text style={[styles.label, active && styles.labelActive]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
    color: COLORS.subText,
    fontWeight: '600',
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});
