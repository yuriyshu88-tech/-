import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StatusBar as RNStatusBar, StyleSheet, View } from 'react-native';
import { COLORS } from '../theme/colors';

interface AppFrameProps {
  children: React.ReactNode;
  showTab?: boolean;
}

export function AppFrame({ children }: AppFrameProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <ExpoStatusBar style="dark" backgroundColor={COLORS.bg} translucent={false} />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) + 4 : 10,
  },
});
