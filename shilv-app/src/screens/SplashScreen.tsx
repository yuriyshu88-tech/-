import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';
import { useAppStore } from '../store/appStore';

const logo = require('../../assets/logo.png');

export function SplashScreen() {
  const setRoute = useAppStore((s) => s.setRoute);
  const hasGoal = useAppStore((s) => s.hasGoal);
  const needsYesterdayConfirm = useAppStore((s) => s.needsYesterdayConfirm);
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const currentHasGoal = hasGoal;
    const currentNeedsConfirm = needsYesterdayConfirm;

    Animated.timing(barAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      if (!currentHasGoal) {
        setRoute('newGoal');
      } else if (currentNeedsConfirm) {
        setRoute('yesterday');
      } else {
        setRoute('main');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasGoal, needsYesterdayConfirm, setRoute, barAnim]);

  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '70%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.brand}>时律</Text>
        <Text style={styles.slogan}>把 想 做 的 ， 做 到 。</Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, { width: barWidth }]} />
        </View>
        <Text style={styles.loadingText}>INITIALIZING{'\n'}SANCTUARY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  brand: {
    fontSize: 64,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  slogan: {
    marginTop: 12,
    fontSize: 15,
    color: COLORS.subText,
    letterSpacing: 3,
  },
  bottom: {
    paddingBottom: 60,
    alignItems: 'center',
    gap: 14,
  },
  barTrack: {
    width: 80,
    height: 3,
    backgroundColor: COLORS.muted,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: 3,
    backgroundColor: COLORS.subText,
    borderRadius: 2,
  },
  loadingText: {
    fontSize: 11,
    color: COLORS.subText,
    letterSpacing: 3,
    textAlign: 'center',
    lineHeight: 16,
  },
});
