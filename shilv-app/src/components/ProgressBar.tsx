import { StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/colors';

interface ProgressBarProps {
  progress: number; // 0-1
  height?: number;
  color?: string;
  bgColor?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  color = COLORS.primary,
  bgColor = COLORS.muted,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View style={[styles.track, { height, backgroundColor: bgColor, borderRadius: height / 2 }]}>
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    overflow: 'hidden',
  },
});
