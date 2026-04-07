import { View } from 'react-native';
import { useAppStore } from './src/store/appStore';
import { AppFrame } from './src/components/AppFrame';
import { BottomTabBar } from './src/components/BottomTabBar';
import { SplashScreen } from './src/screens/SplashScreen';
import { NewGoalScreen } from './src/screens/NewGoalScreen';
import { ClarifyScreen } from './src/screens/ClarifyScreen';
import { PlanResultScreen } from './src/screens/PlanResultScreen';
import { TaskScreen } from './src/screens/TaskScreen';
import { YesterdayScreen } from './src/screens/YesterdayScreen';
import { CalendarScreen } from './src/screens/CalendarScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';

export default function App() {
  const route = useAppStore((s) => s.route);
  const tab = useAppStore((s) => s.tab);

  if (route === 'splash') {
    return (
      <AppFrame>
        <SplashScreen />
      </AppFrame>
    );
  }

  if (route === 'newGoal') {
    return (
      <AppFrame>
        <NewGoalScreen />
      </AppFrame>
    );
  }

  if (route === 'clarify') {
    return (
      <AppFrame>
        <ClarifyScreen />
      </AppFrame>
    );
  }

  if (route === 'planResult') {
    return (
      <AppFrame>
        <PlanResultScreen />
      </AppFrame>
    );
  }

  if (route === 'yesterday') {
    return (
      <AppFrame>
        <YesterdayScreen />
      </AppFrame>
    );
  }

  if (route === 'login') {
    return (
      <AppFrame>
        <LoginScreen />
      </AppFrame>
    );
  }

  if (route === 'register') {
    return (
      <AppFrame>
        <RegisterScreen />
      </AppFrame>
    );
  }

  // Main screens with bottom tab bar
  return (
    <AppFrame>
      <View style={{ flex: 1 }}>
        {tab === 'tasks' && <TaskScreen />}
        {tab === 'calendar' && <CalendarScreen />}
        {tab === 'profile' && <ProfileScreen />}
      </View>
      <BottomTabBar />
    </AppFrame>
  );
}
